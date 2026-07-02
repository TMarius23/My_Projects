import { test, expect } from '@playwright/test';

test('test3AllButtons', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('main').click();
  await page.getByRole('textbox', { name: 'EMAIL' }).click();
  await page.getByRole('textbox', { name: 'PASSWORD' }).click();
  await page.getByRole('textbox', { name: 'PASSWORD' }).fill('ParolaMarius');
  await page.getByRole('textbox', { name: 'EMAIL' }).click();
  await page.getByRole('textbox', { name: 'EMAIL' }).fill('mariustrif0323@yahoo.com');
  await page.getByRole('button', { name: 'INITIALIZE SESSION' }).click();

  await page.locator('.bug-feed-toggle__switch').click();
  await page.locator('.bug-feed-toggle__switch').click();
  await page.getByRole('button', { name: 'All Users' }).click();
  await page.getByRole('menuitem', { name: 'alexdev' }).click();
  await page.getByRole('button', { name: 'All Tags' }).click();
  await page.getByRole('menuitem', { name: 'backend' }).click();
  await page.getByRole('button', { name: 'backend' }).first().click();
  await page.getByRole('menuitem', { name: 'database' }).click();
  await page.getByRole('button', { name: 'alexdev' }).click();
  await page.getByRole('menuitem', { name: 'davidkim' }).click();
  await page.getByRole('button', { name: 'davidkim' }).click();
  await page.getByRole('searchbox', { name: 'Search users' }).click();
  await page.getByRole('searchbox', { name: 'Search users' }).fill('elenarossi');
  await page.getByRole('menuitem', { name: 'elenarossi' }).click();
  await page.getByRole('button', { name: 'database' }).first().click();
  await page.getByRole('menuitem', { name: 'All Tags' }).click();
  await page.getByRole('searchbox', { name: 'Search bugs' }).click();
  await page.getByRole('button', { name: 'elenarossi' }).click();
  await page.getByRole('menuitem', { name: 'All Users' }).click();
  await page.getByRole('searchbox', { name: 'Search bugs' }).click();
  await page.getByRole('searchbox', { name: 'Search bugs' }).fill('Aut');
  await page.getByRole('button', { name: 'Upvote Authentication token' }).click();
  await page.getByRole('link', { name: 'Bug Reporter' }).click();

});