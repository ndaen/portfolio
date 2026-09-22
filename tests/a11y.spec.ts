import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const pages = ['/', '/projets', '/projets/cubby']

for (const chemin of pages) {
  test(`aucune violation axe sur ${chemin}`, async ({ page }) => {
    await page.goto(chemin)
    const resultats = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(resultats.violations).toEqual([])
  })
}

test('la navigation au clavier atteint le premier lien', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const actif = await page.evaluate(() => document.activeElement?.tagName)
  expect(actif).toBe('A')
})
