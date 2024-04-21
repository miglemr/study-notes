<script setup lang="ts">
import ConfirmButton from './Buttons/ConfirmButton.vue';
import CancelButton from './Buttons/CancelButton.vue';

interface Props {
  type: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div data-testid="delete-popup" class="fixed inset-0 flex items-center justify-center">
    <div class="flex flex-col justify-evenly w-auto h-auto p-4 bg-white rounded-lg">
      <p class="mb-7">Are you sure you want to delete this {{ props.type }}?</p>

      <div class="flex">
        <ConfirmButton @clicked="$emit('confirmed')" />
        <CancelButton @clicked="$emit('cancelled')" />
      </div>
    </div>
  </div>
</template>
