<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useCategoryStore } from '@/stores/category';
import { CATEGORY_STORAGE } from '@/globals';
import CategoryItem from './CategoryItem.vue';
import CategoryItemEdit from './CategoryItemEdit.vue';
import AddPopup from './Popups/AddPopup.vue';
import AddButton from '../Buttons/AddButton.vue';
import ToggleButton from '../Buttons/ToggleButton.vue';
import * as Storage from '../localStorage';

const categoryStore = useCategoryStore();

categoryStore.$subscribe((mutation, state) => {
  Storage.saveData(CATEGORY_STORAGE, state.categories);
});

const editModeOn = ref(false);
const showAddPopup = ref(false);

function toggleEditMode() {
  editModeOn.value = !editModeOn.value;
}

function handleAddSave() {
  showAddPopup.value = false;
  editModeOn.value = false;
}
</script>

<template>
  <header class="flex justify-center mx-auto mt-8">
    <h1>Categories</h1>
  </header>

  <div class="flex justify-evenly mx-auto mt-8 mb-10">
    <AddButton @clicked="showAddPopup = true" />
    <ToggleButton data-testid="edit-mode-btn" @clicked="toggleEditMode" />
  </div>

  <div v-if="categoryStore.categories.length === 0" class="flex justify-center">
    <p>Nothing to show!</p>
  </div>

  <div v-else>
    <div v-for="category of categoryStore.categories" :key="category.id">
      <div v-if="!editModeOn" class="flex justify-center mx-auto mt-4">
        <RouterLink :to="{ name: 'category', params: { categoryName: category.name } }">
          <CategoryItem :name="category.name" />
        </RouterLink>
      </div>

      <CategoryItemEdit
        v-else
        :id="category.id"
        :name="category.name"
        @edit-done="editModeOn = false"
      />
    </div>
  </div>

  <AddPopup v-show="showAddPopup" @add-saved="handleAddSave" @cancelled="handleAddSave" />
</template>
