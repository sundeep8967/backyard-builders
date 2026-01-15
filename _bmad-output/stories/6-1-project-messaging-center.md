# Story 6.1: Project Messaging Center

Status: in-progress

## Story
As a Customer and Project Manager,
I want a centralized messaging center for each project,
So that we can communicate updates, ask questions, and keep a record of all conversations.

## Acceptance Criteria
1. **Given** the Project Dashboard (Admin & Customer view) **Then** show a "Messages" tab/section.
2. **Given** the Messages view **Then** display a chat-like interface with a history of messages.
3. **Given** a text input **Then** allow sending a new message.
4. **Given** a message **Then** display timestamp and sender name.
5. **Given** a new message **Then** persist it to the project data (mocked).

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Add `Message` interface (`id`, `content`, `sender`, `timestamp`, `isAdmin`).
    - [ ] Add `messages` array to `Project`.
- [ ] Create UI Components
    - [ ] `components/admin/message-list.tsx`: Chat window displaying messages.
    - [ ] `components/admin/message-input.tsx`: Input area.
- [ ] Integration
    - [ ] Add "Messages" section to Project Dashboard.

## Dev Notes
- Mocks:
    - Author will be "You" (Sender) vs "Client" or "PM" (Receiver).
    - We will simulate a "reply" for testing if useful, or just manual entry for now.
