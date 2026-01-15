# Story 2.5: Property Profile Creation (Dashboard Unlock)

Status: completed

## Story
As a Customer,
I want to add multiple properties to my profile,
So that I can request work for my vacation home or rental property.

## Acceptance Criteria
1. **Given** I am on the dashboard **Then** I see an "Add Property" button.
2. **Given** I click "Add Property" **Then** I am taken to a form to enter property details.
3. **Given** the form **Then** I must provide Street Address, City, State, Zip, and Property Type.
4. **Given** a valid zip code **Then** the system validates it is in a service area (re-use existing validation).
5. **Given** valid details **Then** the property is saved to my profile and appears on the Dashboard.

## Tasks

- [x] Create `Property` data model in `lib/customer/properties.ts`.
- [x] Create `AddPropertyPage` at `/dashboard/properties/new`.
- [x] Reuse `AddressForm` logic from onboarding if possible, or replicate.
- [x] Create Server Action (or Mock Handler) to save property.
- [x] Update Dashboard "Add Property" button to link to new page.

## Notes
- Implemented `AddPropertyForm` component with Zod validation and Server Action.
- Updated Dashboard stats to reflect property count.
- Created Properties list page.

