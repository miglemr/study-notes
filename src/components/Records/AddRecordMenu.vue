<script setup lang="ts">
import AddNote from './Popups/AddNote.vue';
import AddLink from './Popups/AddLink.vue';
import AddCode from './Popups/AddCode.vue';

const popups = [
  { name: 'Note', component: AddNote },
  { name: 'Link', component: AddLink },
  { name: 'Code', component: AddCode }
];
</script>

<template>
  <div class="absolute w-28 rounded-lg">
    <button
      v-for="(popup, index) of popups"
      type="button"
      :key="index"
      class="flex justify-center min-w-full m-1 py-1 rounded-lg bg-white transition duration-300 hover:ring-2 record-menu-item"
      @click="$emit('clicked', popup.component)"
    >
      {{ popup.name }}
    </button>
  </div>
</template>
