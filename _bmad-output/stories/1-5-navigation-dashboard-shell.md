# Story 1.5: Navigation & Dashboard Shell

Status: in-progress

## Story
As a user,
I want to see a modern dashboard layout with navigation,
So that I can easily access different sections of the app.

## Acceptance Criteria
1. **Given** I'm logged in **Then** I see a sidebar navigation.
2. **Given** the dashboard **Then** it has a responsive layout (mobile-friendly).
3. **Given** the sidebar **Then** it shows navigation items for key sections.
4. **Given** the header **Then** it shows user avatar/menu (placeholder for now).
5. **Given** the layout **Then** it follows the Zinc/dark theme from shadcn.

## Tasks / Subtasks
- [ ] Install shadcn components
    - [ ] Add Button, Avatar, Sheet (for mobile menu)
    - [ ] Add Separator, ScrollArea
- [ ] Create Layout Components
    - [ ] Create `components/layout/sidebar.tsx`
    - [ ] Create `components/layout/header.tsx`
    - [ ] Create `components/layout/main-layout.tsx`
- [ ] Setup Dashboard Route
    - [ ] Create `app/(dashboard)/layout.tsx`
    - [ ] Create `app/(dashboard)/page.tsx`
- [ ] Add Navigation Items
    - [ ] Dashboard, Properties, Estimates, Settings
    - [ ] Use Lucide icons
- [ ] Style & Polish
    - [ ] Dark mode by default
    - [ ] Smooth transitions
    - [ ] Mobile responsive

## Dev Notes
- Use shadcn/ui components for consistency
- Group authenticated routes under (dashboard)
- Keep landing page separate
