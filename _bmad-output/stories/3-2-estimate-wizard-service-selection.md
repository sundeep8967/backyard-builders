# Story 3.2: Estimate Wizard - Service Selection

Status: in-progress

## Story
As a homeowner,
I want to select outdoor services and see real-time pricing,
So that I can understand costs before requesting a formal estimate.

## Acceptance Criteria
1. **Given** estimate page **Then** show available services with images.
2. **Given** selecting a service **Then** show configuration options (size, materials).
3. **Given** configuration changes **Then** update price dynamically.
4. **Given** completed selection **Then** show estimate summary.
5. **Given** summary **Then** can request formal quote.

## Tasks / Subtasks
- [ ] Create Service Data
    - [ ] Define services with base pricing
    - [ ] Define material options with price modifiers
    - [ ] Define size tiers
- [ ] Create Estimate Page
    - [ ] Create `app/(dashboard)/dashboard/estimates/new/page.tsx`
    - [ ] Service selection cards
    - [ ] Configuration panel
- [ ] Create Price Calculator
    - [ ] Real-time price calculation
    - [ ] Show breakdown (base + materials + size)
- [ ] Create Estimate Summary
    - [ ] Final review before submission
    - [ ] Request Quote CTA

## Dev Notes
- Keep pricing logic client-side for now (real pricing would come from backend)
- Make it feel interactive and premium
- Use the same dark theme
