# Product Requirements Document (PRD)

**Product:** Pariram S — Personal Portfolio  
**Version:** 1.0 | **Status:** Approved baseline | **Approval date:** 2026-10-30  
**Production URL:** https://pariram140.github.io/parirams-portfolio/

## 1. Product vision
Redesign the existing portfolio into a polished, content-driven engineering portfolio that communicates professional credibility quickly and allows technical visitors to explore meaningful engineering work in depth. Balance editorial clarity with engineering substance; avoid a generic developer template or a collection of technology badges.

## 2. Audiences
1. **Recruiters and hiring managers:** quickly understand professional positioning, experience, strengths, and selected accomplishments through clear summaries and scannable content.
2. **Software engineers and technical reviewers:** explore engineering judgment, architecture, trade-offs, implementation challenges, and technical learning through case studies and diagrams.

Both audiences have equal priority. The homepage must provide a quick overview and clear paths into deeper technical content.

## 3. Product goals
- Establish a clear professional identity and engineering focus.
- Present three professional engineering case studies as the primary work showcase.
- Explain architecture and technical decisions with useful, accessible diagrams.
- Preserve a concise career timeline and relevant professional content.
- Retain independent projects as supporting evidence of personal initiative.
- Provide a responsive experience with light and dark themes.
- Improve accessibility, performance, SEO, maintainability, and deployment confidence.
- Enable content updates without restructuring the UI.

## 4. Design direction
**Approved:** Modern Editorial × Engineering Studio, homepage direction B (professional identity and engineering visuals together).

- Professional editorial layout with engineering visuals integrated into the experience.
- Light theme by default; dark mode through a visible toggle.
- Spacious, structured layout; restrained cards, borders, and rounded surfaces.
- Emerald accent with neutral light/dark surfaces.
- Typography: Manrope headings, Inter body, JetBrains Mono technical labels, subject to availability and performance review.
- Subtle purposeful motion; respect reduced-motion preferences.
- Mobile-first responsive behavior.

Initial design tokens:

| Token | Light | Dark |
|---|---|---|
| Background | #F7F8F5 | #111714 |
| Surface | #FFFFFF | #1B2420 |
| Primary text | #202824 | #E8F0EB |
| Accent | #167D60 | #55B995 |
| Border | #E8EAE6 | #303C35 |

## 5. Information architecture
Primary navigation: **About · Experience · Work · Writing · Contact**.

Homepage sections:
1. **Hero** — professional identity, concise positioning, calls to action, engineering visual motif.
2. **About** — summary, engineering philosophy, core strengths.
3. **Experience** — chronological professional timeline and verified achievements.
4. **Selected Work** — three featured professional case studies.
5. **Personal Projects** — smaller secondary presentation of Chess Game and Flutter To Do App.
6. **Writing & Learning** — publications, relevant certifications, currently exploring content where useful.
7. **Contact** — professional contact and profile links.

Skills should be grouped by engineering domain and integrated where useful, not represented with arbitrary percentage proficiency bars.

## 6. Featured content

### 6.1 Professional case studies
1. **Asynchronous File Processing Platform** — candidate technologies: Java, AWS Lambda, Amazon SQS, Amazon S3. Candidate themes: encrypted/compressed file handling, asynchronous orchestration, multipart uploads, object storage.
2. **Event-Driven Integration Platform** — candidate technologies: MuleSoft, Java, ActiveMQ, Amazon SQS. Candidate themes: middleware, third-party integrations, message routing, data transformation.
3. **Secure and Scalable API Processing** — candidate technologies: API Gateway, AWS WAF, S3, XML processing. Candidate themes: request validation, security controls, payload handling, asynchronous processing.

These candidates are based on existing portfolio material and prior project descriptions. Validate exact architecture, personal contribution, technologies, constraints, and outcomes before publication. Generalize or omit employer-sensitive details. Never invent metrics or unsupported results.

### 6.2 Personal projects
Retain these in a smaller **Personal Projects** section, subordinate to professional case studies:
- Chess Game — https://github.com/Pariram140/Chess-game
- Flutter To Do App — https://github.com/Pariram140/to-do-app

Other existing academic/personal projects may be retained in a lower-priority archive or omitted after content review; they are not part of the three featured professional case studies.

## 7. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Clear professional hero with paths to Work and Contact. | Must |
| FR-02 | Responsive navigation to primary sections. | Must |
| FR-03 | Chronological professional experience. | Must |
| FR-04 | Three featured professional case studies. | Must |
| FR-05 | Dedicated case-study pages with problem, architecture, decisions, challenges, verified outcomes. | Must |
| FR-06 | Interactive architecture diagrams with static fallback. | Must |
| FR-07 | Chess and Flutter To Do in secondary personal projects with repository links. | Must |
| FR-08 | Light/dark theme toggle. | Must |
| FR-09 | Persist explicit theme preference. | Must |
| FR-10 | Selected publications and relevant learning/certifications. | Should |
| FR-11 | Contact and professional profile links. | Must |
| FR-12 | SEO metadata, social metadata, sitemap, appropriate structured data. | Should |

## 8. Non-functional requirements
- **Performance:** static-first delivery, optimized images, minimal client JavaScript, no unnecessary backend/runtime.
- **Accessibility:** semantic HTML, keyboard access, visible focus, sufficient contrast, descriptive labels, reduced-motion support.
- **Responsive:** usable on mobile, tablet, desktop.
- **Maintainability:** content separated from presentation; reusable components and typed content schemas.
- **Reliability:** automated build and browser smoke tests before deployment.
- **SEO:** meaningful titles/descriptions, canonical URLs, Open Graph metadata, sitemap, appropriate structured data.
- **Privacy/security:** no secrets, private employer data, internal endpoints, or unnecessary trackers.

## 9. Hosting and release constraints
- Keep the existing production site available during development.
- Build on a separate branch; do not implement the redesign directly on main.
- Current project-site URL: https://pariram140.github.io/parirams-portfolio/
- Astro must use site origin https://pariram140.github.io and base path /parirams-portfolio, with a consistent trailing-slash policy.
- Internal links and public assets must respect the configured base path.
- Deploy only after review and automated checks pass; verify the live site after release.

## 10. Acceptance criteria
1. Required homepage sections and navigation are present.
2. Three professional case studies are prominent; two personal projects are secondary.
3. Case-study content and architecture are validated.
4. Diagrams work on desktop/mobile, support keyboard and screen-reader use, and retain essential explanation without JavaScript.
5. Theme switching works, persists, and avoids disruptive flash on load.
6. Internal routes, images, fonts, scripts, and downloadable assets resolve beneath /parirams-portfolio/.
7. Direct navigation and refresh work for case-study routes on GitHub Pages.
8. Playwright covers navigation, theme, case-study routing, and responsive layouts.
9. Build, type checks, linting if configured, and browser tests pass in CI.
10. No known broken internal links, missing assets, or material accessibility failures remain.
11. Existing production remains unchanged until replacement is approved for release.
12. The deployed site is verified at the production URL after release.

## 11. Out of scope
- Backend services, database, authentication, user accounts.
- CMS administration interface.
- Backend-dependent contact form; direct contact links are sufficient.
- Analytics/tracking unless separately approved.
- Complex 3D effects or animation-heavy experiences.
- Rebuilding unrelated personal applications.

## 12. Risks and mitigations

| Risk | Mitigation |
|---|---|
| GitHub Pages base-path asset failures | Centralize base-aware URL handling and test production-like paths locally. |
| Unverified or sensitive case-study details | Validate with owner; omit confidential details and unsupported metrics. |
| Overly complex diagrams | Use accessible SVG and keep explanations available without interaction. |
| Theme flash/inconsistent colors | Initialize theme before page paint; test shared components in both themes. |
| Production disruption | Develop separately; defer deployment until release acceptance. |
| Content drift | Keep content in typed Markdown/MDX collections. |

## 13. Approval and change control
This PRD is the approved baseline as of 2026-10-30. Changes to audience, core experience, featured-project hierarchy, framework, hosting model, or release constraints require explicit approval and an update to this document.
