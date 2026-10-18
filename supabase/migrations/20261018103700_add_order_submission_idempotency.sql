-- Date Compass staging: reserve an idempotency key for safe order-submit retries.
-- The future server endpoint must generate/validate this key and handle unique conflicts
-- by returning the original order, never by creating a second order.
alter table public.orders
  add column submission_key text;

alter table public.orders
  add constraint orders_submission_key_length
  check (submission_key is null or char_length(submission_key) between 16 and 128);

create unique index orders_submission_key_unique
  on public.orders (submission_key)
  where submission_key is not null;

comment on column public.orders.submission_key is
  'Server-validated idempotency key for order submission retries; never a customer-visible secret.';
