# Backyard Builders Architecture Documentation

**Version:** v4  
**Date:** 2025-01-27  
**Status:** Active

---

## Table of Contents

### Core Architecture
- [Service Architecture](./service-architecture.md) - Monolithic architecture with feature-based slices, three-layer frontend architecture
- [Technology Stack](./tech-stack.md) - Complete technology stack specification with rationale
- [Repository Structure](./repository-structure.md) - Code organization and repository structure
- [Technical Assumptions](./technical-assumptions.md) - Core technical assumptions and architectural decisions

### Data Architecture
- [Data Model](./data-model.md) - Complete database schema (74 tables, sharded by domain)
  - [Data Model Index](./data-model/index.md) - Detailed data model table of contents
  - [Core Customer & Estimate Domain](./data-model/core-customer-estimate-domain.md) - 18 tables
  - [Pricing & Catalog Domain](./data-model/pricing-catalog-domain.md) - 15 tables
  - [Projects & Workflow Domain](./data-model/projects-workflow-domain.md) - 18 tables
  - [System Infrastructure & Communication](./data-model/system-infrastructure-communication.md) - 23 tables
  - [Data Dependency Cascade Rules](./data-model/data-dependency-cascade-rules.md) - Cross-domain cascade rules
- [Data Dictionary](./data-dictionary.md) - Field definitions and data semantics (sharded by domain)
  - [Data Dictionary Index](./data-dictionary/index.md) - Detailed data dictionary table of contents
  - [Core Customer & Estimate Domain](./data-dictionary/core-customer-estimate-domain.md) - 18 tables
  - [Pricing & Catalog Domain](./data-dictionary/pricing-catalog-domain.md) - 15 tables
  - [Projects & Workflow Domain](./data-dictionary/projects-workflow-domain.md) - 18 tables
  - [System Infrastructure & Communication](./data-dictionary/system-infrastructure-communication.md) - 23 tables
- [Data Management](./data-management.md) - Data lifecycle and management policies
- [Data Validation Specification](./data-validation-specification.md) - Validation rules and edge case matrix
- [Enum Definitions](./enum-definitions.md) - Single source of truth for all enum values

### Security & Access Control
- [Security & Compliance](./security.md) - Security requirements and compliance standards
- [RBAC Specification](./rbac-specification.md) - Role-based access control system design
- [RBAC Feature Matrix](./rbac-feature-matrix.md) - Feature-to-permission cross-reference matrix
- [RBAC Acceptance Criteria Guide](./rbac-acceptance-criteria-guide.md) - Story acceptance criteria templates for RBAC
- [Multi-Tenancy](./multi-tenancy.md) - Multi-tenancy and franchise strategy

### Quality & Testing
- [Testing Strategy](./testing-strategy.md) - Overall testing approach and philosophy
- [Testing Requirements Specification](./testing-requirements-specification.md) - Detailed testing requirements and standards
- [Accessibility Implementation Specification](./accessibility-implementation-specification.md) - WCAG 2.1 Level AA compliance requirements

### System Design & Operations
- [Observability](./observability.md) - Monitoring, logging, and observability strategy
- [Performance Requirements](./performance-requirements.md) - Performance targets and requirements
- [Reliability Specification](./reliability-spec.md) - System uptime, backup, and recovery requirements
- [Error Handling Specification](./error-handling-specification.md) - Error handling patterns and requirements
- [Background Jobs](./background-jobs.md) - Background job processing and scheduling
- [Deployment & Hosting](./deployment.md) - Deployment strategy and hosting configuration

### External Integration
- [External Services & APIs](./external-services.md) - Third-party service integrations
- [External Service Failure Scenarios](./external-service-failure-scenarios.md) - Disaster recovery and failure handling

### Workflow & State Management
- [Unified State Machine Specification](./unified-state-machine-specification.md) - State machine patterns and specifications
- [Transaction Boundary Specification](./transaction-boundary-specification.md) - Transaction management and boundaries
- [Change Order PM Modification Spec](./change-order-pm-modification-spec.md) - Change order project manager modification workflow
- [Customer Deactivation Validation Spec](./customer-deactivation-validation-spec.md) - Customer deactivation validation rules

### Design & Development
- [Design System](./design-system.md) - UI/UX design system and component standards
- [Development Tools](./development-tools.md) - Development tooling and setup
- [MVP Scope Decision](./mvp-scope-decision.md) - MVP scope and architectural decisions

---

*This architecture documentation has been sharded for better maintainability. The main architecture file is located at [`../architecture.md`](../architecture.md).*

