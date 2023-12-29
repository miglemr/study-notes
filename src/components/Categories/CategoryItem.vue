<script setup lang="ts">
interface Props {
  name: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div
    data-testid="category-item"
    class="flex justify-center items-center h-[45px] w-[320px] bg-white rounded-lg shadow-md transition duration-300 hover:ring-2"
  >
    <span>{{ props.name }}</span>
  </div>
</template>
