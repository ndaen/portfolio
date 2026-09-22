import { defineConfig } from '@playwright/test'

const baseURL = process.env.BASE_URL ?? 'http://localhost:3000'

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  use: { baseURL },
  ...(process.env.BASE_URL
    ? {}
    : {
        webServer: {
          command: 'npm run build && npm start',
          url: baseURL,
          timeout: 120_000,
          reuseExistingServer: true,
        },
      }),
})
