# Story 3.3: Interactive Design Center Canvas

Status: in-progress

## Story
As a user,
I want to visualize my project on a canvas by arranging elements (e.g., patio shape, furniture),
So that I can communicate my vision to the design team.

## Acceptance Criteria
1. **Given** design page **Then** show a blank canvas and a toolbar of elements.
2. **Given** an element (e.g., table, chair, fire pit) **Then** can drag it onto the canvas.
3. **Given** an element on canvas **Then** can move and resize it.
4. **Given** drag ends **Then** save the position locally (sessionStorage).
5. **Given** completed design **Then** can "Save to Project" (mock save).

## Tasks / Subtasks
- [ ] Setup Canvas Environment
    - [ ] Install drag-and-drop library (dnd-kit or react-dnd)
    - [ ] Create `app/(dashboard)/dashboard/design/page.tsx`
- [ ] Create Element Library
    - [ ] Define draggable items (Furniture, Hardscape shapes)
    - [ ] Create visual representations (simple shapes/icons)
- [ ] Implement Drag Logic
    - [ ] Draggable source (sidebar)
    - [ ] Droppable target (canvas)
    - [ ] Coordinate tracking
- [ ] Implement Persistence
    - [ ] Save canvas state to sessionStorage
    - [ ] Load state on page load

## Dev Notes
- Use `dnd-kit` for modern React drag-and-drop.
- Keep it simple: 2D view, top-down.
- No complex CAD features, just "mood board" style layout.
