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

## Batch 2: local CDO venues and Frkn' Brgrs menu prices (checked 2026-10-15)

### New source-backed food estimates

| Option for two | Published menu basis | Conservative suggested budget |
|---|---:|---:|
| Frkn' Brgrs Single Smash + drink each | 2 × (₱139 burger + ₱45 drink) = ₱368; plus 15% = ₱423.20 | ₱450 |
| Frkn' Brgrs Burger Steak Supreme + drink each | 2 × (₱149 rice meal + ₱45 drink) = ₱388; plus 15% = ₱446.20 | ₱500 |
| Frkn' Brgrs Frkn Rice Meal + drink each | 2 × (₱159 rice meal + ₱45 drink) = ₱408; plus 15% = ₱469.20 | ₱500 |
| Frkn' Brgrs Single Smash + milkshake each | 2 × (₱139 burger + ₱149 milkshake) = ₱576; plus 15% = ₱662.40 | ₱700 |

Source: [Frkn' Brgrs official website and menu](https://frknbrgrs.com/). It lists Uptown Strip and Centerpoint branches in CDO. The Single Smash is served with fries; homemade drinks are listed at ₱45 and milkshakes at ₱149. These budgets exclude transport and assume the listed items are available at the selected branch.

| Burger King SM CDO Downtown — Whopper Jr. Meal | ₱200 each on branch delivery listing; 2 × ₱200 + 15% = ₱460 | ₱500 |
| Burger King SM CDO Downtown — Whopper Meal | ₱329 each on branch delivery listing; 2 × ₱329 + 15% = ₱756.70 | ₱800 |

Source: [Foodpanda SM CDO Downtown Premier menu](https://www.foodpanda.ph/restaurant/s7po/burger-king-sm-cdo-premier). These are branch-specific delivery-menu references; dine-in prices, promotions, and availability may differ. Delivery fees and transportation are not included.

### Added venue research leads

The data file now includes venue entries and source/status notes for:
- **Restaurants and food:** Cucina Higala, Raki-Yata Ramen (Centrio, SM Downtown, SM Uptown), Topview Restaurant and Bar, Bowerbird Coffee PH, M.C. Coffee, Bigby's SM Downtown, Burger King SM Downtown and Xavier Divisoria, and Frkn' Brgrs at Centerpoint and Uptown.
- **Activities and free/low-cost ideas:** Timezone Centrio, SM Bowling, Gaston Park, Golden Friendship Park, Mapawa Nature Park.
- **Resorts and scenic dining:** Cuesta Roccia, Chali Resort & Conference Center, Seriva Mountain Resort.

**Important status distinction:** venue discovery and a published address are not the same as full verification. The directory records above explicitly mark prices, entrance fees, game credits, room/day-use rates, and other costs as needing current verification where a dependable current price source was not captured. Map search links are discovery links, not official venue websites. No unverified price has been invented for these venues.

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


## Venue research batch 3 — branch-specific fast-food prices (15 October 2026)

This batch adds five couple-budget options based on branch-specific Foodpanda menu listings. Each estimate is calculated from the published listed price, adds a 15% cushion, and rounds up to a practical budget. These are **delivery-menu references**, not guaranteed dine-in prices; transport and delivery fees are excluded. The prices should be rechecked before launch.

| Planner option | Published menu basis for two | 15% cushion | Planner budget | Source |
|---|---:|---:|---:|---|
| Mang Inasal Ororama — Paa Large | 2 × ₱165 = ₱330 | ₱49.50 | ₱400 | https://www.foodpanda.ph/restaurant/f5sw/mang-inasal-ororama-cagayan-de-oro |
| Chowking SM CDO Premier — Chicken Lauriat with drink | 2 × ₱263 = ₱526 | ₱78.90 | ₱650 | https://www.foodpanda.ph/restaurant/s9vr/chowking-sm-cdo-premier |
| Chowking SM CDO Premier — Siomai Chao Fan with drink | 2 × ₱146 = ₱292 | ₱43.80 | ₱350 | https://www.foodpanda.ph/restaurant/s9vr/chowking-sm-cdo-premier |
| Jollibee Market City — 1-pc Chickenjoy with drink | 2 × ₱110 = ₱220 | ₱33.00 | ₱300 | https://www.foodpanda.ph/restaurant/s6vk/jollibee-cdo-market-city |
| Jollibee Divisoria — Chickenjoy with Jolly Spaghetti Solo | 2 × ₱178 = ₱356 | ₱53.40 | ₱450 | https://www.foodpanda.ph/restaurant/b6jj/jollibee-cdo-divisoria |

**Interpretation:** Menu pages expose branch-specific listed prices, but the delivery platform can price items differently from in-store menus and change them with promotions or availability. The new directory entries therefore explicitly keep this distinction visible. The planner budgets are rounded conservative allowances, not checkout totals or live availability checks.


## Venue research batch 4 — Japanese meals and café dates (15 October 2026)

This batch adds four couple-budget options based on branch-specific delivery-menu listings. Estimates use the menu's regular/listed price before temporary app discounts, then add a 15% cushion and round up. They are planning allowances, not checkout totals. Delivery-menu prices can differ from dine-in, and transport/delivery fees are excluded.

| Planner option | Regular menu basis | 15% cushion | Planner budget | Source |
|---|---:|---:|---:|---|
| Raki-Yata SM City CDO Northwing — Katsu Bento for two | 2 × ₱250 = ₱500 | ₱75 | ₱600 | https://www.foodpanda.ph/restaurant/pdpi/raki-yata-ramen-sm-city-cdo-northwing |
| Raki-Yata SM City CDO Northwing — two Tonkotsu Shoyu + California Maki | 2 × ₱630 + ₱235 = ₱1,495 | ₱224.25 | ₱1,750 | https://www.foodpanda.ph/restaurant/pdpi/raki-yata-ramen-sm-city-cdo-northwing |
| Sunnyside Viajero — two Spanish Lattes | 2 × ₱240 = ₱480 | ₱72 | ₱600 | https://www.foodpanda.ph/restaurant/j4kv/sunnyside-coffee-and-roastery-viajero |
| Sunnyside Viajero — two Spanish Lattes + shared cookie | 2 × ₱240 + ₱150 = ₱630 | ₱94.50 | ₱750 | https://www.foodpanda.ph/restaurant/j4kv/sunnyside-coffee-and-roastery-viajero |

**Price caution:** Both delivery-menu pages displayed temporary 20% app discounts when checked. The estimates deliberately use the higher regular/listed price instead of relying on a temporary promotion. Confirm in-store prices, item availability, and current branch status before a couple travels; no dine-in price guarantee is implied.


## Venue research batch 5 — SM Bowling price evidence (15 October 2026)

A source-backed estimate was added to the existing **Classic Bowling date** idea. The current SM Bowling deal page lists a regular value of ₱160 for one game and states that shoe rental is ₱50. The planner uses the regular value rather than the temporary voucher discount.

| Planner option | Calculation for two | 15% cushion | Planner budget | Source |
|---|---:|---:|---:|---|
| Classic Bowling date — one game each + shoe rental | 2 × ₱160 + 2 × ₱50 = ₱420 | ₱63 | ₱500 | https://stardeals.ph/deals/sm-bowling |

The ₱500 allowance is for **one game per person plus shoe rental only**. It excludes transport, food, extra games, and any other attraction. The page is a current deal listing, not a guarantee of walk-in pricing; confirm rates, sock requirements, availability, and holiday restrictions with SM Bowling. Older blog posts and social comments showed different rates, so those historical prices were not used.

## Venue research batch 6 — C-ONE badminton court budgets (15 October 2026)

C-ONE Sports Center's published post dated 18 August 2026 lists Kauswagan badminton court rates of ₱110 per court/hour during weekday happy hour (8 AM–4 PM), ₱220 per court/hour from 4 PM to midnight, and ₱220 per court/hour on weekends and holidays. Budgets below add a 15% cushion and round up. This is a recently published social-directory repost of the operator's post, not direct confirmation of today's rate.

| Planner option | Court-rate basis | 15% cushion | Planner budget for two |
|---|---:|---:|---:|
| C-ONE weekday happy hour — one court for one hour | ₱110 | ₱16.50 | ₱150 |
| C-ONE evening/weekend — one court for one hour | ₱220 | ₱33 | ₱300 |

Source: [C-ONE Sports Center listing and August 2026 rate post](https://www.findglocal.com/PH/Cagayan-de-Oro/472616319967282/C-ONE-Sports-Center). [Booking page](https://c-one.bookingdyno.com/). These budgets cover the court only for one hour, not rackets, shuttlecocks, transport, food, or additional time. The SM City CDO Uptown branch has separate pickleball and badminton pricing, so these Kauswagan rates must not be applied to the Uptown branch. Confirm current prices, court type, branch, equipment availability, and booking slots before visiting.

## Venue research batch 7 — Dahilayan Adventure Park rides (15 October 2026)

The official Dahilayan Adventure Park website lists a ₱100 entrance fee, the 840m zipline at ₱500 per person, and the Razorback mountain coaster at ₱400 for a single ride. Budgets below add a 15% cushion and round up.

| Planner option | Published-rate calculation for two | 15% cushion | Planner budget |
|---|---:|---:|---:|
| 840m zipline date | 2 × ₱100 entrance + 2 × ₱500 zipline = ₱1,200 | ₱180 | ₱1,400 |
| Razorback mountain coaster date | 2 × ₱100 entrance + 2 × ₱400 single rides = ₱1,000 | ₱150 | ₱1,200 |

Sources: [Official ride-rate page](https://www.dahilayanadventurepark.com/rides) and [official home page](https://www.dahilayanadventurepark.com/). These estimates cover the listed entrance and one ride per person only. They do not include transport from CDO, food, environmental or incidental fees not stated on the current official pages, or other attractions. Confirm operating status, ride restrictions, weather-related changes, and current rates before travelling.
