import { it, expect } from 'vitest';
import { isCategory } from '../isCategory';
import { isFolder } from '../isFolder';
import { mockCategories } from './fixtures/categories';
import { mockFolders } from './fixtures/folders';

it('should return true if category exists', () => {
  const result = isCategory('Category 1', mockCategories);
  expect(result).toEqual(true);
});

it('should return false if category does not exist', () => {
  const result = isCategory('Category 4', mockCategories);
  expect(result).toEqual(false);
});

it('should return true if folder exists', () => {
  const result = isFolder('Folder 1', mockFolders);
  expect(result).toEqual(true);
});

it('should return false if folder does not exist', () => {
  const result = isFolder('Folder 4', mockFolders);
  expect(result).toEqual(false);
});
