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
