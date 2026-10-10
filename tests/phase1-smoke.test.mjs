import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [app, html, css] = await Promise.all([
  readFile(resolve(root, "js/app.js"), "utf8"),
  readFile(resolve(root, "index.html"), "utf8"),
  readFile(resolve(root, "css/style.css"), "utf8"),
]);

test("frontend JavaScript and linked assets exist", async () => {
  await access(resolve(root, "js/app.js"));
  await access(resolve(root, "css/style.css"));
  assert.match(html, /src="js\/app\.js\?v=20261010u"/);
  assert.match(html, /href="css\/style\.css\?v=20261010u"/);
});

test("hero stays unboxed and keeps both phone mockups and centered CTAs", () => {
  assert.ok(css.lastIndexOf("background:transparent!important") > css.lastIndexOf("background:linear-gradient"));
  assert.match(css, /\.hero2 \.cta\s*\{[^}]*display:inline-flex/s);
  assert.match(css, /\.hero2 \.cta\s*\{[^}]*align-items:center/s);
  assert.match(css, /\.hero2 \.cta\s*\{[^}]*justify-content:center/s);
  assert.match(app, /class="ph p1"/);
  assert.match(app, /class="ph p2"/);
  assert.match(css, /select\{box-sizing:border-box;width:100%;max-width:100%/);
});

test("planner food budget is capped by the remaining budget", () => {
  assert.match(app, /const remaining=Math\.max\(S\.b-\(S\.act\?S\.act\.c:0\),0\);return opts\(mode,\{p:S\.p,t:"a",s:S\.s\},remaining\)/);
  assert.match(app, /if\(k=="act"&&S\.food&&!fPool\(\)\.includes\(S\.food\)\)S\.food=null/);
  assert.match(app, /No food idea fits the remaining budget and preferences/);
});

test("missing question-card data cannot throw a ReferenceError", () => {
  assert.match(app, /typeof Q==="undefined"\|\|!Array\.isArray\(Q\)\|\|!Q\.length/);
  assert.match(app, /Question-card bank not configured/);
});

test("placeholder email and local-only ordering are represented honestly", () => {
  assert.match(app, /CONTACT_EMAIL==="your-email@example\.com"/);
  assert.match(app, /Email not configured/);
  assert.match(app, /does not submit an order, reserve a kit, or confirm fulfillment/);
  assert.match(app, /not a submitted or confirmed order/);
});

test("public static frontend does not rely on a hard-coded owner PIN", () => {
  assert.doesNotMatch(app, /const OWNER_PIN\s*=/);
  assert.match(app, /Owner tools are disabled/);
  assert.match(app, /secure owner authentication/);
});

test("placeholder recommendation count is not advertised as verified inventory", () => {
  assert.doesNotMatch(app, /1,000 wholesome date ideas/);
  assert.match(app, /Sample date ideas for Cagayan de Oro and Misamis Oriental/);
  assert.match(app, /not verified venue listings/);
  assert.match(app, /Sample voucher preview — not redeemable/);
});


test("background hearts and warm accent palette are configured", () => {
  assert.match(app, /const count=10\+Math\.floor\(Math\.random\(\)\*4\)/);
  assert.match(css, /--pri:#c5a665/);
  assert.match(css, /rgba\(255,226,154/);
});


test("homepage feature sections sit side by side on desktop and stack on mobile", () => {
  assert.match(app, /class="home-feature-pair"/);
  assert.match(css, /\.home-feature-pair\{[\s\S]*?grid-template-columns:minmax\(0,1fr\) minmax\(0,1fr\)/);
  assert.match(css, /@media\(max-width:899px\)\{[\s\S]*?\.home-feature-pair\{grid-template-columns:minmax\(0,1fr\)/);
  assert.match(css, /\.home-feature-pair>\.quick\.vibe-section \.quickgrid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
});
