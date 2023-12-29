<script setup lang="ts">
import { ref } from 'vue';
import SubmitButton from '@/components/Buttons/SubmitButton.vue';
import CancelButton from '@/components/Buttons/CancelButton.vue';

interface Props {
  text?: string;
  cols: number;
  rows: number;
}

const props = defineProps<Props>();

const emit = defineEmits(['onSubmit', 'onCancel']);

const text = ref(props.text);

function handleSubmit() {
  emit('onSubmit', text.value);
}

function handleCancel() {
  emit('onCancel', text.value);
}
</script>

<template>
  <form data-testid="text-form" @submit.prevent="handleSubmit">
    <div class="flex flex-col">
      <label for="text" type="hidden" />
      <textarea
        class="bg-transparent outline-none resize-none mb-4"
        name="text"
        id="text"
        :cols="cols"
        :rows="rows"
        v-model="text"
      ></textarea>

      <div class="flex">
        <SubmitButton />
        <CancelButton @on-click="handleCancel" />
      </div>
    </div>
  </form>
</template>
