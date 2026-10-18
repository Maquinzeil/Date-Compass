-- Private fixed-window rate limiting for order intake. No browser role can read or write this table.
create table public.order_intake_rate_limits (
  key_hash text primary key check (key_hash ~ '^[0-9a-f]{64}$'),
  window_started_at timestamptz not null,
  request_count integer not null check (request_count >= 0),
  updated_at timestamptz not null default now()
);
alter table public.order_intake_rate_limits enable row level security;
revoke all on table public.order_intake_rate_limits from public, anon, authenticated;

create or replace function public.consume_order_intake_rate_limit(
  p_key_hash text,
  p_window_seconds integer default 900,
  p_max_requests integer default 10
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_now timestamptz := now();
  v_started timestamptz;
  v_count integer;
begin
  if p_key_hash is null or p_key_hash !~ '^[0-9a-f]{64}$'
     or p_window_seconds < 60 or p_window_seconds > 3600
     or p_max_requests < 1 or p_max_requests > 100 then
    raise exception using errcode = '22023', message = 'invalid_rate_limit_parameters';
  end if;

  insert into public.order_intake_rate_limits (key_hash, window_started_at, request_count, updated_at)
  values (p_key_hash, v_now, 1, v_now)
  on conflict (key_hash) do update
    set window_started_at = case
          when public.order_intake_rate_limits.window_started_at <= v_now - make_interval(secs => p_window_seconds)
          then v_now else public.order_intake_rate_limits.window_started_at end,
        request_count = case
          when public.order_intake_rate_limits.window_started_at <= v_now - make_interval(secs => p_window_seconds)
          then 1 else public.order_intake_rate_limits.request_count + 1 end,
        updated_at = v_now
  returning window_started_at, request_count into v_started, v_count;

  return v_count <= p_max_requests;
end;
$$;
revoke all on function public.consume_order_intake_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_order_intake_rate_limit(text, integer, integer) to service_role;
