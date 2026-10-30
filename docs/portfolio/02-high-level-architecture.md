# High-Level Architecture (HLA)

**Product:** Pariram S — Personal Portfolio  
**Version:** 1.0 | **Status:** Approved baseline | **Approval date:** 2026-10-30  
**Related:** [PRD](./01-product-requirements.md), [LLD](./03-low-level-design.md)

## 1. Architecture goals
- Deliver a fast, static, content-driven portfolio.
- Keep content independent of presentation.
- Use small, reusable UI components.
- Add interactivity only where it improves the experience.
- Support the existing GitHub Pages project-site URL.
- Keep current production intact during development and validation.
- Avoid backend infrastructure and unnecessary dependencies.

## 2. Selected technology stack

| Concern | Technology |
|---|---|
| Site framework | Astro |
| Language | TypeScript |
| Content | Astro Content Collections with Markdown/MDX |
| Styling | Custom CSS and design tokens |
| Interactive diagrams | Accessible SVG with small client-side behavior |
| Theme | CSS variables and lightweight preference handling |
| Browser testing | Playwright |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

Astro is selected because the site is content and navigation, not a full client-side application. Static generation provides HTML-first delivery and limits JavaScript to interactive islands. No backend, database, server rendering, or authentication is required initially.

## 3. System context

~~~mermaid
flowchart TD
    AUTHOR["Portfolio owner"] --> REPO["GitHub repository"]
    REPO --> CONTENT["Markdown / MDX and typed data"]
    CONTENT --> ASTRO["Astro build"]
    ASTRO --> STATIC["Static HTML, CSS, JS and assets"]
    STATIC --> PAGES["GitHub Pages"]
    VISITOR["Recruiter / engineer"] --> PAGES
    PAGES --> BROWSER["Visitor browser"]
~~~

## 4. Build and deployment architecture

~~~mermaid
flowchart TD
    BRANCH["Feature / redesign branch"] --> PR["Pull request to main"]
    PR --> ACTIONS["GitHub Actions"]
    ACTIONS --> CHECKS["Install, lint and type checks"]
    CHECKS --> BUILD["Astro production build"]
    BUILD --> E2E["Playwright smoke tests"]
    E2E --> REVIEW["Review and merge after checks pass"]
    REVIEW --> MAIN["main"]
    MAIN --> DEPLOY["GitHub Pages deployment workflow"]
    DEPLOY --> LIVE["Production portfolio URL"]
~~~

Inspect the existing workflow and Pages settings before configuring deployment. Production publishing must not publish unreviewed feature branches.

## 5. GitHub Pages URL strategy

The current deployment is a **GitHub Pages project site**, not a user/organization site at the domain root.

- Canonical site origin: https://pariram140.github.io
- Repository base path: /parirams-portfolio
- Production homepage: https://pariram140.github.io/parirams-portfolio/

Recommended Astro configuration:

~~~javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pariram140.github.io',
  base: '/parirams-portfolio',
  trailingSlash: 'always',
});
~~~

### Meaning of the settings
- **site** is the canonical origin used for absolute/canonical URLs and sitemap information. It does not include the repository path.
- **base** is the path prefix at which the application is hosted. Astro uses it when generating build-aware paths.
- **trailingSlash: always** establishes consistent trailing-slash page URLs.

### URL rules
- Do not hardcode root-relative paths such as /images/hero.webp or /projects/ for repository-hosted assets and pages.
- Use Astro's import.meta.env.BASE_URL for public assets and links constructed at runtime.
- Prefer imported assets from src/assets when image optimization and build-time processing are useful.
- For files under public/, prefix the path with the configured base URL.
- External URLs (GitHub, LinkedIn, etc.) must remain external and must not receive the base prefix.
- Verify canonical URLs, sitemap entries, icons, fonts, and Open Graph image paths.

### Local verification
Run the development server and test URLs with the configured base path. Verify:
- Local homepage is served beneath /parirams-portfolio/.
- Internal links and public assets retain the base prefix.
- Deep routes can be loaded directly.
- Refreshing a deep route does not result in a missing page.
- Production build contains the expected prefixed asset and navigation URLs.

If a custom domain is introduced later, update site, remove the repository base, configure the domain in GitHub Pages, and revalidate canonical URLs and routing.

## 6. Logical application layers
1. **Content:** Markdown/MDX and typed collections for case studies, experience, publications.
2. **Presentation:** Astro layouts and reusable components.
3. **Styling:** design tokens, global styles, light/dark values, responsive rules.
4. **Interaction:** isolated client-side code for theme preference and diagram exploration.
5. **Delivery:** static build artifacts deployed through GitHub Pages.

## 7. Proposed repository structure

~~~text
portfolio/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── navigation/
│   │   ├── hero/
│   │   ├── experience/
│   │   ├── projects/
│   │   ├── architecture/
│   │   ├── theme/
│   │   └── common/
│   ├── content/
│   │   ├── config.ts
│   │   ├── projects/
│   │   ├── experience/
│   │   └── publications/
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro
│   │   └── projects/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   ├── light.css
│   │   └── dark.css
│   └── utils/
├── tests/
│   └── e2e/
├── astro.config.mjs
├── package.json
└── README.md
~~~

This is the target structure; reconcile it with the actual repository during the foundation story.

## 8. Quality attributes

| Attribute | Architectural response |
|---|---|
| Performance | Static generation, optimized images, minimal client JS |
| Accessibility | Semantic markup, keyboard controls, accessible SVG descriptions, reduced motion |
| Maintainability | Reusable components, typed content collections, design tokens |
| Reliability | CI build and browser checks before merge |
| SEO | Metadata, canonical URLs, sitemap, Open Graph, appropriate structured data |
| Security/privacy | No secrets, employer-confidential information, unnecessary third-party scripts |
| Portability | Centralized base-path handling and static output |

## 9. Deployment safety
- Current live site is the production baseline and must remain available during development.
- Implement on a dedicated branch and use pull requests.
- Do not alter the live deployment workflow until it has been inspected and the replacement deployment path is understood.
- Do not merge with failing required checks.
- Verify production URL and key routes after release.
- Retain the previous known-good commit/deployment as rollback reference.

## 10. Architecture decisions

| ID | Decision |
|---|---|
| ADR-01 | Use Astro for static site generation. |
| ADR-02 | Use TypeScript for application code and content schemas. |
| ADR-03 | Store long-form content in Markdown/MDX collections. |
| ADR-04 | Host on existing GitHub Pages project-site URL. |
| ADR-05 | Configure site origin https://pariram140.github.io and base /parirams-portfolio. |
| ADR-06 | Use accessible SVG for interactive architecture diagrams. |
| ADR-07 | Use CSS tokens and persisted light/dark preference. |
| ADR-08 | Use Playwright and GitHub Actions for automated validation. |
| ADR-09 | Preserve production while building replacement separately. |
| ADR-10 | No backend for initial release. |

## 11. Open implementation checks
These are verification tasks, not unresolved product choices:
- Inspect current GitHub Pages settings and deployment workflow.
- Confirm which workflow/branch currently publishes the site.
- Select and pin compatible Astro, TypeScript, and Playwright versions during setup.
- Verify base-path behavior against the installed Astro version.
- Decide final image/font loading strategy during foundation and performance work.
