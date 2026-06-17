# Project Constitution

## Core Principles

### I. Clean Code
- Purpose: Code must be readable, predictable, and explicit. Favor clarity over cleverness.
- Practices: use descriptive names, small functions, explicit data shapes, and consistent formatting.
- Refactoring: keep implementations minimal; refactor opportunistically to reduce complexity.

### II. Simple UX
- Purpose: Minimize user cognitive load; prefer single-purpose interfaces.
- Practices: clear affordances, concise copy, predictable flows, and avoid unnecessary features.
- Accessibility: ensure basic keyboard navigation and semantic markup for assistive tech.

### III. Responsive Design
- Purpose: Deliver a usable experience across screen sizes and input methods.
- Practices: mobile-first layouts, fluid spacing, breakpoints for content, and touch-friendly controls.

### IV. Minimal Dependencies
- Purpose: Keep the dependency surface small to reduce maintenance and security risk.
- Practices: prefer native browser APIs and small, focused libraries; review each dependency for necessity and longevity.

### V. No Testing (Supreme Rule)
- Absolutely no testing: no unit tests, no integration tests, no end-to-end (E2E) tests, and no automated test suites of any kind.
- This rule supersedes all other guidance in this constitution and the project. Any recommendation implying automated tests is explicitly disallowed.

## Constraints & Technology
- The project must use the framework versions declared in `package.json` for runtime compatibility.
	- Next.js: 16.2.9
	- React: 19.2.4
	- Tailwind CSS: ^4 (as declared in `devDependencies`)

## Development Workflow
- Branching: small, focused branches; PRs should contain minimal, reviewable changes.
- Reviews: rely on human code review and manual QA in place of automated tests. Reviewers must verify behavior locally and in staging.
- CI/CD: may run linting and build steps, but must not introduce automated tests into the pipeline.

## Security & Observability
- Keep secrets out of source control; use environment variables and secure stores.
- Log meaningful events at appropriate levels; prefer structured logs where helpful.

## Governance
- This constitution is authoritative for design and development decisions in the project.
- Amendments require a documented proposal, maintainer approval, and an explicit migration plan.
- The "No Testing" clause is non-negotiable and overrides conflicting policies.

**Version**: 1.0.0 | **Ratified**: 2026-06-17 | **Last Amended**: 2026-06-17
