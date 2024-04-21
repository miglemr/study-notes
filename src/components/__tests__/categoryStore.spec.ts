import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mockCategories } from './fixtures/categories';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';
import { useCategoryStore } from '@/stores/category';
import { CATEGORY_STORAGE } from '@/globals';

createTestingPinia({ createSpy: vi.fn, stubActions: false });

describe('Category Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.setItem(CATEGORY_STORAGE, JSON.stringify(mockCategories));
  });

  it('adds category', () => {
    const categoryStore = useCategoryStore();

    expect(categoryStore.categories.length).toBe(3);
    categoryStore.addCategory('Category 4');
    expect(categoryStore.categories.length).toBe(4);
  });

  it('does not add category if category name already exists', () => {
    const categoryStore = useCategoryStore();

    expect(() => categoryStore.addCategory('Category 1')).toThrowError(
      'Category with this name already exists'
    );
  });

  it('edits category name', () => {
    const categoryStore = useCategoryStore();

    const updatedCategoryName = 'Category 1 updated';

    categoryStore.editCategory('cat1', updatedCategoryName);
    expect(categoryStore.categories[0]).toEqual({ id: 'cat1', name: 'Category 1 updated' });
  });

  it('does not save edit if category name is already in use', () => {
    const categoryStore = useCategoryStore();

    const updatedCategoryName = 'Category 2';

    expect(() => categoryStore.editCategory('cat1', updatedCategoryName)).toThrowError(
      'Category with this name already exists'
    );
  });

  it('saves edit if changed name is the same', () => {
    const categoryStore = useCategoryStore();

    const updatedCategoryName = 'Category 1';

    categoryStore.editCategory('cat1', updatedCategoryName);

    expect(() => categoryStore.editCategory('cat1', updatedCategoryName)).not.toThrowError(
      'Category with this name already exists'
    );
  });

  it('deletes category', () => {
    const categoryStore = useCategoryStore();

    categoryStore.deleteCategory('cat3');

    expect(categoryStore.categories).toEqual([
      { id: 'cat1', name: 'Category 1' },
      { id: 'cat2', name: 'Category 2' }
    ]);
  });
});
