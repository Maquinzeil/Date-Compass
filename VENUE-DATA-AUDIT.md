# Date Compass Venue and Activity Data Audit

Last reviewed: 2026-10-17  
Scope: Cagayan de Oro and Misamis Oriental, Philippines  
Purpose: track the evidence behind recommendations so estimates are not presented as confirmed venue prices or availability.

## Evidence tracker snapshot — 17 October 2026

These are **record counts, not counts of unique venues**. A venue may appear in both the priced planner records and the research directory.

| Evidence level | Current count | What the count means | What it does not mean |
|---|---:|---|---|
| Source-backed food planner budgets | 49 | Food/date options have a source URL, item-price basis, a two-person planning budget, check date, and caveat in `js/venue-data.js`. | Not every amount is a dine-in price; some come from branch-specific delivery menus and may vary by branch or promotion. |
| Source-backed activity planner budgets | 26 | Activity options have a source URL, price basis, planning budget, check date, and caveat in `js/venue-data.js`. | Does not guarantee live availability, current walk-in pricing, equipment inclusion, or booking. |
| **Source-backed priced planner records (food + activities)** | **75** | 49 food records + 26 activity records. | These are evidence-backed planning estimates, not automatically fully verified venue recommendations. |
| **Directly confirmed complete-price-and-availability records** | **0** | No record currently has direct venue confirmation of a complete current cost and date-specific availability documented in this audit. | A current menu, published rate, or third-party listing does not confirm a future slot or every extra charge. |
| Venue directory / research records | 53 | Named venue leads have a location/research source, Maps link, and explicit status in the directory. | Directory inclusion alone does not make a venue a priced planner recommendation. |

### Status labels to use consistently

1. **Source-backed planning estimate:** the source supports a price basis, but branch variation, a third-party menu, an older post, required extras, or current availability still needs confirmation.
2. **Current operator-published rate:** a venue's own current rate page supports the listed rate; still confirm the slot, included equipment, restrictions, and any extra charges before visiting.
3. **Directory-only / price unverified:** venue research is useful, but there is not enough reliable price evidence to recommend a fixed venue budget. Keep it out of source-backed priced recommendations until evidence is captured.
4. **Generic activity estimate:** DIY or at-home activities can use planning estimates, but they are not venue-price verification.

Before launch, review the **65 priced records individually** for source freshness and whether every cost component is included. Do not mark a record “fully verified” merely because it has a URL.

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

## Venue research batch 8 — Dahilayan Forest Park ride budgets (15 October 2026)

Dahilayan Forest Park Resort's official rides page lists entrance at ₱150 per person, a guided buggy at ₱1,400 for two riders, and ATV at ₱850 per person. Budgets below add a 15% cushion and round up. Entrance is treated as a separate charge because the page lists it separately from the rides.

| Planner option | Published-rate calculation for two | 15% cushion | Planner budget |
|---|---:|---:|---:|
| Buggy trail adventure for two | ₱1,400 buggy + 2 × ₱150 entrance = ₱1,700 | ₱255 | ₱2,000 |
| ATV adventure for two | 2 × ₱850 ATV + 2 × ₱150 entrance = ₱2,000 | ₱300 | ₱2,300 |

Sources: [Official rides and activities page](https://www.dahilayanforestpark.com/en/rides-activities), [official home page](https://www.dahilayanforestpark.com/en/), and [official reservation page](https://www.dahilayanforestpark.com/en/reservation). The buggy listing states a 140kg combined driver/passenger limit. Estimates exclude transport from CDO, food, other attractions, and any incidental fees not stated on the official page. Confirm current rates, requirements, and availability before travelling.

## Venue research batch 9 — Dahilayan Forest Park multi-ride package (15 October 2026)

The official rides page lists a ₱900 rides package and a separate entrance fee of ₱150 per person. The planner estimates two packages plus two entrance fees, adds a 15% cushion, and rounds up.

| Planner option | Published-rate calculation for two | 15% cushion | Planner budget |
|---|---:|---:|---:|
| Forest Park multi-ride package for two | 2 × ₱900 package + 2 × ₱150 entrance = ₱2,100 | ₱315 | ₱2,500 |

Source: [Official Dahilayan Forest Park rides and activities page](https://www.dahilayanforestpark.com/en/rides-activities). Because the page lists entrance separately from the package, this estimate assumes the two fees are charged separately; confirm this with the operator before visiting. Confirm the included rides, operating status, restrictions, and availability. Transport from CDO, food, and other extras are excluded.


## Venue research batch 10 — CDO cafes, indoor games, and heritage stop (15 October 2026)

This batch expands the research directory without inventing menu prices. The following locations have been identified for future planner use; where an official price list was not available, the venue is listed for research only and is not treated as a priced recommendation.

| Venue | Evidence found | Price handling | Source |
|---|---|---|---|
| H Proper Coffee Roasters — Pueblo | Official location page confirms the CDO branch at Blu Energy, Masterson Avenue, Pueblo de Oro, with contact details and hours. An official CDO menu magazine is linked for follow-up. | Cafe food/drink prices were not verified from that menu in this pass. Do not add a budget until item prices are captured. | [Official location page](https://www.hproper.com/pages/location) · [Official CDO menu magazine](https://cdn.shopify.com/s/files/1/0807/3720/6487/files/CDO_H_PROPER_MENU_MAGAZINE_ISSUE4_MARCH_2026.pdf?v=1776259188) |
| Elbs Cafe — Kauswagan | Official website lists the Tuscania Commercial Building location and menu categories. | Current item prices were not captured; confirm directly before budgeting. | [Official menu page](https://www.elbscafe.com/menu) |
| Milestone Coffee + Kitchen Uptown | Official social page identified; current business listings show the Beacon Avenue / Pueblo de Oro branch. | Third-party menu prices are not treated as verified dine-in prices. Confirm directly. | [Official Facebook page](https://www.facebook.com/milestonecoffee.ph) |
| SM Game Park — SM CDO Downtown | Google Maps listing search identifies the indoor games venue on Level 4. | No current rate card verified. Do not add a priced activity until current rates are confirmed. | [Google Maps search](https://www.google.com/maps/search/?api=1&query=SM+Game+Park+SM+CDO+Downtown) |
| Duaw Park | City Tourism included Duaw Park among the stops in a 2026 downtown heritage walking tour. | No admission price is asserted. The new ₱100 planner idea is only a sample incidental allowance for two, not a published fee; transport, food, event costs, and purchases are excluded. | [City Tourism heritage-walk report](https://cdo.cagayandeoro.gov.ph/index.php/item/4004-2-day-heritage-walking-tour-gipasiugdahan-sa-city-tourism.html) |

The new planner idea is **Duaw Park and downtown heritage stroll**. Its ₱100 amount is clearly described as a sample incidental allowance rather than a verified venue fee. No source-backed food or cafe budget was added in this batch because current official item prices were not captured.


## Venue research batch 11 — Raki-Yata SM Premier Downtown (15 October 2026)

Added a separate SM Premier Downtown branch record rather than reusing the SM City Northwing prices. The branch-specific Foodpanda menu lists regular Tonkotsu Shoyu at ₱705 and California Maki at ₱235; temporary 20% app discounts were visible when checked. The planner deliberately uses regular listed prices, adds a 15% cushion, and rounds up.

| Planner option | Regular menu basis for two | 15% cushion | Planner budget |
|---|---:|---:|---:|
| Two Tonkotsu Shoyu ramen bowls | 2 × ₱705 = ₱1,410 | ₱211.50 | ₱1,650 |
| Two Tonkotsu Shoyu + shared California Maki | 2 × ₱705 + ₱235 = ₱1,645 | ₱246.75 | ₱1,950 |

Source: [Foodpanda Raki-Yata Ramen House — SM Premier Downtown CDO menu](https://www.foodpanda.ph/restaurant/vszj/raki-yata-ramen-house-sm-premier-downtown-cdo). Google Maps discovery link: https://www.google.com/maps/search/?api=1&query=Raki-Yata+Ramen+SM+Premier+Downtown+Cagayan+de+Oro.

These are delivery-menu list-price references, not confirmed dine-in prices. The budget excludes transport and delivery fees, and does not imply current item availability or a reservation. Check the branch before visiting.


## Venue research batch 10 — Museo de Oro admission and interim hours (checked 15 October 2026)

Xavier University's official Museo de Oro notice published on 24 March 2026 says the interim schedule remains in effect **until further notice**:

- Monday: 8:00 AM–12:00 PM
- Tuesday–Thursday: 8:00 AM–12:00 PM and 1:00–6:00 PM
- Friday: 8:00 AM–12:00 PM and 1:00–5:00 PM
- Saturday and Sunday: closed

The university's latest admission-rate notice found in this pass was published on 16 August 2025. It lists regular admission at ₱100 per person, XU students/personnel at ₱30, XU alumni at ₱75, and non-XU students, senior citizens, and PWDs at ₱50. **These are the last published rates found, not a verified current 2026 fee.** The planner now uses ₱250 for two as a conservative planning allowance (based on two regular admissions plus a cushion), clearly marked for confirmation rather than a guaranteed current price.

Contact listed by Xavier University for booking/confirmation: 853-9800 local 9267 or 9269.

Sources:
- [Official interim hours notice, published 24 March 2026](https://www.xu.edu.ph/xavier-ateneo-bulletin/8034-interim-museum-hours-032026)
- [Official admission fee notice, published 16 August 2025](https://www.xu.edu.ph/xavier-ateneo-bulletin/7497-admission-fee-rates-and-schedule-museo-de-oro-xcca)

Implementation: planner description and source evidence now show the interim hours, conservative two-person budget, date checked, both official links, and the need to confirm current admission fees before visiting. This is not live availability or a booking.


## Venue research batch 12 — Higala Ridge Food & Park (checked 15 October 2026)

Added **Higala Ridge Food & Park** to the venue directory based on the Facebook page supplied by the project owner and a current business listing.

- **Location:** Upper Sumpong, Barangay Indahag, Cagayan de Oro City, Misamis Oriental.
- **Date fit:** scenic hilltop viewpoint and casual food/coffee stop; potentially useful for a sunset date, subject to weather and access.
- **Contact:** a business listing shows +63 948 324 5407; confirm that the number is current before relying on it.
- **Hours:** a business listing reports roughly 9:30 AM to midnight daily. This is not yet confirmed against a current official post, so check the venue's page directly before visiting.
- **Price status:** entrance fee, menu prices, and any minimum spend are not verified. The venue is recorded for research but is **not yet a priced planner recommendation**. Do not assign an invented budget.
- **Map:** [Google Maps search](https://www.google.com/maps/search/?api=1&query=Higala+Ridge+Food+%26+Park+Upper+Sumpong+Indahag+Cagayan+de+Oro).
- **Social source:** [Higala Ridge Food & Park on Facebook](https://www.facebook.com/higalaridgefoodandpark).

Next verification step: inspect recent posts from the official Facebook page for entrance/parking fees, food and drink prices, current operating hours, road/access notes, and any minimum spend. If those are not published, contact the venue directly. Only then should a realistic two-person budget and activity entry be added to the planner.


## Venue research batch 13 — QSports Club indoor basketball (checked 17 October 2026)

The official QSports Club website lists a full-size indoor basketball court at **₱600 per hour**. The planner budget for two is one court-hour plus a 15% cushion: ₱600 × 1.15 = ₱690, rounded up to **₱700**.

- **Planner option:** QSports Club indoor basketball date for two.
- **Included in the estimate:** one indoor basketball court for one hour only.
- **Not included / still to confirm:** transport, food, any equipment rental, booking rules, and live court availability.
- **Source:** [QSports Club official rates and booking page](https://www.qsportscdo.com/).
- **Location:** Upper Canitoan, Cagayan de Oro; [Google Maps search](https://www.google.com/maps/search/?api=1&query=QSports+Club+Upper+Canitoan+Cagayan+de+Oro).

This is a source-backed planning estimate, not a booking or guarantee of availability.


## Venue research batch 14 — Kagay-an Coffee Cartel menu options (checked 17 October 2026)

Added two separate, branch-matched food ideas instead of mixing prices from different locations:

| Planner option | Published menu basis for two | 15% cushion | Planner budget | Evidence status |
|---|---:|---:|---:|---|
| Kagay-an Coffee Cartel Hayes Street: two Americanos | 2 × ₱110 (240ml Americano) = ₱220 | ₱33 | ₱300 | Cartel Brew online menu; confirm dine-in price and availability |
| Kagay-an Coffee Cartel Nazareth: tuna rice bowls for two | 2 × ₱170 = ₱340 | ₱51 | ₱400 | Nazareth branch delivery menu; dine-in price may differ |

Sources: [Cartel Brew online menu](https://kagayan-coffee-cartel.catalog.kyte.site/cartel-brew) and [Foodpanda Kagay-an Coffee Cartel — Nazareth menu](https://www.foodpanda.ph/restaurant/t9sf/kagay-an-coffee-cartel).

These are menu-backed planning estimates, not guaranteed dine-in totals. Drinks are not included in the tuna-rice-bowl option; food is not included in the Americano-only option. Transport, delivery fees, and any service charges are excluded. Confirm the exact branch, current prices, and item availability before visiting.


## Venue research batch 15 — indoor activity leads and price confidence (checked 17 October 2026)

This pass adds three indoor activity leads to `venueDirectory`. They are **directory-only**, not newly priced planner recommendations, because the price evidence is not yet strong enough for a reliable two-person budget.

| Venue | Evidence found | Current handling |
|---|---|---|
| Pcklpark — Puntod | Third-party court directory lists indoor full-size courts at ₱350/hour and paddle rental at ₱100. | Do not promote as a verified planner budget until the venue confirms the current rate and whether rental is per paddle, pair, or court. [Listing](https://pickleboard.co/ph/courts/northern-mindanao/cagayan-de-oro/pcklpark) |
| Dink Xcape Pickle Hub — Camaman-an | Local reporting and a booking directory identify the indoor venue; third-party prices differ (about ₱350–₱360/hour). | Price conflict remains unresolved. Check the venue's own current booking page or contact before adding a budget. [Booking directory](https://www.dinkbook.app/) · [Local opening report](https://metrocdodev.com/2026/06/07/random-shots-first-look-inside-dink-xcape-picklehub-opens-tomorrow-june-8/) |
| Timezone Centrio — Centrio Mall | Official branch page confirms the 3rd-floor location and operating hours of 10 AM–9 PM daily. | Current game-credit and attraction prices are not on the reviewed branch page; keep directory-only. [Official branch page](https://www.timezonegames.com/en-ph/locations/mindanao/timezone-centrio/) |

### Indoor activity research priority

1. Get branch-specific, current prices from official booking pages or operators for bowling, badminton, pickleball, billiards, and arcade credits.
2. Calculate budgets for two only when the unit and inclusions are clear; add the existing 15% planning cushion and state exclusions.
3. Keep conflicting third-party rates and venues without current prices in the directory, not in the priced recommendation count.
4. After this pass, return to cafés and fast food for additional branch-specific options and two-person budgets.


## Venue research batch 16 — reconcile pickleball rates and add operator-priced court option (checked 17 October 2026)

This pass reconciles conflicting Pickle World Limketkai rates instead of silently treating one listing as definitive, and adds a separate Fliqshot court-hour planning estimate from the operator's own booking page.

| Planner option | Evidence and calculation | Budget | Handling |
|---|---|---:|---|
| Pickle World Limketkai — one court-hour | Dinky lists ₱400/hour, Pickleheads lists about ₱415/hour, and PickleHub lists ₱500/hour. Using the highest listed rate: ₱500 + 15% (₱75) = ₱575. | ₱600 | Conservative allowance only; listings conflict. Confirm actual current rate, equipment terms, and availability directly. [Dinky](https://www.dinky.ph/courts/pickle-world-limketkai) · [PickleHub](https://picklehub.ph/pickle-world-limketkai?tab=home) · [Pickleheads](https://www.pickleheads.com/courts/ph/northern-mindanao/cagayan-de-oro-city/pickle-world-limketkai) |
| Fliqshot Pickleball Courts — one court-hour | Operator booking page lists courts from ₱350/hour. ₱350 + 15% (₱52.50) = ₱402.50. | ₱450 | Source-backed planning estimate; confirm the selected court type, equipment rental, booking slot, and current price. [Official booking page](https://fliqshot.ph/) |

Both estimates cover one court-hour only, not equipment rental, transport, food, or extra time. The Fliqshot page identifies three courts and a booking flow; it does not justify claiming a particular slot is available. The conservative Pickle World estimate deliberately uses the highest current third-party rate found because the sources disagree.

### Next research priorities

1. Verify operator-published badminton, billiards, and bowling rates and equipment inclusions; do not treat historical social posts as direct confirmation.
2. Continue branch-matched café and fast-food research, prioritizing current item-level menu prices and clear budgets for two.
3. Keep the 15% buffer, explicit exclusions, source date, and evidence-status wording on each new priced planner idea.


## Venue research batch 17 — evidence tracker correction and McPars billiards availability caveat (checked 17 October 2026)

The evidence tracker had a stale activity count: the current dataset contains **40 food records + 16 activity records = 56 source-backed planning records**. This is a count correction only; it does not increase the number of fully verified venues. The count of records with directly confirmed complete current price **and** date-specific availability remains **0**.

### Indoor activity lead: McPars billiards

McPars Sports Center's own website lists billiards at **₱250 per table per hour**, which would produce a provisional two-person court/table budget of ₱300 for one hour after a 15% cushion (₱250 × 1.15 = ₱287.50, rounded up). However, the same site marks billiards as **opening soon / reservations not yet open**, and its payment notice says online payment is paused. Therefore, **do not add billiards as an active priced planner recommendation yet**. Keep the venue in the directory, with the operational-status caveat, until the operator confirms the tables are open and bookable.

- **Source:** [McPars Sports Center official website](https://mcpars.com/).
- **Published rate basis:** ₱250 per table-hour; equipment, current operating status, and booking availability are not confirmed.
- **Current handling:** directory lead only; no planner budget published while the activity is marked unavailable/not yet open.
- **Next check:** revisit the operator page or contact McPars before activating the billiards recommendation.

This is an example of why price evidence and availability evidence must be tracked separately: a posted rate does not mean the activity can currently be booked.


## Venue research batch 18 — Sunnyside Coffee and Roastery, Nazareth branch (checked 17 October 2026)

Added three branch-specific café plans using the Nazareth branch's current delivery-menu listing. To avoid relying on temporary discounts, calculations use the regular prices shown on the listing and apply the standard 15% planning cushion.

| Planner option for two | Listed menu basis | Calculation | Budget |
|---|---|---|---:|
| Two Americanos | 2 × ₱150 | ₱300 + 15% = ₱345 | ₱350 |
| Two Americanos + one grilled three-cheese sandwich to share | 2 × ₱150 + ₱355 | ₱655 + 15% = ₱753.25 | ₱800 |
| Two Cafe Lattes + two cookies | 2 × ₱210 + 2 × ₱150 | ₱720 + 15% = ₱828 | ₱850 |

- **Branch:** Sunnyside Coffee and Roastery — Nazareth, 11 30th Street, Cagayan de Oro.
- **Source:** [Foodpanda Nazareth branch menu](https://www.foodpanda.ph/restaurant/kjon/sunnyside-coffee-and-roastery-nazareth).
- **Evidence status:** branch-specific delivery-menu prices, not guaranteed dine-in prices. The listing may show app promotions; these estimates use the regular listed prices. Transport, delivery fees, and any dine-in price difference are excluded.
- **Current tracker totals:** 43 food records + 16 activity records = **59 source-backed planning records**. Directly confirmed complete current price-and-date-specific-availability records remain **0**.

This is a planning estimate batch, not confirmation of menu stock, dine-in pricing, or table availability. Confirm the branch and current prices before visiting.


## Venue research batch 19 — Chowking SM CDO Premier branch menu (checked 17 October 2026)

Added two branch-specific fast-food date options using the Chowking SM CDO Premier delivery-menu listing.

| Planner option for two | Published branch menu basis | 15% cushion | Planner budget |
|---|---:|---:|---:|
| One-piece Chinese-style fried chicken meals with drinks | 2 × ₱140 = ₱280 | ₱42 | ₱350 |
| Chinese-style fried chicken lauriat with drinks | 2 × ₱263 = ₱526 | ₱78.90 | ₱650 |

- **Source:** [Foodpanda Chowking SM CDO Premier menu](https://www.foodpanda.ph/restaurant/s9vr/chowking-sm-cdo-premier).
- **Evidence status:** branch-specific delivery-menu listing, not a guaranteed dine-in price or proof of item stock. Confirm the current menu and inclusions before visiting. Transport and delivery fees are excluded.
- **Updated tracker total:** 45 food records + 16 activity records = **61 source-backed planning records**. Directly confirmed complete current price-and-date-specific-availability records remain **0**.

The frontend venue-data cache token was also bumped so browsers are less likely to reuse an older cached dataset.


## Venue research batch 20 — Lonewolf Cafe and Jollibee SM CDO Premier (checked 17 October 2026)

Added four branch-specific planner options from current branch delivery-menu listings. Budgets use the regular listed menu prices and a 15% planning cushion; they are not guaranteed dine-in prices.

| Planner option for two | Published menu basis | Calculation with 15% cushion | Budget |
|---|---|---|---:|
| Lonewolf Cafe 8th Street — two hot Americanos | 2 × ₱105 = ₱210 | ₱241.50 | ₱250 |
| Lonewolf Cafe 8th Street — two iced cafe lattes | 2 × ₱160 = ₱320 | ₱368 | ₱400 |
| Jollibee SM CDO Premier — Chickenjoy with drinks | 2 × ₱110 = ₱220 | ₱253 | ₱300 |
| Jollibee SM CDO Premier — Chickenjoy with Jolly Spaghetti | 2 × ₱178 = ₱356 | ₱409.40 | ₱450 |

- **Lonewolf source:** [Foodpanda 8th Street branch menu](https://www.foodpanda.ph/restaurant/e982/lonewolf-cafe-8th-street).
- **Jollibee source:** [Foodpanda SM CDO Premier branch menu](https://www.foodpanda.ph/restaurant/a0ct/jollibee-cdo-sm-premier).
- **Evidence status:** branch-specific delivery-menu listings; dine-in prices, item stock, and current availability are not confirmed. Transport and delivery fees are excluded.
- **Updated tracker total:** 49 food records + 16 activity records = **65 source-backed planning records**. Directly confirmed complete current price-and-date-specific-availability records remain **0**.

### Indoor activity status check

The current Sparrk listing for C-ONE Badminton Courts Kauswagan labels the venue **Temporarily Closed**, despite an operator-posted August 2026 rate notice. The directory now flags this conflict and directs maintainers to confirm operating status before travelling. The existing planner entries remain provisional and should not be described as confirmed bookable slots. Source: [C-ONE Kauswagan booking listing](https://www.sparrk.ph/c-one-sports-center/space/c-one-badminton-courts-kauswagan).

No new arcade or billiards budget was added in this batch: the reviewed Timezone Centrio branch page does not publish current per-game credit prices, and McPars billiards' operational status remains ambiguous. This avoids manufacturing a price just to increase the count.


## Venue research batch 21 — outdoor activities in Misamis Oriental and CDO (checked 17 October 2026)

Added five outdoor activity options to the planner: four operator-published rate options at Dahilayan Forest Park Resort in Manolo Fortich (tandem Forest Luge, mini-golf, Forest Canopy Walk, and Rainbow Slide) plus a third-party-listed outdoor rooftop pickleball session at Country Village Hotel in Cagayan de Oro.

| Planner option for two | Published price basis | 15% cushion | Planner budget |
|---|---:|---:|---:|
| Dahilayan Forest Park tandem Forest Luge | ₱850 tandem ride + ₱300 assumed separate entrance = ₱1,150 | ₱172.50 | ₱1,400 |
| Dahilayan Forest Park mini-golf | 2 × ₱50 + ₱300 assumed separate entrance = ₱400 | ₱60 | ₱500 |
| Dahilayan Forest Park canopy walk | 2 × ₱80 + ₱300 assumed separate entrance = ₱460 | ₱69 | ₱550 |
| Dahilayan Forest Park Rainbow Slide | 2 × ₱150 + ₱300 assumed separate entrance = ₱600 | ₱90 | ₱700 |
| Country Village Hotel rooftop pickleball | 2 × ₱100/person = ₱200 | ₱30 | ₱250 |

- **Dahilayan Forest Park source:** [Official rides and activities page](https://www.dahilayanforestpark.com/en/rides-activities). The page lists ₱150 entrance per person, but these estimates deliberately treat entrance as a separate charge; confirm whether each activity price includes admission and which rides are operating before travelling.
- **Country Village source:** [PlayPickle.ph listing](https://playpickle.ph/courts/northern-mindanao/cdo-pickleball), a third-party directory updated August 2026. Its listed ₱100/person rate and Tue/Thu/Sat/Sun 3–6 PM schedule are not direct venue confirmation; contact the hotel/club before relying on them.
- Budgets exclude transport from CDO and food. These are source-backed planning estimates, not confirmed date-specific bookings.
- **Updated tracker total:** 49 food records + 21 activity records = **70 source-backed planning records**. Directly confirmed complete current price-and-date-specific-availability records remain **0**.

No prices were invented for outdoor options whose current operator rates could not be confirmed. Further research can expand outdoor options across CDO, coastal Misamis Oriental, and nature/adventure destinations, while keeping directory-only venues separate from priced planner recommendations.


## Venue research batch 22 — waterfall, climbing, and billiards (checked 17 October 2026)

Five new source-backed activity records were added to the planner in this research cycle: Kilobag Falls (outdoor, Claveria), Climb Anytime (indoor, Limketkai Mall), TBC Billiards, and two Seven Seas Waterpark ticket configurations. McPars billiards remains directory-only because the operator page has conflicting operational signals and needs direct confirmation.

| Planner option for two | Published price basis | 15% cushion | Planner budget | Evidence level |
|---|---:|---:|---:|---|
| Kilobag Falls entrance | 2 × ₱200 adult admission = ₱400 | ₱60 | ₱500 | Provincial government page |
| Seven Seas Waterpark entrance and swim | 2 × ₱599 = ₱1,198 | ₱179.70 | ₱1,400 | Official operator FAQ; swim only, slides extra |
| Seven Seas Waterpark entrance, swim, and unlimited slides | 2 × (₱599 + ₱349) = ₱1,896 | ₱284.40 | ₱2,200 | Official operator FAQ; transport/food excluded |
| TBC Billiards, three hours | ₱300 published promo | ₱45 | ₱350 | Third-party listing reproducing venue posts; promotion must be confirmed |
| Climb Anytime, starting rate | 2 × ₱150 = ₱300 | ₱45 | ₱350 | Third-party directory reproducing social post; inclusions must be confirmed |

Sources: [Misamis Oriental provincial government — Kilobag Falls](https://www.misamisoriental.gov.ph/spot-of-the-day-kilobag-falls/); [McPars Sports Center official rates](https://mcpars.com/); [TBC Billiards listing and rate posts](https://www.findglocal.com/PH/Cagayan-de-Oro/516935814844454/TBC-Billiards); [Climb Anytime listing](https://www.findglocal.com/PH/Cagayan-de-Oro/991667607367490/Climb-Anytime).

Kilobag Falls' budget covers entrance only; transport from CDO, food, guides, parking, and other costs are not included. McPars covers one table for one hour. TBC's three-hour promo and Climb Anytime's ₱150 starting price are not guaranteed all-in rates; confirm before visiting. All estimates include a 15% cushion and do not imply date-specific availability.

### Evidence classification rule

- **Operator-published**: the venue's own site or an official venue post publishes the rate. Still confirm current operation, inclusions, and availability.
- **Government-published**: a government tourism page publishes the admission rate; this does not confirm transport or local service costs.
- **Third-party listing/social-post reproduction**: useful evidence lead, but promo status, inclusions, and current rates require direct venue confirmation.
- **Directory-only**: keep out of priced planner recommendations until a defensible price basis is found.

**Updated tracker total:** 49 food records + 26 activity records = **75 source-backed planning records**. Directly confirmed complete current price-and-date-specific-availability records remain **0**.


### Additional outdoor batch — Seven Seas Waterpark, Opol (17 October 2026)

The operator FAQ lists entrance-and-swim at ₱599/person and the unlimited all-slides add-on at ₱349/person. The planner now offers both configurations so the base ticket is not mistaken for full slide access:

- Swim-only: 2 × ₱599 = ₱1,198; plus 15% = ₱1,377.70; planning budget **₱1,400** for two.
- Swim + unlimited slides: 2 × (₱599 + ₱349) = ₱1,896; plus 15% = ₱2,180.40; planning budget **₱2,200** for two.

Official source: [Seven Seas Waterpark FAQ](https://www.sevenseaswaterparkresort.com/faq). Budgets exclude food, transport, lockers, and other extras. Confirm hours, ride operations, and ticket conditions before visiting.


## Venue research batch 23 — outdoor/coastal directory leads (checked 17 October 2026)

Added four research-directory entries without adding them to the selectable planner:

- **Initao–Libertad Protected Landscape and Seascape** — the Initao local-government FAQ identifies coastal eco-tourism, snorkeling/diving, beaches, hiking, and birdwatching; the DENR Protected Area Information System records the protected landscape/seascape. No reliable current 2026 entry or activity tariff was verified. Sources: [Initao local-government FAQ](https://elgu-initao-misamis-oriental-news.e.gov.ph/faq), [DENR Protected Area Information System](https://pais.bmb.gov.ph/home/info/DENRRX00003).
- **Sinulom Falls and Bolao Cold Spring** — public tourism references identify the attraction, but older fee pages conflict with current map information. No current authoritative 2026 fee schedule was verified. Source: [Cagayan de Oro City ecological profile](https://www.cagayandeoro.gov.ph/index.php/transparency-report/transparency-reports.html?download=83%3Acdeo-ecological-profile&start=20).
- **F.S. Catanico Falls** — listed in city tourism references and current map listings; no current official 2026 entrance fee was verified. Source: [Cagayan de Oro City ecological profile](https://www.cagayandeoro.gov.ph/index.php/transparency-report/transparency-reports.html?download=83%3Acdeo-ecological-profile&start=20).
- **Mapawa Nature Park** — a forest-and-waterfall destination listed in city tourism references; current admission, activity packages, and operating details need direct confirmation. Source: [Cagayan de Oro City ecological profile](https://www.cagayandeoro.gov.ph/index.php/transparency-report/transparency-reports.html?download=83%3Acdeo-ecological-profile&start=20).

These are **directory-only leads**, not priced or bookable recommendations. Do not reuse historical online entrance fees as current prices. Before promotion, verify the operator/contact, current admission and activity costs, hours, access/road conditions, weather restrictions, and a usable map pin.

### Indoor research disposition

- **Timezone Centrio:** the official branch page confirms the 3rd-floor location and daily 10 AM–9 PM hours, but does not publish current per-game credit prices. Keep it directory-only until a useful current spending reference can be established.
- **SM Bowling:** the current StarDeals page (valid into December 2026) shows a discounted voucher and a ₱160 regular value per game, plus ₱50 shoe rental. The planner intentionally budgets using the regular value and rental rather than relying on a promotion; walk-in price and lane availability still need confirmation.
- **C-ONE Kauswagan:** the operator's 18 August 2026 post publishes ₱110/hour weekday happy-hour court rates and ₱220/hour evening/weekend rates. The booking listing currently displays hourly slots/rates as well, so the earlier temporary-closure signal appears stale or conflicting. Keep the estimate provisional until the intended date/branch is confirmed with the operator; don't claim a specific booking is secured.
- **Spin City, Sploop!, and World of Fun:** added to the directory based on the current Limketkai tenant directory and/or the World of Fun operator's branch list. Spin City rates found online are from March 2025 and Sploop! rate coverage is from December 2022; World of Fun's historical token data is older still. All three remain directory-only until current per-game/session prices are verified.

The new arcade leads do not change the source-backed planner totals because they are deliberately excluded from the priced planner. Automated Chromium smoke checks are being added to CI, but manual live-browser and accessibility checks remain open.


## Venue research batch 24 — indoor arcades and price freshness (checked 17 October 2026)

Added three indoor arcade/recreation leads to the directory only:

- **Spin City, Limketkai Center:** the current mall directory lists the tenant at the 2nd level; a March 2025 local article reported opening rates, but those are too old to present as October 2026 pricing. Verify session length, admission, skate rental, and safety gear directly. [Limketkai Mall directory](https://www.limketkaimall.com/stores/), [March 2025 rate coverage](https://metrocdodev.com/2025/03/12/random-shots-spin-city-sneak-peek-and-skating-rates/).
- **Sploop! VR Arcade:** the current mall directory lists the tenant. The price coverage found was from December 2022, so no historic ride price was copied into the planner. Verify per-ride rates, ride availability, and any reload/card minimum directly. [Limketkai Mall directory](https://www.limketkaimall.com/stores/), [December 2022 local coverage](https://metrocdodev.com/2022/12/20/random-shots-sploop-1st-vr-theme-park-and-arcade-in-cagayan-de-oro-now-open/).
- **World of Fun, Limketkai:** the operator's current locations page lists the Limketkai Mall branch, and the mall directory identifies its floor. Historical token rates are not suitable as current price evidence. Verify the current card/token packages and game-credit costs before budgeting. [Operator branch list](https://www.worldoffun.com.ph/locations), [Limketkai Mall directory](https://www.limketkaimall.com/stores/).

No current branch-specific rate was found for these three in this research pass; they are not selectable priced recommendations.

### Browser verification automation

Added a separate Playwright/Chromium smoke workflow to exercise the local static frontend on desktop and mobile, test the Build a Date and Surprise Me flows, check the contact form labels, and detect uncaught JavaScript errors or failed same-origin assets. This is useful real-browser automation, but it does **not** replace manual live-site inspection, cross-browser testing, keyboard-only/accessibility review, contrast review, or reduced-motion checks. Do not mark the Phase 1 exit gate complete until those checks are actually performed.


### Browser smoke regression — budget field

The first real Chromium run exposed a budget-input blur/change race: the immediate `render()` could replace the planner button before its click handler ran. The input now calls `commitBudget()`, which updates the state and defers the render until after the active click event. The automated browser workflow is being rerun to verify the correction.
