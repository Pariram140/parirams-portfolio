# Low-Level Design (LLD)

**Product:** Pariram S — Personal Portfolio  
**Version:** 1.0 | **Status:** Approved baseline | **Approval date:** 2026-10-30  
**Related:** [PRD](./01-product-requirements.md), [HLA](./02-high-level-architecture.md)

## 1. Design boundaries
The initial implementation is a static Astro site. Pages and content are rendered at build time. Client-side JavaScript is limited to controls requiring browser interaction.

The current production HTML/CSS/JS site remains untouched while the new implementation is developed on a separate branch.

## 2. Route design

| Route | Purpose |
|---|---|
| / | Homepage: hero, about, experience, featured work, personal projects, writing, contact |
| /projects/asynchronous-file-processing/ | Professional case study 1 |
| /projects/event-driven-integration/ | Professional case study 2 |
| /projects/secure-api-processing/ | Professional case study 3 |

Astro applies the configured base path to production URLs. A case-study URL therefore includes /parirams-portfolio/. Generate internal links from centralized route helpers or Astro's base URL rather than duplicating hardcoded strings.

## 3. Component design

| Component | Responsibility |
|---|---|
| SiteLayout | Document shell, SEO metadata, global styles, theme initialization |
| Header | Primary navigation, responsive menu, theme toggle |
| HeroSection | Professional positioning, calls to action, engineering visual |
| AboutSection | Summary and engineering philosophy |
| ExperienceTimeline | Chronological roles and validated highlights |
| FeaturedWorkSection | Prominent professional case-study cards |
| ProjectCard | Project summary, technology labels, route/repository links |
| PersonalProjectsSection | Smaller secondary Chess and Flutter To Do cards |
| CaseStudyLayout | Shared long-form project page structure |
| ArchitectureDiagram | SVG system diagram, node details, flow explanation |
| WritingSection | Selected publications and learning content |
| ContactSection | Contact methods and professional profile links |
| Footer | Secondary navigation and footer information |

Components receive typed data through props. Content must not be duplicated across component implementations.

## 4. Content model

Use Astro Content Collections with schemas in the content configuration.

### 4.1 Project/case-study fields

| Field | Type | Required | Purpose |
|---|---|---|---|
| title | string | Yes | Display title |
| slug | string | Yes | Stable route identifier |
| category | string | Yes | Cloud Architecture, Integration, etc. |
| summary | string | Yes | Short overview |
| featured | boolean | Yes | Featured placement |
| kind | enum | Yes | professional or personal |
| technologies | string[] | Yes | Validated technology labels |
| role | string | No | Owner's contribution, once validated |
| period | string | No | Project timeframe, if publishable |
| coverImage | image/path | No | Project visual |
| repositoryUrl | URL | No | Public source repository |
| problem | content | Case studies | Problem and context |
| architecture | content/reference | Case studies | Diagram and explanation |
| decisions | content[] | Case studies | Decisions and trade-offs |
| challenges | content[] | Case studies | Challenges and resolution |
| outcomes | content[] | Case studies | Verified outcomes and learnings |

The schema should distinguish required case-study content from optional personal-project fields. Do not populate unknown facts with invented values.

### 4.2 Experience fields
- Role title and organization.
- Start/end dates.
- Location, if approved for publication.
- Concise summary and achievement/highlight list.
- Technologies, where useful.

Use the existing site and owner-validated content as source material. The current source lists PayPal SDE 2 from November 2025 to present and Symphony Talent roles ending November 2025; verify descriptions and dates before publication.

### 4.3 Publications fields
- Title.
- Summary (optional).
- Publication URL.
- Publication date (optional).
- Topic/tags (optional).

## 5. Case-study page structure
Each professional case study follows the same narrative:
1. **Overview** — summary, role/context, technology labels.
2. **Problem** — problem and relevant constraints.
3. **Architecture** — system diagram and component explanation.
4. **End-to-end flow** — narrated processing sequence.
5. **Key decisions** — alternatives, trade-offs, rationale.
6. **Challenges** — difficult engineering aspects and resolution.
7. **Outcomes** — validated qualitative or quantitative results only.
8. **Learnings** — concise technical takeaways.

Recruiters should understand the overview quickly. Engineers should be able to inspect architecture and design rationale without excessive prose.

## 6. Architecture diagram implementation

### 6.1 Rendering
- Use inline or component-rendered SVG.
- Keep the primary flow visible without interaction.
- Use semantic grouping and clear reading order.
- Provide a textual description and adjacent explanation.
- Keep diagrams responsive; avoid horizontal scrolling on common mobile widths.

### 6.2 Interaction
- Nodes may be selected to reveal concise component descriptions.
- Use keyboard-operable controls for selectable nodes.
- Provide visible focus indicators and accessible names.
- Do not communicate meaning through color alone.
- Respect reduced-motion preferences.
- Keep core architecture and explanation available without JavaScript.

### 6.3 Initial diagram candidates
Validate exact diagrams against the owner's actual contributions before publication:
- File processing: source/client → validation/ingestion → queue/orchestration → processing → object storage/output.
- Integration platform: source systems → integration/middleware → routing/queues → destination systems.
- Secure API: client → gateway/security controls → validation/processing → storage/asynchronous downstream processing.

Do not imply every candidate component was present in the actual implementation until confirmed.

## 7. Theme behavior

### Requirements
- Light theme is the default visual design.
- On first visit, use system preference when available.
- A visible control allows switching themes.
- Persist explicit user selection in localStorage.
- Apply selected theme before main content paints to minimize flash.
- Use CSS custom properties for surfaces, text, borders, accents, shadows, and diagram colors.

### State precedence
1. If a saved valid preference exists, use it.
2. Otherwise, use prefers-color-scheme.
3. If preference cannot be read, fall back to light.

The theme control must expose its state accessibly and remain keyboard operable. Theme changes must preserve contrast and diagram legibility. If storage is unavailable, theme switching should still work for the current page session.

## 8. GitHub Pages base-path handling

Astro configuration baseline:

~~~javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pariram140.github.io',
  base: '/parirams-portfolio',
  trailingSlash: 'always',
});
~~~

Implementation rules:
- Use import.meta.env.BASE_URL for runtime-constructed public paths and internal links where appropriate.
- Use Astro-aware link/image handling for imported assets.
- Do not use leading-root paths such as /images/example.webp for repository-hosted files.
- Prefix public assets with the configured base path.
- Do not prefix third-party/external links.
- Verify metadata, canonical URLs, sitemap, favicon, fonts, and social preview paths.
- Test direct navigation and refresh on nested case-study routes.

## 9. Styling and responsive behavior
- Use semantic design tokens for colors, typography, spacing, radii, shadows, and layout widths.
- Use a consistent spacing scale and centered content container.
- Prefer CSS Grid/Flexbox and fluid typography.
- Avoid fixed-width content that overflows narrow screens.
- Use restrained transitions and respect prefers-reduced-motion.
- Validate both themes at mobile, tablet, and desktop breakpoints.

## 10. SEO and metadata
- Unique page title and description for homepage and each case study.
- Canonical URLs generated using configured site origin and base.
- Open Graph and social metadata.
- Sitemap with correct repository path.
- Appropriate Person/website structured data only with accurate public facts.
- Descriptive alt text for meaningful images; decorative images use empty alt text.

## 11. Testing design

### Automated checks
- Dependency install using lockfile.
- Formatting/linting and TypeScript checks, where configured.
- Astro production build.
- Playwright browser tests.

### Playwright scenarios
1. Homepage renders and primary navigation targets expected sections.
2. Header/menu works at desktop and mobile widths.
3. Theme toggle switches and persists after reload.
4. System theme is respected when no saved preference exists.
5. All three case-study routes load directly and survive refresh.
6. Featured and personal project hierarchy is present.
7. Internal links and local assets resolve beneath /parirams-portfolio/.
8. Architecture diagrams expose descriptions and support keyboard interaction.
9. Essential case-study content is present without client-side interaction.
10. No browser console errors or failed local asset requests occur in core journeys.

### Manual quality checks
- Keyboard-only navigation and visible focus.
- Screen-reader labels and diagram descriptions.
- Color contrast in both themes.
- Responsive layout and diagram readability.
- Reduced-motion behavior.
- SEO metadata and social preview.
- Production URL verification after deployment.

## 12. CI/CD behavior
- Pull requests run validation, build, and browser tests.
- Failed required checks block merge.
- Merge to production branch triggers the approved GitHub Pages deployment workflow.
- Feature branches must not publish to production URL.
- Inspect existing Pages configuration/workflows before adding or changing deployment automation.
- Verify live homepage and all case-study routes after release.

## 13. Error and fallback behavior
- If diagram interaction fails, static SVG and textual explanation remain visible.
- If localStorage is unavailable, theme control still works for the current page session.
- If a nonessential image fails, layout remains usable and meaningful alt text is retained.
- If a project lacks optional metadata, omit it rather than showing placeholders.

## 14. Implementation sequence
1. Repository and deployment audit.
2. Astro foundation and base-path configuration on a separate branch.
3. Design tokens, layout, navigation, and theme.
4. Homepage content and experience.
5. Featured work and personal projects.
6. Case-study routes and diagrams.
7. SEO, accessibility, responsive, and performance hardening.
8. CI/CD validation and production release.

Split each stage into reviewable stories with explicit acceptance criteria. Do not begin a dependent stage while its prerequisite has unresolved failures.
