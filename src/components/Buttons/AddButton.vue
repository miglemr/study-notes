<script setup lang="ts">
import AddIcon from '../icons/AddIcon.vue';

const color = '#ef4444';
const colorOnHover = '#f87171';
</script>

<template>
  <button
    data-testid="add-btn"
    class="transition ease-in-out delay-50 hover:-translate-y-1 duration-300"
    type="button"
    @click="$emit('clicked')"
    @blur="$emit('blurEvent', $event)"
  >
    <AddIcon :color="color" :color-on-hover="colorOnHover" />
  </button>
</template>
