<script setup lang="ts">
import { ref } from 'vue';
import { useFolderStore } from '@/stores/folder';
import SubmitButton from '@/components/Buttons/SubmitButton.vue';

interface Props {
  id: string;
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'editSaved', 'cancelled']);

const folderStore = useFolderStore();

const showErrorMessage = ref(false);
const errorMssg = ref('');

function handleSubmit() {
  try {
    folderStore.editFolderName(props.id, props.modelValue);
    emit('editSaved');
  } catch (error) {
    if (error instanceof Error) {
      showErrorMessage.value = true;
      errorMssg.value = error.message;
    }
  }
}
</script>

<template>
  <div data-testid="edit-popup" class="fixed inset-0 flex items-center justify-center">
    <div class="bg-white flex flex-col justify-evenly w-80 h-auto rounded-lg p-4">
      <div v-show="showErrorMessage">
        {{ errorMssg }}
      </div>
      <form @submit.prevent="handleSubmit">
        <label for="title">Title</label>
        <input
          class="w-full rounded border border-gray-300 bg-inherit p-2 shadow shadow-gray-100 my-2 appearance-none outline-none text-neutral-800"
          type="text"
          id="title"
          :value="props.modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          maxlength="30"
          required
          autofocus
        />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  </div>
</template>
