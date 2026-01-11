# Detailed Onboarding Flow Sequence

**Version:** 1.0  
**Date:** January 2025  
**Status:** Complete  
**Related Documents:**
- PRD Part 2, Section 2.2 - The 5-Phase Customer Journey (High-Level Context)
- `onboarding-flow-diagrams.md` - Visual flow diagrams
- `onboarding-state-machine.md` - State machine specification

---

## Context

This document provides the detailed, step-by-step onboarding flow sequence. For high-level customer journey context, see PRD Part 2, Section 2.2.

The onboarding process follows a strict, sequential flow that **MUST** be completed before dashboard access is granted. This document contains all implementation details, validation rules, database transactions, and error handling requirements.

---

## Detailed Onboarding Flow Sequence

The onboarding process follows a strict, sequential flow that **MUST** be completed before dashboard access is granted:

1.  **Zip Code Validation:** When user clicks any primary call-to-action (e.g., 'Get Started', 'Get Your Estimate', 'Shop the Look'), the system **MUST** first validate their zip code against the service area. If the zip code is not serviceable, the user **MUST** see a clear message explaining the situation and be prevented from proceeding.

2.  **Account Creation Form (Multi-Step):** If zip code is valid, the user is presented with a unified account creation form that includes the following steps:
    *   **Step 2a: Authentication Method:** User selects email/password or social login (Google/Apple)
    *   **Step 2b: Account Information:** User provides name and basic account information
    *   **Step 2c: Property Address Entry (Required):** User **MUST** provide and verify their primary property address. This step **MUST NOT** be skippable. The system **MUST**:
        *   Provide an address input field with Google Maps auto-complete suggestions
        *   Display a map preview after address selection for confirmation
        *   Automatically separate the verified address into correct fields (Street, City, State, Zip)
        *   Validate the full address against the service area (even if zip code passed initial validation)
        *   **Block account creation completion** if address is outside service area

3.  **Database Transactions:** Upon form submission, the system performs two separate database transactions:
    *   **Transaction 1 - Account Creation (All-or-Nothing):** Creates `customer`, `household`, and `household_members` records atomically. If any part fails, the entire transaction is rolled back. The `household` record **MUST** be created with `display_name` defaulting to '[User Full Name]'s Household' for single-user accounts. The customer **MUST** be automatically assigned the 'Owner' role in the `household_members` table.
        *   **Household Creation Scenarios:**
            *   **Scenario A - Standard Account Creation:** When a user creates an account through the standard onboarding flow (not via invitation link), the system **MUST** automatically create a new `household` record in the same atomic transaction as the `customer` record. This household creation is **REQUIRED** and **MUST NOT** be optional, even for single-user accounts. The household is created with `display_name` defaulting to '[User Full Name]'s Household'. The customer is automatically assigned the 'Owner' role with `status='Active'` in the `household_members` table.
            *   **Scenario B - Invitation-Based Account Creation:** When a user creates an account via an invitation link (see PRD Section 2.3, Line 244 for invitation workflow details), the system **MUST** skip household creation and instead join the existing household specified by the invitation. The `customer` record is created, and a `household_members` record is created linking the customer to the existing household with the role specified in the invitation ('Owner' or 'Member') and `status='Active'`. If the invitation is invalid, expired, or the invitee already belongs to another household, the account creation transaction **MUST** be rolled back and an appropriate error message displayed (see PRD Line 244 for invitation conflict handling).
        *   **Error Handling & Transaction Rollback:** If the creation of the `customer`, `household` (in Scenario A), or `household_members` record fails for any reason (database constraint violation, network error, etc.), the entire Transaction 1 **MUST** be rolled back atomically. No partial account state is allowed. The user **MUST** be shown a clear error message indicating that account creation failed and they should try again. The system **MUST NOT** create a customer account without a corresponding household membership record.
        *   **Single-User Scenario:** Even for single-user accounts (no other household members), a household **MUST** still be created. This ensures data consistency and prepares the account structure for potential future household member invitations. The household `display_name` defaults to '[User Full Name]'s Household' and can be edited later by the user.
    *   **Transaction 2 - Property Profile Creation (Separate):** Creates `property_profile` record with `household_id` and `street_address` as required fields. This transaction is separate to allow retry if address validation fails temporarily. If property profile creation fails, the account still exists but dashboard access is blocked until property profile is successfully created.

4.  **Error Handling for Address Verification:**
    *   **Service Unavailable (Temporary):** If the address verification service is temporarily unavailable, the system **MUST** allow manual address entry. The address **MUST** be flagged for later verification (`is_address_verified = false`), but the user **MUST NOT** be blocked from completing account creation. The property profile is created with the unverified address.
    *   **Verification Failure (Permanent):** If address verification fails permanently (e.g., the verification service is down, the address cannot be verified after retries, or the address format is incompatible with the verification service), the system **MUST** allow the user to manually enter their address and proceed. The address **MUST** be flagged as unverified (`is_address_verified = false`), and the user **MUST NOT** be blocked from completing account creation. Unverified addresses are flagged for Design Advisor review during the first site visit.
    *   **Invalid Address:** If the address cannot be verified due to invalid format or ambiguous address (e.g., missing apartment number, incomplete street name), the system **MUST** display clear error messages with specific instructions on how to correct it (e.g., "Please include your apartment number" or "The street name appears incomplete"). The user **MUST** be allowed to retry with corrections. If the user cannot correct the address after multiple attempts, they **MUST** be given the option to proceed with manual entry (flagged as unverified).
    *   **Outside Service Area:** If the full address is verified but outside the service area (even if the zip code passed initial validation), the user **MUST** see a clear, apologetic message and be prevented from completing account creation. The account creation form **MUST NOT** be submitted.
    *   **Design Advisor Verification Workflow:** During the first site visit, the Design Advisor **MUST** review any property with `is_address_verified = false`. The Design Advisor **MUST** verify the address is correct and update `is_address_verified = true` if the address matches the physical location. If the address is incorrect, the Design Advisor **MUST** update the address and set `is_address_verified = true` with the corrected address.

5.  **Dashboard Access:** Only after both account creation and property profile creation are successfully completed does the user land on their dashboard. The dashboard **MUST** display options to 'Start From Scratch' or 'Shop the Look' to begin Phase 2.

**Timezone Handling:** All timestamps during onboarding are stored in UTC. Address verification uses UTC for calculations, and the UI displays times in the user's local timezone (or company timezone if available).

---

## Related Documentation

- **PRD Part 2, Section 2.2:** High-level customer journey context
- **Onboarding Flow Diagrams:** Visual representations of the flow
- **Onboarding State Machine:** Formal state machine specification
- **Data Model:** Database schema for `customers`, `households`, `household_members`, and `property_profiles` tables

