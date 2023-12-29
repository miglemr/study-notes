import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModeStore = defineStore('modes', () => {
  const changeInProgress = ref(false);

  return { changeInProgress };
});
