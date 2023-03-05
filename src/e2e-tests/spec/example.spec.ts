import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
    await page.goto('/');
  //  await page.pause();
    test.step('Step: Click the get started link.', async () => {
        // Click the get started link.
        await page.getByRole('link', { name: 'Get started' }).click();
    });

  // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);

    await page.locator('[href="/docs/api/class-playwright"]').first().click();
    await expect(page).toHaveURL(/.*api\/class\/123/);
 
});
