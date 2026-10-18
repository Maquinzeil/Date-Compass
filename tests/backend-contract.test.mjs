import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("order intake stays fail-closed and cannot be enabled into live processing accidentally", async () => {
  const source = await readFile(resolve(root, "supabase/functions/order-intake/index.ts"), "utf8");
  assert.match(source, /DATE_COMPASS_ORDER_INTAKE_ENABLED.*!== "true"/);
  assert.match(source, /order_intake_disabled/);
  assert.match(source, /order_intake_disabled/);
  assert.match(source, /DATE_COMPASS_ORDER_INTAKE_ENABLED.*!== "true"/);
  assert.match(source, /create_order_transaction/);
  assert.match(source, /paymentConfigured: false/);
  assert.doesNotMatch(source, /createCheckoutSession|paymentIntent|providerSecret/i);
});

test("order intake validates customer and plan fields without trusting browser totals", async () => {
  const source = await readFile(resolve(root, "supabase/functions/order-intake/index.ts"), "utf8");
  assert.match(source, /customerName/);
  assert.match(source, /customerEmail/);
  assert.match(source, /plannedDate/);
  assert.match(source, /planSnapshot/);
  assert.match(source, /kitRequested/);
  assert.match(source, /validateDraft/);
  assert.doesNotMatch(source, /value\.total|value\.price|value\.amount/);
});

test("the existing static frontend remains disconnected from backend order intake", async () => {
  const html = await readFile(resolve(root, "index.html"), "utf8");
  const app = await readFile(resolve(root, "js/app.js"), "utf8");
  assert.doesNotMatch(html + app, /supabase\.co|createClient\(|order-intake/);
});

test("staging schema keeps operational tables private and payment retries deduplicated", async () => {
  const sql = await readFile(resolve(root, "supabase/migrations/20261018102240_initial_order_schema.sql"), "utf8");
  const names = ["orders", "order_items", "payments", "provider_events", "order_status_events", "question_cards", "email_deliveries"];
  for (const name of names) {
    assert.ok(sql.includes(`create table public.${name} (`), `missing table ${name}`);
    assert.ok(sql.includes(`alter table public.${name} enable row level security;`), `RLS missing for ${name}`);
  }
  assert.ok(sql.includes("from anon, authenticated;"), "browser roles must not receive table access");
  assert.ok(sql.includes("payments_provider_payment_unique"), "provider payment IDs must be unique");
  assert.ok(sql.includes("payments_idempotency_unique"), "payment idempotency keys must be unique");
  assert.ok(sql.includes("unique (provider, provider_event_id)"), "webhook event retries must be deduplicated");
  assert.ok(sql.includes("currency = 'PHP'"), "initial currency must be constrained to PHP");
  assert.ok(!sql.toLowerCase().includes("create policy"), "no public access policy should be added yet");
});

test("order submissions have a database uniqueness guard for safe retries", async () => {
  const sql = await readFile(resolve(root, "supabase/migrations/20261018103700_add_order_submission_idempotency.sql"), "utf8");
  assert.match(sql, /add column submission_key text/i);
  assert.match(sql, /char_length\(submission_key\) between 16 and 128/i);
  assert.match(sql, /create unique index orders_submission_key_unique/i);
  assert.match(sql, /where submission_key is not null/i);
});


test("server-owned product catalog requires explicit prices and keeps both paid products inactive by default", async () => {
  const sql = await readFile(resolve(root, "supabase/migrations/20261019100000_add_server_owned_product_catalog.sql"), "utf8");
  assert.match(sql, /create table public\.product_catalog/i);
  assert.match(sql, /'digital_plan'/);
  assert.match(sql, /'physical_kit'/);
  assert.match(sql, /price_minor integer/);
  assert.match(sql, /not active or \(price_minor is not null and price_minor > 0\)/i);
  assert.match(sql, /'Digital Date Plan', null, 'PHP', false/);
  assert.match(sql, /'Physical Date Kit', null, 'PHP', false/);
  assert.match(sql, /enable row level security/i);
  assert.match(sql, /revoke all on table public\.product_catalog from anon, authenticated/i);
  assert.doesNotMatch(sql, /create policy/i);
});


test("atomic order creation prices products only from the server catalog and is private", async () => {
  const sql = await readFile(resolve(root, "supabase/migrations/20261019113000_add_atomic_server_order_creation.sql"), "utf8");
  assert.match(sql, /create or replace function public\.create_order_transaction/i);
  assert.match(sql, /security invoker/i);
  assert.match(sql, /set search_path = ''/i);
  assert.match(sql, /from public\.product_catalog/i);
  assert.match(sql, /product_code = 'digital_plan' and active = true/i);
  assert.match(sql, /product_code = 'physical_kit' and active = true/i);
  assert.match(sql, /submission_key_payload_mismatch/i);
  assert.match(sql, /on conflict \(submission_key\) do nothing/i);
  assert.match(sql, /insert into public\.order_items/i);
  assert.match(sql, /insert into public\.order_status_events/i);
  assert.match(sql, /revoke all on function public\.create_order_transaction\(text, text, jsonb\) from public, anon, authenticated/i);
  assert.match(sql, /grant execute on function public\.create_order_transaction\(text, text, jsonb\) to service_role/i);
  assert.doesNotMatch(sql, /grant execute[^;]*to anon|grant execute[^;]*to authenticated/i);
});

test("order intake uses server RPC, validates idempotency, and stays gated without payment integration", async () => {
  const source = await readFile(resolve(root, "supabase/functions/order-intake/index.ts"), "utf8");
  assert.match(source, /X-Submission-Key/);
  assert.match(source, /crypto\.subtle\.digest\("SHA-256"/);
  assert.match(source, /supabase\.rpc\("create_order_transaction"/);
  assert.match(source, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(source, /origin_not_allowed/);
  assert.match(source, /paymentRequired: true/);
  assert.match(source, /paymentConfigured: false/);
  assert.doesNotMatch(source, /value\.total|value\.price|value\.amount/);
  assert.doesNotMatch(source, /checkoutSession|paymentIntent|PAYMONGO_SECRET/i);
});
