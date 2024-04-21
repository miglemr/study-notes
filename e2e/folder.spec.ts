import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await createDefaultCategory(page);
  await navigateToFoldersPage(page);
});

test.describe('Add folder', () => {
  test('should open add popup', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await expect(page.getByTestId('add-popup')).toBeVisible();
  });

  test('should save added folder', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await page.getByLabel('Title').click();
    await page.getByLabel('Title').fill('Folder 1');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByTestId('folder-item')).toContainText('Folder 1');
  });
});

test.describe('Edit folder', () => {
  test('should open menu', async ({ page }) => {
    await createDefaultFolder(page);

    await page.getByTestId('menu').click();

    await expect(page.getByTestId('menu')).toBeVisible();
  });

  test('should open edit folder popup', async ({ page }) => {
    await createDefaultFolder(page);
    await openEditPopup(page);

    await expect(page.getByTestId('edit-popup')).toBeVisible();
  });

  test('title input should have old folder title value', async ({ page }) => {
    await createDefaultFolder(page);
    await openEditPopup(page);

    await expect(page.getByTestId('edit-popup').locator('#title')).toHaveValue('Folder 1');
  });

  test('should save changed folder name', async ({ page }) => {
    await createDefaultFolder(page);
    await openEditPopup(page);

    await page.getByTestId('edit-popup').locator('#title').click();
    await page.getByTestId('edit-popup').locator('#title').fill('Folder 2');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByTestId('folder-item')).toContainText('Folder 2');
  });
});

test.describe('Delete folder', () => {
  test('should open delete folder popup', async ({ page }) => {
    await createDefaultFolder(page);
    await openDeletePopup(page);

    await expect(page.getByTestId('delete-popup')).toBeVisible();
    await expect(page.getByTestId('delete-popup')).toContainText(
      'Are you sure you want to delete this folder?'
    );
  });

  test('should delete folder', async ({ page }) => {
    await createDefaultFolder(page);
    await openDeletePopup(page);

    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByTestId('folder-item')).toBeHidden();
  });
});

test.describe('Folder link', () => {
  test('should navigate user to records page', async ({ page }) => {
    createDefaultFolder(page);
    await page.getByTestId('folder-item').getByRole('link').click();
    await expect(page).toHaveURL(/.*\/category\/Category%201\/folder\/Folder%201/);
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

async function openEditPopup(page: Page) {
  await page.getByTestId('menu').click();
  await page.getByTestId('edit-btn').click();
}

async function openDeletePopup(page: Page) {
  await page.getByTestId('menu').click();
  await page.getByTestId('delete-btn').click();
}
