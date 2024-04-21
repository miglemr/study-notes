import { describe, it, vi, beforeEach, expect } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';
import { useFolderStore } from '@/stores/folder';
import { useRecordStore } from '@/stores/record';
import { useCategoryStore } from '@/stores/category';
import { mockFolders } from './fixtures/folders';
import { mockCategories } from './fixtures/categories';
import { CATEGORY_STORAGE } from '@/globals';

createTestingPinia({ createSpy: vi.fn, stubActions: false });

describe('Record Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    localStorage.setItem(CATEGORY_STORAGE, JSON.stringify(mockCategories));
    const categoryStore = useCategoryStore();
    categoryStore.activeCategoryName = 'Category 1';

    localStorage.setItem(categoryStore.activeCategoryId, JSON.stringify(mockFolders));

    const folderStore = useFolderStore();
    folderStore.activeFolderName = 'Folder 1';
  });

  it('adds record', () => {
    const recordStore = useRecordStore();

    const linkObj = {
      title: 'Link to Vitest expect',
      url: 'https://vitest.dev/api/expect'
    };
    expect(recordStore.records.length).toBe(2);
    recordStore.addRecord('link', linkObj);
    expect(recordStore.records.length).toBe(3);
  });

  it('edits record', () => {
    const recordStore = useRecordStore();

    const content = {
      code: '<h1>This is heading</h1>'
    };
    recordStore.editRecord('rec2', content);
    expect(recordStore.records[1].content).toEqual(content);
  });

  it('deletes record', () => {
    const recordStore = useRecordStore();

    recordStore.deleteRecord('rec1');
    expect(recordStore.records).toEqual([
      {
        id: 'rec2',
        type: 'code',
        content: {
          code: '<p>This is paragraph</p>'
        }
      }
    ]);
  });
});
