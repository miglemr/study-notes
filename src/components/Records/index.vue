<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { RouterLink } from 'vue-router';
import { useFolderStore } from '@/stores/folder';
import { useRecordStore } from '@/stores/record';
import { useCategoryStore } from '@/stores/category';
import NoteItem from './Items/NoteItem.vue';
import LinkItem from './Items/LinkItem.vue';
import CodeItem from './Items/CodeItem.vue';
import AddButton from '../Buttons/AddButton.vue';
import AddRecordMenu from './AddRecordMenu.vue';
import BackIcon from '../icons/BackIcon.vue';

const recordStore = useRecordStore();
const folderStore = useFolderStore();
const categoryStore = useCategoryStore();

folderStore.$subscribe(() => {
  folderStore.updateLocalStorage();
});

const showAddRecordMenu = ref(false);

function getComponentName(type: string) {
  switch (type) {
    case 'note':
      return NoteItem;
    case 'link':
      return LinkItem;
    case 'code':
      return CodeItem;
  }
}

const showPopup = ref(false);
const popup = shallowRef(null);

function handleMenuItemClick(component: any) {
  createPopup(component);
  toggleAddButton();
}

function createPopup(component: any) {
  popup.value = component;
  showPopup.value = true;
}

function hidePopup() {
  showPopup.value = false;
}

function toggleAddButton() {
  showAddRecordMenu.value = !showAddRecordMenu.value;
}

function handleBlur(event: any) {
  const isMenuItemButton =
    event.relatedTarget && event.relatedTarget.classList.contains('record-menu-item');

  if (!isMenuItemButton) {
    showAddRecordMenu.value = false;
  }
}
</script>

<template>
  <header class="flex justify-center mx-auto mt-8 mb-10">
    <h1>{{ folderStore.activeFolderName }}</h1>
  </header>

  <div class="ml-10 mb-10">
    <RouterLink
      :to="{
        name: 'category',
        params: {
          categoryName: categoryStore.activeCategoryName
        }
      }"
    >
      <BackIcon />
    </RouterLink>
  </div>

  <div class="flex justify-center mb-40 relative">
    <div class="bg-white/[.50] p-4 w-full md:w-[90vw] shadow-lg">
      <component
        v-for="record of recordStore.records"
        :key="record.id"
        :is="getComponentName(record.type)"
        :id="record.id"
        :content="record.content"
      />

      <div class="inline-block relative">
        <AddButton @clicked="toggleAddButton" @blur-event="handleBlur" />
        <AddRecordMenu v-if="showAddRecordMenu" @clicked="handleMenuItemClick" />
      </div>

      <component v-show="showPopup" :is="popup" @saved="hidePopup" @cancelled="hidePopup" />
    </div>
  </div>
</template>
