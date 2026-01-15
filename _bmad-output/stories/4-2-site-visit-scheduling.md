# Story 4.2: Site Visit Scheduling

Status: in-progress

## Story
As an Advisor,
I want to schedule site visits for leads in the "Contacted" stage,
So that I can meet the customer, verify site conditions, and prepare a final proposal.

## Acceptance Criteria
1. **Given** a lead in "Contacted" or "New" status **Then** show a "Schedule Visit" action.
2. **Given** the schedule action is clicked **Then** open a dialog with Date and Time pickers.
3. **Given** a valid date/time is selected **Then** update the lead status to "Scheduled".
4. **Given** the update is successful **Then** show a confirmation toast/notification.
5. **Given** a lead in "Scheduled" column **Then** display the scheduled date/time on the card.

## Tasks / Subtasks
- [ ] Update Admin Dashboard UI
    - [ ] Add "Schedule" button to lead cards (conditionally)
    - [ ] Add `ScheduleDialog` component
- [ ] Implement Scheduling Logic
    - [ ] Update `leads.ts` mock data to support `scheduledDate` field
    - [ ] Create handler in dashboard to update the data
- [ ] Testing
    - [ ] Unit test for status update logic
    - [ ] Component test for scheduling dialog interaction

## Dev Notes
- Use `shadcn/ui` Calendar and Popover for the date picker if available, or standard HTML date input for MVP speed.
- Mock the backend update by just updating local state (simulated persistence won't stick on refresh unless we move state up or use context/localStorage, but for this specific story we can just use component state for the demo).
