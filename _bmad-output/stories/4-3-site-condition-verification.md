# Story 4.3: Site Condition Verification

Status: in-progress

## Story
As an Advisor,
I want to allow inputting site condition details (access, slope, soil, notes) for a lead,
So that the final proposal is accurate and avoids construction surprises.

## Acceptance Criteria
1. **Given** a lead (especially in "Site Visit" stage) **Then** allow opening a "Lead Details" view.
2. **Given** the details view **Then** show a "Site Conditions" tab or section.
3. **Given** the form **Then** allow capturing:
    - Overall Access (Good, Limited, Crane Needed)
    - Slope (Flat, Gentle, Steep)
    - Notes (Text area for tree removal, drainage, etc.)
4. **Given** saved conditions **Then** store them with the lead (mocked).
5. **Given** limited access or steep slope **Then** (Optional for MVP) flagging a price warning.

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Extend `Lead` interface in `leads.ts` with `SiteConditions` object.
- [ ] Create Detail View
    - [ ] Create `components/admin/lead-detail-dialog.tsx` (Reuse Dialog or new Page)
    - [ ] Add form fields for Site Conditions
- [ ] Integration
    - [ ] Open Detail View when clicking on a Lead Card title or specific "View" button.
    - [ ] Save logic (update local state).

## Dev Notes
- For this MVP, we will use a `Dialog` triggered by clicking the lead card title.
- We will use `shadcn/ui` Select and Textarea components.
