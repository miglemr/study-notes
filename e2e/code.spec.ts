import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await createDefaultCategory(page);
  await navigateToFoldersPage(page);
  await createDefaultFolder(page);
  await navigateToRecordsPage(page);
});

const defaultCode = '<p>This is a paragraph</p>';

test.describe('Add code item', () => {
  test('should open popup', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await page.getByRole('button', { name: 'Code' }).click();
    await expect(page.getByTestId('add-code')).toBeVisible();
  });

  test('should save added code item', async ({ page }) => {
    await createDefaultCodeItem(page);
    await expect(page.getByTestId('code-item')).toContainText(defaultCode);
  });

  test('should not save code if cancel was clicked', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await page.getByRole('button', { name: 'Code' }).click();

    await page.locator('#code').click();
    await page.locator('#code').fill(defaultCode);

    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByTestId('code-item')).toBeHidden();
  });
});

test.describe('Edit code item', () => {
  test('inputs should have old values', async ({ page }) => {
    await createDefaultCodeItem(page);

    await page.getByTestId('menu').getByRole('button').click();
    await page.getByTestId('edit-btn').click();

    await expect(page.getByTestId('text-form').locator('#text')).toHaveValue(defaultCode);
  });

  test('should save change code item', async ({ page }) => {
    const newCode = '<h1>This is heading</h1>';

    await createDefaultCodeItem(page);

    await page.getByTestId('menu').getByRole('button').click();
    await page.getByTestId('edit-btn').click();

    await page.getByTestId('text-form').locator('#text').click();
    await page.getByTestId('text-form').locator('#text').fill(newCode);
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByTestId('code-item')).toContainText(newCode);
  });
});

test.describe('Delete code item', () => {
  test('should open delete code item popup', async ({ page }) => {
    await createDefaultCodeItem(page);

    await page.getByTestId('menu').click();
    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByTestId('delete-popup')).toBeVisible();
    await expect(page.getByTestId('delete-popup')).toContainText(
      'Are you sure you want to delete this code?'
    );
  });

  test('should delete code item', async ({ page }) => {
    await createDefaultCodeItem(page);

    await page.getByTestId('menu').click();
    await page.getByTestId('delete-btn').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByTestId('code-item')).toBeHidden();
  });

  test('should cancel deleting if cancel was clicked', async ({ page }) => {
    await createDefaultCodeItem(page);

    await page.getByTestId('menu').getByRole('button').click();
    await page.getByTestId('delete-btn').click();
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByTestId('code-item')).toBeVisible();
  });
});

async function createDefaultCategory(page: Page) {
  await page.getByTestId('add-btn').click();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('Category 1');
  await page.getByRole('button', { name: 'Save' }).click();
}

async function navigateToFoldersPage(page: Page) {
  await page.getByRole('link', { name: 'Category' }).click();
}

async function createDefaultFolder(page: Page) {
  await page.getByTestId('add-btn').click();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('Folder 1');
  await page.getByRole('button', { name: 'Save' }).click();
}

async function navigateToRecordsPage(page: Page) {
  await page.getByTestId('folder-item').getByRole('link').click();
}

async function createDefaultCodeItem(page: Page) {
  await page.getByTestId('add-btn').click();
  await page.getByRole('button', { name: 'Code' }).click();

  await page.locator('#code').click();
  await page.locator('#code').fill(defaultCode);
  await page.getByRole('button', { name: 'Save' }).click();
}
