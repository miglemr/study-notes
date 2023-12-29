import { CATEGORY_STORAGE } from '@/globals';
import type { Category } from '@/stores/category';

export function getData(storageName: string) {
  const storedData = localStorage.getItem(storageName);
  return storedData ? JSON.parse(storedData) : [];
}

export function saveData(storageName: string, data: object | []) {
  localStorage.setItem(storageName, JSON.stringify(data));
}

export function removeStorage(key: string): void {
  localStorage.removeItem(key);
}

export function getCategoryIdByName(name: string) {
  const categories: Category[] = getData(CATEGORY_STORAGE);

  const category = categories.find(el => el.name === name) as Category;
  return category.id;
}
