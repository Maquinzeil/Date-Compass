-- Date Compass staging: server-owned catalog for paid products.
-- Prices are deliberately unset until the owner approves them. An unconfigured
-- product cannot be sold; do not fall back to amounts supplied by the browser.

create table public.product_catalog (
  product_code text primary key
    check (product_code in ('digital_plan', 'physical_kit')),
  title text not null
    check (char_length(trim(title)) between 1 and 200),
  price_minor integer,
  currency text not null default 'PHP' check (currency = 'PHP'),
  active boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint product_catalog_price_positive_when_active
    check (not active or (price_minor is not null and price_minor > 0)),
  constraint product_catalog_price_nonnegative
    check (price_minor is null or price_minor >= 0)
);

insert into public.product_catalog (product_code, title, price_minor, currency, active)
values
  ('digital_plan', 'Digital Date Plan', null, 'PHP', false),
  ('physical_kit', 'Physical Date Kit', null, 'PHP', false);

alter table public.product_catalog enable row level security;
revoke all on table public.product_catalog from anon, authenticated;

comment on table public.product_catalog is
  'Server-owned product pricing. Prices must be explicitly configured and products activated by the owner before order creation; browser totals are never authoritative.';
