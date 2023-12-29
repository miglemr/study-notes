<script setup lang="ts">
import { ref } from 'vue';
import { useModeStore } from '@/stores/mode';
import MenuContent from './MenuContent.vue';
import MenuIcon from '../icons/MenuIcon.vue';

const emit = defineEmits(['onEditClick', 'onDeleteClick']);

const modeStore = useModeStore();

const showMenu = ref(false);

function handleEditClick() {
  closeMenu();
  setChangeInProgressToTrue();
  emit('onEditClick');
}

function handleDeleteClick() {
  closeMenu();
  setChangeInProgressToTrue();
  emit('onDeleteClick');
}

function setChangeInProgressToTrue() {
  modeStore.changeInProgress = true;
}

function handleBlur(event: any) {
  const isMenuItemButton =
    event.relatedTarget &&
    event.relatedTarget.classList.contains('menu-item-btn');

  if (!isMenuItemButton) {
    closeMenu();
  }
}

function closeMenu() {
  showMenu.value = false;
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
}
</script>

<template>
  <div data-testid="menu" class="inline-flex float-right relative">
    <div>
      <button
        type="button"
        class="text-xs"
        :class="{ 'opacity-0': modeStore.changeInProgress }"
        @click="toggleMenu"
        @blur="handleBlur"
      >
        <MenuIcon />
      </button>
    </div>

    <div
      v-show="showMenu"
      class="absolute -top-20 -left-20 sm:left-2 w-24 py-2 min-h-fit bg-zinc-800 rounded-lg text-white"
    >
      <MenuContent
        @on-edit-click="handleEditClick"
        @on-delete-click="handleDeleteClick"
      />
    </div>
  </div>
</template>
