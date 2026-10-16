# Date Compass venue-data playbook

This project uses `js/venue-data.js` as the source-backed data layer for venue research and selected priced recommendations. Keep it separate from the planner logic in `js/app.js` so new cafés, fast-food branches, and date venues can be added without redesigning the frontend.

## The three data lists

- `venueDirectory`: research directory for named places. It is okay for prices to be unknown here, but every entry must clearly state the venue and price verification status.
- `foodIdeas`: menu-based date options shown by the planner. Only add a priced option when there is a source for the selected branch and menu item. The `c` value is the conservative estimated budget for two, not necessarily the published menu subtotal.
- `activityUpdates`: source-backed budget/evidence updates for existing activity names in `js/app.js`. The `n` field must exactly match an existing planner activity name.

## Adding a venue to `venueDirectory`

Every record must include:

- `name`, `category`, and `area`
- `mapUrl`: a Google Maps search link for the named venue and area
- `sourceUrl`: the best source found for the venue; prefer an official website, official social page, operator page, or reliable institutional source
- `venueStatus`: what the source actually confirms and what remains uncertain
- `priceStatus`: explicit price status, including whether current prices are unknown
- `checkedOn`: date the source was reviewed, in `YYYY-MM-DD` format

Optional fields may include `menuUrl`, `priceSourceUrl`, `socialUrl`, `contact`, and `hoursStatus`. Treat Google Maps links as discovery links, not proof of current hours, prices, or availability.

## Adding a food or café option to the planner

1. Verify the exact branch and a current menu source. Prefer the venue's official menu; a branch-specific delivery menu can be used only when clearly labelled as a delivery-menu reference.
2. Record the exact item prices and calculate the estimate for two. Keep the calculation in `priceBasis`; do not silently treat delivery prices as dine-in prices.
3. Add a reasonable cushion to the subtotal and round the planner budget up. The existing source-backed menu options use a 15% cushion unless the evidence note explains otherwise.
4. Include `sourceUrl`, `sourceLabel`, `priceStatusLabel`, `priceBasis`, `priceNote`, `venueName`, `venueUrl`, and `checkedOn`.
5. Keep the description and note honest about exclusions such as transport, delivery fees, promotions, minimum spend, or item availability.
6. Add a corresponding test when adding or changing a source-backed planner option.

Do not add a made-up price to make a venue fit a budget. If prices are not verified, leave it in `venueDirectory` as research-only until there is enough evidence to create a responsible planner estimate.

## Verification rules

- A source link proves only what that source actually says.
- A map listing can help locate a place, but does not establish current prices or opening hours.
- A published menu price may still differ by branch, delivery platform, promotion, or date.
- Do not claim live availability, booking, or payment functionality.
- Recheck prices, hours, contacts, and operating status before launch and after material changes.
- Update `checkedOn` whenever a record is re-reviewed. Do not refresh the date just because a file was edited.
- Keep the site's existing disclaimer: venue details, costs, travel requirements, and availability are not guaranteed; users should confirm details before going.

## Tests

The Phase 1 smoke suite checks that venue-directory records have unique names, Maps links, research sources, venue and price status, and a review date. Source-backed price records are also checked for their evidence fields and matching planner entries. These tests protect data structure and wording; they do not independently verify the truth of external venue information.
