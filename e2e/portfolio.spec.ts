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

