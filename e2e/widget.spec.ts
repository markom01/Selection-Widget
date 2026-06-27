import { test, expect } from '@playwright/test';

test.describe('Selection Widget E2E', () => {
  test('Scenario 1: full selection flow — select 3 items and save', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Select items' })).toBeVisible();
    await expect(page.getByText('You currently have 0 selected items.')).toBeVisible();

    await page.getByRole('button', { name: 'Change my choice' }).click();
    await expect(page.getByPlaceholder('Search elements...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();

    await page.getByPlaceholder('Search elements...').fill('Element 5000');
    await page.waitForTimeout(400);
    await page.getByText('Element 5000', { exact: true }).click();

    await page.getByPlaceholder('Search elements...').fill('Element 100');
    await page.waitForTimeout(400);
    await page.getByText('Element 100', { exact: true }).click();

    await page.getByPlaceholder('Search elements...').fill('Element 101');
    await page.waitForTimeout(400);
    await page.getByText('Element 101', { exact: true }).click();

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByPlaceholder('Search elements...')).not.toBeVisible();

    await expect(page.getByText('Element 5000', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Element 100', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Element 101', { exact: true }).first()).toBeVisible();
  });

  test('Scenario 2: cancel restores original selections', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Change my choice' }).click();
    await page.getByPlaceholder('Search elements...').fill('Element 200');
    await page.waitForTimeout(400);
    await page.getByText('Element 200', { exact: true }).click();

    await page.getByPlaceholder('Search elements...').fill('Element 201');
    await page.waitForTimeout(400);
    await page.getByText('Element 201', { exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('You currently have 2 selected items.')).toBeVisible();

    await page.getByRole('button', { name: 'Change my choice' }).click();
    await expect(page.getByPlaceholder('Search elements...')).toBeVisible();

    // Target the section footer chip (second match in DOM, after main page chips)
    await page
      .locator('.MuiChip-root')
      .filter({ hasText: 'Element 200' })
      .locator('.MuiChip-deleteIcon')
      .nth(1)
      .click();

    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByPlaceholder('Search elements...')).not.toBeVisible();
    await expect(page.getByText('You currently have 2 selected items.')).toBeVisible();
    await expect(page.getByText('Element 200', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Element 201', { exact: true }).first()).toBeVisible();
  });

  test('Scenario 3: immediate removal from main page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Change my choice' }).click();
    await page.getByPlaceholder('Search elements...').fill('Element 300');
    await page.waitForTimeout(400);
    await page.getByText('Element 300', { exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('You currently have 1 selected items.')).toBeVisible();

    await page
      .locator('.MuiChip-root')
      .filter({ hasText: 'Element 300' })
      .locator('.MuiChip-deleteIcon')
      .first()
      .click();

    await expect(page.getByText('Element 300', { exact: true }).first()).not.toBeVisible();
    await expect(page.getByText('You currently have 0 selected items.')).toBeVisible();
  });

  test('Scenario 4: filter + search combination', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Change my choice' }).click();
    await expect(page.getByPlaceholder('Search elements...')).toBeVisible();

    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: '> 10000' }).click();

    await page.getByPlaceholder('Search elements...').fill('Element');
    await page.waitForTimeout(400);

    await expect(page.getByText('Element 10001', { exact: true })).toBeVisible();

    await page.getByPlaceholder('Search elements...').clear();
    await page.waitForTimeout(400);

    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: '> 2500' }).click();

    await page.waitForTimeout(200);

    await expect(page.getByText('Element 2501', { exact: true })).toBeVisible();
    await expect(page.getByText('Element 1', { exact: true })).not.toBeVisible();
  });
});
