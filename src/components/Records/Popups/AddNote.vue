<script setup lang="ts">
import { ref } from 'vue';
import { useRecordStore } from '@/stores/record';
import type { Note } from '@/types';
import SubmitButton from '@/components/Buttons/SubmitButton.vue';
import CancelButton from '@/components/Buttons/CancelButton.vue';

const emit = defineEmits(['saved', 'cancelled']);

const recordStore = useRecordStore();

const type = 'note';

const text = ref('');

function handleSubmit() {
  const note: Note = { text: text.value };
  recordStore.addRecord(type, note);

  text.value = '';
  emit('saved');
}

function handleCancel() {
  text.value = '';
  emit('cancelled');
}
</script>

<template>
  <div data-testid="add-note" class="fixed inset-0 flex items-center justify-center">
    <div class="flex flex-col justify-evenly w-80 h-auto p-4 bg-white rounded-lg">
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col mb-6">
          <label for="note">Note</label>
          <textarea
            class="rounded border border-gray-300 bg-inherit p-2 shadow shadow-gray-100 my-2 appearance-none text-neutral-800 resize-none"
            name="note"
            id="note"
            cols="30"
            rows="10"
            v-model="text"
          ></textarea>
        </div>

        <div>
          <SubmitButton />
          <CancelButton @click="handleCancel" />
        </div>
      </form>
    </div>
  </div>
</template>
