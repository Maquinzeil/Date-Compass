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
