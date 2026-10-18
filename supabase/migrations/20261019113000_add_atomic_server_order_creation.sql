-- Date Compass: atomic, server-priced order creation for the private staging API.
-- This function is SECURITY INVOKER; only service_role may execute it. It is not a public RPC.
alter table public.orders
  add column submission_fingerprint text,
  add column fulfillment_notes text;

alter table public.orders
  add constraint orders_submission_fingerprint_length
  check (submission_fingerprint is null or char_length(submission_fingerprint) = 64);

comment on column public.orders.submission_fingerprint is
  'SHA-256 fingerprint of the normalized order draft; reused idempotency keys with different payloads are rejected.';
comment on column public.orders.fulfillment_notes is
  'Customer-provided fulfillment notes; private and never returned by public status endpoints.';

create or replace function public.create_order_transaction(
  p_submission_key text,
  p_submission_fingerprint text,
  p_draft jsonb
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_existing public.orders%rowtype;
  v_order public.orders%rowtype;
  v_digital public.product_catalog%rowtype;
  v_kit public.product_catalog%rowtype;
  v_total integer;
  v_reference text;
begin
  if p_submission_key is null or char_length(p_submission_key) < 16 or char_length(p_submission_key) > 128 then
    raise exception using errcode = '22023', message = 'invalid_submission_key';
  end if;
  if p_submission_fingerprint is null or p_submission_fingerprint !~ '^[0-9a-f]{64}$' then
    raise exception using errcode = '22023', message = 'invalid_submission_fingerprint';
  end if;
  if p_draft is null or jsonb_typeof(p_draft) <> 'object' then
    raise exception using errcode = '22023', message = 'invalid_order_draft';
  end if;

  select * into v_existing
  from public.orders
  where submission_key = p_submission_key;

  if found then
    if v_existing.submission_fingerprint is distinct from p_submission_fingerprint then
      raise exception using errcode = '22023', message = 'submission_key_payload_mismatch';
    end if;
    return jsonb_build_object(
      'publicReference', v_existing.public_reference,
      'orderStatus', v_existing.order_status,
      'currency', v_existing.currency,
      'totalMinor', v_existing.total_minor,
      'reused', true
    );
  end if;

  select * into v_digital
  from public.product_catalog
  where product_code = 'digital_plan' and active = true
    and price_minor is not null and price_minor > 0;
  if not found then
    raise exception using errcode = 'P0001', message = 'digital_plan_unavailable';
  end if;

  if coalesce((p_draft ->> 'kitRequested')::boolean, false) then
    select * into v_kit
    from public.product_catalog
    where product_code = 'physical_kit' and active = true
      and price_minor is not null and price_minor > 0;
    if not found then
      raise exception using errcode = 'P0001', message = 'physical_kit_unavailable';
    end if;
    v_total := v_digital.price_minor + v_kit.price_minor;
  else
    v_total := v_digital.price_minor;
  end if;

  if v_total <= 0 then
    raise exception using errcode = '22023', message = 'invalid_server_total';
  end if;

  v_reference := 'DC-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12));

  insert into public.orders (
    public_reference, submission_key, submission_fingerprint,
    customer_name, customer_email, customer_mobile, planned_date,
    plan_snapshot, kit_requested, fulfillment_notes,
    currency, subtotal_minor, total_minor, order_status
  ) values (
    v_reference, p_submission_key, p_submission_fingerprint,
    trim(p_draft ->> 'customerName'),
    lower(trim(p_draft ->> 'customerEmail')),
    nullif(trim(coalesce(p_draft ->> 'customerMobile', '')), ''),
    nullif(p_draft ->> 'plannedDate', '')::date,
    p_draft -> 'planSnapshot',
    coalesce((p_draft ->> 'kitRequested')::boolean, false),
    nullif(trim(coalesce(p_draft ->> 'fulfillmentNotes', '')), ''),
    'PHP', v_total, v_total, 'submitted'
  )
  on conflict (submission_key) where submission_key is not null do nothing
  returning * into v_order;

  if not found then
    select * into v_existing
    from public.orders
    where submission_key = p_submission_key;
    if not found then
      raise exception using errcode = '40001', message = 'order_submission_retry';
    end if;
    if v_existing.submission_fingerprint is distinct from p_submission_fingerprint then
      raise exception using errcode = '22023', message = 'submission_key_payload_mismatch';
    end if;
    return jsonb_build_object(
      'publicReference', v_existing.public_reference,
      'orderStatus', v_existing.order_status,
      'currency', v_existing.currency,
      'totalMinor', v_existing.total_minor,
      'reused', true
    );
  end if;

  insert into public.order_items (
    order_id, item_type, title_snapshot, quantity, unit_amount_minor, line_total_minor
  ) values (
    v_order.id, 'digital_plan', v_digital.title, 1, v_digital.price_minor, v_digital.price_minor
  );

  if v_order.kit_requested then
    insert into public.order_items (
      order_id, item_type, title_snapshot, quantity, unit_amount_minor, line_total_minor
    ) values (
      v_order.id, 'physical_kit', v_kit.title, 1, v_kit.price_minor, v_kit.price_minor
    );
  end if;

  insert into public.order_status_events (order_id, old_status, new_status, actor_type, note)
  values (v_order.id, null, 'submitted', 'system', 'Order created; payment has not been verified.');

  return jsonb_build_object(
    'publicReference', v_order.public_reference,
    'orderStatus', v_order.order_status,
    'currency', v_order.currency,
    'totalMinor', v_order.total_minor,
    'reused', false
  );
end;
$$;

revoke all on function public.create_order_transaction(text, text, jsonb) from public, anon, authenticated;
grant execute on function public.create_order_transaction(text, text, jsonb) to service_role;
