# Story 5.3: Daily Logs

Status: in-progress

## Story
As a Site Supervisor/Project Manager,
I want to submit daily logs (text + optional photos) for a project,
So that there is a record of progress and any issues encountered.

## Acceptance Criteria
1. **Given** the Project Dashboard **Then** show a "Daily Log" action button.
2. **Given** the action is clicked **Then** open a "New Log Entry" form/dialog.
3. **Given** the form **Then** allow entering `Date`, `Weather` (Simulate/Manual), `Notes`, and `Hours Worked`.
4. **Given** a submitted log **Then** display it in a "Recent Logs" list on the Dashboard.

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Add `ProjectLog` interface to `projects.ts`.
    - [ ] Add `logs` array to `Project` interface.
- [ ] Create UI Components
    - [ ] `components/admin/daily-log-dialog.tsx`: Form for log entry.
    - [ ] `components/admin/recent-logs.tsx`: List of recent logs.
- [ ] Integration
    - [ ] Add "Daily Log" button to Dashboard Header works.
    - [ ] Update `ProjectDashboardPage` to include `RecentLogs` component.

## Dev Notes
- We will mock the "Image Upload" for now by just having a placeholder or skipping it to focus on text/data first.
