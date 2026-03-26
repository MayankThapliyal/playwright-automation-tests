// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve('.env')});

export default defineConfig({
  testDir: './tests',

  retries: 1,
  timeout: 120 * 1000,

  // Parallel across files
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1: undefined,

  globalSetup: './utils/fixtures/globalSetup.js',

  // Reporters
  reporter: [
    ['list'],
    ['allure-playwright', {outputFolder:'allure-results'}]
  ],

  use: {
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    headless: process.env.HEADLESS !== 'false',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    storageState: 'auth/auth.json'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
