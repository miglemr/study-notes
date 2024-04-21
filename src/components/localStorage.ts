import { CATEGORY_STORAGE } from '@/globals';
import type { Category } from '@/stores/category';

export function getData(storageName: string) {
  try {
    const storedData = localStorage.getItem(storageName);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error retrieving data from localStorage', error);
    return [];
  }
}

export function saveData(storageName: string, data: object | []) {
  try {
    localStorage.setItem(storageName, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage', error);
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing storage', error);
  }
}

export function getCategoryIdByName(name: string) {
  const categories: Category[] = getData(CATEGORY_STORAGE);

  const category = categories.find(el => el.name === name) as Category;
  return category.id;
}
