import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Record } from '@/types';
import * as Storage from '@/components/localStorage';
import { useCategoryStore } from './category';

export type Folder = {
  id: string;
  name: string;
  records: Record[];
};

export const useFolderStore = defineStore('folders', () => {
  const categoryStore = useCategoryStore();

  const currentCategoryId = ref(categoryStore.activeCategoryId);
  const folders = ref<Folder[]>(Storage.getData(currentCategoryId.value));

  const activeFolderName = ref('');
  const activeFolder = computed(
    () => folders.value.find(folder => folder.name === activeFolderName.value) as Folder
  );
  const activeFolderId = computed(() => activeFolder.value.id);
  const activeFolderIndex = computed(() =>
    folders.value.findIndex(el => el === activeFolder.value)
  );

  function addFolder(name: string) {
    if (checkIfDuplicate(name)) throw new Error('Folder with this name already exists');

    const id = `fold${folders.value.length + 1}`;

    folders.value = [
      ...folders.value,
      {
        id: id,
        name: name,
        records: []
      }
    ];
  }

  function editFolderName(id: string, updatedName: string) {
    if (checkIfDuplicate(updatedName, id)) throw new Error('Folder with this name already exists');

    folders.value.map(el => {
      if (el.id === id) el.name = updatedName;
    });
  }

  function deleteFolder(id: string) {
    folders.value = folders.value.filter(el => el.id !== id);
  }

  function checkIfDuplicate(name: string, id?: string) {
    const folderMatch = folders.value.find(el => el.name === name);

    if (folderMatch && folderMatch.id !== id) {
      return true;
    }
    return false;
  }

  function updateLocalStorage() {
    Storage.saveData(currentCategoryId.value, folders.value);
  }

  return {
    folders,
    activeFolder,
    activeFolderId,
    activeFolderName,
    activeFolderIndex,
    addFolder,
    editFolderName,
    deleteFolder,
    updateLocalStorage
  };
});
