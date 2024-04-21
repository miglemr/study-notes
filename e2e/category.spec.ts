import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Add category', () => {
  test('should see a add new category prompt', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await expect(page.getByTestId('add-popup')).toBeVisible();
  });

  test('should allow user to add a new category', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await page.getByLabel('Title').click();
    await page.getByLabel('Title').fill('Category 1');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByTestId('category-item')).toBeVisible();
    await expect(page.getByTestId('category-item')).toContainText('Category 1');
  });

  test('should clear input fields in add popup', async ({ page }) => {
    await createDefaultCategory(page);

    await page.getByTestId('add-btn').click();
    await expect(page.getByLabel('Title')).toHaveValue('');
  });

  test('should not add category if cancel is clicked', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await page.getByLabel('Title').click();
    await page.getByLabel('Title').fill('Category 1');
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByTestId('category-item')).toBeHidden();
  });
});

test.describe('Edit categoy', () => {
  test('edit mode should be enabled', async ({ page }) => {
    await createDefaultCategory(page);

    await page.getByTestId('edit-mode-btn').click();
    await expect(page.getByTestId('edit-btn')).toBeVisible();
    await expect(page.getByTestId('delete-btn')).toBeVisible();
  });

  test('should see a add an edit category prompt', async ({ page }) => {
    await createDefaultCategory(page);

    await page.getByTestId('edit-mode-btn').click();
    await page.getByTestId('edit-btn').click();
    await expect(page.getByTestId('edit-popup')).toBeVisible();
  });

  test('title input should have previous category title', async ({ page }) => {
    await createDefaultCategory(page);

    await page.getByTestId('edit-mode-btn').click();
    await page.getByTestId('edit-btn').click();
    await expect(page.getByTestId('edit-popup').locator('#title')).toHaveValue('Category 1');
  });

  test('category title should change after saving', async ({ page }) => {
    await createDefaultCategory(page);

    await page.getByTestId('edit-mode-btn').click();
    await page.getByTestId('edit-btn').click();
    await page.getByTestId('edit-popup').locator('#title').click();
    await page.getByTestId('edit-popup').locator('#title').fill('Category 2');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByTestId('category-item')).toContainText('Category 2');
  });

  test('after saving edit mode should be disabled', async ({ page }) => {
    await createDefaultCategory(page);

    await expect(page.getByTestId('edit-btn')).toBeHidden();
    await expect(page.getByTestId('delete-btn')).toBeHidden();
  });

  test('after cancelling edit mode should be disabled', async ({ page }) => {
    await createDefaultCategory(page);

    await expect(page.getByTestId('edit-btn')).toBeHidden();
    await expect(page.getByTestId('delete-btn')).toBeHidden();
  });
});

test.describe('Delete category', () => {
  test('user should see a delete category prompt', async ({ page }) => {
    await createDefaultCategory(page);
    await page.getByTestId('edit-mode-btn').click();
    await page.getByTestId('delete-btn').click();
    await expect(page.getByTestId('delete-popup')).toBeVisible();
    await expect(page.getByTestId('delete-popup')).toContainText(
      'Are you sure you want to delete this category?'
    );
  });

  test('category should be deleted after saving', async ({ page }) => {
    await createDefaultCategory(page);

    await page.getByTestId('edit-mode-btn').click();
    await page.getByTestId('delete-btn').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByTestId('category-item')).toBeHidden();
  });
});

test.describe('Category link', () => {
  test('should navigate user to folders page', async ({ page }) => {
    await createDefaultCategory(page);
    await page.getByRole('link', { name: 'Category' }).click();
    await expect(page).toHaveURL(/.*\/category\/Category%201/);
  });
});

async function createDefaultCategory(page: Page) {
  await page.getByTestId('add-btn').click();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('Category 1');
  await page.getByRole('button', { name: 'Save' }).click();
}
