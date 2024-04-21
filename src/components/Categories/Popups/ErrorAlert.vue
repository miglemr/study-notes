<script setup lang="ts">
interface Props {
  message: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="flex justify-center container mx-auto mb-4 max-w-md bg-red-50 rounded-lg border border-red-50"
  >
    <p class="p-2 text-xs text-red-500 font-semibold">{{ props.message }}</p>
  </div>
</template>
