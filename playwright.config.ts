import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration Playwright pour les tests E2E d'Adaboards
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',

  /* Timeout maximum par test */
  timeout: 30 * 1000,

  /* Nombre de tentatives en cas d'échec */
  retries: process.env.CI ? 2 : 0,

  /* Parallélisation des tests */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter pour afficher les résultats */
  reporter: 'html',

  /* Configuration partagée pour tous les projets */
  use: {
    /* URL de base de l'application */
    baseURL: 'http://localhost:5173',

    /* Collecter les traces en cas d'échec */
    trace: 'on-first-retry',

    /* Captures d'écran en cas d'échec */
    screenshot: 'only-on-failure',

    /* Vidéos en cas d'échec */
    video: 'retain-on-failure',
  },

  /* Configuration des projets (navigateurs) */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Firefox et Webkit peuvent avoir des problèmes sur Windows
    // Décommentez si vous êtes sur Linux/Mac ou en CI
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Tests sur mobile */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Lancer les serveurs automatiquement */
  webServer: [
    {
      command: 'cd ../adaboards-api && npm run dev',
      url: 'http://localhost:3000/health',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
    {
      command: 'npm run dev',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
  ],
});
