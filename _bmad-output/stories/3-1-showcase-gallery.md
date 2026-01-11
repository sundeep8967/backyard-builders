# Story 3.1: Showcase Gallery

Status: in-progress

## Story
As a potential customer,
I want to browse a gallery of completed projects,
So that I can get inspired and see the quality of work.

## Acceptance Criteria
1. **Given** the gallery page **Then** show grid of project images.
2. **Given** a project card **Then** show image, project type, and brief description.
3. **Given** clicking a card **Then** show modal with more details.
4. **Given** filters **Then** can filter by project type (patio, deck, pergola, etc.).
5. **Given** the gallery **Then** it's responsive and looks great on mobile.

## Tasks / Subtasks
- [ ] Create Gallery Page
    - [ ] Create `app/gallery/page.tsx`
    - [ ] Grid layout for project cards
    - [ ] Responsive design
- [ ] Create Project Card Component
    - [ ] Image with overlay
    - [ ] Project type badge
    - [ ] Title and description
- [ ] Create Project Modal
    - [ ] Larger image view
    - [ ] Full description
    - [ ] "Get Similar Estimate" CTA
- [ ] Add Filter Bar
    - [ ] Filter by project type
    - [ ] Simple toggle buttons
- [ ] Add Sample Data
    - [ ] Create mock projects array
    - [ ] Use placeholder images

## Dev Notes
- Use placeholder images for now (can be replaced with real images later)
- Keep the design consistent with dark theme
- Add to main navigation
