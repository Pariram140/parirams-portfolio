import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4321/parirams-portfolio/';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: true,
  retries: 1,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run preview -- --port 4321',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});

