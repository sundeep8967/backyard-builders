# Story 6.2: Internal vs External Notes

Status: in-progress

## Story
As a Project Manager,
I want to create notes that can be marked as "Internal Only" or "Shared with Client",
So that I can document sensitive team context without exposing it to the customer, while still having a place for shared general information.

## Acceptance Criteria
1. **Given** the Project Dashboard **Then** show a "Project Notes" section.
2. **Given** a note creation form **Then** allow entering text and toggling "Internal Only".
3. **Given** a list of notes **Then** visually distinguish between Internal (e.g., yellow background/lock icon) and Shared notes.
4. **Given** the customer view (implicitly) **Then** they would only see Shared notes (we are only building Admin view right now, but the data model must support this).

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Add `ProjectNote` interface (`id`, `content`, `author`, `timestamp`, `isInternal`).
    - [ ] Add `notes` array to `Project` (distinct from `logs` which are daily construction logs).
- [ ] Create UI Components
    - [ ] `components/admin/project-notes.tsx`: List and create notes.
- [ ] Integration
    - [ ] Add "Project Notes" card to the Admin Dashboard (likely in the right column with Messages).

## Dev Notes
- Internal notes should have a distinct visual style (e.g., amber `Badge` or background).
- Default to "Internal" for safety? Or explicit toggle.
