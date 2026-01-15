# MVP Scope Decision: Single-Tenant with Multi-Tenant Patterns

**Version:** 1.0  
**Date:** 2025-01-14  
**Status:** Approved  
**Related Issue:** PRD Critical Review Issue #8

---

## Executive Summary

**Decision:** The MVP will be built as a **single-tenant application** with **foundational multi-tenant architectural patterns embedded from the start**. This approach enables seamless transition to multi-tenant SaaS without major rewrite, while keeping MVP complexity manageable.

**Rationale:** The nullable `company_id` pattern provides minimal overhead for single-tenant operation while ensuring zero architectural debt when transitioning to multi-tenant. This is a strategic architectural decision that balances MVP simplicity with future scalability.

---

## MVP Scope Definition

### MVP: Single-Tenant Operation

**What This Means:**
- **Single Company:** All users belong to one company
- **Single `company_id`:** All operational data scoped to one company ID
- **No Multi-Tenant Features:** No tenant onboarding, tenant switching, or tenant management UI
- **No Franchise Features:** No Franchisee Admin role, no franchise-specific portals, no franchise override workflows

**Operational Characteristics:**
- All users share the same company context
- All queries automatically scope to the single company
- No need for tenant isolation logic in UI/UX
- Simplified user management (no tenant assignment)

### MVP: Foundational Multi-Tenant Patterns

**What This Means:**
- **Database Schema:** All tables include `company_id` columns as specified in NFR13-NFR18
- **Query Patterns:** All queries use company scoping patterns (even though there's only one company)
- **Data Categories:** Configurable Assets use nullable `company_id`, Operational Data use non-nullable `company_id`
- **Retrieval Pattern:** "Golden Rule of Data Retrieval" implemented (search franchise override first, fall back to platform default)

**Why This Is MVP:**
- **Zero Architectural Debt:** No rewrite needed when transitioning to multi-tenant
- **Minimal Overhead:** The nullable `company_id` pattern adds negligible complexity for single-tenant
- **Future-Proof:** Architecture ready for multi-tenant transition without code changes
- **Security by Design:** Company scoping patterns prevent data leaks from day one

---

## NFR Classification: MVP vs Post-MVP

### MVP NFRs (Foundational Patterns)

These NFRs are **required for MVP** because they establish foundational patterns with minimal complexity:

- **NFR13:** Single-tenant application with multi-tenant patterns embedded
- **NFR14:** Inheritance and Override model (pattern only, no UI/workflows)
- **NFR15:** Distinguish Configurable Assets vs Operational Data (data model only)
- **NFR16:** Nullable `company_id` in Configurable Assets tables
- **NFR17:** Golden Rule of Data Retrieval (query pattern)
- **NFR18:** Non-nullable `company_id` in Operational Data tables with strict scoping

**Implementation for MVP:**
- Database schema includes `company_id` columns as specified
- All queries use company scoping (even though there's only one company)
- Configurable Assets use nullable `company_id` (all set to NULL for MVP = platform defaults)
- Operational Data use non-nullable `company_id` (all set to single company ID)
- Query patterns implement "Golden Rule" (though no franchise overrides exist in MVP)

**Complexity Impact:** **Low** - These are primarily database schema and query pattern decisions. No UI complexity, no workflow complexity, no feature complexity.

### Post-MVP NFRs (Franchise Features)

These NFRs are **deferred to post-MVP** because they add significant complexity and are not needed for initial launch:

- **NFR19:** Franchisee Admin role with separate Franchisee Admin Portal
- **NFR20:** "Clone as Override" workflow for Franchisee Admins

**Why Deferred:**
- **Not Needed for MVP:** Single-tenant MVP doesn't need franchise management features
- **Significant Complexity:** Requires new roles, new portals, new workflows, new UI
- **Can Be Added Later:** These features can be added post-MVP when multi-tenant transition occurs
- **No Architectural Blocking:** The foundational patterns (NFR13-NFR18) enable these features without architectural changes

**Migration Path:** When transitioning to multi-tenant/franchise model:
1. Add Franchisee Admin role to RBAC system
2. Create Franchisee Admin Portal UI
3. Implement "Clone as Override" workflow
4. No database schema changes needed (already supports it)
5. No query pattern changes needed (already implements "Golden Rule")

---

## Company Scoping Rules for MVP

### Operational Data (Non-Nullable `company_id`)

**MVP Implementation:**
- All operational data tables have non-nullable `company_id`
- All queries MUST include `company_id` scoping: `WHERE company_id = user.company_id`
- For MVP: All users have the same `company_id` (single company)
- Pattern ensures data isolation from day one (even though there's only one company)

**Example:**
```typescript
// MVP: All users have same company_id, but pattern is enforced
const estimates = await db.estimate.findMany({
  where: {
    company_id: user.company_id,  // Required scoping (same for all users in MVP)
    // ... other filters
  }
});
```

**Benefits:**
- Zero code changes needed when adding second company
- Security patterns established from day one
- Prevents accidental data leaks
- Makes multi-tenant transition seamless

### Configurable Assets (Nullable `company_id`)

**MVP Implementation:**
- All configurable asset tables have nullable `company_id`
- For MVP: All configurable assets have `company_id = NULL` (platform defaults)
- Query pattern implements "Golden Rule": search for franchise override first, fall back to platform default
- For MVP: Only platform defaults exist (no franchise overrides)

**Example:**
```typescript
// MVP: Only platform defaults exist (company_id = NULL)
const product = await db.product.findFirst({
  where: {
    OR: [
      { company_id: user.company_id },  // Franchise override (none exist in MVP)
      { company_id: null }               // Platform default (all assets in MVP)
    ],
    // ... other filters
  },
  orderBy: {
    company_id: 'desc'  // Prefer franchise override (none in MVP, so gets NULL)
  }
});
```

**Benefits:**
- Pattern established from day one
- Zero code changes needed when adding franchise overrides
- Makes franchise transition seamless
- Single query pattern works for both MVP and multi-tenant

---

## Migration Path: Single-Tenant to Multi-Tenant

### Phase 1: MVP (Current)
- **State:** Single company, all users share one `company_id`
- **Configurable Assets:** All have `company_id = NULL` (platform defaults)
- **Operational Data:** All have same `company_id` (single company)
- **Features:** No tenant management, no franchise features

### Phase 2: Multi-Tenant Transition (Post-MVP)
- **State:** Multiple companies, each with unique `company_id`
- **Configurable Assets:** Platform defaults (`company_id = NULL`) + franchise overrides (specific `company_id`)
- **Operational Data:** Each company has isolated data (different `company_id`)
- **Features:** Tenant onboarding, tenant management, data isolation

### Phase 3: Franchise Features (Post-MVP)
- **State:** Multi-tenant with franchise support
- **Configurable Assets:** Platform defaults + franchise overrides (inheritance and override model)
- **Operational Data:** Each franchise has isolated data
- **Features:** Franchisee Admin role, Franchisee Admin Portal, "Clone as Override" workflow

### Migration Steps (When Ready)

**No Code Changes Required:**
- Database schema already supports multi-tenancy
- Query patterns already implement company scoping
- "Golden Rule" already implemented for configurable assets

**New Features Required:**
- Tenant onboarding workflow
- Tenant management UI
- Company creation/management (System Admin)
- Franchisee Admin role (NFR19)
- Franchisee Admin Portal (NFR19)
- "Clone as Override" workflow (NFR20)

**Testing Required:**
- Multi-tenant data isolation tests
- Company scoping validation tests
- Franchise override inheritance tests
- Cross-tenant access prevention tests

---

## Complexity Analysis

### MVP Complexity (With Foundational Patterns)

**Database Schema:** +5% complexity
- Adding `company_id` columns to all tables
- Adding indexes on `company_id`
- Adding foreign key constraints

**Query Patterns:** +10% complexity
- All queries must include `company_id` scoping
- Configurable asset queries use "Golden Rule" pattern
- Query builders must enforce company scoping

**Application Logic:** +5% complexity
- User context must include `company_id`
- Query builders must automatically scope by `company_id`
- Validation must ensure `company_id` matches user's company

**Total MVP Overhead:** ~20% additional complexity for foundational patterns

**Benefits:**
- Zero architectural debt
- Seamless multi-tenant transition
- Security by design
- Future-proof architecture

### Post-MVP Complexity (Franchise Features)

**NFR19 (Franchisee Admin Role & Portal):** +30% complexity
- New role definition
- New portal UI
- New permission system
- New workflows

**NFR20 (Clone as Override Workflow):** +15% complexity
- New workflow UI
- New business logic
- New validation rules

**Total Post-MVP Overhead:** ~45% additional complexity for franchise features

**Decision:** Defer to post-MVP because:
- Not needed for MVP launch
- Significant complexity
- Can be added without architectural changes
- Foundational patterns already support it

---

## Recommendations

### For MVP Development

1. **Implement NFR13-NFR18:** These are foundational patterns with low complexity overhead
2. **Defer NFR19-NFR20:** These are franchise features not needed for MVP
3. **Enforce Company Scoping:** All queries must include `company_id` scoping (even though there's only one company)
4. **Use Nullable Pattern:** Configurable assets use nullable `company_id` (all NULL for MVP)
5. **Document Patterns:** Ensure developers understand the patterns and rationale

### For Post-MVP Planning

1. **Multi-Tenant Transition:** Add tenant onboarding and management features
2. **Franchise Features:** Implement NFR19-NFR20 when franchise model is needed
3. **Testing:** Add comprehensive multi-tenant isolation tests
4. **Documentation:** Update architecture docs with multi-tenant operational procedures

---

## Related Documentation

- [`multi-tenancy.md`](./multi-tenancy.md) - Detailed multi-tenancy architecture
- [`rbac-specification.md`](./rbac-specification.md) - RBAC with multi-tenant considerations
- [`docs/prd/requirements.md`](../prd/requirements.md) - NFR13-NFR20 definitions

---

## Approval

**Decision Date:** 2025-01-14  
**Approved By:** Product Manager (John)  
**Status:** ✅ **APPROVED** - MVP scope clarified, NFR19-NFR20 deferred to post-MVP

---

*This document resolves PRD Critical Review Issue #8: Multi-Tenant Architecture Complexity*

