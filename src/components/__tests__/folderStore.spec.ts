import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mockFolders } from './fixtures/folders';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';
import { useFolderStore } from '@/stores/folder';
import { useCategoryStore } from '@/stores/category';
import { CATEGORY_STORAGE } from '@/globals';
import { mockCategories } from './fixtures/categories';

createTestingPinia({ createSpy: vi.fn, stubActions: false });

describe('Folder Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    localStorage.setItem(CATEGORY_STORAGE, JSON.stringify(mockCategories));
    const categoryStore = useCategoryStore();
    categoryStore.activeCategoryName = 'Category 1';
  });

  it('adds folder', () => {
    const folderStore = useFolderStore();
    folderStore.folders = mockFolders;

    folderStore.addFolder('Folder 4');
    expect(folderStore.folders.length).toBe(4);
  });

  it('does not add folder if folder name already exists', () => {
    const folderStore = useFolderStore();
    folderStore.folders = mockFolders;

    expect(() => folderStore.addFolder('Folder 1')).toThrowError(
      'Folder with this name already exists'
    );
  });

  it('edits category name', () => {
    const folderStore = useFolderStore();
    folderStore.folders = mockFolders;

    const updatedFolderName = 'Folder 3 updated';

    folderStore.editFolderName('fold3', updatedFolderName);

    expect(folderStore.folders[2]).toEqual({ id: 'fold3', name: 'Folder 3 updated', records: [] });
  });

  it('does not save edit if folder name is already in use', () => {
    const folderStore = useFolderStore();
    folderStore.folders = mockFolders;

    const updatedFolderName = 'Folder 1';

    expect(() => folderStore.editFolderName('fold3', updatedFolderName)).toThrowError(
      'Folder with this name already exists'
    );
  });

  it('saves edit if changed name is the same', () => {
    const folderStore = useFolderStore();
    folderStore.folders = mockFolders;

    const updatedFolderName = 'Folder 3';

    folderStore.editFolderName('fold3', updatedFolderName);

    expect(() => folderStore.editFolderName('fold3', updatedFolderName)).not.toThrowError(
      'Folder with this name already exists'
    );
  });

  it('deletes folder', () => {
    const folderStore = useFolderStore();
    folderStore.folders = mockFolders;

    folderStore.deleteFolder('fold3');
    expect(folderStore.folders.length).toBe(2);
  });
});
