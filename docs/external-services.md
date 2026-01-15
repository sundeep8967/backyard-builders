# External Services & APIs

**Version:** v4  
**Last Updated:** 2025-01-XX  
**Status:** Active

---

## Overview

This document describes all external services and APIs integrated into the platform. External services provide specialized functionality without requiring custom implementation, reducing development time and ensuring compliance and security best practices.

## Authentication & User Management

### Clerk
- **Service:** Managed authentication and user management service
- **Features:**
  - Password management (no custom password handling)
  - Social login (Google, Apple, etc.)
  - Account linking
  - User management
  - Session management
- **Rationale:** Using a managed authentication service reduces attack surface, ensures security best practices, and eliminates the need for custom password handling. Clerk provides comprehensive authentication features with excellent developer experience.

## Mapping & Location Services

### Google Maps Platform
- **Services:**
  - **Places API:** Address auto-complete functionality
  - **Maps Embed API:** Map preview and display
- **Usage:** Property address input, map visualization
- **Rationale:** Google Maps Platform provides industry-standard mapping and location services with excellent accuracy and coverage.

## Communication Services

### Email Delivery
- **Service:** Resend / Postmark
- **Usage:** Transactional email delivery service
- **Features:** Email sending, delivery tracking, bounce handling
- **Rationale:** Managed email delivery services ensure high deliverability rates, handle bounces and spam management, and provide delivery tracking.

### Customer Chat
- **Service:** Intercom / Crisp
- **Usage:** On-demand customer chat service
- **Features:** Live chat, chat history, automated responses
- **Rationale:** Managed chat services provide professional customer support capabilities without requiring custom implementation.

## Payment & Financial Services

### Tax Compliance
- **Service:** Avalara
- **Usage:** Third-party tax compliance service for accurate, address-specific sales tax
- **Features:** Real-time tax calculation, tax compliance, reporting
- **Rationale:** Tax compliance is complex and varies by jurisdiction. Using a specialized service ensures accuracy and compliance without requiring custom tax logic.

### Financing
- **Service:** Affirm / Financing Partner
- **Usage:** API for real-time monthly payment calculation
- **Features:** Payment calculation, financing options, payment processing
- **Rationale:** Financing partners provide specialized payment calculation and processing capabilities.

### E-Signatures [Post-MVP]
- **Service:** DocuSign / HelloSign
- **Usage:** Legally binding e-signature service (replaces MVP's "I Accept" model)
- **Status:** Post-MVP feature
- **Rationale:** E-signature services provide legally binding document signing with compliance and audit trails.

## Monitoring & Observability

### Error & Performance Monitoring
- **Service:** Sentry / LogRocket
- **Usage:** Error and performance monitoring service
- **Features:**
  - Error tracking and alerting
  - Performance monitoring
  - User session replay
  - Error reporting with context
- **Rationale:** Comprehensive error and performance monitoring is critical for production applications. These services provide detailed error context, performance metrics, and user session data for debugging.

## Content Management

### Headless CMS
- **Service:** Sanity.io
- **Usage:** Headless CMS for managing help content and marketing copy
- **Features:** Content management, content versioning, content delivery
- **Rationale:** Headless CMS provides flexible content management for non-technical users while maintaining developer control over presentation.

## Security Services

### Bot Protection & Rate Limiting
- **Service:** Arcjet
- **Usage:** Developer-first security platform for bot protection, rate limiting, and email validation
- **Features:**
  - Bot protection on public-facing forms
  - Rate limiting on authentication routes and resource-intensive endpoints
  - Email validation
  - Security threat detection
- **Rationale:** Arcjet provides comprehensive security without requiring custom implementation, reducing development time and ensuring security best practices.

## Integration Patterns

### API Integration
- All external services are integrated via their official APIs
- API keys and credentials are managed securely (not in code)
- Error handling and retry logic implemented for all integrations
- Rate limiting and quota management handled per service requirements

### Service Failures
- Graceful degradation when external services are unavailable
- User-friendly error messages when services fail
- Monitoring and alerting for service failures
- Fallback behavior where possible
- **Comprehensive failure scenarios, recovery procedures, monitoring requirements, and SLOs are documented in:** [`external-service-failure-scenarios.md`](./external-service-failure-scenarios.md)

### Data Privacy & Compliance
- All external services comply with data privacy regulations (GDPR, CCPA, etc.)
- User data is handled according to privacy policies
- External services are vetted for security and compliance

## Service Status & Monitoring

### Service Health Monitoring
- All external services are monitored for availability
- Alerts configured for service failures
- Status pages checked for known issues
- **Detailed monitoring requirements, alerting configuration, and health check implementation:** See [`external-service-failure-scenarios.md`](./external-service-failure-scenarios.md)

### Service Dependencies
- Critical services (authentication, payments) have high availability requirements
- Non-critical services (chat, CMS) can degrade gracefully
- Service dependencies documented for incident response
- **Complete failure scenarios, recovery procedures, and SLOs:** See [`external-service-failure-scenarios.md`](./external-service-failure-scenarios.md)

## Related Documentation

- [`tech-stack.md`](./tech-stack.md) - Technology stack overview
- [`security.md`](./security.md) - Security implementation details
- [`observability.md`](./observability.md) - Monitoring and observability
- [`external-service-failure-scenarios.md`](./external-service-failure-scenarios.md) - **Comprehensive failure scenarios, recovery procedures, monitoring requirements, SLOs, and runbooks**

