import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [app, html, css, responsiveCss] = await Promise.all([
  readFile(resolve(root, "js/app.js"), "utf8"),
  readFile(resolve(root, "index.html"), "utf8"),
  readFile(resolve(root, "css/style.css"), "utf8"),
  readFile(resolve(root, "css/phone-fix.css"), "utf8"),
]);

test("frontend JavaScript and linked assets exist", async () => {
  await access(resolve(root, "js/app.js"));
  await access(resolve(root, "css/style.css"));
  await access(resolve(root, "css/phone-fix.css"));
  assert.ok(html.includes('src="js/app.js?v=20261014u"'));
  assert.ok(html.includes('href="css/style.css?v=20261014u"'));
  assert.ok(html.includes('href="css/phone-fix.css?v=20261014u"'));
  assert.ok(html.indexOf('href="css/style.css?') < html.indexOf('href="css/phone-fix.css?'), "Responsive overrides must load after the base stylesheet.");
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
  assert.ok(app.includes("const remaining=Math.max(S.b-(S.act?S.act.c:0),0),pref=base.filter(x=>foodMatchesMode(x,S.foodMode))"));
  assert.match(app, /if\(k=="act"&&S\.food&&!fPool\(\)\.includes\(S\.food\)\)S\.food=null/);
  assert.match(app, /No food idea matches this food style within the remaining budget/);
});

test("missing question-card data cannot throw a ReferenceError", () => {
  assert.match(app, /typeof Q==="undefined"\|\|!Array\.isArray\(Q\)\|\|!Q\.length/);
  assert.match(app, /const Q=\[/);
  assert.match(app, /10 randomly selected date question cards/);
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


test("homepage feature panels wait for a user scroll before revealing on initial visit", () => {
  assert.match(app, /Keep homepage feature panels hidden on the initial page load/);
  assert.ok(app.includes("homeFeature&&window.scrollY<=40"));
  assert.ok(app.includes("if(y>40){document.querySelectorAll"));
  assert.ok(app.includes('rootMargin:"0px 0px -12% 0px"'));
  assert.ok(app.includes("if(!pairedFeature)IO.observe(el)"), "The initial observer must not reveal either homepage feature panel.");
  assert.ok(app.includes('t.classList.add("in");if(IO)IO.unobserve(t)'), "Scroll-triggered reveal must stop observing the panel after it appears.");
});

test("homepage feature sections keep the intended desktop and mobile layout rules", () => {
  assert.match(app, /class="home-feature-pair"/);
  assert.ok(css.includes("User-requested desktop arrangement: keep How It Works on the left and place Start with a Vibe below it on the right."));
  assert.ok(css.includes("flex-direction: column !important"));
  assert.ok(css.includes("align-self: flex-start !important"));
  assert.ok(css.includes("align-self: flex-end !important"));
  assert.ok(css.includes("@media (max-width: 899px)"));
  assert.ok(css.includes("@media (min-width: 900px)"));
});

test("every advertised planner category has an activity classification and free ideas keep their real category", () => {
  assert.equal(app.split("A.forEach(x=>x.cat=category(x));").length - 1, 1, "Classify activity records once after all additions.");
  assert.ok(app.includes('{n:"Mobile Legends duo game night at home",c:0'));
  assert.ok(app.includes('return "games";'));
  assert.ok(app.includes('f.cat=="free"?x.c<=150:x.cat==f.cat'));
  assert.ok(app.includes('if(x.c<=150)return "free";'));
  assert.match(app, /No activity matches this category and budget with the selected preferences/);
});

test("all food-style controls have explicit matching logic and fallback stays budget-limited", () => {
  for (const mode of ["home", "out", "breakfast", "cafe", "street", "takeout", "healthy", "special"]) {
    assert.match(app, new RegExp('mode=="' + mode + '"'));
  }
  assert.match(app, /const found=opts\(pref,\{p:S\.p,t:"a",s:S\.s\},remaining\)/);
  assert.match(app, /return opts\(pref,\{p:"a",t:"a",s:"a"\},remaining\)/);
});

test("having a car does not incorrectly restrict results to car-required activities", () => {
  assert.match(app, /Prefer room for food, but never silently replace the user\x27s chosen category/);
  assert.match(app, /const cap=Math\.max\(S\.b-150,0\),strict=opts\(A,S,cap\)/);
  assert.doesNotMatch(app, /if\(S\.car=="y"\)\{const car=r\.filter\(x=>x\.r\)/);
});


test("planner runs every area, transport, category, duration, setting, and food-style choice without blank activities or over-budget food", () => {
  const elements = {
    app: { className: "", innerHTML: "", offsetWidth: 0, classList: { add() {}, remove() {} } },
    yr: { textContent: "" },
  };
  const document = {
    getElementById(id) { return elements[id] || (elements[id] = { textContent: "", innerHTML: "", classList: { add() {}, remove() {} }, style: { setProperty() {} } }); },
    querySelectorAll() { return []; },
    addEventListener() {},
    createElement() { return { style: { setProperty() {} }, classList: { add() {}, remove() {} }, setAttribute() {}, appendChild() {}, replaceChildren() {} }; },
  };
  const context = {
    document,
    location: { hostname: "", pathname: "/", hash: "" },
    history: { pushState() {}, replaceState() {} },
    localStorage: { getItem() { return null; }, setItem() {} },
    matchMedia() { return { matches: true }; },
    addEventListener() {},
    scrollTo() {},
    window: {},
    console,
    Math,
    Date,
    setTimeout() {},
    navigator: {},
  };
  vm.createContext(context);
  vm.runInContext(app, context, { timeout: 5000 });
  const result = vm.runInContext(`(() => {
    const budgets = [300, 800, 1500, 5000];
    const areas = ["c", "m", "a"];
    const cars = ["a", "y", "n"];
    const durations = ["a", "s", "l", "n"];
    const settings = ["a", "i", "o"];
    const categories = Object.keys(CH.cat);
    const foodModes = Object.keys(CH.foodMode);
    let combinations = 0, noActivity = 0, overBudgetFood = 0, wrongCategory = 0, wrongFoodStyle = 0;
    for (const budget of budgets) for (const area of areas) for (const car of cars)
      for (const duration of durations) for (const setting of settings)
      for (const category of categories) for (const foodMode of foodModes) {
        S.b = budget; S.p = area; S.car = car; S.t = duration; S.s = setting;
        S.cat = category; S.foodMode = foodMode; S.act = null; S.food = null;
        const activities = aPool();
        combinations++;
        if (!activities.length) { noActivity++; continue; }
        if (category !== "a" && activities.some(activity => activity.cat !== category && !(category === "free" && activity.c <= 150))) wrongCategory++;
        S.act = activities[0];
        const foods = fPool();
        if (foods.some(food => food.c > Math.max(S.b - S.act.c, 0))) overBudgetFood++;
        if (foodMode !== "a" && foods.some(food => !foodMatchesMode(food, foodMode))) wrongFoodStyle++;
      }
    const gameDates = A.filter(activity => /Mobile Legends|co-op mobile game|internet-cafe gaming|Online game discovery|Co-op PC game/i.test(activity.n));
    const gameDatesWrongCategory = gameDates.filter(activity => activity.cat !== "games").map(activity => ({ name: activity.n, category: activity.cat }));
    return { combinations, noActivity, overBudgetFood, wrongCategory, wrongFoodStyle, gameDatesWrongCategory, activityCount: A.length, foodCount: F.length };
  })()`, context, { timeout: 30000 });
  assert.ok(result.combinations > 5000, `Expected broad choice coverage, got ${result.combinations}`);
  assert.equal(result.wrongCategory, 0, `Planner ignored the selected activity category: ${JSON.stringify(result)}`);
  assert.equal(result.overBudgetFood, 0, `Food suggestions exceeded remaining budget: ${JSON.stringify(result)}`);
  assert.equal(result.wrongFoodStyle, 0, `Planner ignored the selected food style: ${JSON.stringify(result)}`);
  assert.equal(result.gameDatesWrongCategory.length, 0, `Gaming date was categorized incorrectly: ${JSON.stringify(result.gameDatesWrongCategory)}`);
  assert.ok(result.noActivity > 0, "Impossible category/budget combinations should explain that no match exists instead of showing an unrelated category.");
});


test("navigation CSS has one canonical hover treatment and no obsolete duplicate override", () => {
  assert.doesNotMatch(css, /Navigation: remove the outlined active-pill treatment/);
  assert.match(css, /One consistent navigation treatment on every view/);
  assert.match(css, /header\.site \.hin > nav a:hover[\s\S]*?background: #ffe29a !important/);
});

test("budget changes refresh the plan after editing, and navigation keeps keyboard focus visible", () => {
  assert.match(app, /oninput="setBudget\(this\.value\)" onchange="render\(\)"/);
  assert.match(css, /\.site nav a:focus-visible,[\s\S]*?outline: 3px solid #2a0509 !important/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.site nav a:hover[\s\S]*?transition: none !important/);
});


test("mobile navigation and footer stay single-row and hero phones cannot cover How It Works", () => {
  assert.match(css, /Mobile responsive correction: keep nav links on one swipeable row/);
  assert.match(css, /\.site nav\s*\{[^}]*flex-wrap:\s*nowrap !important/s);
  assert.match(css, /footer\.site \.fin nav\s*\{[^}]*overflow-x:\s*auto !important/s);
  assert.match(css, /\.hero2\s*\{[^}]*overflow:\s*hidden !important/s);
  assert.match(css, /\.phones\s*\{[^}]*height:\s*312px !important/s);
  assert.match(css, /main\.wide \.home-feature-pair > \.hiw\.romance-section \{ grid-template-columns: minmax\(0, 1fr\) !important; \}/);
  assert.ok(html.includes('href="css/style.css?v=20261014u"'));
});


test("responsive override stylesheet centers navigation and protects phone previews", () => {
  assert.match(responsiveCss, /@media \(min-width: 1000px\)[\s\S]*?header\.site \.hin \{[\s\S]*?justify-content: space-between !important;[\s\S]*?header\.site \.hin > nav \{[\s\S]*?justify-content: flex-end !important/);
  assert.match(responsiveCss, /@media \(max-width: 640px\)[\s\S]*?header\.site \.hin > nav[\s\S]*?justify-content: center !important/);
  assert.match(responsiveCss, /\.hero2 \.phones > \.ph[\s\S]*?height: clamp\(350px, 57vw, 420px\) !important/);
  assert.match(responsiveCss, /@media \(max-width: 380px\)[\s\S]*?\.hero2 \.phones > \.ph[\s\S]*?height: 350px !important/);
  assert.match(responsiveCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.hero2 \.phones > \.ph \{ transform: none !important; \}/);
});


test("contact page includes the requested fields and clearly reports send limitations", () => {
  assert.match(app, /Full Name/);
  assert.match(app, /Email Address/);
  assert.match(app, /Mobile Number/);
  assert.match(app, /What do you need help with\?/);
  assert.match(app, /Send Message/);
  assert.match(app, /function sendContact\(event\)/);
  assert.match(app, /has not been sent/);
  assert.match(css, /\.contact-form/);
});


test("homepage How It Works and Vibe panels use opaque, readable surfaces", () => {
  assert.match(css, /#app \.home-feature-pair > \.hiw\.romance-section,[\s\S]*?#app \.home-feature-pair > \.quick\.vibe-section \{[\s\S]*?background: var\(--card\) !important;[\s\S]*?opacity: 1 !important;/);
  assert.match(css, /backdrop-filter: none !important/);
});

test("local activity descriptions include practical verification and safety guidance", () => {
  assert.match(app, /confirm the museum’s current opening hours, admission fee, and visitor arrangements/);
  assert.match(app, /Avoid rooftops and any place without secure, approved access/);
  assert.match(app, /confirm which facilities and activities are currently operating/);
  assert.match(app, /sample amount is not a current travel quote/);
  assert.doesNotMatch(app, /safe rooftop/);
});
