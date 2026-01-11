# Story 1.2: Authentication with Clerk

Status: deferred

## Decision
Clerk removed. Will implement Supabase Auth with Google Sign-in later when needed.

## Reason
- Clerk requires external dashboard and API keys setup
- Supabase already in stack and has built-in auth
- Faster to build core features first, add auth later

## Original Story
As a user,
I want to sign up and log in using Clerk,
So that I can securely access the platform.

## Future Implementation Plan
- Use Supabase Auth with Google OAuth
- Single "Sign in with Google" button
- No separate sign-in/sign-up pages needed
