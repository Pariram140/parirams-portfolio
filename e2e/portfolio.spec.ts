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

  for (const title of caseStudies) {
    await page.getByRole('link', { name: title, exact: true }).click();
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Architecture flow' })).toBeVisible();
    await expect(page.getByRole('img', { name: `${title} process flow` })).toBeVisible();
    await expect(page).toHaveURL(/\/parirams-portfolio\/projects\/[a-z-]+\/$/);
    await page.goto('./');
  }
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
  await themeToggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
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
  }
});
