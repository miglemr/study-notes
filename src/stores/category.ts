import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import * as Storage from '../components/localStorage';
import { CATEGORY_STORAGE } from '@/globals';

export type Category = {
  id: string;
  name: string;
};

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>(Storage.getData(CATEGORY_STORAGE));

  // Set when user clicks on category
  const activeCategoryName = ref<string>('');

  const activeCategory = computed(
    () => categories.value.find(el => el.name === activeCategoryName.value) as Category
  );
  const activeCategoryId = computed(() => activeCategory.value.id);

  function addCategory(name: string) {
    if (checkIfDuplicate(name)) throw new Error('Category with this name already exists');

    const id = `cat${categories.value.length + 1}`;

    categories.value = [
      ...categories.value,
      {
        id: id,
        name: name
      }
    ];

    // Create new storage
    Storage.saveData(id, []);
  }

  function editCategory(id: string, updatedName: string) {
    if (checkIfDuplicate(updatedName, id))
      throw new Error('Category with this name already exists');

    // Change name in 'categories' storage
    categories.value.map(el => {
      if (el.id === id) el.name = updatedName;
    });
  }

  function deleteCategory(id: string) {
    // Delete from 'categories' storage
    categories.value = categories.value.filter(el => el.id !== id);

    // Delete category storage itself
    Storage.removeStorage(id);
  }

  function checkIfDuplicate(name: string, id?: string) {
    const categoryMatch = categories.value.find(el => el.name === name);
    if (categoryMatch && categoryMatch.id !== id) {
      return true;
    }
    return false;
  }

  return {
    categories,
    activeCategoryId,
    activeCategoryName,
    addCategory,
    editCategory,
    deleteCategory
  };
});
