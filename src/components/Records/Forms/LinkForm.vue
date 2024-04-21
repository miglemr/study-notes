<script setup lang="ts">
import { ref } from 'vue';
import SubmitButton from '@/components/Buttons/SubmitButton.vue';

interface Props {
  title?: string;
  url?: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['formSubmitted']);

const title = ref(props.title);
const url = ref(props.url);

function handleSubmit() {
  emit('formSubmitted', title.value, url.value);
}
</script>

<template>
  <form data-testid="link-form" @submit.prevent="handleSubmit">
    <label for="title">Title</label>
    <input
      class="w-full rounded border border-gray-300 bg-inherit p-2 shadow shadow-gray-100 my-2 appearance-none outline-none text-neutral-800"
      type="text"
      id="title"
      v-model="title"
      required
      maxlength="50"
    />

    <label for="url">URL</label>
    <input
      class="w-full rounded border border-gray-300 bg-inherit p-2 shadow shadow-gray-100 my-2 appearance-none text-neutral-800"
      type="url"
      name="url"
      id="url"
      placeholder="https://example.com"
      pattern="https://.*"
      size="30"
      required
      v-model="url"
    />

    <SubmitButton />
  </form>
</template>
