# Story 3.4: Material Selection & Pricing Engine

Status: in-progress

## Story
As a user,
I want to select specific materials (colors, textures, patterns) for my project,
So that I can visualize the final look and get a more accurate price estimate.

## Acceptance Criteria
1. **Given** a selected service (e.g., Patio) **Then** show detailed material categories (e.g., Paver Type, Color, Pattern).
2. **Given** a material selection **Then** update the preview image (mocked/static).
3. **Given** a premium material selection **Then** update the price modifier.
4. **Given** conflicting choices (e.g., pattern not available for material) **Then** handle constraints (simplified for MVP).
5. **Given** completion **Then** save detailed specs to the estimate.

## Tasks / Subtasks
- [ ] Create Material Database
    - [ ] Extend `services-pricing.ts` with deep material options
    - [ ] Add properties for colors, textures, and patterns
- [ ] enhancing Estimate Wizard
    - [ ] Update `app/(dashboard)/dashboard/estimates/new/page.tsx`
    - [ ] Add "Materials" step between "Configure" and "Summary"
    - [ ] Create `MaterialSelector` component
- [ ] Implement Visual Feedback
    - [ ] Show swatches for colors
    - [ ] Show pattern diagrams
- [ ] Update Pricing Logic
    - [ ] Factor in "finish" costs (sealing, patterns)

## Dev Notes
- For this MVP, we won't use a 3D engine.
- We will use "Swatches" (small image tiles) for selection.
- Pricing will be: Base Service + Material Tier + Pattern Complexity.
