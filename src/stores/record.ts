import { computed } from 'vue';
import { defineStore } from 'pinia';
import type { Note, Link, Code } from '@/types';
import { useFolderStore } from './folder';

export const useRecordStore = defineStore('records', () => {
  const folderStore = useFolderStore();
  const currentFolder = computed(() => folderStore.activeFolder);

  const records = computed(() => currentFolder.value.records);

  function addRecord(type: 'note' | 'link' | 'code', content: Note | Link | Code) {
    const id = `rec${records.value.length + 1}`;

    const recordObj = {
      id: id,
      type: type,
      content: content
    };

    records.value.push(recordObj);
  }

  function editRecord(id: string, content: Note | Link | Code) {
    const recordIndex = records.value.findIndex(el => el.id === id);
    records.value[recordIndex].content = content;
  }

  function deleteRecord(id: string) {
    const recordIndex = records.value.findIndex(el => el.id === id);
    records.value.splice(recordIndex, 1);
  }

  return {
    records,
    currentFolder,
    addRecord,
    editRecord,
    deleteRecord
  };
});
