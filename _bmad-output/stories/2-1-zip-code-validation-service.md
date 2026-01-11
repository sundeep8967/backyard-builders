# Story 2.1: Zip Code Validation & Onboarding Start

Status: in-progress

## Story
As a potential customer,
I want to enter my zip code to check service availability,
So that I can start the onboarding process if my area is served.

## Acceptance Criteria
1. **Given** landing page **Then** show "Check Availability" CTA with zip code input.
2. **Given** valid zip code in service area **Then** proceed to account creation.
3. **Given** zip code outside service area **Then** show waitlist signup option.
4. **Given** invalid zip code format **Then** show validation error.
5. **Given** service areas **Then** store in configurable list (not hardcoded).

## Tasks / Subtasks
- [ ] Create Zip Code Input Component
    - [ ] Create `components/onboarding/zip-check.tsx`
    - [ ] Input field with validation (5 digits)
    - [ ] Submit button
    - [ ] Error/success states
- [ ] Create Service Area Logic
    - [ ] Create `lib/service-areas.ts` with configurable zip codes
    - [ ] Function to check if zip is in service area
- [ ] Create Onboarding Flow Pages
    - [ ] Create `app/get-started/page.tsx` - Zip check step
    - [ ] Create redirect logic based on zip validation
- [ ] Update Landing Page
    - [ ] Add zip code input to hero section
- [ ] Create Waitlist Page
    - [ ] Create `app/waitlist/page.tsx` for out-of-area users

## Dev Notes
- Service areas should be easily configurable
- Store user's zip code in session/state for later use
- Mobile-friendly design
