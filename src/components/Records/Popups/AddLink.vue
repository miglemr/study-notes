<script setup lang="ts">
import { ref } from 'vue';
import { useRecordStore } from '@/stores/record';
import type { Link } from '@/types';
import SubmitButton from '@/components/Buttons/SubmitButton.vue';
import CancelButton from '@/components/Buttons/CancelButton.vue';

const emit = defineEmits(['saved', 'cancelled']);

const recordStore = useRecordStore();

const type = 'link';

const title = ref('');
const url = ref('');

function handleSubmit() {
  const link: Link = { title: title.value, url: url.value };
  recordStore.addRecord(type, link);

  title.value = '';
  url.value = '';
  emit('saved');
}

function handleCancel() {
  title.value = '';
  url.value = '';
  emit('cancelled');
}
</script>

<template>
  <div data-testid="add-link" class="fixed inset-0 flex items-center justify-center">
    <div class="w-80 h-auto p-4 bg-white rounded-lg">
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col mb-2">
          <label for="title">Title</label>
          <input
            class="rounded border border-gray-300 bg-inherit p-2 shadow shadow-gray-100 my-2 appearance-none text-neutral-800"
            type="text"
            id="title"
            v-model="title"
            required
          />
        </div>

        <div class="flex flex-col mb-6">
          <label for="url">URL</label>
          <input
            class="rounded border border-gray-300 bg-inherit p-2 shadow shadow-gray-100 my-2 appearance-none text-neutral-800"
            type="url"
            name="url"
            id="url"
            placeholder="https://example.com"
            pattern="https://.*"
            size="30"
            required
            v-model="url"
          />
        </div>
        <div>
          <SubmitButton />
          <CancelButton @click="handleCancel" />
        </div>
      </form>
    </div>
  </div>
</template>
