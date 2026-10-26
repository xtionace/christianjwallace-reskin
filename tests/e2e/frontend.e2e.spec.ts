import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Christian Wallace/)

    const heading = page.locator('h1').first()

    await expect(heading).toContainText('I make complex products')
    await expect(page.getByRole('link', { name: 'Get in touch' }).first()).toBeVisible()
  })
})
