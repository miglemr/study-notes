<script setup lang="ts">
import { ref } from 'vue';
import { useRecordStore } from '@/stores/record';
import type { Code } from '@/types';
import SubmitButton from '@/components/Buttons/SubmitButton.vue';
import CancelButton from '@/components/Buttons/CancelButton.vue';

const emit = defineEmits(['saved', 'cancelled']);

const recordStore = useRecordStore();

const type = 'code';
const code = ref('');

function handleSubmit() {
  const codeItem: Code = { code: code.value };
  recordStore.addRecord(type, codeItem);

  code.value = '';
  emit('saved');
}

function handleCancel() {
  code.value = '';
  emit('cancelled');
}
</script>

<template>
  <div data-testid="add-code" class="fixed inset-0 flex items-center justify-center">
    <div class="flex flex-col justify-evenly w-[60%] h-auto p-4 bg-white rounded-lg">
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col mb-6">
          <label for="code">Enter code</label>
          <textarea
            class="rounded border border-gray-300 bg-inherit p-2 shadow shadow-gray-100 my-2 appearance-none text-neutral-800 resize-none"
            name="code"
            id="code"
            cols="30"
            rows="10"
            v-model="code"
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
