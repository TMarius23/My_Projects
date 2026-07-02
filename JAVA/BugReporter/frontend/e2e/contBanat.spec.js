import { test, expect } from '@playwright/test';

test('testContBanat', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.pause();
  await page.getByRole('textbox', { name: 'EMAIL' }).click();
  await page.getByRole('textbox', { name: 'EMAIL' }).fill('trifulet30@yahoo.com');
  await page.getByRole('textbox', { name: 'EMAIL' }).press('Tab');
  await page.getByRole('textbox', { name: 'PASSWORD' }).fill('ParolaMarius');
  await page.getByRole('button', { name: 'INITIALIZE SESSION' }).click();
  await page.getByRole('alert').filter({ hasText: 'Account suspendedYour account' }).click();
  await page.getByText('Your account has been banned').click();
});