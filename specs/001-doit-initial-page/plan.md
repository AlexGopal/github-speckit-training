# Implementation Plan: doit-initial-page

**Branch**: `[000-doit-initial-page]` | **Date**: 2026-06-18 | **Spec**: `specs/001-doit-initial-page/spec.md`

**Input**: Feature specification from `/specs/001-doit-initial-page/spec.md`

## Summary

Build an accessible initial page for the "doit" goal tracker inside the existing Next.js app. The feature will use browser Local Storage for goal persistence, Tailwind `@theme` color tokens for styling, Shadcn UI component patterns for the modal and controls, and `date-fns` for localized date rendering.

## Technical Context

**Language/Version**: TypeScript, Next.js 16.2.9, React 19.2.4

**Primary Dependencies**: `next`, `react`, `react-dom`, `tailwindcss` v4, `date-fns`, Shadcn UI primitives

**Storage**: Browser Local Storage with JSON-serialized goal records stored under one key

**Validation**: manual acceptance using the feature scenarios from `spec.md`; no automated tests will be added per constitution

**Target Platform**: modern web browsers on desktop and mobile using the Next.js app router

**Project Type**: frontend web feature

**Performance Goals**: local UI updates within 100ms for goal actions; no network latency for core interactions

**Constraints**: no automated tests; use Tailwind `@theme` colors for theming; persistent Local Storage only; accessible modal and action controls; goal management within a single browser/device.

**Scale/Scope**: small demo feature handling device-local goals; no backend sync or cross-device persistence.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- The project uses constitution-approved runtime versions from `package.json`.
- No automated tests will be introduced, satisfying the supreme constitution rule.
- The feature remains frontend-only and avoids backend complexity.
- Accessibility requirements are explicit, including keyboard-dismissible modal behavior.

Result: pass.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

validation/
├── acceptance/
├── review/
└── notes/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── validation/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── validation/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform validation]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
