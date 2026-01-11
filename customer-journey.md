# Customer Journey

**Date:** 2025-11-14 || 19:49

This journey map provides a definitive, end-to-end view of the user's lifecycle.

### Phase 1: Inspiration & Qualification (owned by `showcase` & `property` features)

A new user can browse the public-facing `showcase` without an account. When the user initiates a primary call-to-action (e.g., 'Get Your Estimate'), the system **first validates their zip code**. If serviceable, the user is prompted to **create an account**. Property address entry is integrated into the account creation process as a required step within the same multi-step form. Only after both account creation and property address entry are completed does the user land on their dashboard, ready to start Phase 2.

**Detailed Onboarding Flow Sequence:**
The onboarding process follows a strict, sequential flow that **MUST** be completed before dashboard access is granted. The detailed step-by-step sequence, including all validation rules, database transactions, and error handling, is documented separately.

**See:** [`../features/onboarding-flow-detailed.md`](../features/onboarding-flow-detailed.md) for the complete detailed onboarding flow sequence.

**High-Level Summary:**
1. Zip Code Validation
2. Account Creation (Multi-Step Form)
3. Database Transactions (Account & Property Creation)
4. Error Handling & Address Verification
5. Dashboard Access

### Phase 2: The New Estimate Wizard (owned by `estimates` & `property` features)

The user is guided through a step-by-step wizard to select services, define their property's existing conditions (`House Shape` & dimensions), and choose an initial design and layout template to receive their first instant, fully-calculated price.

### Phase 3: Self-Guided Visual Design (owned by `estimates` feature)

The user enters the "Design Center," an interactive sandbox where they can freely customize every aspect of their project—swapping materials, changing the shape and size, and seeing the price update in near real-time.

**Drafting Mode for Verified Estimates:** For estimates that have been verified by a Design Advisor (`Site Conditions Verified` status), customers can explore adding new unverified services through "Drafting Mode." This exploration-friendly workflow allows customers to freely experiment with additions without committing to them until they are ready. When a customer adds an unverified service, the system enters Drafting Mode—displaying a clear banner, highlighting unverified items, and providing "Submit Changes for Verification" and "Discard Changes" buttons. Customers can explore multiple additions and either submit them for verification (which triggers a status change and notifies the Design Advisor) or discard all changes to revert to the previous clean state. This approach prevents unnecessary notifications and penalties for customer exploration, creating a better user experience that encourages experimentation.

**Post-Contract Change Exploration:** For customers with active projects, the Design Center supports exploratory estimates that allow customers to explore potential changes with consistent pricing. These exploratory estimates can be seamlessly converted to formal change order requests via the "Submit as Change Order Request" button, creating a bridge between design exploration and the formal change order workflow.

**Phase 3 to 4 Transition: From Design to Site Visit**

The transition from Phase 3 to Phase 4 is a critical business event triggered when the customer clicks 'Accept & Request Site Visit'. At this point:

- The customer can no longer freely edit the original estimate. To explore further changes, they must use the 'Duplicate to Explore' function.
- The customer enters a waiting period for their site visit. The system **MUST** provide clear guidance on the dashboard about preparing for the visit.
- If a customer accepts an estimate but does not schedule a site visit within a configurable timeframe (e.g., 7 days), the system **MUST** send reminder notifications to both the customer and the assigned DA.

**Price Lock Expiration Handling:** If a customer's 90-day price lock expires while their estimate is in a state ready for DA action (`Site Visit Requested`, `Under DA Review`, or `Site Conditions Verified`), the system enables a proactive, self-service price update workflow. Customers receive a notification and can click "Update to Current Pricing" to review and accept updated pricing based on current market rates. Upon acceptance, a new estimate version is created with updated pricing, and the estimate status transitions to allow the DA to proceed with contract preparation.

### Phase 4: Pre-Contract Handoff (owned by `advisor` feature)

The user accepts their estimate and requests a Site Visit. **The system introduces them to their assigned Design Advisor via a professional profile page, humanizing the handoff and building trust.**

The `Design Advisor` conducts the Site Visit, formally validates all customer-provided data, makes any necessary adjustments, and issues a final, price-locked contract for the customer to sign.

**Phase 4 to 5 Transition: From Contract to Project**

The transition from Phase 4 to Phase 5 is triggered only when a Design Advisor confirms receipt of **both** a signed paper contract and the customer's down payment.

- If a customer has indicated their acceptance online but does not provide the offline items, the contract will eventually expire based on its `offer_valid_until` date.
- The system **MUST** send reminder notifications to the customer and DA as the contract expiration date approaches. The project is not created and Phase 5 does not begin until the DA's final confirmation.

### Phase 5: Post-Contract Project Portal (owned by `projects`, `financials`, & `files` features)

Once the contract is signed and the down payment is logged, the user gains access to the Project Portal.

Here, they can track the project schedule, view daily progress logs, manage selection deadlines, communicate with the team, and handle all financial aspects like invoices and change orders.

---

