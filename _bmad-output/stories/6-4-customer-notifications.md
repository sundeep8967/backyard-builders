# Story 6.4: Customer Notifications

Status: in-progress

## Story
As a User (Admin or Customer),
I want to receive notifications when important project events occur,
So that I can respond quickly to changes or requests.

## Acceptance Criteria
1. **Given** the Dashboard **Then** show a header area with a Notification Bell.
2. **Given** a new event (e.g., "RFI Created", "Invoice Sent") **Then** increment the unread count.
3. **Given** clicking the bell **Then** show a dropdown/popover of recent notifications.
4. **Given** a list of notifications **Then** allow marking them as "Read".

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Add `Notification` interface (`id`, `title`, `message`, `type`, `read`, `timestamp`).
    - [ ] Add `notifications` array to `Project`.
- [ ] Create UI Components
    - [ ] `components/admin/notifications-popover.tsx`: Bell icon + Dropdown list.
- [ ] Integration
    - [ ] Add to `ProjectDashboardPage` header.
    - [ ] Simulate triggering a notification when an Invoice is created.

## Dev Notes
- We'll keep it simple: local state notifications triggered by our other actions for the demo.
- Types: `info`, `warning` (e.g. overdue), `success`.
