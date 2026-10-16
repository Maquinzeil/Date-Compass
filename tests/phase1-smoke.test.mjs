import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [app, html, css, responsiveCss, venueData] = await Promise.all([
  readFile(resolve(root, "js/app.js"), "utf8"),
  readFile(resolve(root, "index.html"), "utf8"),
  readFile(resolve(root, "css/style.css"), "utf8"),
  readFile(resolve(root, "css/phone-fix.css"), "utf8"),
  readFile(resolve(root, "js/venue-data.js"), "utf8"),
]);

test("a page refresh disables browser scroll restoration and returns to the top", () => {
  assert.ok(html.includes('const isPageRefresh = navigationEntry?.type === "reload";'));
  assert.ok(html.includes('if (isPageRefresh && "scrollRestoration" in history) history.scrollRestoration = "manual";'));
  assert.ok(html.includes('if (!isPageRefresh) return;'));
  assert.ok(html.includes('window.scrollTo(0, 0);'));
  assert.ok(html.includes('requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, 0)))'));
  assert.ok(!html.includes('history.scrollRestoration = "auto";'));
});

test("frontend JavaScript and linked assets exist", async () => {
  await access(resolve(root, "js/app.js"));
  await access(resolve(root, "js/venue-data.js"));
  await access(resolve(root, "css/style.css"));
  await access(resolve(root, "css/phone-fix.css"));
  assert.ok(html.includes('src="js/venue-data.js?v=20261016c"'));
  assert.ok(html.includes('src="js/app.js?v=20261016h"'));
  assert.ok(html.indexOf("js/venue-data.js") < html.indexOf("js/app.js"), "Venue data must load before the planner.");
  assert.ok(html.includes('href="css/style.css?v=20261015g"'));
  assert.ok(html.includes('href="css/phone-fix.css?v=20261015e"'));
  assert.ok(html.indexOf('href="css/style.css?') < html.indexOf('href="css/phone-fix.css?'), "Responsive overrides must load after the base stylesheet.");
});

test("hero stays unboxed and keeps both phone mockups and centered CTAs", () => {
  assert.ok(css.includes("background:transparent!important"), "The hero background override must remain present.");
  assert.match(css, /\.hero2 \.cta\s*\{[^}]*display:inline-flex/s);
  assert.match(css, /\.hero2 \.cta\s*\{[^}]*align-items:center/s);
  assert.match(css, /\.hero2 \.cta\s*\{[^}]*justify-content:center/s);
  assert.match(app, /class="ph p1"/);
  assert.match(app, /class="ph p2"/);
  assert.match(css, /select\{box-sizing:border-box;width:100%;max-width:100%/);
});

test("getting the kit validates required budget and plan choices instead of redirecting home", () => {
  assert.match(app, /function clearKitValidation\(\)/);
  assert.match(app, /Please complete the required sections before getting your kit/);
  assert.match(app, /Please choose an activity in the Activity section before getting your kit/);
  assert.match(app, /Please choose a food option in the Food section before getting your kit/);
  assert.match(app, /function startKit\(\)\{\s*if\(S\.view==="custom"\)/);
  assert.match(app, /function setBudget\(v\)\{\s*clearKitValidation\(\)/);
  assert.match(app, /function pick\(k,i\)\{clearKitValidation\(\)/);
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
  assert.match(app, /const CONTACT_EMAIL="[^"]+"/);
  assert.doesNotMatch(app, /const CONTACT_EMAIL="your-email@example\.com"/);
  assert.match(app, /Email not configured/);
  assert.match(app, /does not submit or confirm a purchase/);
  assert.match(app, /does not prove an order was received/);
});

test("date kit removes demo names and voucher placeholders while preserving customer notes", () => {
  assert.match(app, /const legacyDemo=\/\\b\(jasper\|aya\)\\b\/i/);
  assert.match(app, /localStorage\.removeItem\("dateCompassOrder"\)/);
  assert.doesNotMatch(app, /esc\(o\.partner\)\|\|"Your partner"/);
  assert.doesNotMatch(app, /esc\(o\.name\)\|\|"Your name"/);
  assert.doesNotMatch(app, /Partner: \[Partner name not configured\]|Offer: \[Voucher terms not configured\]/);
  assert.match(app, /PERSONALIZATION \/ NOTES\\n"\+\(o\.note\|\|"None"\)/);
  assert.match(app, /id="onote"/);
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
  assert.doesNotMatch(app, /Sample voucher preview — not redeemable|Partner: \[Partner name not configured\]|Offer: \[Voucher terms not configured\]/);
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
  assert.match(app, /return opts\(pref,\{p:S\.p,t:"a",s:"a"\},remaining\)/);
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
  vm.runInContext(venueData, context, { timeout: 5000 });
  vm.runInContext(app, context, { timeout: 5000 });
  const result = vm.runInContext(`(() => {
    const budgets = [300, 800, 1500, 5000];
    const areas = ["c", "m", "a"];
    const cars = ["a", "y", "n"];
    const durations = ["a", "s", "l", "n"];
    const settings = ["a", "i", "o"];
    const categories = Object.keys(CH.cat);
    const foodModes = Object.keys(CH.foodMode);
    let combinations = 0, noActivity = 0, overBudgetFood = 0, wrongCategory = 0, wrongFoodStyle = 0, wrongActivityArea = 0, wrongFoodArea = 0, activityPreferenceRelaxations = 0, foodSettingRelaxations = 0;
    for (const budget of budgets) for (const area of areas) for (const car of cars)
      for (const duration of durations) for (const setting of settings)
      for (const category of categories) for (const foodMode of foodModes) {
        S.b = budget; S.p = area; S.car = car; S.t = duration; S.s = setting;
        S.cat = category; S.foodMode = foodMode; S.act = null; S.food = null;
        const activities = aPool();
        combinations++;
        if (!activities.length) { noActivity++; continue; }
        const strictActivities = A.filter(activity => ok(activity, S) && activity.c <= Math.max(S.b - 150, 0));
        if (strictActivities.length && activities.some(activity => !strictActivities.includes(activity))) activityPreferenceRelaxations++;
        if (area !== "a" && activities.some(activity => activity.p && activity.p !== "a" && activity.p !== area)) wrongActivityArea++;
        if (category !== "a" && activities.some(activity => activity.cat !== category && !(category === "free" && activity.c <= 150))) wrongCategory++;
        S.act = activities[0];
        const foods = fPool();
        if (foods.some(food => food.c > Math.max(S.b - S.act.c, 0))) overBudgetFood++;
        const foodCap = Math.max(S.b - S.act.c, 0);
        const foodBase = S.act && S.act.t === "n" ? F.filter(food => food && food.k) : F.filter(food => food && (!food.k || food.k === 2));
        const strictFoods = foodBase.filter(food => foodMatchesMode(food, S.foodMode) && ok(food, { p: S.p, t: "a", s: S.s }) && food.c <= foodCap);
        if (strictFoods.length && foods.some(food => !strictFoods.includes(food))) foodSettingRelaxations++;
        if (area !== "a" && foods.some(food => food.p && food.p !== "a" && food.p !== area)) wrongFoodArea++;
        if (foodMode !== "a" && foods.some(food => !foodMatchesMode(food, foodMode))) wrongFoodStyle++;
      }
    const gameDates = A.filter(activity => /Mobile Legends|co-op mobile game|internet-cafe gaming|Online game discovery|Co-op PC game|Board game night at home|DIY couples board game|Make-your-own trivia board game|DIY memory-matching card game|Homemade mini-bowling game|DIY paper-airplane target game|Indoor scavenger-hunt game|DIY cup-stacking challenge game|Cardboard marble-maze game|DIY indoor mini-golf game|Sock-basketball game at home|DIY mystery-envelope challenge game|Cooperative story-building game|Couples trivia: how well do you know me\?|Guess the memory couples game|20 Questions mystery guessing game|No-equipment charades game|Puzzle battle|Word-association speed game|Cooperative category-chain game|Co-op puzzle hunt/i.test(activity.n));
    const gameDatesWrongCategory = gameDates.filter(activity => activity.cat !== "games").map(activity => ({ name: activity.n, category: activity.cat }));
    const gameDatesNotIndoor = gameDates.filter(activity => activity.s !== "i").map(activity => ({ name: activity.n, setting: activity.s }));
    const gameDatesNotShort = gameDates.filter(activity => activity.t !== "s").map(activity => ({ name: activity.n, duration: activity.t }));
    const sourceBackedFoods = F.filter(food => food.sourceUrl);
    const rafting = A.find(activity => activity.n === "White water rafting on the Cagayan River");
    return { combinations, noActivity, overBudgetFood, wrongCategory, wrongFoodStyle, wrongActivityArea, wrongFoodArea, activityPreferenceRelaxations, foodSettingRelaxations, gameDatesWrongCategory, gameDatesNotIndoor, gameDatesNotShort, activityCount: A.length, foodCount: F.length, sourceBackedFoodCount: sourceBackedFoods.length, raftingBudget: rafting && rafting.c, sourcePanelHasLink: priceEvidenceHtml(sourceBackedFoods[0]).includes("href="), allSourceDatesRecorded: sourceBackedFoods.every(food => /^202[0-9]-[0-9]{2}-[0-9]{2}$/.test(food.checkedOn || "") && food.checkedOn <= window.DATE_COMPASS_VERIFIED_DATA.checkedOn) };
  })()`, context, { timeout: 30000 });
  assert.ok(result.combinations > 5000, `Expected broad choice coverage, got ${result.combinations}`);
  assert.equal(result.wrongCategory, 0, `Planner ignored the selected activity category: ${JSON.stringify(result)}`);
  assert.equal(result.overBudgetFood, 0, `Food suggestions exceeded remaining budget: ${JSON.stringify(result)}`);
  assert.equal(result.wrongFoodStyle, 0, `Planner ignored the selected food style: ${JSON.stringify(result)}`);
  assert.equal(result.wrongActivityArea, 0, `Planner returned an explicitly out-of-area activity: ${JSON.stringify(result)}`);
  assert.equal(result.wrongFoodArea, 0, `Planner returned an explicitly out-of-area food venue: ${JSON.stringify(result)}`);
  assert.equal(result.activityPreferenceRelaxations, 0, `Planner relaxed activity filters despite strict matches being available: ${JSON.stringify(result)}`);
  assert.equal(result.foodSettingRelaxations, 0, `Planner relaxed the food setting despite strict matches being available: ${JSON.stringify(result)}`);
  assert.equal(result.gameDatesWrongCategory.length, 0, `Gaming date was categorized incorrectly: ${JSON.stringify(result.gameDatesWrongCategory)}`);
  assert.equal(result.gameDatesNotIndoor.length, 0, `Game activities must remain available under the indoor filter: ${JSON.stringify(result.gameDatesNotIndoor)}`);
  assert.equal(result.gameDatesNotShort.length, 0, `Short game activities must remain selectable for a two-hour date: ${JSON.stringify(result.gameDatesNotShort)}`);
  for (const name of ["Board game night at home","DIY couples board game from paper and markers","Make-your-own trivia board game","DIY memory-matching card game","Homemade mini-bowling game","DIY paper-airplane target game","Indoor scavenger-hunt game for two","DIY cup-stacking challenge game","Cardboard marble-maze game","DIY indoor mini-golf game","Sock-basketball game at home","DIY mystery-envelope challenge game"]) {
    assert.ok(app.includes(JSON.stringify(name)), `Missing indoor games idea: ${name}`);
  }
  assert.ok(result.activityCount >= 250, `Expected the added indoor games to expand the planner, got ${result.activityCount} activities.`);
  assert.equal(result.sourceBackedFoodCount, 32, "All 32 source-backed food options should be loaded into the planner.");
  assert.equal(result.raftingBudget, 2800, "Rafting should use the source-backed two-person estimate plus buffer.");
  assert.equal(result.sourcePanelHasLink, true, "Source-backed options must display a source link.");
  assert.equal(result.allSourceDatesRecorded, true, "Source-backed prices must record a check date.");
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
  assert.ok(html.includes('href="css/style.css?v=20261015g"'));
});


test("responsive override stylesheet centers navigation and protects phone previews", () => {
  assert.match(responsiveCss, /@media \(min-width: 1000px\)[\s\S]*?header\.site \.hin \{[\s\S]*?justify-content: space-between !important;[\s\S]*?header\.site \.hin > nav \{[\s\S]*?justify-content: flex-end !important/);
  assert.match(responsiveCss, /@media \(max-width: 640px\)[\s\S]*?header\.site \.hin > nav[\s\S]*?justify-content: center !important/);
  assert.match(responsiveCss, /\.hero2 \.phones > \.ph[\s\S]*?height: clamp\(350px, 57vw, 420px\) !important/);
  assert.match(responsiveCss, /@media \(max-width: 380px\)[\s\S]*?\.hero2 \.phones > \.ph[\s\S]*?height: 350px !important/);
  assert.match(responsiveCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.hero2 \.phones > \.ph \{ transform: none !important; \}/);
});


test("contact page includes the requested fields and clear submission status", () => {
  assert.match(app, /Full Name/);
  assert.match(app, /Email Address/);
  assert.match(app, /Mobile Number/);
  assert.match(app, /What do you need help with\?/);
  assert.match(app, /Send Message/);
  assert.match(app, /async function sendContact\(event\)/);
  assert.match(app, /Your message will be sent securely through our contact form/);
  assert.match(css, /\.contact-form/);
});


test("homepage How It Works and Vibe panels use opaque, readable surfaces", () => {
  assert.match(css, /#app \.home-feature-pair > \.hiw\.romance-section,[\s\S]*?#app \.home-feature-pair > \.quick\.vibe-section \{[\s\S]*?background: var\(--card\) !important;[\s\S]*?opacity: 1 !important;/);
  assert.match(css, /backdrop-filter: none !important/);
});

test("local activity descriptions include practical verification and safety guidance", () => {
  assert.match(app, /Xavier University’s latest official interim schedule notice \(24 March 2026\)/);
  assert.match(app, /Avoid rooftops and any place without secure, approved access/);
  assert.match(app, /confirm which facilities and activities are currently operating/i);
  assert.match(app, /sample amount is not a current travel quote/);
  assert.doesNotMatch(app, /safe rooftop/);
});

test("C-ONE badminton options use sourced conservative court-only budgets", () => {
  assert.match(app, /C-ONE badminton date — weekday happy hour/);
  assert.match(app, /C-ONE badminton date — evening or weekend/);
  assert.match(venueData, /c: 150,[\s\S]*?priceBasis: "One court for one hour: ₱110/);
  assert.match(venueData, /c: 300,[\s\S]*?priceBasis: "One court for one hour: ₱220/);
  assert.match(venueData, /https:\/\/c-one\.bookingdyno\.com\//);
  assert.match(venueData, /not equipment rentals, shuttlecocks, transport, or food/);
  assert.match(venueData, /C-ONE Sports Center — Kauswagan/);
});

test("Dahilayan ride budgets use current official operator rates and disclose exclusions", () => {
  assert.match(app, /Dahilayan 840m zipline date for two/);
  assert.match(app, /Dahilayan Razorback mountain coaster for two/);
  assert.match(venueData, /c: 1400,[\s\S]*?2 × ₱100 entrance \+ 2 × ₱500 840m zipline/);
  assert.match(venueData, /c: 1200,[\s\S]*?2 × ₱100 entrance \+ 2 × ₱400 single coaster rides/);
  assert.match(venueData, /https:\/\/www\.dahilayanadventurepark\.com\/rides/);
  assert.match(venueData, /Transport from CDO, food, any environmental fee not shown on the official page/);
});

test("Dahilayan Forest Park ride budgets use official rates and include separate entrance", () => {
  assert.match(app, /Dahilayan Forest Park buggy trail for two/);
  assert.match(app, /Dahilayan Forest Park ATV adventure for two/);
  assert.match(venueData, /c: 2000,[\s\S]*?₱1,400 buggy for two riders \+ 2 × ₱150 entrance/);
  assert.match(venueData, /c: 2300,[\s\S]*?2 × ₱850 ATV \+ 2 × ₱150 entrance/);
  assert.match(venueData, /https:\/\/www\.dahilayanforestpark\.com\/en\/rides-activities/);
  assert.match(venueData, /140kg combined driver\/passenger limit/);
});

test("McPars pickleball is listed with a cautious budget while billiards stays gated until bookable", () => {
  assert.match(app, /McPars indoor pickleball date for two/);
  assert.doesNotMatch(app, /McPars billiards date for two/);
  assert.ok(venueData.includes('priceBasis: "Highest published indoor court rate: ₱400/hour; 15% buffer = ₱460; rounded up to ₱500."'));
  assert.doesNotMatch(venueData, /n: "McPars billiards date for two"/);
  assert.doesNotMatch(app, /McPars billiards date for two/);
  assert.ok(venueData.includes("https://mcpars.com/"));
  assert.match(venueData, /McPars Sports Center/);
});

test("Dahilayan Forest Park multi-ride package budget discloses separate entrance assumption", () => {
  assert.match(app, /Dahilayan Forest Park multi-ride package for two/);
  assert.match(venueData, /c: 2500,[\s\S]*?2 × ₱900 rides package \+ 2 × ₱150 entrance/);
  assert.match(venueData, /Confirm which listed rides are included and operating, whether entrance is separate/);
  assert.match(venueData, /https:\/\/www\.dahilayanforestpark\.com\/en\/rides-activities/);
});


test("generating a gaming date renders a usable date ticket across budgets and food styles", () => {
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
  vm.runInContext(venueData, context, { timeout: 5000 });
  vm.runInContext(app, context, { timeout: 5000 });
  const results = vm.runInContext(`(() => {
    const out = [];
    for (const budget of [300, 800, 1500]) {
      for (const foodMode of ["a", "out", "cafe"]) {
        S.view = "random"; S.p = "a"; S.b = budget; S.t = "a"; S.s = "a";
        S.car = "a"; S.cat = "games"; S.foodMode = foodMode;
        S.act = null; S.food = null; S.gen = false;
        gen();
        out.push({
          budget, foodMode,
          activity: S.act && S.act.n,
          category: S.act && S.act.cat,
          food: S.food && S.food.n,
          total: total(),
          html: document.getElementById("app").innerHTML
        });
      }
    }
    return out;
  })()`, context, { timeout: 15000 });
  assert.equal(results.length, 9);
  for (const result of results) {
    assert.ok(result.activity, `Gaming plan missing an activity: ${JSON.stringify(result)}`);
    assert.equal(result.category, "games", `Gaming choice returned the wrong category: ${JSON.stringify(result)}`);
    assert.match(result.html, /Your date/, "Generation should render the actual date ticket.");
    assert.ok(result.html.includes(result.activity), "The selected gaming activity should appear in the rendered ticket.");
    assert.doesNotMatch(result.html, /No activity matches this category and budget/, "A valid gaming choice should not show the empty-state message.");
    assert.ok(result.total <= result.budget, `Generated gaming plan exceeded its budget: ${JSON.stringify({ budget: result.budget, total: result.total, activity: result.activity, food: result.food })}`);
  }
});


test("all source-backed price records keep complete evidence and match planner activities", () => {
  const dataContext = { window: {} };
  vm.createContext(dataContext);
  vm.runInContext(venueData, dataContext, { timeout: 5000 });
  const verified = dataContext.window.DATE_COMPASS_VERIFIED_DATA;
  const foods = verified.foodIdeas.filter(item => item.sourceUrl);
  const activities = verified.activityUpdates;
  const records = [...foods, ...activities];
  assert.equal(foods.length, 35, "Expected 35 source-backed food ideas.");
  assert.equal(activities.length, 10, "Expected ten currently usable source-backed activity updates.");
  assert.equal(records.length, 45, "Every source-backed food and currently usable activity should be included in this evidence audit.");
  for (const item of records) {
    assert.match(item.sourceUrl || "", /^https:\/\//, `Missing valid source URL for ${item.n}`);
    assert.ok(item.sourceLabel, `Missing source label for ${item.n}`);
    assert.ok(item.priceStatusLabel, `Missing price status for ${item.n}`);
    assert.ok(item.priceBasis && item.priceBasis.includes("15%"), `Missing 15% budget basis for ${item.n}`);
    assert.ok(item.priceNote, `Missing exclusions or verification note for ${item.n}`);
    assert.match(item.checkedOn || "", /^202[0-9]-[0-9]{2}-[0-9]{2}$/, `Missing item-level price check date for ${item.n}`);
    assert.ok(item.checkedOn <= verified.checkedOn, `Item check date cannot be later than dataset refresh date for ${item.n}`);
    assert.ok(Number.isFinite(item.c) && item.c >= 0, `Invalid budget for ${item.n}`);
  }
  for (const item of activities) {
    assert.ok(app.includes(JSON.stringify(item.n)), `Source-backed activity has no matching planner option: ${item.n}`);
  }
});


test("new CDO venue research entries have map links and honest price status", () => {
  const dataContext = { window: {} };
  vm.createContext(dataContext);
  vm.runInContext(venueData, dataContext, { timeout: 5000 });
  const directory = dataContext.window.DATE_COMPASS_VERIFIED_DATA.venueDirectory;
  const names = [
    "H Proper Coffee Roasters — Pueblo",
    "Elbs Cafe — Kauswagan",
    "Milestone Coffee + Kitchen Uptown",
    "SM Game Park — SM CDO Downtown",
    "Duaw Park",
    "Museo de Oro — Xavier University",
    "Higala Ridge Food & Park"
  ];
  for (const name of names) {
    const item = directory.find(entry => entry.name === name);
    assert.ok(item, `Missing venue research record: ${name}`);
    assert.match(item.mapUrl || "", /^https:\/\/www\.google\.com\/maps\/search\//, `Missing Google Maps link for ${name}`);
    assert.ok(item.sourceUrl, `Missing research source for ${name}`);
    assert.equal(item.checkedOn, "2026-10-15");
    assert.ok(item.priceStatus, `Missing price-verification status for ${name}`);
  }
  const higalaRidge = directory.find(entry => entry.name === "Higala Ridge Food & Park");
  assert.match(higalaRidge.priceStatus, /not verified/);
  assert.match(higalaRidge.hoursStatus, /verify directly/);
  assert.match(higalaRidge.sourceUrl, /facebook\.com\/higalaridgefoodandpark/);
  assert.doesNotMatch(app, /Higala Ridge Food & Park/);
  assert.ok(app.includes('Duaw Park and downtown heritage stroll'));
  assert.match(app, /sample incidental allowance for two, not a published admission fee/);
});


test("Museo de Oro budget and hours use dated official sources without claiming a current fee", () => {
  assert.match(app, /Museo de Oro at Xavier University",c:250/);
  assert.match(app, /interim schedule notice \(24 March 2026\)/);
  assert.match(app, /not a confirmed 2026 fee/);
  assert.match(app, /853-9800 local 9267 or 9269/);
  assert.match(app, /xavier-ateneo-bulletin\/7497-admission-fee-rates-and-schedule-museo-de-oro-xcca/);
  assert.match(app, /xavier-ateneo-bulletin\/8034-interim-museum-hours-032026/);
  assert.match(venueData, /Museo de Oro — Xavier University/);
  assert.match(venueData, /Museo\+de\+Oro\+Xavier\+University\+Cagayan\+de\+Oro/);
});

test("planner choices sit inside a spaced responsive panel and plan actions are solid", () => {
  assert.match(app, /<div class="planner-filters">[\s\S]*?sel\("Where","p"\)[\s\S]*?sel\("Setting","s"\)[\s\S]*?<\/div>/);
  assert.match(css, /#app \.planner-filters\s*\{[\s\S]*?padding:clamp\(18px,3\.2vw,28px\)[\s\S]*?background:var\(--card\)/);
  assert.match(css, /@media\(max-width:640px\)[\s\S]*?#app \.planner-filters\s*\{[\s\S]*?grid-template-columns:minmax\(0,1fr\)/);
  assert.match(css, /#app \.bar button\.ghost,[\s\S]*?background:var\(--gold\)!important;[\s\S]*?color:var\(--ink\)!important;[\s\S]*?opacity:1!important/);
  assert.ok(html.includes('href="css/style.css?v=20261015g"'));
  assert.ok(html.includes('src="js/app.js?v=20261016h"'));
});


test("Surprise Me planner button remains actionable and explains missing budget", () => {
  assert.match(app, /<button class="go" onclick="gen\(\)">Plan my date<\/button>/);
  assert.match(app, /Please enter a budget for both of you first/);
  assert.ok(html.includes('src="js/app.js?v=20261016h"'));
});

test("budget field keeps custom amount entry without a preset button", () => {
  assert.match(app, /<span>Budget for two<\/span>[\s\S]*?<input class="budgetinput" type="number"/);
  assert.doesNotMatch(app, /class="budget-presets"|class="budget-preset"|setBudgetPreset\(1500\)/);
  assert.match(app, /function setBudget\(v\)/);
  assert.doesNotMatch(css, /budget-presets|budget-preset|Quick budget pick for the date planner/);
  assert.ok(html.includes('href="css/style.css?v=20261015g"'));
  assert.ok(html.includes('src="js/app.js?v=20261016h"'));
});


test("reduced-motion and keyboard focus styles remain accessible", () => {
  assert.ok(css.includes("@media (prefers-reduced-motion: reduce)"));
  assert.ok(css.includes(":focus-visible"));
});

test("contact form submits through Formspree and reports actual success or failure", () => {
  assert.match(app, /action="https:\/\/formspree\.io\/f\/mkjokzjv"/);
  assert.match(app, /async function sendContact\(event\)/);
  assert.match(app, /fetch\(form\.action/);
  assert.match(app, /headers:\{"Accept":"application\/json"\}/);
  assert.match(app, /Your message was sent successfully/);
  assert.match(app, /We couldn't send your message/);
  assert.doesNotMatch(app, /name="_gotcha"/);
  const contactBlock = app.slice(app.indexOf("function contact(){"), app.indexOf("function home(){", app.indexOf("function contact(){")));
  assert.doesNotMatch(contactBlock, /location\.href="mailto:"\+CONTACT_EMAIL/);
});


test("Games category includes cooperative, couples trivia, guessing, puzzle, and no-equipment activities", () => {
  const names = [
    "Cooperative story-building game for two",
    "Couples trivia: how well do you know me?",
    "Guess the memory couples game",
    "20 Questions mystery guessing game",
    "No-equipment charades game for couples",
    "Puzzle battle: make a riddle and solve it",
    "Word-association speed game",
    "Cooperative category-chain game",
    "Co-op puzzle hunt using a free phone puzzle"
  ];
  for (const name of names) {
    assert.ok(app.includes(`{n:"${name}"`), `Missing game activity: ${name}`);
  }
  assert.match(app, /No equipment needed; the ₱0 activity estimate assumes/);
  assert.match(app, /No props or purchases needed; activity estimate ₱0/);
  assert.match(app, /Co-op puzzle hunt using a free phone puzzle",c:0/);
  assert.match(app, /const CAT=\{[\s\S]*games:"Games"/);
});


test("every venue-directory record has a Maps search link and explicit research status", () => {
  const dataContext = { window: {} };
  vm.createContext(dataContext);
  vm.runInContext(venueData, dataContext, { timeout: 5000 });
  const directory = dataContext.window.DATE_COMPASS_VERIFIED_DATA.venueDirectory;
  assert.ok(Array.isArray(directory) && directory.length >= 30, "Venue directory should remain a useful, non-empty research list.");
  const names = new Set();
  for (const item of directory) {
    assert.ok(item.name && item.category && item.area, "Every venue needs a name, category, and area.");
    assert.ok(!names.has(item.name), `Duplicate venue directory record: ${item.name}`);
    names.add(item.name);
    assert.ok((item.mapUrl || "").startsWith("https://www.google.com/maps/search/"), `Missing Google Maps search link for ${item.name}`);
    assert.match(item.sourceUrl || "", /^https:\/\//, `Missing source/research link for ${item.name}`);
    assert.ok(item.venueStatus, `Missing venue verification status for ${item.name}`);
    assert.ok(item.priceStatus, `Missing price verification status for ${item.name}`);
    assert.match(item.checkedOn || "", /^202[0-9]-[0-9]{2}-[0-9]{2}$/, `Missing ISO-style research date for ${item.name}`);
  }
});

test("venue-quality gates keep not-yet-bookable activities out and identify the Bonbon coffee branch", () => {
  assert.ok(venueData.includes('n: "17th Ave Coffee Bonbon: Iced Vietnamese buy-one-take-one"'));
  assert.ok(venueData.includes('207+Zone+6+Bonbon+Cagayan+de+Oro'));
  assert.doesNotMatch(venueData, /n: "McPars billiards date for two"/);
  assert.match(venueData, /McPars indoor pickleball date for two/);
  assert.match(venueData, /confirm the exact map pin, current offer terms/i);
});
