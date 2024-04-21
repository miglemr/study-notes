<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useFolderStore } from '../../stores/folder';
import { useCategoryStore } from '@/stores/category';
import FolderItem from './FolderItem.vue';
import AddPopup from './Popups/AddPopup.vue';
import AddButton from '../Buttons/AddButton.vue';
import BackIcon from '../icons/BackIcon.vue';

const categoryStore = useCategoryStore();
const folderStore = useFolderStore();

folderStore.$subscribe(() => {
  folderStore.updateLocalStorage();
});

const showAddPopup = ref(false);
</script>

<template>
  <header class="flex justify-center mx-auto mt-8 mb-24">
    <h1>{{ categoryStore.activeCategoryName }}</h1>
  </header>

  <div class="flex justify-start max-w-lg mx-auto mb-10">
    <RouterLink to="/">
      <BackIcon />
    </RouterLink>
  </div>

  <div v-if="folderStore.folders.length === 0" class="flex justify-center">
    <p>Add some folders!</p>
  </div>

  <div v-else>
    <div class="grid grid-cols-2 gap-2 md:grid-cols-3 max-w-xs md:max-w-md mx-auto">
      <div v-for="folder of folderStore.folders" :key="folder.id">
        <FolderItem
          :id="folder.id"
          :name="folder.name"
          :categoryName="categoryStore.activeCategoryName"
        />
      </div>
    </div>
  </div>

  <div class="flex justify-center max-w-md mx-auto my-8">
    <AddButton @clicked="showAddPopup = true" />
  </div>

  <AddPopup
    v-show="showAddPopup"
    @add-saved="showAddPopup = false"
    @cancelled="showAddPopup = false"
  />
</template>
