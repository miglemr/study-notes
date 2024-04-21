<script setup lang="ts">
import EditIcon from '../icons/EditIcon.vue';
import DeleteIcon from '../icons/DeleteIcon.vue';

defineEmits(['editClick', 'deleteClick']);

const iconColor = 'white';
</script>

<template>
  <button
    data-testid="edit-btn"
    class="flex items-center p-1 text-xs menu-item-btn mx-2 rounded-lg transition hover:bg-zinc-700 hover:duration-150"
    type="button"
    @click="$emit('editClick')"
  >
    <EditIcon :is-background="false" :color="iconColor" :color-on-hover="iconColor" />
    <span class="pr-8"> Edit </span>
  </button>

  <button
    data-testid="delete-btn"
    class="flex items-center p-1 text-xs menu-item-btn mx-2 rounded-lg transition hover:bg-zinc-700 hover:duration-150"
    type="button"
    @click="$emit('deleteClick')"
  >
    <DeleteIcon :is-background="false" :color="iconColor" :color-on-hover="iconColor" />
    <span class="pr-4"> Delete </span>
  </button>
</template>
