# Story 2.2: Multi-Step Account Creation Form

Status: in-progress

## Story
As a new user who passed zip code validation,
I want to complete a streamlined account creation process,
So that I can set up my profile and property quickly.

## Acceptance Criteria
1. **Given** valid zip code **When** proceeding **Then** show account creation steps.
2. **Given** step 1 **Then** collect name and phone number.
3. **Given** step 2 **Then** collect property address.
4. **Given** step 3 **Then** confirm details and complete setup.
5. **Given** completion **Then** redirect to dashboard with property created.

## Tasks / Subtasks
- [ ] Install form library
    - [ ] Add react-hook-form and zod for validation
- [ ] Create Onboarding Context
    - [ ] Create `lib/onboarding/onboarding-context.tsx` to manage form state
- [ ] Create Step Components
    - [ ] Step 1: Personal Info (name, phone)
    - [ ] Step 2: Property Address (street, city, state, zip)
    - [ ] Step 3: Confirmation & Complete
- [ ] Create Multi-Step Layout
    - [ ] Progress indicator
    - [ ] Back/Next navigation
    - [ ] Persist state between steps
- [ ] Complete Flow
    - [ ] On final step, create user + property
    - [ ] Redirect to dashboard

## Dev Notes
- Zip code already captured in previous step
- Use sessionStorage for persistence between page refreshes
- Mobile-first design
