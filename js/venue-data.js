/* Source-backed seed records for Date Compass.
 * Keep prices as conservative planning budgets for two, not guaranteed checkout totals.
 * Recheck the source before launch and whenever a price is edited.
 */
window.DATE_COMPASS_VERIFIED_DATA = {
  checkedOn: "2026-10-15",
  foodIdeas: [
    {
      n: "Jollibee CDO Divisoria: Burger Steak with fries and drink",
      m: "out", c: 400, p: "c", s: "i",
      d: "A simple fast-food meal date. The suggested budget uses two Burger Steak meals with fries and a drink, plus a 15% cushion.",
      venueName: "Jollibee CDO Divisoria",
      sourceUrl: "https://www.foodpanda.ph/restaurant/b6jj/jollibee-cdo-divisoria",
      sourceLabel: "Foodpanda CDO Divisoria menu",
      venueUrl: "https://www.foodpanda.ph/restaurant/b6jj/jollibee-cdo-divisoria",
      priceStatusLabel: "Published delivery-menu price + buffer",
      priceBasis: "2 × ₱165 = ₱330; 15% buffer = ₱379.50; rounded up to ₱400.",
      priceNote: "The listed delivery-app price may differ from dine-in, other branches, promotions, or current availability. Delivery fees are not included.",
      checkedOn: "2026-10-15"
    },
    {
      n: "McDonald's CDO Gusa: Chicken McDo with fries and drink",
      m: "out", c: 450, p: "c", s: "i",
      d: "A familiar chicken meal date. The suggested budget uses two listed meals plus a conservative cushion.",
      venueName: "McDonald's CDO Gusa",
      sourceUrl: "https://www.foodpanda.ph/restaurant/s3gl/mcdonalds-cdo-gusa",
      sourceLabel: "Foodpanda CDO Gusa menu",
      venueUrl: "https://www.foodpanda.ph/restaurant/s3gl/mcdonalds-cdo-gusa",
      priceStatusLabel: "Published delivery-menu price + buffer",
      priceBasis: "2 × ₱174 = ₱348; 15% buffer = ₱400.20; rounded up to ₱450.",
      priceNote: "This is a delivery-listing reference, not a guaranteed dine-in price. Delivery fees, platform markups, branch prices, and promotions may differ.",
      checkedOn: "2026-10-15"
    },
    {
      n: "KFC Centrio: Original Recipe Tenders Rice Meal",
      m: "out", c: 500, p: "c", s: "i",
      d: "A filling KFC meal date. The suggested budget uses two published rice meals plus a 15% cushion.",
      venueName: "KFC Centrio",
      sourceUrl: "https://www.kfc.com.ph/en/menu",
      sourceLabel: "KFC Philippines official menu",
      venueUrl: "https://www.kfc.com.ph/en/store-locator/kfc_centrio",
      priceStatusLabel: "Official menu price + buffer",
      priceBasis: "2 × ₱205 = ₱410; 15% buffer = ₱471.50; rounded up to ₱500.",
      priceNote: "The official online menu lists this meal at ₱205. Confirm the price and item availability at KFC Centrio before visiting; delivery and promotional prices may differ.",
      checkedOn: "2026-10-15"
    },
    {
      n: "KFC Centrio: Zinger Steak Fully Loaded Box",
      m: "out", c: 750, p: "c", s: "i",
      d: "A bigger fast-food treat for two. The suggested budget uses two published fully loaded boxes plus a 15% cushion.",
      venueName: "KFC Centrio",
      sourceUrl: "https://www.kfc.com.ph/en/menu",
      sourceLabel: "KFC Philippines official menu",
      venueUrl: "https://www.kfc.com.ph/en/store-locator/kfc_centrio",
      priceStatusLabel: "Official menu price + buffer",
      priceBasis: "2 × ₱315 = ₱630; 15% buffer = ₱724.50; rounded up to ₱750.",
      priceNote: "The official online menu lists this box at ₱315. Confirm the price and item availability at KFC Centrio before visiting; delivery and promotional prices may differ.",
      checkedOn: "2026-10-15"
    }
  ],
  activityUpdates: [
    {
      n: "White water rafting on the Cagayan River",
      c: 2800,
      venueName: "Kagay Outdoors",
      sourceUrl: "https://kagayoutdoors.com/",
      sourceLabel: "Kagay Outdoors official website",
      priceStatusLabel: "Operator-published rate + buffer",
      priceBasis: "Lower section: 2 × ₱1,200 = ₱2,400; 15% buffer = ₱2,760; rounded up to ₱2,800.",
      priceNote: "The operator lists the lower section at ₱1,200 per person, with transfers, gear, guides and shower fee included, and says it accepts joiners for groups under six. This estimate assumes two joiners can be accommodated. Availability is not live-confirmed; optional meals/photos and other extras cost more.",
      checkedOn: "2026-10-15"
    }
  ],
  venueDirectory: [
    {
      name: "Jollibee CDO Divisoria",
      category: "fast food",
      area: "Cagayan de Oro, Misamis Oriental",
      venueStatus: "Branch-specific menu listing found",
      priceStatus: "Delivery-menu reference; dine-in price may differ",
      sourceUrl: "https://www.foodpanda.ph/restaurant/b6jj/jollibee-cdo-divisoria",
      checkedOn: "2026-10-15"
    },
    {
      name: "McDonald's CDO Gusa",
      category: "fast food",
      area: "Gusa, Cagayan de Oro, Misamis Oriental",
      venueStatus: "Branch-specific menu listing found",
      priceStatus: "Delivery-menu reference; dine-in price may differ",
      sourceUrl: "https://www.foodpanda.ph/restaurant/s3gl/mcdonalds-cdo-gusa",
      checkedOn: "2026-10-15"
    },
    {
      name: "KFC Centrio",
      category: "fast food",
      area: "Centrio Mall, Cagayan de Oro, Misamis Oriental",
      venueStatus: "Official branch page found",
      priceStatus: "Official chain menu prices; confirm at branch",
      sourceUrl: "https://www.kfc.com.ph/en/store-locator/kfc_centrio",
      menuUrl: "https://www.kfc.com.ph/en/menu",
      checkedOn: "2026-10-15"
    },
    {
      name: "Kagay Outdoors",
      category: "outdoor activity",
      area: "Cagayan de Oro, Misamis Oriental",
      venueStatus: "Official operator website found",
      priceStatus: "Published lower-section rate; joiner availability must be confirmed",
      sourceUrl: "https://kagayoutdoors.com/",
      checkedOn: "2026-10-15"
    }
  ]
};
