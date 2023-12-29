import * as Storage from './localStorage';
import type { Category } from '@/stores/category';
import { CATEGORY_STORAGE } from '@/globals';

export function getCategoryList() {
  const categories: Category[] = Storage.getData(CATEGORY_STORAGE)
  return categories
}

export function isCategory(name: string, categories: Category[]) {
  const category = categories.find(el => el.name === name);
  
  if (category) {
    return true;
  }
  return false;
}
