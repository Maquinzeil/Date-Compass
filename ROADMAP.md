# Date Compass Roadmap

**Target launch:** 2027  
**Current stage:** Frontend polish  
**Project:** Date-planning website for couples in Cagayan de Oro and Misamis Oriental.

## How to use this roadmap

- Work on **one checkbox at a time**.
- Only check a box after doing the work and testing it.
- Keep a short note or screenshot for bugs that need more work.
- Finish the phase's **Done when** checklist before moving to the next phase.
- Features such as accounts and online payments are optional until the product requirements are decided.

---

## Phase 1 — Finish and polish the frontend

### 1.1 Visual design and readability
- [ ] Review the overall red, yellow, and cream color palette.
- [ ] Check text contrast on every background, including small and secondary text.
- [ ] Make headings, body text, buttons, labels, and helper text easy to read.
- [ ] Check spacing, alignment, card sizes, borders, and corner radii.
- [ ] Make button styles consistent for normal, hover, focus, active, and disabled states.
- [ ] Check that the logo and Date Compass name look consistent in the header and footer.
- [ ] Check the page at narrow mobile, large mobile, tablet, laptop, and wide desktop sizes.

### 1.2 Background animation
- [ ] Confirm the floating hearts are visible without distracting from content.
- [ ] Make heart movement feel varied and randomized rather than synchronized.
- [ ] Check that hearts do not cover text, buttons, or form fields.
- [ ] Check animation performance on mobile and lower-powered devices.
- [ ] Respect reduced-motion preferences and provide a calmer experience when requested.

### 1.3 Navigation and page sections
- [ ] Test the logo link and every header navigation link.
- [ ] Test every footer navigation link.
- [ ] Confirm Home, Build a Date, Surprise Me, About, and Contact lead to the correct sections.
- [ ] Confirm the page behaves correctly when loaded with a section hash in the URL.
- [ ] Check for overlapping header elements or awkward scrolling on mobile.
- [ ] Confirm the footer content and copyright year are correct.

### 1.4 Build-a-date experience
- [ ] Review every input and choice in the date-planning flow.
- [ ] Make labels and instructions clear to first-time visitors.
- [ ] Check that users can choose a location or area.
- [ ] Check that users can choose a budget.
- [ ] Check that users can specify whether they have access to a car.
- [ ] Check any other date preferences offered by the current interface.
- [ ] Show clear validation messages when a required choice is missing.
- [ ] Make it easy to change choices and generate another plan.
- [ ] Confirm the resulting plan reflects the user's selections.
- [ ] Make empty, loading, success, and error states clear wherever relevant.

### 1.5 Surprise-me experience
- [ ] Test the Surprise Me section and its main action.
- [ ] Confirm it produces a useful result rather than a blank or broken state.
- [ ] Check what happens when the user tries again.
- [ ] Make the result easy to understand and return from.

### 1.6 Content and trust
- [ ] Proofread all headings, descriptions, labels, button text, and helper messages.
- [ ] Make it clear the service focuses on Cagayan de Oro and Misamis Oriental.
- [ ] Explain that venue details, availability, and prices may change and should be checked.
- [ ] Make the physical date kit offer clear without confusing it with the digital planner.
- [ ] Add or polish About and Contact information.
- [ ] Remove placeholder copy, dead links, and unfinished sections.

### 1.7 Accessibility and usability
- [ ] Navigate the site using only a keyboard.
- [ ] Check visible focus states for links, buttons, and form controls.
- [ ] Check that form fields have accessible labels.
- [ ] Check heading order and landmark structure.
- [ ] Add useful alternative text to meaningful images; hide decorative graphics from assistive technology.
- [ ] Check that color is not the only way to communicate a state or error.
- [ ] Test reduced-motion settings.

### 1.8 Frontend quality checks
- [ ] Open the browser console and fix frontend errors.
- [ ] Check for missing files, failed network requests, and broken images or fonts.
- [ ] Test the main flows in at least two modern browsers.
- [ ] Test the website on a real phone or a mobile browser emulator.
- [ ] Check page loading speed and avoid unnecessary large assets.
- [ ] Remove unused or duplicate code only when its purpose is understood.
- [ ] Record known issues in GitHub Issues or in a bug log.

### Phase 1 exit gate — do not move on until:
- [ ] All core navigation links work.
- [ ] The main date-planning and Surprise Me flows work in the frontend.
- [ ] No known critical visual or functional bugs remain.
- [ ] Mobile and desktop layouts have been tested.
- [ ] Browser console and network errors have been reviewed.
- [ ] The frontend is stable enough to connect to a backend.

---

## Phase 2 — Plan the backend before coding it

### 2.1 Define the first release
- [ ] Decide the minimum features required for launch.
- [ ] Decide whether users need accounts or can plan dates without signing in.
- [ ] Decide whether date plans need to be saved or shared.
- [ ] Decide how the physical date kit will be ordered.
- [ ] Decide whether online payments are needed for the first release or can wait.
- [ ] Decide who will maintain venue information, estimated prices, and other local details.

### 2.2 Choose the technical setup
- [ ] Choose a backend framework or service that fits the current frontend.
- [ ] Choose where venue and activity data will live.
- [ ] Design the initial data structure for places, activities, budgets, transport options, and date plans.
- [ ] Define how the frontend will request data from the backend.
- [ ] Create development and production environment plans.
- [ ] Keep passwords, API keys, payment secrets, and other secrets out of frontend code and Git history.

### Phase 2 exit gate
- [ ] The first-release scope is written down.
- [ ] The backend and database approach is chosen.
- [ ] The core data structure and API plan are documented.
- [ ] Privacy and security requirements are understood.

---

## Phase 3 — Build and connect the backend

### 3.1 Core date-planning data
- [ ] Create the initial database or data store.
- [ ] Add a manageable way to maintain local places and activities.
- [ ] Store budget ranges and other information needed to build a plan.
- [ ] Decide how transport and car availability affect recommendations.
- [ ] Handle missing, outdated, or incomplete venue data gracefully.

### 3.2 Date-plan generation
- [ ] Implement the date-plan generation logic.
- [ ] Validate user choices on the server, not only in the browser.
- [ ] Return results that match the selected location, budget, and transport preferences.
- [ ] Handle cases where there are few or no suitable results.
- [ ] Add useful error handling and logging without exposing private information.
- [ ] Connect the frontend to the backend and remove temporary mock data where appropriate.

### 3.3 Optional account and saved-plan features
- [ ] Add authentication only if accounts are part of the launch scope.
- [ ] Restrict users to their own private saved data.
- [ ] Add save, view, update, or delete functions only if needed.
- [ ] Provide clear account and data-deletion behavior.

### Phase 3 exit gate
- [ ] The planner uses backend data successfully.
- [ ] Server-side validation and error handling work.
- [ ] Main flows work with realistic data.
- [ ] Secrets and private user data are handled safely.

---

## Phase 4 — Physical date kit and payments

- [ ] Define what the physical kit contains and how it is fulfilled.
- [ ] Decide whether orders will initially be handled manually or through an online checkout.
- [ ] Document delivery areas, fees, timelines, cancellation, and refund policies.
- [ ] If accepting online payments, choose a suitable payment provider for the Philippines.
- [ ] Verify payments on the server using the provider's trusted confirmation mechanism.
- [ ] Never store raw card details yourself.
- [ ] Record order status and provide a clear confirmation to customers.
- [ ] Test successful, failed, cancelled, and duplicate payment scenarios.
- [ ] Test the full order and fulfillment process before accepting real orders.

**Note:** This phase can be simplified or postponed if physical kits are not part of the first release.

---

## Phase 5 — Testing, privacy, security, and launch readiness

### 5.1 Functional testing
- [ ] Test valid and invalid form inputs.
- [ ] Test different budgets, areas, and transport choices.
- [ ] Test empty results, server errors, and slow connections.
- [ ] Test navigation, sharing, and saved plans if included.
- [ ] Test the order and payment journey if included.
- [ ] Fix all critical and high-priority bugs.

### 5.2 Security and privacy
- [ ] Use HTTPS for the live website.
- [ ] Validate and sanitize untrusted input.
- [ ] Add appropriate rate limits and abuse protection to backend endpoints.
- [ ] Review database access rules and permissions.
- [ ] Store secrets in environment settings, not source code.
- [ ] Publish a privacy policy that matches the data actually collected.
- [ ] Collect only the personal data the product needs.
- [ ] Back up important data and understand how to restore it.

### 5.3 Release preparation
- [ ] Choose the hosting platform for the frontend and backend.
- [ ] Set up a staging or test environment separate from production.
- [ ] Test the production build and environment settings.
- [ ] Check the website on phones, tablets, and desktop browsers.
- [ ] Add a custom domain when ready; verify domain availability before purchasing.
- [ ] Set up basic uptime/error monitoring and a way for users to report problems.
- [ ] Prepare a rollback plan in case the release causes problems.

### Phase 5 exit gate
- [ ] No unresolved critical security or functional issues remain.
- [ ] Main journeys have been tested end to end.
- [ ] Privacy and customer-facing policies are ready for the features offered.
- [ ] Production deployment and rollback have been tested.

---

## Phase 6 — Launch in 2027 and improve

- [ ] Invite a small group of testers to try the full website.
- [ ] Gather feedback about usefulness, clarity, and ease of use.
- [ ] Fix launch-blocking feedback before public release.
- [ ] Publish the first release.
- [ ] Check errors and user feedback frequently after launch.
- [ ] Prioritize improvements based on real user needs.
- [ ] Consider a custom domain such as DateCompass.com only after confirming availability and price.
- [ ] Plan future features from user feedback rather than adding everything at once.

---

## Bug report template

When you find a bug, record it as a GitHub Issue with:

- **What I expected:**
- **What actually happened:**
- **Steps to reproduce:**
- **Device/browser:**
- **Screenshot or error message:**
- **Priority:** Critical / High / Medium / Low

## Current rule

**Finish Phase 1 first.** Do not mark tasks complete just because they sound finished; check them only after you verify the behavior on the website. The roadmap is a working document, so adjust it as the project becomes clearer.


## Phase 1 audit log — 2026-10-09

- Inspected the complete Phase 1 checklist and the current `index.html`, `css/style.css`, and `js/app.js` on `main`. The HTML links CSS and JavaScript using versioned query strings; the cache version was bumped after these changes.
- Fixed the CSS root declaration, which had layout declarations inside the root-variable rule, and removed an extra closing brace in the disabled-button rule.
- Added missing About and Contact route functions; the navigation previously called undefined functions for those destinations.
- Added high-contrast hero description styling, clearer keyboard focus outlines, 44px navigation targets, small-screen layout refinements, and reduced-motion handling. Background heart columns now have independently varied drift and scroll timings.
- Prevented the owner question-card print route from throwing because its referenced question-bank variable is absent. The screen now clearly reports that the bank is not configured. This is still a product blocker for producing physical kits with the promised 10 cards.
- Important limitations: the planner's ideas and prices are unverified placeholders; `CONTACT_EMAIL` is still `your-email@example.com`; the order flow is local-only and does not submit to a backend. Do not accept real orders until contact and fulfillment are configured.
- Browser automation was not available in this session. No browser console, network, cross-browser, physical-device, viewport screenshot, or runtime animation test has been performed. Therefore, visual, accessibility, responsiveness, and Phase 1 exit-gate checkboxes remain unchecked pending browser verification.


## Phase 1 audit log — 2026-10-10

- Removed the solid crimson gradient panel from the homepage hero so the “Find your best date spot” content sits on the page's existing background instead of inside a large red box. Kept the red/yellow palette in CTA buttons and small decorative accents.
- Centered the “Create your date spot” and “Surprise me” CTA labels with flex alignment and consistent line-height.
- Stabilized the two phone mockups' hover behavior: hover no longer changes their tilt angle, hover effects are limited to fine-pointer devices, and touch devices do not retain hover transforms.
- Bumped the CSS and JavaScript cache query versions in index.html so browsers request the updated assets.
- **Checklist status:** Phase 1 is not marked complete. The source changes are committed, but a real browser/device test has not been performed in this session. Keep all verification checkboxes unchecked until the homepage, phone layouts, navigation, planner, Surprise Me flow, console, network requests, and accessibility behavior have been tested. Existing blockers remain: placeholder venue/price data, unconfigured contact email, and the physical kit question-card bank.

## Phase 1 audit log — 2026-10-10 (continued audit)

- Reviewed the complete Phase 1 checklist and inspected the current planner data, route handling, kit preview, order-message flow, owner route, CSS hero overrides, and asset references.
- Fixed the food recommendation budget cap so food suggestions are limited to the actual remaining budget instead of applying a minimum ₱150 allowance that could make the combined plan exceed the selected budget. When an activity changes, incompatible food selections are cleared or regenerated; an empty food result now explains what to do next.
- Removed the unsupported claim that the site contains “1,000 wholesome date ideas.” The homepage and planner now explicitly identify recommendations as sample ideas and costs as unverified estimates, not confirmed venue listings or live prices.
- Hardened the missing question-bank path so calling the question flow cannot spread an undefined `Q` value and throw a `ReferenceError`. The question bank remains a content blocker; no question content was invented.
- Disabled the public owner route in this static frontend. The former `change-me` PIN was visible in client-side JavaScript and was not secure authentication. Owner printing/admin tools must remain disabled until a private authenticated workflow exists.
- Clarified the physical kit preview: the question-card bank is not configured, and the partner voucher is explicitly marked as a non-redeemable sample. The order form now labels its output as a local draft; it does not submit an order, reserve stock, or confirm fulfillment.
- Disabled the email action while `CONTACT_EMAIL` remains the placeholder `your-email@example.com`; users can still copy the draft. The real owner email and official contact/order channel require owner input.
- Added invalid-route handling so unknown hashes return to Home instead of accidentally rendering a planner screen.
- Added `tests/phase1-smoke.test.mjs` and `.github/workflows/phase1-smoke-checks.yml`. GitHub Actions run **passed** on 2026-10-10: `node --check js/app.js` passed and all 7 static smoke tests passed. The tests cover asset-version consistency, hero/CTA invariants, both phone mockups, budget-cap logic, missing question-bank guarding, honest order/contact messaging, disabled public owner access, and placeholder-data wording.
- The GitHub Pages deployment workflow was triggered by the latest repository updates. A successful smoke-test run is not a substitute for checking the deployed site in a real browser.
- **Remaining blockers:** venue/activity costs and transport details are still unverified sample data; the real contact email and official ordering channel are not configured; the approved question-card bank is missing; no backend, payment, order storage, email delivery, or fulfillment integration exists; and no live browser console/network, mobile/tablet/desktop, cross-browser, keyboard, screen-reader, contrast, reduced-motion, or physical-device audit has been completed.
- **Checklist status / exit gate:** Do not mark Phase 1 complete. Keep visual, accessibility, device, browser-runtime, and end-to-end behavior items unchecked until those checks are actually performed. Phase 1 exit criteria remain: test the deployed main navigation and planner/Surprise Me flows; verify results against budgets and preferences; review console/network errors; test responsive and keyboard behavior; and decide whether unverified sample recommendations are acceptable for the intended first release.

### UI follow-up — 2026-10-10

- User reported that the two selects in the **Your date** results section (Activity and Food) appeared to have no breathing room and sat against the card edge.
- Root cause found in the shared CSS: global `select` used `width:100%` plus horizontal padding and borders without `box-sizing:border-box`. The selects inside the result cards could therefore render wider than the available inner width.
- Fixed the shared select rule with `box-sizing:border-box` and `max-width:100%`; preserved the existing card padding and select spacing. Updated the asset cache version and added a smoke assertion for the sizing rule.
- Automated checks will rerun through GitHub Actions. This is a source-level fix; visual confirmation on the live page still needs a real browser check.



### Visual polish follow-up — 2026-10-10

- Increased independently positioned floating background hearts from 6–8 to 10–13 per column, keeping their varied size, speed, opacity, and motion and honoring reduced-motion preferences.
- Shifted cool blue/teal accents toward muted champagne gold and translucent warm-yellow accents to fit the burgundy background. Kept the red primary call-to-action styling.
- Updated CSS/JS cache-busting to `20261010f` and expanded smoke tests for the heart count and warm palette.
- Automated checks do not replace visual confirmation on desktop and mobile.
