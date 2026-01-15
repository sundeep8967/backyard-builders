# Story 4.1: Advisor Dashboard & Lead Queue

Status: in-progress

## Story
As a Project Advisor (Internal User),
I want to view a dashboard of incoming project leads and their status,
So that I can efficiently manage my pipeline and follow up with potential customers.

## Acceptance Criteria
1. **Given** an advisor logs in **Then** show the Advisor Dashboard (`/admin/dashboard`).
2. **Given** a list of leads **Then** display them in columns/groups by status (New, Contacted, Scheduled, Proposal, Sold).
3. **Given** a lead card **Then** show key info: Customer Name, Project Type (e.g., Patio), Est. Budget, Date.
4. **Given** a lead **Then** allow dragging or clicking to change status.
5. **Given** clicking a lead **Then** navigate to lead detail view (placeholder for now).

## Tasks / Subtasks
- [ ] Create Admin Layout
    - [ ] Create `app/(admin)/layout.tsx` (sidebar, header distinct from user dashboard)
    - [ ] Create `app/(admin)/admin/dashboard/page.tsx`
- [ ] Create Lead Data Model (Mock)
    - [ ] Define `Lead` interface
    - [ ] Generate sample leads
- [ ] Implement Kanban Board
    - [ ] Use `dnd-kit` (already installed) or simple status columns
    - [ ] Create `LeadCard` component
- [ ] Implement Status Updates
    - [ ] Logic to move leads between columns

## Dev Notes
- Security: For MVP demo, just protect `/admin` with a simple check or hardcoded toggle, or just assume anyone accessing `/admin` is admin for now.
- Reuse `dnd-kit` from Design Center for the Kanban drag-and-drop if desired, or keep it simple with dropdowns first. Let's go with a simple "Grid View" with status badges for V1 to speed up.
