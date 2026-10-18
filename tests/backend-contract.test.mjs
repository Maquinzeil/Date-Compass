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
  assert.match(source, /order_intake_not_implemented/);
  assert.match(source, /return json\(501,/);
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
