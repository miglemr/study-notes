import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await createDefaultCategory(page);
  await navigateToFoldersPage(page);
  await createDefaultFolder(page);
  await navigateToRecordsPage(page);
});

const defaultNoteText = 'This is note 1';

test.describe('Add note', () => {
  test('should open popup', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await page.getByRole('button', { name: 'Note' }).click();
    await expect(page.getByTestId('add-note')).toBeVisible();
  });

  test('should save added note', async ({ page }) => {
    await createDefaultNote(page);

    await expect(page.getByTestId('note-item')).toContainText(defaultNoteText);
  });

  test('should not save note if cancel was clicked', async ({ page }) => {
    await page.getByTestId('add-btn').click();
    await page.getByRole('button', { name: 'Note' }).click();

    await page.getByLabel('Note').click();
    await page.getByLabel('Note').fill(defaultNoteText);
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByTestId('note-item')).toBeHidden();
  });
});

test.describe('Edit note', () => {
  test('inputs should have old values', async ({ page }) => {
    await createDefaultNote(page);

    await page.getByTestId('menu').getByRole('button').click();
    await page.getByTestId('edit-btn').click();

    await expect(page.getByTestId('text-form').locator('#text')).toHaveValue(defaultNoteText);
  });

  test('should save changed note', async ({ page }) => {
    await createDefaultNote(page);

    const newText = 'This is updated note 1';

    await page.getByTestId('menu').getByRole('button').click();
    await page.getByTestId('edit-btn').click();

    await page.getByTestId('text-form').locator('#text').click();
    await page.getByTestId('text-form').locator('#text').fill(newText);
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByTestId('note-item')).toContainText(newText);
  });
});

test.describe('Delete note', () => {
  test('should open delete note popup', async ({ page }) => {
    await createDefaultNote(page);

    await page.getByTestId('menu').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByTestId('delete-popup')).toBeVisible();
    await expect(page.getByTestId('delete-popup')).toContainText(
      'Are you sure you want to delete this note?'
    );
  });

  test('should delete note', async ({ page }) => {
    await createDefaultNote(page);

    await page.getByTestId('menu').click();
    await page.getByTestId('delete-btn').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByTestId('note-item')).toBeHidden();
  });

  test('should cancel deleting if cancel was clicked', async ({ page }) => {
    await createDefaultNote(page);

    await page.getByTestId('menu').getByRole('button').click();
    await page.getByTestId('delete-btn').click();
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByTestId('note-item')).toBeVisible();
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

async function createDefaultNote(page: Page) {
  await page.getByTestId('add-btn').click();
  await page.getByRole('button', { name: 'Note' }).click();

  await page.getByTestId('add-note').getByLabel('Note').click();
  await page.getByTestId('add-note').getByLabel('Note').fill(defaultNoteText);
  await page.getByRole('button', { name: 'Save' }).click();
}
