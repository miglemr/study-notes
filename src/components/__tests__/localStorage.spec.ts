import { describe, expect, test, afterEach } from 'vitest';
import { getData } from '@/components/localStorage';
import { saveData } from '@/components/localStorage';
import { CATEGORY_STORAGE } from '@/globals';

describe('Categories', () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe('getCategories', () => {
    test('gets categories from LocalStorage', () => {
      const categories = [
        {
          id: 'cat1',
          name: 'Category 1'
        },
        {
          id: 'cat2',
          name: 'Category 2'
        }
      ];

      localStorage.setItem(CATEGORY_STORAGE, JSON.stringify([categories]));

      expect(getData(CATEGORY_STORAGE)).toStrictEqual([categories]);
    });
  });

  describe('addCategory', () => {
    test('adds new category', () => {
      const category = {
        id: 'cat3',
        name: 'Category 3'
      };
      saveData(CATEGORY_STORAGE, category);

      expect(getData(CATEGORY_STORAGE)).toStrictEqual(category);
    });
  });
});
