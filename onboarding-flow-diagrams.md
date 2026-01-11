# Onboarding Flow Diagrams

**Date:** January 2025  
**Status:** Complete  
**Related Documents:**
- `onboarding-flow-detailed.md` (Detailed Onboarding Flow Sequence)
- PRD Part 2, Section 2.2 (High-Level Customer Journey Context)
- User Story Library - Epic: Secure User Onboarding & Access
- QA Analysis: Account Creation to Property Creation Flow

This document contains visual flow diagrams for the complete customer onboarding process from initial showcase browsing through account creation, property setup, and wizard initiation.

---

## Main Onboarding Flow

This diagram shows the complete flow from when a user first interacts with the platform through to starting the estimate wizard.

```mermaid
flowchart TD
    Start([User Browses Public Showcase]) --> ClickCTA{User Clicks<br/>Primary CTA}
    ClickCTA -->|Get Started<br/>Get Your Estimate<br/>Shop the Look| ZipCheck[Zip Code Validation]
    
    ZipCheck --> ZipValid{Zip Code<br/>Serviceable?}
    ZipValid -->|No| ZipError[Show Error Message<br/>Block Proceeding]
    ZipValid -->|Yes| AccountForm[Account Creation Form<br/>Multi-Step]
    
    AccountForm --> Step2a[Step 2a: Authentication Method<br/>Email/Password or Social Login]
    Step2a --> Step2b[Step 2b: Account Information<br/>Name & Basic Info]
    Step2b --> Step2c[Step 2c: Property Address Entry<br/>REQUIRED - Non-Skippable]
    
    Step2c --> AddressInput[Google Maps<br/>Auto-Complete Input]
    AddressInput --> MapPreview[Map Preview<br/>for Confirmation]
    MapPreview --> AddressValidation[Address Validation<br/>via Google Maps API]
    
    AddressValidation --> ServiceAreaCheck{Address in<br/>Service Area?}
    ServiceAreaCheck -->|No| ServiceAreaError[Show Error Message<br/>Block Account Creation]
    ServiceAreaError --> Step2c
    
    ServiceAreaCheck -->|Yes| SubmitForm[Submit Form]
    
    SubmitForm --> Trans1[Transaction 1: Account Creation<br/>Atomic - All or Nothing]
    Trans1 --> CreateCustomer[Create customer record]
    CreateCustomer --> CreateHousehold[Create household record<br/>display_name = Name&apos;s Household]
    CreateHousehold --> CreateMember[Create household_members record<br/>role = Owner, status = Active]
    
    CreateMember --> Trans1Success{Transaction 1<br/>Success?}
    Trans1Success -->|No| Rollback[Rollback All<br/>Show Error]
    Rollback --> AccountForm
    
    Trans1Success -->|Yes| Trans2[Transaction 2: Property Profile<br/>Separate Transaction]
    Trans2 --> CreateProperty[Create property_profile record<br/>household_id + street_address]
    
    CreateProperty --> Trans2Success{Transaction 2<br/>Success?}
    Trans2Success -->|No| AccountExists[Account Exists<br/>Dashboard Access Blocked]
    AccountExists --> RetryProperty[Retry Property Creation]
    RetryProperty --> Trans2
    
    Trans2Success -->|Yes| Dashboard[Dashboard Landing]
    Dashboard --> DashboardOptions[Dashboard Shows Options:<br/>Start From Scratch<br/>Shop the Look]
    
    DashboardOptions --> UserChoice{User Choice}
    UserChoice -->|Start From Scratch| WizardStart[Wizard Begins<br/>Phase 2]
    UserChoice -->|Shop the Look| ShopLook[Shop the Look<br/>Pre-populated Estimate]
    ShopLook --> WizardStart
    
    ZipError --> End([End - Cannot Proceed])
    ServiceAreaError --> End
    
    style ZipCheck fill:#e1f5ff
    style AccountForm fill:#fff4e1
    style Step2c fill:#ffe1e1
    style Trans1 fill:#e1ffe1
    style Trans2 fill:#e1ffe1
    style Dashboard fill:#e1e1ff
    style ZipError fill:#ffcccc
    style ServiceAreaError fill:#ffcccc
    style Rollback fill:#ffcccc
```

### Flow Steps Summary

1. **Zip Code Validation** - First gate to ensure serviceability
2. **Account Creation Form (Multi-Step)**
   - Step 2a: Authentication Method Selection
   - Step 2b: Account Information Entry
   - Step 2c: Property Address Entry (Required)
3. **Database Transactions**
   - Transaction 1: Account Creation (Atomic)
   - Transaction 2: Property Profile Creation (Separate)
4. **Dashboard Landing** - User sees options to begin Phase 2
5. **Wizard Initiation** - User chooses "Start From Scratch" or "Shop the Look"

---

## Error Handling Flow

This diagram details all error scenarios and how they are handled during address validation.

```mermaid
flowchart TD
    AddressValidation --> ErrorCheck{Validation<br/>Result}
    
    ErrorCheck -->|Service Unavailable<br/>Temporary| ManualEntry1[Allow Manual Entry<br/>Flag: is_address_verified = false]
    ManualEntry1 --> Continue1[Continue Account Creation]
    
    ErrorCheck -->|Verification Failure<br/>Permanent| ManualEntry2[Allow Manual Entry<br/>Flag: is_address_verified = false]
    ManualEntry2 --> Continue2[Continue Account Creation<br/>Flag for DA Review]
    
    ErrorCheck -->|Invalid Address Format| ShowError[Show Specific Error Message<br/>e.g., Missing apartment number]
    ShowError --> Retry[User Retries with Corrections]
    Retry --> AddressValidation
    ShowError -->|Multiple Attempts Failed| ManualEntry3[Offer Manual Entry Option<br/>Flag: is_address_verified = false]
    ManualEntry3 --> Continue3[Continue Account Creation]
    
    ErrorCheck -->|Outside Service Area| Block[Block Account Creation<br/>Show Apologetic Message]
    Block --> End([Cannot Proceed])
    
    Continue1 --> CreateProperty[Create property_profile]
    Continue2 --> CreateProperty
    Continue3 --> CreateProperty
    
    style ErrorCheck fill:#fff4e1
    style ShowError fill:#ffe1e1
    style Block fill:#ffcccc
    style ManualEntry1 fill:#e1ffe1
    style ManualEntry2 fill:#e1ffe1
    style ManualEntry3 fill:#e1ffe1
```

### Error Handling Rules

- **Service Unavailable (Temporary):** Allow manual entry, flag for later verification
- **Verification Failure (Permanent):** Allow manual entry, flag for Design Advisor review
- **Invalid Address Format:** Show specific error, allow retry, offer manual entry after multiple failures
- **Outside Service Area:** Block account creation, show apologetic message

---

## Abandonment Scenarios Flow

This diagram shows what happens when users abandon the onboarding flow at different stages.

```mermaid
flowchart TD
    UserAbandons([User Abandons Flow]) --> CheckState{What State<br/>Was User In?}
    
    CheckState -->|During Zip Code Validation| State1[No Account Created]
    State1 --> NoData[No Data Saved]
    NoData --> Restart[User Must Start Over]
    
    CheckState -->|During Form Entry<br/>Before Submit| State2[Form Data in Session]
    State2 --> SessionCheck{Session<br/>Still Active?}
    SessionCheck -->|Yes| RestoreForm[Restore Form Data]
    SessionCheck -->|No| Restart
    RestoreForm --> ResumeForm[User Resumes Form]
    
    CheckState -->|After Transaction 1<br/>Before Transaction 2| State3[Account Exists<br/>Property Missing]
    State3 --> LoginBlocked[Login Allowed<br/>Dashboard Blocked]
    LoginBlocked --> RedirectProperty[Redirect to Property Entry]
    RedirectProperty --> CompleteProperty[Complete Property Setup]
    
    CheckState -->|After Both Transactions| State4[Onboarding Complete]
    State4 --> FullAccess[Full Dashboard Access]
    FullAccess --> NormalFlow[Normal User Flow]
    
    style State1 fill:#ffe1e1
    style State2 fill:#fff4e1
    style State3 fill:#e1f5ff
    style State4 fill:#e1ffe1
    style Block fill:#ffcccc
```

### Abandonment Scenario Details

| Scenario | State | Behavior | Recovery |
|----------|-------|----------|----------|
| **During Zip Code Validation** | No account created | No data saved | User must start over |
| **During Form Entry (Before Submit)** | Form data in session | Session storage only | Restore if session active, otherwise restart |
| **After Transaction 1, Before Transaction 2** | Account exists, property missing | Login allowed, dashboard blocked | Redirect to property entry screen |
| **After Both Transactions** | Onboarding complete | Full access granted | Normal user flow |

---

## Database Transaction Flow

This sequence diagram shows the database transaction flow and error handling.

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant DB as Database
    
    User->>Frontend: Submit Account Creation Form
    Frontend->>Backend: POST /api/onboarding/create-account
    
    Note over Backend,DB: Transaction 1: Account Creation (Atomic)
    Backend->>DB: BEGIN TRANSACTION
    Backend->>DB: INSERT INTO customers
    Backend->>DB: INSERT INTO households (display_name)
    Backend->>DB: INSERT INTO household_members (role='Owner')
    
    alt Transaction 1 Success
        Backend->>DB: COMMIT TRANSACTION
        Note over Backend,DB: Transaction 2: Property Profile (Separate)
        Backend->>DB: INSERT INTO property_profiles
        
        alt Transaction 2 Success
            Backend->>Frontend: 200 OK (Account + Property Created)
            Frontend->>User: Redirect to Dashboard
        else Transaction 2 Failure
            Backend->>Frontend: 201 Created (Account Only)
            Frontend->>User: Show "Complete Property Setup" Message
        end
    else Transaction 1 Failure
        Backend->>DB: ROLLBACK TRANSACTION
        Backend->>Frontend: 400 Bad Request
        Frontend->>User: Show Error Message
    end
```

### Transaction Details

**Transaction 1: Account Creation (Atomic)**
- Creates `customer` record
- Creates `household` record with `display_name = '[User Full Name]'s Household'`
- Creates `household_members` record with `role='Owner'` and `status='Active'`
- **All-or-Nothing:** If any part fails, entire transaction is rolled back

**Transaction 2: Property Profile Creation (Separate)**
- Creates `property_profile` record with `household_id` and `street_address`
- **Separate Transaction:** Allows retry if address validation fails temporarily
- **Failure Handling:** Account exists but dashboard access is blocked until property profile is created

---

## Key Design Decisions

1. **Two Separate Transactions:** Transaction 1 and Transaction 2 are separate to allow graceful handling of temporary address validation failures while preserving account creation progress.

2. **Atomic Account Creation:** Transaction 1 is atomic to ensure data consistency - either the entire account setup succeeds or nothing is created.

3. **Dashboard Access Gating:** Dashboard access is blocked until both transactions complete successfully, ensuring users cannot proceed without a valid property profile.

4. **Error Recovery:** All error scenarios have specific recovery paths, with manual entry options for temporary service failures.

5. **Abandonment Handling:** System tracks user state and allows resumption from the appropriate point based on what was successfully completed.

---

## Related Documentation

- **Detailed Onboarding Flow:** `onboarding-flow-detailed.md` - Complete step-by-step sequence
- **PRD Part 2, Section 2.2:** High-Level Customer Journey Context
- **Data Model:** `customers`, `households`, `household_members`, `property_profiles` tables
- **User Stories:** See `onboarding-user-stories.md` for complete user story coverage
- **QA Analysis:** `comprehensive-mvp-documentation-analysis-2025.md` - Issue #19

