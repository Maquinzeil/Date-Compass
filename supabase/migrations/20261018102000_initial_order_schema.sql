-- Date Compass staging: initial private order schema.
-- No public/anon/authenticated access is granted. Server-side functions must authorize
-- requests before using the service role. Do not store real customer data in staging.

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  customer_name text not null check (char_length(trim(customer_name)) between 1 and 160),
  customer_email text not null check (char_length(trim(customer_email)) between 3 and 320),
  customer_mobile text,
  planned_date date,
  plan_snapshot jsonb not null default '{}'::jsonb,
  kit_requested boolean not null default false,
  kit_question_snapshot jsonb not null default '[]'::jsonb,
  currency text not null default 'PHP' check (currency = 'PHP'),
  subtotal_minor integer not null check (subtotal_minor >= 0),
  total_minor integer not null check (total_minor >= 0),
  order_status text not null default 'submitted'
    check (order_status in ('submitted','awaiting_payment','paid','preparing','ready','fulfilled','cancelled','refunded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz,
  fulfilled_at timestamptz
);

create index orders_created_at_idx on public.orders (created_at desc);
create index orders_status_created_idx on public.orders (order_status, created_at desc);
create index orders_customer_email_idx on public.orders (lower(customer_email));

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  item_type text not null check (item_type in ('digital_plan','physical_kit','other')),
  title_snapshot text not null check (char_length(trim(title_snapshot)) between 1 and 200),
  quantity integer not null default 1 check (quantity > 0),
  unit_amount_minor integer not null check (unit_amount_minor >= 0),
  line_total_minor integer not null check (line_total_minor >= 0),
  created_at timestamptz not null default now()
);

create index order_items_order_id_idx on public.order_items (order_id);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  provider text not null check (provider in ('paymongo','maya','xendit','manual_test')),
  provider_payment_id text,
  amount_minor integer not null check (amount_minor > 0),
  currency text not null default 'PHP' check (currency = 'PHP'),
  status text not null default 'pending'
    check (status in ('pending','succeeded','failed','cancelled','refunded')),
  idempotency_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz
);

create unique index payments_provider_payment_unique
  on public.payments (provider, provider_payment_id)
  where provider_payment_id is not null;
create unique index payments_idempotency_unique
  on public.payments (provider, idempotency_key)
  where idempotency_key is not null;
create index payments_order_id_idx on public.payments (order_id);

create table public.provider_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('paymongo','maya','xendit')),
  provider_event_id text not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  processing_status text not null default 'received'
    check (processing_status in ('received','processed','ignored','failed')),
  error_code text,
  unique (provider, provider_event_id)
);

create table public.order_status_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  old_status text,
  new_status text not null
    check (new_status in ('submitted','awaiting_payment','paid','preparing','ready','fulfilled','cancelled','refunded')),
  actor_type text not null check (actor_type in ('system','admin','payment_webhook')),
  actor_id uuid,
  created_at timestamptz not null default now(),
  note text
);

create index order_status_events_order_created_idx
  on public.order_status_events (order_id, created_at desc);

create table public.question_cards (
  id uuid primary key default gen_random_uuid(),
  prompt text not null unique check (char_length(trim(prompt)) between 1 and 1000),
  active boolean not null default true,
  category text,
  version integer not null default 1 check (version > 0),
  created_at timestamptz not null default now()
);

create table public.email_deliveries (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  email_type text not null check (email_type in ('order_confirmation','paid_date_plan','fulfillment_update','admin_print_pack')),
  recipient_email text not null check (char_length(trim(recipient_email)) between 3 and 320),
  provider text not null default 'resend',
  provider_message_id text,
  status text not null default 'queued'
    check (status in ('queued','sent','delivered','bounced','failed')),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  last_error_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  sent_at timestamptz
);

create index email_deliveries_order_created_idx
  on public.email_deliveries (order_id, created_at desc);
create unique index email_deliveries_provider_message_unique
  on public.email_deliveries (provider, provider_message_id)
  where provider_message_id is not null;

-- Keep timestamps current on mutable operational records.
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create trigger payments_set_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

create trigger email_deliveries_set_updated_at
before update on public.email_deliveries
for each row execute function public.set_updated_at();

-- Defense in depth: no browser role can read or mutate order/customer/payment data.
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.provider_events enable row level security;
alter table public.order_status_events enable row level security;
alter table public.question_cards enable row level security;
alter table public.email_deliveries enable row level security;

revoke all on table
  public.orders,
  public.order_items,
  public.payments,
  public.provider_events,
  public.order_status_events,
  public.question_cards,
  public.email_deliveries
from anon, authenticated;

revoke all on function public.set_updated_at() from public, anon, authenticated;
grant execute on function public.set_updated_at() to service_role;
