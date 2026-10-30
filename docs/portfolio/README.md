# Portfolio Redesign — Source of Truth

**Status:** Approved baseline | **Version:** 1.0 | **Approved:** 2026-10-30

This directory contains the approved product and technical baseline for the portfolio redesign. Implementation must follow these documents. Material changes to scope, architecture, hosting, or experience require an explicit decision and an update to the relevant document.

## Documents
1. [Product Requirements Document (PRD)](./01-product-requirements.md) — audience, goals, scope, requirements, acceptance criteria.
2. [High-Level Architecture (HLA)](./02-high-level-architecture.md) — technology, system boundaries, hosting, deployment, quality attributes.
3. [Low-Level Design (LLD)](./03-low-level-design.md) — routes, components, content models, theme, diagrams, testing.

## Approved decisions
- Audience: recruiters/hiring managers and fellow engineers.
- Direction: Modern Editorial × Engineering Studio, homepage direction B (professional identity and engineering visuals together).
- Stack: Astro, TypeScript, Markdown/MDX, custom CSS, Playwright, GitHub Actions.
- Hosting: existing GitHub Pages project path /parirams-portfolio/.
- Theme: light by default, with dark-mode toggle and persisted preference.
- Featured work: three professional engineering case studies.
- Personal work: Chess Game and Flutter To Do App in a smaller secondary section.
- Architecture visuals: interactive, accessible SVG diagrams.
- Delivery: develop separately; preserve production until replacement is validated; merge only after required checks pass; verify deployment.

## Document governance
- These documents are the baseline for implementation planning and story acceptance.
- Keep requirements and implementation decisions traceable to the PRD/HLA/LLD.
- Record approved changes in the relevant document and update this index.
- Do not publish confidential employer information, credentials, internal URLs, proprietary diagrams, or unverified performance claims.
