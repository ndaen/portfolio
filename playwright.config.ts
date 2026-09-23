import { defineConfig } from '@playwright/test'

// Port dédié : sur 3000, `reuseExistingServer` réutilisait sans rien dire le
// serveur d'un autre projet, et la suite testait le mauvais site.
const PORT = 3107
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  use: { baseURL },
  ...(process.env.BASE_URL
    ? {}
    : {
        webServer: {
          command: `npm run build && npm start -- -p ${PORT}`,
          url: baseURL,
          timeout: 120_000,
          reuseExistingServer: true,
        },
      }),
})
