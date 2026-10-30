import { expect, test } from '@playwright/test';

const caseStudies = [
  'Asynchronous File Processing',
  'Secure API Processing',
  'Event-Driven Integration',
];

test('homepage links to each case study under the project-site base path', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Building reliable systems');
  await expect(page).toHaveURL(/\/parirams-portfolio\/$/);
  await expect(page.locator('link[rel="stylesheet"]')).toHaveAttribute(
    'href',
    '/parirams-portfolio/portfolio.css',
  );
  await expect(page.locator('body')).toHaveCSS('font-family', /Inter/);

  for (const title of caseStudies) {
    await page.getByRole('link', { name: title, exact: true }).click();
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'End-to-end flow' })).toBeVisible();
    await expect(page.locator('.diagram-wide')).toBeVisible();
    await expect(page).toHaveURL(/\/parirams-portfolio\/projects\/[a-z-]+\/$/);
    await page.goto('./');
  }
});

test('contact section offers direct email, LinkedIn, and GitHub links', async ({ page }) => {
  await page.goto('./');
  const contact = page.locator('#contact');
  await expect(contact.getByRole('link', { name: 'pari.pariram.ram@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:pari.pariram.ram@gmail.com',
  );
  const resumeLink = contact.getByRole('link', { name: 'Download résumé (PDF)' });
  await expect(resumeLink).toHaveAttribute('href', '/parirams-portfolio/resume.pdf');
  await expect(resumeLink).toHaveAttribute('download', '');

  const resumeResponse = await page.request.get('/parirams-portfolio/resume.pdf');
  expect(resumeResponse.ok()).toBeTruthy();

  await expect(contact.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/pariram-s-a2367a160',
  );
  await expect(contact.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
    'href',
    'https://github.com/Pariram140',
  );
});

test('homepage and case study metadata use canonical project-site URLs', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://pariram140.github.io/parirams-portfolio/',
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Pariram S — Software Developer',
  );

  await page.goto('./projects/secure-api-processing/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://pariram140.github.io/parirams-portfolio/projects/secure-api-processing/',
  );
  await expect(page.locator('meta[name="description"]')).not.toHaveAttribute('content', '');
});

test('case study routes load directly and survive refresh', async ({ page }) => {
  const routes = [
    ['asynchronous-file-processing', 'Asynchronous File Processing'],
    ['secure-api-processing', 'Secure API Processing'],
    ['event-driven-integration', 'Event-Driven Integration'],
  ];

  for (const [slug, title] of routes) {
    await page.goto(`./projects/${slug}/`);
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Work' }),
    ).toHaveAttribute(
      'href',
      '/parirams-portfolio/#work',
    );
    await page.reload();
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
  }
});

test('theme preference remains accessible and persists after reload', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('./');

  const themeToggle = page.getByRole('button', { name: 'Switch to dark theme' });
  await expect(themeToggle).toContainText('Light mode');
  await themeToggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Switch to light theme' })).toContainText('Dark mode');
  await expect(page.getByRole('button', { name: 'Switch to light theme' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('homepage and case study fit a narrow mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('./');
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.goto('./projects/event-driven-integration/');
  await expect(page.getByRole('heading', { level: 1, name: 'Event-Driven Integration' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('generated sitemap lists project routes under the base path', async ({ request }) => {
  const response = await request.get('./sitemap-index.xml');
  expect(response.ok()).toBeTruthy();
  const sitemapIndex = await response.text();
  expect(sitemapIndex).toContain('https://pariram140.github.io/parirams-portfolio/sitemap-0.xml');

  const sitemapResponse = await request.get('./sitemap-0.xml');
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain(
    'https://pariram140.github.io/parirams-portfolio/projects/event-driven-integration/',
  );
});


test('case studies explain project context, challenge, approach, and implementation details', async ({ page }) => {
  const routes = [
    ['asynchronous-file-processing', 'decrypt'],
    ['secure-api-processing', '10 MB'],
    ['event-driven-integration', 'retry mechanism'],
  ];

  for (const [slug, detail] of routes) {
    await page.goto(`./projects/${slug}/`);
    await expect(page.getByRole('heading', { name: 'Project context' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Engineering challenge' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Solution and design approach' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'End-to-end flow' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Technical details' })).toBeVisible();
    await expect(page.getByText(new RegExp(detail, 'i')).first()).toBeVisible();
    await expect(page.getByText(/unpublished metrics or outcomes/i)).toHaveCount(0);
  }
});

test('homepage makes featured case studies immediately discoverable', async ({ page }) => {
  await page.goto('./');
  const featured = page.locator('.hero-case-studies');
  await expect(page.locator('.hero-visual')).toHaveCount(0);
  await expect(featured.getByText('Featured case studies')).toBeVisible();
  await expect(featured.getByRole('link', { name: /Read case study/ })).toHaveCount(3);
  await expect(featured.getByRole('link', { name: /Asynchronous File Processing/ })).toHaveAttribute(
    'href',
    '/parirams-portfolio/projects/asynchronous-file-processing/',
  );
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link').first())
    .toHaveText('Work');
  await expect(page.locator('#work').locator('xpath=preceding-sibling::section[1]')).toHaveAttribute(
    'class',
    /hero/,
  );
});

test('case study section links and diagram stages stay connected', async ({ page }) => {
  await page.goto('./projects/asynchronous-file-processing/');

  const sectionNav = page.getByRole('navigation', { name: 'Case study sections' });
  await expect(sectionNav.getByRole('link')).toHaveCount(4);
  await sectionNav.getByRole('link', { name: 'End-to-end flow' }).click();
  await expect(page).toHaveURL(/#flow-title$/);

  const explanation = page.locator('[data-flow-step="1"]');
  const explanationButton = explanation.getByRole('button', { name: 'Highlight Download and decrypt in the diagram' });
  await explanationButton.click();
  await expect(explanationButton).toHaveAttribute('aria-pressed', 'true');
  await expect(explanation).toHaveClass(/is-active/);
  await expect(page.locator('.diagram-wide [data-diagram-stage="1"]:visible')).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  const diagramButton = page.getByRole('button', { name: 'Step 2: Download and decrypt' });
  await diagramButton.focus();
  await page.keyboard.press('Space');
  await expect(explanationButton).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.press('Space');
  await expect(explanationButton).toHaveAttribute('aria-pressed', 'true');

  await page.locator('[data-flow-clear]').click();
  await expect(explanation).not.toHaveClass(/is-active/);
});
