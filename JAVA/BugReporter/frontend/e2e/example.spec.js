import { test, expect } from '@playwright/test';

test('pagina principala', async ({ page }) => {
   await page.goto('http://localhost:5173/login');
   await expect(page.locator('text=Bug Reporter').first()).toBeVisible();
});