create or replace function public.process_paymongo_checkout_paid(
  p_event_id text,
  p_reference_number text,
  p_session_id text,
  p_payment_id text,
  p_amount_minor integer,
  p_currency text,
  p_livemode boolean
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_order public.orders%rowtype;
  v_inserted_event_id uuid;
  v_existing_payment public.payments%rowtype;
  v_existing_session_payment public.payments%rowtype;
begin
  if p_event_id is null or char_length(p_event_id) < 1 or char_length(p_event_id) > 200
     or p_reference_number is null or char_length(p_reference_number) < 1 or char_length(p_reference_number) > 200
     or p_session_id is null or char_length(p_session_id) < 1 or char_length(p_session_id) > 200
     or p_payment_id is null or char_length(p_payment_id) < 1 or char_length(p_payment_id) > 200
     or p_amount_minor is null or p_amount_minor <= 0
     or p_currency is null or upper(p_currency) <> 'PHP'
     or p_livemode is distinct from false then
    raise exception using errcode = '22023', message = 'invalid_paymongo_event';
  end if;

  insert into public.provider_events (provider, provider_event_id, processing_status)
  values ('paymongo', p_event_id, 'received')
  on conflict (provider, provider_event_id) do nothing
  returning id into v_inserted_event_id;

  if v_inserted_event_id is null then
    return jsonb_build_object('result', 'duplicate_event');
  end if;

  select * into v_order
  from public.orders
  where public_reference = p_reference_number
  for update;

  -- Roll back the provider-event insert so PayMongo can retry if order creation is delayed.
  if not found then
    raise exception using errcode = 'P0002', message = 'order_reference_not_found_retry';
  end if;

  if v_order.currency <> 'PHP' or v_order.total_minor <> p_amount_minor then
    update public.provider_events
    set processing_status = 'failed', processed_at = now(),
        error_code = 'amount_or_currency_mismatch'
    where id = v_inserted_event_id;
    return jsonb_build_object('result', 'rejected', 'reason', 'amount_or_currency_mismatch');
  end if;

  if v_order.order_status in ('cancelled', 'refunded') then
    update public.provider_events
    set processing_status = 'ignored', processed_at = now(),
        error_code = 'order_not_payable'
    where id = v_inserted_event_id;
    return jsonb_build_object('result', 'ignored', 'reason', 'order_not_payable');
  end if;

  select * into v_existing_session_payment
  from public.payments
  where provider = 'paymongo'
    and provider_checkout_session_id = p_session_id
  for update;

  if found and (
    v_existing_session_payment.order_id <> v_order.id
    or v_existing_session_payment.amount_minor <> p_amount_minor
    or (
      v_existing_session_payment.provider_payment_id is not null
      and v_existing_session_payment.provider_payment_id <> p_payment_id
    )
  ) then
    update public.provider_events
    set processing_status = 'failed', processed_at = now(),
        error_code = 'checkout_session_conflict'
    where id = v_inserted_event_id;
    return jsonb_build_object('result', 'rejected', 'reason', 'checkout_session_conflict');
  end if;

  select * into v_existing_payment
  from public.payments
  where provider = 'paymongo'
    and provider_payment_id = p_payment_id
  for update;

  if found then
    if v_existing_payment.order_id <> v_order.id
       or v_existing_payment.amount_minor <> p_amount_minor
       or (
         v_existing_payment.provider_checkout_session_id is not null
         and v_existing_payment.provider_checkout_session_id <> p_session_id
       ) then
      update public.provider_events
      set processing_status = 'failed', processed_at = now(),
          error_code = 'payment_id_conflict'
      where id = v_inserted_event_id;
      return jsonb_build_object('result', 'rejected', 'reason', 'payment_id_conflict');
    end if;

    update public.payments
    set provider_checkout_session_id = p_session_id
    where id = v_existing_payment.id
      and provider_checkout_session_id is null;
  else
    insert into public.payments (
      order_id, provider, provider_payment_id, provider_checkout_session_id,
      amount_minor, currency, status, paid_at
    )
    values (
      v_order.id, 'paymongo', p_payment_id, p_session_id,
      p_amount_minor, 'PHP', 'succeeded', now()
    );
  end if;

  if v_order.order_status <> 'paid'
     and v_order.order_status not in ('preparing', 'ready', 'fulfilled') then
    update public.orders
    set order_status = 'paid',
        paid_at = coalesce(paid_at, now()),
        updated_at = now()
    where id = v_order.id;

    insert into public.order_status_events (
      order_id, old_status, new_status, actor_type, note
    )
    values (
      v_order.id, v_order.order_status, 'paid', 'payment_webhook',
      'PayMongo checkout payment verified by signed webhook.'
    );
  end if;

  update public.provider_events
  set processing_status = 'processed', processed_at = now(), error_code = null
  where id = v_inserted_event_id;

  return jsonb_build_object('result', 'processed', 'orderReference', v_order.public_reference);
end;
$function$;

revoke all on function public.process_paymongo_checkout_paid(text,text,text,text,integer,text,boolean) from public, anon, authenticated;
grant execute on function public.process_paymongo_checkout_paid(text,text,text,text,integer,text,boolean) to service_role;
