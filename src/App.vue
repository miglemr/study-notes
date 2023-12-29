<script setup lang="ts">
import { watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useCategoryStore } from './stores/category';
import { useFolderStore } from './stores/folder';
import * as Storage from '@/components/localStorage';

const route = useRoute();

watch(route, newValue => {
  if (route.name === 'category' || route.name === 'folder') {
    const categoryStore = useCategoryStore();
    categoryStore.activeCategoryName = newValue.params.categoryName as string;

    if (route.name === 'folder') {
      const folderStore = useFolderStore();
      folderStore.folders = Storage.getData(categoryStore.activeCategoryId);
      folderStore.activeFolderName = newValue.params.folderName as string;
    }
  }
});
</script>

<template>
  <nav class="bg-white shadow-lg py-4">
    <div class="container mx-auto">
      <RouterLink to="/">
        <p class="ml-4">Home</p>
      </RouterLink>
    </div>
  </nav>
  <RouterView />
</template>
