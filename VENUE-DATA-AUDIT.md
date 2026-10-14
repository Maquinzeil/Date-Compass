# Date Compass Venue and Activity Data Audit

Last reviewed: 2026-10-15  
Scope: Cagayan de Oro and Misamis Oriental, Philippines  
Purpose: track the evidence behind recommendations so estimates are not presented as confirmed venue prices or availability.

## Rules for publishing data

- A named venue's existence/location should be supported by an official venue, government, university, or other reliable source.
- Treat price as **confirmed** only when a current official source or direct venue confirmation states the price and what it covers.
- Record whether a price is per person, per couple, per hour, per vehicle, or per package; include minimum group sizes and likely extras.
- Record the source URL and date checked for each change.
- Do not infer current availability from an old listing, map listing, or past social post.
- If a detail cannot be confirmed, keep it labelled as an estimate or unknown. Never silently convert an unknown cost into ₱0.
- Generic activities (e.g. cooking at home) need planning estimates, not venue verification.
- Do not imply that this file or the current website provides live availability or booking.

## Source-backed seed prices checked 2026-10-15

These are the first menu/operator-backed examples wired into the frontend. The suggested budget is for two people and rounds up after a 15% cushion. The published price is not a guaranteed current checkout total, and no live availability is implied.

| Venue / option | Source price used | Conservative budget for two | Source and caveats |
|---|---:|---:|---|
| Jollibee CDO Divisoria — Burger Steak with fries and drink | ₱165 each in the CDO Divisoria delivery listing | ₱400 | [Foodpanda branch menu](https://www.foodpanda.ph/restaurant/b6jj/jollibee-cdo-divisoria). Delivery-app listing; dine-in, branch prices, offers, and availability may differ. |
| McDonald's CDO Gusa — Chicken McDo with fries and drink | ₱174 each in the CDO Gusa delivery listing | ₱450 | [Foodpanda branch menu](https://www.foodpanda.ph/restaurant/s3gl/mcdonalds-cdo-gusa). Delivery-app listing; dine-in, platform markups, branch prices, and offers may differ. |
| KFC Centrio — Original Recipe Tenders Rice Meal | ₱205 each on the official KFC menu | ₱500 | [Official KFC menu](https://www.kfc.com.ph/en/menu) and [Centrio branch page](https://www.kfc.com.ph/en/store-locator/kfc_centrio). Confirm the item and price at the branch. |
| KFC Centrio — Zinger Steak Fully Loaded Box | ₱315 each on the official KFC menu | ₱750 | [Official KFC menu](https://www.kfc.com.ph/en/menu) and [Centrio branch page](https://www.kfc.com.ph/en/store-locator/kfc_centrio). Confirm the item and price at the branch. |
| Kagay Outdoors — lower-section white-water rafting | ₱1,200 per person; listed inclusions are transfers, gear, guides, and shower fee | ₱2,800 | [Official operator website](https://kagayoutdoors.com/). The operator lists a six-person minimum but accepts joiners for groups under six. This budget assumes two joiners can be accommodated; availability must be confirmed. Optional packed meals and photos are extra. |

**Implementation notes**
- The frontend now loads `js/venue-data.js` before `js/app.js`.
- Source-backed food options carry a source link, source type, date checked, price basis, and caveat. Their `c` value is the conservative budget used by the planner, not the raw menu price.
- The rafting estimate was raised from the old placeholder ₱2,500 to ₱2,800 based on the operator's published ₱1,200/person lower-section rate plus a 15% buffer.
- This is only a starter subset. Other activity ideas and food concepts remain sample estimates or unverified until each is researched; do not describe the entire directory as verified.
- Recheck the source before public launch and after any material price change. The site does not provide live stock, opening-hour, or booking availability.

## Initial source review

| Current planner idea | What the source supports | Price / availability status | Next action |
|---|---|---|---|
| Sunset walk at Gaston Park and Divisoria | City government tourism page describes Gaston Park's location and historical role. City government also reported the Ginamâ OTOP Hub at Gaston Park was open daily 9:00 AM–6:00 PM in an April 2026 article. This does not verify all park facilities or every future opening schedule. | No confirmed date-specific availability or date-plan cost. A walking idea should not imply that snacks or transport are included. | Keep the park walk as an activity idea; confirm any venue-specific details and label snack/transport budgets separately. |
| Museo de Oro at Xavier University | Xavier University has an official admission-fee announcement published 16 August 2025 and an interim museum-hours notice published 24 March 2026. An older university page lists student ₱30 / professional ₱70, but that older page alone is not proof of the current rates. | **Current fee requires confirmation from the latest official fee notice or the museum.** Interim hours mean hours should not be copied from generic business listings. | Read the current official fee graphic/notice and confirm current admission categories and hours before updating the planner's budget. |
| Mapawa Nature Park picnic walk | A business listing identifies a location and contact number, but a listing is not enough to confirm current access rules, operating hours, or fees. | Current entry fee, access and activity availability unverified. | Find an official/current operator source or contact the venue; until then keep price as an estimate and add a clear check-before-going note. |
| Macahambus Adventure Park | The planner itself currently tells users to confirm which facilities and activities are operating. | Current facilities, entry/activity fees, and operating status unverified. | Confirm which activities are currently available, price per person/couple, operating schedule, safety rules, and contact details. |
| White-water rafting on the Cagayan River | Kagay Outdoors' published website lists lower section at ₱1,200/person and middle section at ₱1,800/person, with minimum group size of 6 (joiners may be accepted), jeepney transfers, gear, guides, and shower fee included. It lists optional photo/video and packed meals separately. | Operator-published rates found, but they are **per person**, not for two; actual date availability and current rates must still be reconfirmed before booking. | Use the operator's price basis accurately (at least ₱2,400 for two at the lower-section published rate, before extras); add operator link and date checked, and do not imply a booking is made. |
| Coastal drive to Initao | The planner describes a route idea, not a specific venue. | Fuel, food, parking and any private-property/resort access fees are variable and unverified. | Keep as a flexible activity; avoid presenting a single fixed total as an all-inclusive cost. |
| Beach day in Opol / beach camp in Opol or Initao | These are broad area suggestions, not specific establishments. | Beach access, resort/campsite fees, availability and rules vary by property. | Either identify named venues with reliable sources or label these as general ideas and exclude unverified access fees from a fixed budget. |
| Gingoog Bay day trip | Broad destination idea only. | Transport, activity, access fees and availability unverified. | Break into specific verified stops before recommending fixed prices or schedules. |
| Camiguin day trip via Balingoan port | Broad trip idea; ferry schedules and fees are time-sensitive. | Current ferry timetable, fares, terminal fees, transport and destination availability not verified in this audit. | Verify through current ferry/port operator sources and date-specific schedules before presenting a cost or itinerary as reliable. |
| Gaming cafe / internet-cafe gaming date | These are venue-type suggestions, not named businesses. The current planner contains sample hourly assumptions. | Hourly rates, minimum spend, available games, Wi-Fi and opening hours vary by venue. | Keep estimates clearly marked, or add named venues only after checking current rates and operating details. |
| Movie date | Generic activity; cinema prices and showtimes vary by cinema, date, and film. | Current ticket prices and showtimes not verified. | Keep cost as a planning estimate and link to a cinema's current showtime/ticket source when a specific cinema is recommended. |
| Cafe, restaurant, street-food, seafood, and fast-food ideas | Generic categories rather than verified branches. | Menus, prices, branch hours, minimum spend, and availability vary. | Do not present these as specific venue recommendations until branches and current menu/price sources are attached. |

## Sources reviewed in the initial pass

- Cagayan de Oro City Government, Gaston Park: https://www.admin.cagayandeoro.gov.ph/index.php/item/372-gaston-park.html
- Cagayan de Oro City Government, Ginamâ OTOP Hub at Gaston Park (21 April 2026): https://admin.cagayandeoro.gov.ph/index.php/item/3791-city-hall-relaunches-ginama-hub-at-gaston-park.html
- Xavier University, Admission Fee Rates and Schedule | Museo de Oro - XCCA (16 August 2025): https://www.xu.edu.ph/xavier-ateneo-bulletin/7497-admission-fee-rates-and-schedule-museo-de-oro-xcca
- Xavier University, Interim Museum Hours | Museo de Oro - XCCA (24 March 2026): https://www.xu.edu.ph/church/145-xavier-ateneo-bulletin-2/xavier-ateneo-bulletin/8034-interim-museum-hours-032026
- Kagay Outdoors, rafting packages and rates: https://kagayoutdoors.com/

## Important implementation note

The current planner data in `js/app.js` explicitly describes its entries as unverified placeholders and includes rough estimated costs. This audit is a research ledger, not a claim that all entries have now been verified. Before changing the user-facing data, map each idea to a source and decide whether its cost is an activity allowance, a venue fee, a per-person quote, or a full couple budget. Keep the existing general disclaimer until the data and UI are updated and checked.
