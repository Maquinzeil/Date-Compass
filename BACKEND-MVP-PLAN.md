# Date Compass Backend MVP Plan

**Status:** Planning only. No backend implementation or live order/payment flow is enabled by this document.  
**Planning date:** 17 October 2026  
**Product scope:** Date Compass date planner and physical date-question kit for couples in Cagayan de Oro and Misamis Oriental.

## 1. First-release goal

Deliver one reliable, small end-to-end flow: a customer builds a date plan, optionally requests a physical kit, submits their contact and date details, pays only through a verified payment provider when configured, and the owner can review and fulfill the order. The app must keep the digital date plan separate from the ten physical question cards: the customer receives the digital plan; the ten randomly selected question cards are printed and fulfilled physically.

Do not launch real orders until payment verification, order storage, email delivery, admin access, and fulfillment handling have been tested end to end. Until then, keep the public order/checkout flow disabled or clearly marked as a non-live preview.

## 2. Recommended architecture

- Keep the existing static frontend on GitHub Pages for now.
- Add a small managed backend/API and relational database rather than building microservices.
- Use a managed authentication provider for the private owner/admin area; do not build custom password storage.
- Use a transactional email provider for order receipts and the designed digital date-plan email.
- Choose a payment provider only after confirming Philippine merchant eligibility, PHP settlement, fees, refund handling, and webhook support. Never mark an order paid based on a browser redirect alone.
- Keep secrets and provider keys on the server, never in frontend JavaScript or repository files.

**Provider selection is intentionally not finalized.** Compare available services and their Philippine business requirements before creating production accounts or implementing checkout.

## 3. First-release scope

### In scope
1. Save a submitted order with a unique reference.
2. Capture customer name, email, optional mobile number only if needed, planned date, selected plan, budget, venue/activity choices, and fulfillment notes.
3. Store a snapshot of the date plan and displayed price/terms at submission time so later venue edits do not silently rewrite an existing order.
4. Track order and payment states separately.
5. Send a confirmation email only after the backend has accepted the submission; send payment receipt / paid confirmation only after verified provider confirmation.
6. Provide a private owner view to find orders, review the plan, update fulfillment status, and record internal notes.
7. Generate the digital plan email and a print-ready internal copy containing the ten physical question-card selections.
8. Keep a minimal audit trail for important status changes and provider events.

### Explicitly out of scope for the first release
- Customer accounts and saved cross-device plans.
- Venue reservation integrations or claims of live availability.
- Automatic venue price refresh.
- Customer-facing delivery tracking.
- Complex coupons, subscriptions, loyalty, multi-vendor payments, or a mobile app.
- Automatically sending the ten physical questions to customers as a digital download; those are for the physical kit.
- Enabling paid live orders before the full checkout-to-fulfillment test passes.

## 4. Proposed data model

Use PostgreSQL (or an equivalent managed relational database) with UUID primary keys, UTC timestamps, foreign keys, and constrained status values.

### `orders`
- `id` UUID primary key; `public_reference` unique, non-sequential reference.
- `customer_name`, `customer_email`, `customer_mobile` nullable.
- `planned_date` nullable until required by the chosen product flow.
- `plan_snapshot` JSONB: chosen vibe, activities, venue references/names, budget, itinerary, and customer-facing notes at order time.
- `kit_requested` boolean; `kit_question_ids` JSONB or a normalized child table, internal-only for physical fulfillment.
- `currency` fixed to PHP for the initial local launch.
- `subtotal_minor`, `total_minor` integers in centavos; do not use floating point for money.
- `order_status`: `submitted`, `awaiting_payment`, `paid`, `preparing`, `ready`, `fulfilled`, `cancelled`, `refunded`.
- `created_at`, `updated_at`, `paid_at`, `fulfilled_at` nullable timestamps.
- Never put payment secrets, card data, or unnecessary sensitive notes in this table.

### `order_items`
- `id`, `order_id` foreign key, `item_type`, `title_snapshot`, `quantity`, `unit_amount_minor`, `line_total_minor`.
- Snapshot the purchased kit/service name and amount, even if the catalog changes later.

### `payments`
- `id`, `order_id` foreign key, `provider`, `provider_payment_id` nullable until created, `amount_minor`, `currency`, `status`, `created_at`, `updated_at`, `paid_at` nullable.
- Unique constraint on provider + provider payment ID where present.
- Payment states: `pending`, `succeeded`, `failed`, `cancelled`, `refunded`.
- Only trusted server-side verification/webhook processing can transition a payment to succeeded.

### `provider_events`
- `id`, `provider`, `provider_event_id` unique per provider, `received_at`, `processed_at` nullable, `processing_status`, minimal error detail.
- Deduplicate webhook retries by event ID and make processing idempotent.

### `order_status_events`
- `id`, `order_id`, `old_status`, `new_status`, `actor_type`, `actor_id` nullable, `created_at`, `note` nullable.
- Record meaningful status changes; never expose private owner notes to customers.

### `question_cards`
- `id`, `prompt`, `active`, `category`, `version`, `created_at`.
- Select ten active questions when the kit order is accepted; store their IDs/snapshots with the order so a later prompt edit does not change what must be printed.

A separate customer table is not required initially; the order can retain the customer details needed to fulfill it. Add reusable customer accounts only if there is a real need later.

## 5. Order and payment lifecycle

1. Frontend validates required fields for usability; backend independently validates every field and recalculates all amounts from trusted server-side configuration.
2. Backend creates an order in `submitted` or `awaiting_payment` state and returns only the public reference and safe next-step information.
3. If payment is enabled, backend creates a payment session with the provider using an idempotency key. Browser success/cancel pages are informational only.
4. Provider webhook is signature-verified, deduplicated, and checked against the expected order, currency, and amount.
5. In one database transaction, mark the payment succeeded, update the order to paid, and record the status event. A duplicate webhook must not duplicate order changes or emails.
6. Queue/send the digital date-plan email after verified payment (or according to the final confirmed product policy); record delivery attempts and allow safe retry.
7. Owner reviews the order, prints the date plan and ten internal physical question cards, then updates preparation/fulfillment status.
8. Handle failures explicitly: pending payment, payment failure, email failure, cancellation, refund, duplicate submit, and webhook retry.

## 6. Minimal API contract (illustrative, not implemented)

- `POST /api/orders` — validate and create a new order; rate-limit and protect against duplicate submissions.
- `GET /api/orders/{public_reference}` — return only a narrow customer-safe status view, with an unguessable reference and additional verification if personal details are shown.
- `POST /api/payments/checkout` — create a provider checkout session for a valid unpaid order; never accept the authoritative total from the browser.
- `POST /api/webhooks/{provider}` — verify signatures, deduplicate events, and apply payment state transitions.
- Private admin routes — list/search orders, inspect fulfillment details, update allowed statuses, and retry email. Require authentication and server-side authorization on every request.

Define request/response schemas, validation errors, rate limits, and allowed status transitions before implementation.

## 7. Privacy and security requirements

- Collect only details needed to contact the customer and fulfill the order; mobile number should be optional unless operationally necessary.
- Publish a plain-language privacy notice and retention/deletion policy before collecting real customer data.
- Keep admin functions private; do not rely on hiding buttons in the frontend.
- Use HTTPS, server-side secrets, least-privilege database credentials, input validation, output encoding, rate limits, and audit logging.
- Never store card numbers or security codes.
- Do not expose internal question-card selections, private notes, provider payloads, or another customer's order.
- Test authorization by attempting access with an unrelated account/reference.
- Back up the database and document a restore test before launch.

## 8. Release gates

### Before implementation
- [ ] Complete and record Phase 1 manual visual, console/network, accessibility, reduced-motion, and cross-browser/device checks.
- [ ] Confirm whether the physical kit has a fixed price, shipping/pickup model, and exact fulfillment promise.
- [ ] Choose payment and email providers after checking Philippine eligibility, costs, and terms.
- [ ] Approve privacy notice, data retention, refund/cancellation policy, and customer email copy.
- [ ] Finalize the schema, API contract, status transitions, and test cases.

### Before accepting real orders
- [ ] Automated tests for validation, totals, duplicate submissions, status transitions, and authorization.
- [ ] Payment sandbox test for success, cancellation, failure, refund, duplicate webhook, invalid signature, and mismatched amount/currency.
- [ ] Verify digital plan email and internal print-ready fulfillment pack; ten physical question cards must not be exposed as the customer's digital deliverable.
- [ ] Test email retries and order recovery when the provider is unavailable.
- [ ] Verify database backup/restore and private admin access.
- [ ] Perform one full end-to-end test order, refund/cancel it, and confirm the operational workflow.
- [ ] Enable production checkout only after all gates pass.

## 9. Recommended implementation sequence

1. Finish frontend Phase 1 manual checks and confirm the current deployment is green.
2. Decide kit price, delivery/pickup, refund rules, and the customer email flow.
3. Compare backend, payment, and email providers; document the choice and monthly/transaction costs.
4. Create a staging backend/database and migrations, with no production checkout.
5. Implement order creation + private admin review first, using test data.
6. Add email templates and the print-ready kit workflow.
7. Add payment checkout and verified webhook processing in sandbox.
8. Run security, failure-path, and end-to-end tests.
9. Launch a small controlled pilot only after the owner can fulfill every order reliably.

**Important:** This plan is a blueprint, not a claim that any backend, database, payment provider, email integration, or live order processing currently exists.


## 10. Provider research — Philippines (17 October 2026)

This is a public-documentation comparison, not proof that a merchant account will be approved. Before choosing a provider, the owner must complete onboarding/eligibility checks, confirm the exact business structure and required documents, and review the account-specific contract and settlement schedule.

### Payment provider shortlist

| Provider | Publicly listed Philippine rates (VAT treatment per provider page) | Relevant capabilities | Assessment for Date Compass |
|---|---|---|---|
| **PayMongo — first candidate to evaluate** | QR Ph online 1.34%; GCash 2.23%; Maya wallet 1.79%; cards 3.125% + ₱13.39; direct online banking 0.71% or ₱13.39. Public page says rates are exclusive of VAT. | API payments, test/live API keys, webhook events, refunds via API/dashboard. | Best initial sandbox candidate because its docs clearly describe payment/refund webhooks and test-mode integration. Verify merchant eligibility, settlement destination/timing, refund fee treatment, and the methods enabled for the approved account before implementation. |
| **Maya Checkout — comparison candidate** | Published starting rates: cards 3.50% + ₱10; Maya QR and QRPh 1.0%; GCash 2.0%; ShopeePay 1.85%. | Hosted checkout/payment links and a developer integration offering. | Worth requesting a merchant quote and checking webhook/refund behavior in the actual merchant product. Published rates are starting rates; confirm VAT, settlement, API access, and account-specific terms. |
| **Xendit — comparison candidate** | Public page lists Philippine QRPh at 1.50% (minimum ₱15) plus ₱11 Xendit processing fee; domestic PHP cards 3.50% plus ₱11 processing fee; GCash/Maya/ShopeePay have their own method rates plus processing fee. VAT may apply. | PHP processing, multiple payment methods, API and webhook-based integrations. | Flexible, but its separately listed processing fee can make low-priced orders less economical. Ask for a complete quote and refund-fee/settlement details before considering it. |

**Illustrative fee check, not a quote:** On a ₱500 payment, the published PayMongo rates imply roughly ₱6.70 for QR Ph, ₱11.15 for GCash, ₱8.95 for Maya wallet, and ₱29.02 for domestic cards before VAT/other account-specific costs. Maya's published starting rates imply ₱5 for QRPh, ₱10 for GCash, and ₱27.50 for cards before VAT/other costs. Xendit's listed QRPh formula implies at least ₱26 (₱15 minimum method fee + ₱11 processing fee) before tax, subject to the current pricing page and merchant contract. These comparisons are illustrative only; do not hard-code fees or pass provider fees to customers without a deliberate pricing policy.

### Payment recommendation

1. Start by applying/evaluating **PayMongo** for a sandbox-first integration; compare Maya Checkout before locking in the provider.
2. Do not create a live checkout session until the merchant account is approved and the owner has verified PHP settlement, payout timing, refund process/fees, support, chargeback handling, and supported payment methods in writing or in the merchant dashboard.
3. Create checkout sessions server-side. Treat redirects as informational only; verify webhook authenticity, event ID, expected order reference, amount, and PHP currency. Make webhook handling idempotent and reconcile missed/failed events. Keep provider secret keys in server-side environment secrets only.
4. Test success, pending, cancellation, failure, duplicate and out-of-order webhooks, invalid signatures, amount/currency mismatch, refund, and delayed settlement in sandbox before production.

Official payment references reviewed 17 October 2026:
- PayMongo pricing: https://www.paymongo.com/en/pricing
- PayMongo webhook setup and event handling: https://docs.paymongo.com/docs/creating-a-webhook-endpoint and https://docs.paymongo.com/docs/developer-tools-webhooks-events
- PayMongo refund process: https://docs.paymongo.com/docs/payment-acceptance-refunds
- PayMongo go-live security/idempotency checklist: https://docs.paymongo.com/docs/developer-tools-go-live-checklist
- Maya Business pricing: https://www.maya.ph/business/pricing
- Xendit pricing: https://www.xendit.co/en/pricing/

### Transactional email shortlist

| Provider | Publicly documented plan/capability | Assessment |
|---|---|---|
| **Resend — first candidate to test** | Free transactional tier lists 3,000 emails/month, 100/day, and up to 3 domains; Pro lists US$20/month for 50,000 emails and no daily limit. | A reasonable low-volume starting point for order confirmation and the designed digital date-plan email. Verify a sender domain, configure SPF/DKIM (and DMARC where appropriate), test inbox placement and bounce handling, and keep delivery status/retry logic in the backend. |
| **Brevo — alternative to compare** | Official API documentation supports transactional email via its messaging API and verified sender configuration. | Keep as a fallback if account onboarding, sender verification, deliverability, regional support, or pricing fits better. Confirm current transactional-email pricing and sending limits directly before selecting it. |

Email implementation rules:
- Use a verified sender address on a domain the owner controls; do not assume a personal Gmail address can be used as the production API sender.
- Send only necessary order information. The customer receives the digital date plan; the ten selected question cards remain in the internal print/fulfillment pack and must not be attached to the customer email.
- Record message ID, attempt count, last error, and sent/delivered/bounced status where available. Retry transient failures safely and expose an admin retry action; a payment must not be charged again just because email failed.
- Never put API keys in frontend JavaScript. Add the email provider only after a staging backend exists.

Official email references reviewed 17 October 2026:
- Resend pricing: https://resend.com/pricing
- Brevo transactional email API: https://developers.brevo.com/docs/send-a-transactional-email

### Decision status

- **Preferred candidates for sandbox evaluation:** PayMongo for payments; Resend for transactional email.
- **Not yet selected for production:** merchant eligibility, approved account, exact settlement/refund terms, sender-domain verification, and successful staging tests are still outstanding.
- **No backend implementation or live order/payment flow is enabled by this research.**
