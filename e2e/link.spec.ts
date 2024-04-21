import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await createDefaultCategory(page);
  await navigateToFoldersPage(page);
  await createDefaultFolder(page);
  await navigateToRecordsPage(page);
});

const defaultLinkTitle = 'Vue Introduction';
const defaultLinkUrl = 'https://vuejs.org/guide/introduction.html';

test.describe('Add link', () => {
  test('should open popup', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await page.getByRole('button', { name: 'Link' }).click();
    await expect(page.getByTestId('add-link')).toBeVisible();
  });

  test('should save added link', async ({ page }) => {
    await createDefaultLink(page);
    await expect(page.getByTestId('link-item')).toContainText(defaultLinkTitle);
  });

  test('should not save link if cancel was clicked', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await page.getByRole('button', { name: 'Link' }).click();

    await page.getByLabel('Title').click();
    await page.getByLabel('Title').fill(defaultLinkTitle);
    await page.getByLabel('URL').click();
    await page.getByLabel('URL').fill(defaultLinkUrl);
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByTestId('link-item')).toBeHidden();
  });
});

test.describe('Edit link item', () => {
  test('inputs should have old values', async ({ page }) => {
    await createDefaultLink(page);

    await page.getByTestId('menu').getByRole('button').click();
    await page.getByTestId('edit-btn').click();
    await expect(page.getByTestId('link-form').getByLabel('Title')).toHaveValue(defaultLinkTitle);
    await expect(page.getByTestId('link-form').getByLabel('URL')).toHaveValue(defaultLinkUrl);
  });

  test('should save changed link item', async ({ page }) => {
    const newTitle = 'Vue.js Explained in 100 Seconds';
    const newUrl = 'https://www.youtube.com/watch?v=nhBVL41-_Cw';

    await createDefaultLink(page);

    await page.getByTestId('menu').getByRole('button').click();
    await page.getByTestId('edit-btn').click();

    await page.getByTestId('link-form').getByLabel('Title').click();
    await page.getByTestId('link-form').getByLabel('Title').fill(newTitle);
    await page.getByTestId('link-form').getByLabel('URL').click();
    await page.getByTestId('link-form').getByLabel('URL').fill(newUrl);
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByTestId('link-item')).toContainText(newTitle);
  });
});

test.describe('Delete link', () => {
  test('should open delete link popup', async ({ page }) => {
    await createDefaultLink(page);

    await page.getByTestId('menu').getByRole('button').click();
    await page.getByTestId('delete-btn').click();
    await expect(page.getByTestId('delete-popup')).toBeVisible();
    await expect(page.getByTestId('delete-popup')).toContainText(
      'Are you sure you want to delete this link?'
    );
  });

  test('should delete link item', async ({ page }) => {
    await createDefaultLink(page);

    await page.getByTestId('menu').getByRole('button').click();
    await page.getByTestId('delete-btn').click();
    await page.getByRole('button', { name: 'Ok' }).click();

    await expect(page.getByTestId('link-item')).toBeHidden();
  });

  test('should cancel deleting if cancel was clicked', async ({ page }) => {
    await createDefaultLink(page);

    await page.getByTestId('menu').getByRole('button').click();
    await page.getByTestId('delete-btn').click();
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByTestId('link-item')).toBeVisible();
  });
});

test.describe('Link navigating', () => {
  test('should navigate user to another page', async ({ page }) => {
    await createDefaultLink(page);
    await page.getByTestId('link-item').getByRole('link').click();
    await page.waitForURL(/.*vuejs\.org\/guide\/introduction\.html/);
    await expect(page).toHaveURL(/.*vuejs\.org\/guide\/introduction\.html/);
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

async function createDefaultLink(page: Page) {
  await page.getByTestId('add-btn').click();
  await page.getByRole('button', { name: 'Link' }).click();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill(defaultLinkTitle);
  await page.getByLabel('URL').click();
  await page.getByLabel('URL').fill(defaultLinkUrl);
  await page.getByRole('button', { name: 'Save' }).click();
}
