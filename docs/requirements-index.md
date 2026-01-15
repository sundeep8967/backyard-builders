# Requirements Index

**Purpose:** Master index mapping all Functional Requirements (FRs) and Non-Functional Requirements (NFRs) to their locations for traceability.

**Status:** ✅ Migration Complete - All requirements migrated to feature specs and architecture documents.

**Last Updated:** 2025-01-27

---

## Functional Requirements (FRs)

### Platform Foundations & Core Experience

#### Feature: `auth`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR1 | Secure user authentication using Clerk | [`../features/auth-feature-spec.md`](../features/auth-feature-spec.md) | Migrated |
| FR2 | Account linking for different authentication methods | [`../features/auth-feature-spec.md`](../features/auth-feature-spec.md) | Migrated |
| FR3 | Forgot Password feature | [`../features/auth-feature-spec.md`](../features/auth-feature-spec.md) | Migrated |
| FR5 | User impersonation (MVP) with transition path | [`../features/auth-feature-spec.md`](../features/auth-feature-spec.md) | Migrated |
| FR6 | Automatic work re-assignment and communication re-routing on deactivation | [`../features/auth-feature-spec.md`](../features/auth-feature-spec.md) | Migrated |

#### Feature: `dashboard`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR98 | Role-based dashboard with personalized widgets | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `dashboard-feature-spec.md` | Migrated |

#### Feature: `directory`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR95 | Central directory (contacts app) as single source of truth | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `directory-feature-spec.md` | Migrated |
| FR96 | Prevent data duplication by centralizing People and Company records | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `directory-feature-spec.md` | Migrated |

#### Feature: `help`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR97 | Searchable knowledge base with contextual help | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `help-feature-spec.md` | Migrated |

#### Feature: `messaging`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR60 | Real-time messaging platform with contextual threads | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `messaging-feature-spec.md` | Migrated |
| FR61 | Internal-only and customer-visible message threads | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `messaging-feature-spec.md` | Migrated |

#### Feature: `navigation`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR90 | Role-based navigation and layout rendering | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `navigation-feature-spec.md` | Migrated |

#### Feature: `notifications`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR36 | Reminder notifications for unscheduled site visits | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `notifications-feature-spec.md` | Migrated |
| FR63 | Generate and display asynchronous user alerts | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `notifications-feature-spec.md` | Migrated |
| FR64 | Role-based default notification preferences | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `notifications-feature-spec.md` | Migrated |
| FR65 | Retry logic for failed notification deliveries | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `notifications-feature-spec.md` | Migrated |
| FR66 | Reminder notifications for expiring contracts | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `notifications-feature-spec.md` | Migrated |

#### Feature: `search`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR89 | Search functionality for Projects and Customers | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `search-feature-spec.md` | Migrated |

#### Feature: `showcase`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR20 | "Shop the Look" workflow from showcase gallery | [`../features/showcase-feature-spec.md`](../features/showcase-feature-spec.md) | Migrated |
| FR91 | Public-facing showcase gallery of completed projects | [`../features/showcase-feature-spec.md`](../features/showcase-feature-spec.md) | Migrated |
| FR92 | "Shop the Look" functionality with pre-loaded design selections | [`../features/showcase-feature-spec.md`](../features/showcase-feature-spec.md) | Migrated |

#### Feature: `users`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR93 | Household collaboration model with Owner/Member roles | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `users-feature-spec.md` | Migrated |
| FR94 | Personal profile management functionality | [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md) or create `users-feature-spec.md` | Migrated |

### Property & Estimates

#### Feature: `property`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR4 | Required onboarding sequence (Zip Code Validation, Account Creation, Dashboard Access) | [`../features/property-feature-spec.md`](../features/property-feature-spec.md) | Migrated |
| FR7 | Property address entry and first property profile creation | [`../features/property-feature-spec.md`](../features/property-feature-spec.md) | Migrated |
| FR8 | Property address validation using Google Maps API | [`../features/property-feature-spec.md`](../features/property-feature-spec.md) | Migrated |
| FR9 | Zip code validation for serviceability | [`../features/property-feature-spec.md`](../features/property-feature-spec.md) | Migrated |

#### Feature: `estimates`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR10 | Verified service existing conditions read-only after DA validation | [`../features/estimates-feature-spec.md`](../features/estimates-feature-spec.md) | Migrated |
| FR11 | Automatic status revert to "Requires Additional Verification" | [`../features/estimates-feature-spec.md`](../features/estimates-feature-spec.md) | Migrated |
| FR12 | Scheduling additional site visits for new unverified services | [`../features/estimates-feature-spec.md`](../features/estimates-feature-spec.md) | Migrated |
| FR13 | New Estimate Wizard for service selection | [`../features/estimates-feature-spec.md`](../features/estimates-feature-spec.md) | Migrated |
| FR14 | Interactive Design Center for project customization | [`../features/estimates-feature-spec.md`](../features/estimates-feature-spec.md) | Migrated |
| FR15 | Limit of three active estimates per property | [`../features/estimates-feature-spec.md`](../features/estimates-feature-spec.md) | Migrated |
| FR16 | Debounce price calculations and rate limiting | [`../features/estimates-feature-spec.md`](../features/estimates-feature-spec.md) | Migrated |
| FR17 | Validate saved configurations and require replacement of deactivated items | [`../features/estimates-feature-spec.md`](../features/estimates-feature-spec.md) | Migrated |
| FR18 | Estimate duplication functionality ("Duplicate to Explore") | [`../features/estimates-feature-spec.md`](../features/estimates-feature-spec.md) | Migrated |
| FR19 | Prevent customer editing after "Accept & Request Site Visit" | [`../features/estimates-feature-spec.md`](../features/estimates-feature-spec.md) | Migrated |

### Pricing & Advisor

#### Feature: `pricing`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR21 | Four-stage calculation pipeline | [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) | Migrated |
| FR22 | Price lock entitlement on "Accept & Request Site Visit" | [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) | Migrated |
| FR23 | Apply locked pricing from active_price_lock_timestamp | [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) | Migrated |
| FR24 | Inherit price lock to project and consume on creation | [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) | Migrated |
| FR25 | Automatic price lock expiration (90 days) | [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) | Migrated |
| FR26 | Calculate sales tax based on verified property address | [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) | Migrated |
| FR27 | Pre-calculate and cache popular template combinations | [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) | Migrated |
| FR28 | Manual cache rebuild trigger in admin-portal | [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) | Migrated |

#### Feature: `advisor`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR29 | "Duplicate for Proposal" workflow (never edit directly) | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR30 | Automatic status change to "Under DA Review" on duplicate | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR31 | Automatic transition to "Site Conditions Verified" on checklist completion | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR32 | Prevent contract creation until status verified and all services verified | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR33 | Lead assignment functionality | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR34 | Site visit scheduling with appointment management | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR35 | Automatic appointment confirmation if DA doesn't confirm within timeout | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR37 | Introduce customers to assigned Design Advisor | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR38 | Generate contracts following strict sequence | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR39 | Allow Design Advisors to add custom line items | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR40 | Require Design Advisor confirmation before project creation | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR43 | Design Advisors can manually extend offer validity dates | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |
| FR43.1 | (Sub-requirement of FR43) | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) | Migrated |

### Projects & Execution

#### Feature: `projects`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR41 | Handoff Summary workflow for DA to PM transfer | [`../features/projects-feature-spec.md`](../features/projects-feature-spec.md) | Migrated |
| FR44 | Three-phase lifecycle management (Pre-Construction, Construction, Post-Completion) | [`../features/projects-feature-spec.md`](../features/projects-feature-spec.md) | Migrated |
| FR45 | Mandatory two-step approval workflow for change orders | [`../features/projects-feature-spec.md`](../features/projects-feature-spec.md) | Migrated |
| FR48 | Block project start until required selection deadlines completed | [`../features/projects-feature-spec.md`](../features/projects-feature-spec.md) | Migrated |
| FR49 | Daily progress logs for project tracking | [`../features/projects-feature-spec.md`](../features/projects-feature-spec.md) | Migrated |
| FR50 | Construction schedule management functionality | [`../features/projects-feature-spec.md`](../features/projects-feature-spec.md) | Migrated |
| FR51 | "Living Contract" hub showing contract value and change orders | [`../features/projects-feature-spec.md`](../features/projects-feature-spec.md) | Migrated |

#### Feature: `files` (Project Execution)
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR57 | Shared, reusable UI components and logic for file and photo management | [`../features/project-execution-feature-spec.md`](../features/project-execution-feature-spec.md) | Migrated |
| FR58 | Virtual folder structure for file organization | [`../features/project-execution-feature-spec.md`](../features/project-execution-feature-spec.md) | Migrated |
| FR59 | Automatic folder structure generation for new projects | [`../features/project-execution-feature-spec.md`](../features/project-execution-feature-spec.md) | Migrated |

#### Feature: `financials`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR46 | Require Schedule of Values (SOV) approval before billing | [`../features/financials-feature-spec.md`](../features/financials-feature-spec.md) | Migrated |
| FR47 | Trigger SOV revision when change orders are approved | [`../features/financials-feature-spec.md`](../features/financials-feature-spec.md) | Migrated |
| FR52 | Prevent invoice sending until SOV status is "Active" | [`../features/financials-feature-spec.md`](../features/financials-feature-spec.md) | Migrated |
| FR53 | Multi-step approval workflow for credit memos | [`../features/financials-feature-spec.md`](../features/financials-feature-spec.md) | Migrated |
| FR54 | Block subcontractor invoice payments until signed lien waiver uploaded | [`../features/financials-feature-spec.md`](../features/financials-feature-spec.md) | Migrated |
| FR55 | Derive invoice payment status from payments, not stored values | [`../features/financials-feature-spec.md`](../features/financials-feature-spec.md) | Migrated |
| FR56 | Payment tracking functionality | [`../features/financials-feature-spec.md`](../features/financials-feature-spec.md) | Migrated |
| FR81 | Require In-App Admin final approval for all customer credit memos | [`../features/financials-feature-spec.md`](../features/financials-feature-spec.md) | Migrated |

#### Feature: `rfi` (Request for Information)
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR62 | Request for Information (RFI) workflow | Create [`../features/rfi-feature-spec.md`](../features/rfi-feature-spec.md) | Migrated |

#### Feature: `reporting`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR67 | Read-only reporting dashboards (project health, sales funnel, financial) | Create [`../features/reporting-feature-spec.md`](../features/reporting-feature-spec.md) | Migrated |
| FR68 | Aggregate data from across platform for actionable insights | Create [`../features/reporting-feature-spec.md`](../features/reporting-feature-spec.md) | Migrated |
| FR69 | No capability to edit underlying data from reporting interface | Create [`../features/reporting-feature-spec.md`](../features/reporting-feature-spec.md) | Migrated |

#### Feature: `warranty`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR70 | Activate warranty workflows after project completion_date is set | Create [`../features/warranty-feature-spec.md`](../features/warranty-feature-spec.md) | Migrated |
| FR71 | Customer portal for warranty claim submission and tracking | Create [`../features/warranty-feature-spec.md`](../features/warranty-feature-spec.md) | Migrated |
| FR72 | Warranty Coordinator dashboard for managing claims | Create [`../features/warranty-feature-spec.md`](../features/warranty-feature-spec.md) | Migrated |

### Admin & Multi-Tenancy

#### Feature: `admin-portal`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR73 | Secure, internal-only admin portal | Create [`../features/admin-portal-feature-spec.md`](../features/admin-portal-feature-spec.md) | Migrated |
| FR74 | Immutable versioning for all configurable assets | Create [`../features/admin-portal-feature-spec.md`](../features/admin-portal-feature-spec.md) | Migrated |
| FR75 | Require all changes saved in "Draft" state with explicit approval | Create [`../features/admin-portal-feature-spec.md`](../features/admin-portal-feature-spec.md) | Migrated |
| FR76 | Deactivate (not delete) master data to preserve historical integrity | Create [`../features/admin-portal-feature-spec.md`](../features/admin-portal-feature-spec.md) | Migrated |
| FR77 | Log all admin actions to admin_action_audit_log | Create [`../features/admin-portal-feature-spec.md`](../features/admin-portal-feature-spec.md) | Migrated |
| FR78 | Prevent circular dependencies in formula definitions | Create [`../features/admin-portal-feature-spec.md`](../features/admin-portal-feature-spec.md) | Migrated |

#### Feature: `in-app-admin`
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR79 | In-App Admin role for day-to-day operations | Create [`../features/in-app-admin-feature-spec.md`](../features/in-app-admin-feature-spec.md) | Migrated |
| FR80 | Require In-App Admin approval for DA discounts exceeding threshold | Create [`../features/in-app-admin-feature-spec.md`](../features/in-app-admin-feature-spec.md) | Migrated |
| FR82 | In-App Admin cannot modify core product data | Create [`../features/in-app-admin-feature-spec.md`](../features/in-app-admin-feature-spec.md) | Migrated |
| FR83 | Company Settings management for operational rules | Create [`../features/in-app-admin-feature-spec.md`](../features/in-app-admin-feature-spec.md) | Migrated |

#### Feature: `multi-tenancy` (Architecture)
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR84 | Nullable company_id column in Configurable Asset tables | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |
| FR85 | "Golden Rule of Data Retrieval" for franchise override | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |
| FR86 | Enforce non-nullable company_id for Operational Data tables | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |
| FR87 | "Clone as Override" workflow for Franchisee Admins | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |
| FR88 | Automatic company_id assignment based on property address | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |

#### Contract Expiration
| FR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| FR42 | Automatic contract expiration when offer_valid_until date passes | [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) or [`../features/projects-feature-spec.md`](../features/projects-feature-spec.md) | Migrated |

---

## Non-Functional Requirements (NFRs)

### Security
| NFR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| NFR1 | Handle passwords through secure managed service (Clerk) | [`../architecture/security.md`](../architecture/security.md) or create `security-spec.md` | Migrated |
| NFR2 | Enforce role-based access control (RBAC) on all API endpoints | [`../architecture/security.md`](../architecture/security.md) or [`../architecture/rbac-specification.md`](../architecture/rbac-specification.md) | Migrated |
| NFR3 | Log all admin-portal operations to admin_action_audit_log | [`../architecture/security.md`](../architecture/security.md) or create `security-spec.md` | Migrated |
| NFR4 | Automated threat protection using Arcjet | [`../architecture/security.md`](../architecture/security.md) or create `security-spec.md` | Migrated |
| NFR5 | Rate limiting on authentication routes | [`../architecture/security.md`](../architecture/security.md) or create `security-spec.md` | Migrated |
| NFR6 | Rate limiting on resource-intensive API endpoints | [`../architecture/security.md`](../architecture/security.md) or create `security-spec.md` | Migrated |

### Performance
| NFR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| NFR7 | API response time < 500ms (p90) | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) or create `performance-spec.md` | Migrated |
| NFR9 | Rate limiting on key API endpoints | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) or create `performance-spec.md` | Migrated |
| NFR34 | Dashboard initial render within 2 seconds (p90) | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) | Migrated |
| NFR35 | Search results within 300ms (p90) | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) | Migrated |
| NFR36 | File uploads and downloads performance targets | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) | Migrated |
| NFR37 | Real-time messages with low latency (< 1s p90) | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) | Migrated |
| NFR38 | Report generation within acceptable timeframes | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) | Migrated |
| NFR39 | Pricing calculation < 500ms (p90) | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) | Migrated |
| NFR40 | Comprehensive caching strategies | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) | Migrated |
| NFR41 | Comprehensive load testing | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) | Migrated |
| NFR42 | Performance monitoring and alerting | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) | Migrated |

### Reliability
| NFR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| NFR8 | System uptime > 99.9% | [`../architecture/reliability-spec.md`](../architecture/reliability-spec.md) | Migrated |
| NFR26 | Automated backup and point-in-time recovery (Supabase) | [`../architecture/reliability-spec.md`](../architecture/reliability-spec.md) | Migrated |

### Multi-Tenancy
| NFR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| NFR13 | Single-tenant application with multi-tenancy patterns | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |
| NFR14 | "Inheritance and Override" model for franchise-ready architecture | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |
| NFR15 | Distinguish Configurable Assets vs Operational Data | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |
| NFR16 | Nullable company_id in Configurable Asset tables | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |
| NFR17 | "Golden Rule of Data Retrieval" | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |
| NFR18 | Non-nullable company_id for Operational Data tables | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |
| NFR19 | Franchisee Admin role and portal (POST-MVP) | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |
| NFR20 | "Clone as Override" workflow (POST-MVP) | [`../architecture/multi-tenancy.md`](../architecture/multi-tenancy.md) | Migrated |

### Observability
| NFR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| NFR22 | All logs in structured format (JSON) | [`../architecture/observability.md`](../architecture/observability.md) | Migrated |
| NFR23 | Dashboards for technical and business metrics | [`../architecture/observability.md`](../architecture/observability.md) | Migrated |
| NFR24 | Alerts for error spikes, performance degradation, uptime | [`../architecture/observability.md`](../architecture/observability.md) | Migrated |
| NFR25 | User-friendly error component with Error ID | [`../architecture/observability.md`](../architecture/observability.md) or [`../architecture/error-handling-specification.md`](../architecture/error-handling-specification.md) | Migrated |

### DevOps
| NFR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| NFR27 | Database schema changes managed through migration tool | [`../architecture/deployment.md`](../architecture/deployment.md) or create `devops-spec.md` | Migrated |
| NFR30 | Deployment architecture (Vercel, Railway, Supabase) | [`../architecture/deployment.md`](../architecture/deployment.md) | Migrated |
| NFR31 | CI/CD Pipeline runs quality checks on every PR | [`../architecture/deployment.md`](../architecture/deployment.md) | Migrated |
| NFR32 | Merging to main triggers Staging deployment | [`../architecture/deployment.md`](../architecture/deployment.md) | Migrated |
| NFR33 | Manual promotion triggers Production deployment | [`../architecture/deployment.md`](../architecture/deployment.md) | Migrated |

### QA
| NFR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| NFR28 | Comprehensive data seeding scripts | [`../architecture/testing-strategy.md`](../architecture/testing-strategy.md) or [`../architecture/testing-requirements-specification.md`](../architecture/testing-requirements-specification.md) | Migrated |
| NFR29 | Testing Pyramid model (Static Analysis, Unit/Integration, E2E) | [`../architecture/testing-strategy.md`](../architecture/testing-strategy.md) or [`../architecture/testing-requirements-specification.md`](../architecture/testing-requirements-specification.md) | Migrated |

### Caching
| NFR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| NFR10 | Pre-calculate and cache popular template combinations | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) or [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) | Migrated |
| NFR11 | Automatic nightly template cache rebuild | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) or [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) | Migrated |
| NFR12 | Manual cache rebuild trigger in admin-portal | [`../architecture/performance-requirements.md`](../architecture/performance-requirements.md) or [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) | Migrated |

### Accessibility
| NFR Number | Requirement Summary | Target Location | Status |
|-----------|-------------------|-----------------|--------|
| NFR21 | All UI must meet WCAG 2.1 Level AA standards | [`../architecture/accessibility-implementation-specification.md`](../architecture/accessibility-implementation-specification.md) | Migrated |

---

## Summary Statistics

- **Total Functional Requirements (FRs):** 99 (including FR43.1)
- **Total Non-Functional Requirements (NFRs):** 42
- **Total Requirements:** 141

### Migration Status
- **Migrated:** 141
- **To be migrated:** 0
- **Current location:** See individual requirement entries above for specific file locations

---

## Notes

1. ✅ **Migration Complete:** All requirements have been migrated from the monolithic `requirements.md` to feature specs and architecture documents.
2. ✅ **Archive:** Original `requirements.md` has been archived to `docs/archive/prd-work-products/requirements-2025-01-27.md`.
3. ✅ **Single Source of Truth:** Each requirement now exists in exactly one location, co-located with its feature description.
4. **BMAD Structure:** Functional Requirements (FRs) are in `docs/features/*-feature-spec.md` and Non-Functional Requirements (NFRs) are in `docs/architecture/*.md`.
5. **Traceability:** All FR and NFR numbers are preserved for full traceability.

---

## Related Documents

- [Requirements Migration Prompt](../prompts/requirements-migration-prompt.md)
- [Feature Blueprint](./feature-blueprint.md)
- [PRD Index](./index.md)

