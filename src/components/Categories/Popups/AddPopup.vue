<script setup lang="ts">
import { ref } from 'vue';
import { useCategoryStore } from '@/stores/category';
import ErrorAlert from './ErrorAlert.vue';
import SubmitButton from '@/components/Buttons/SubmitButton.vue';
import CancelButton from '@/components/Buttons/CancelButton.vue';

const emit = defineEmits(['addSaved', 'cancelled']);

const categoryStore = useCategoryStore();

const title = ref('');

const showErrorMessage = ref(false);
const errorMssg = ref('');

function handleSubmit() {
  try {
    categoryStore.addCategory(title.value);
    title.value = '';
    emit('addSaved');
  } catch (error) {
    if (error instanceof Error) {
      showErrorMessage.value = true;
      errorMssg.value = error.message;
      setTimeout(() => {
        showErrorMessage.value = false;
        errorMssg.value = '';
      }, 2000);
    }
  }
}

function handleCancel() {
  title.value = '';
  showErrorMessage.value = false;
  emit('cancelled');
}
</script>

<template>
  <div data-testid="add-popup" class="fixed inset-0 flex items-center justify-center">
    <div class="flex flex-col justify-evenly w-80 h-auto p-4 bg-white rounded-lg">
      <ErrorAlert v-show="showErrorMessage" :message="errorMssg" />
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col mb-6">
          <label class="mb-2" for="title">Title</label>
          <input
            class="w-full rounded border border-gray-300 bg-inherit p-2 shadow shadow-gray-100 my-2 appearance-none outline-none text-neutral-800"
            type="text"
            id="title"
            v-model="title"
            maxlength="30"
            required
          />
        </div>
        <div>
          <SubmitButton />
          <CancelButton @clicked="handleCancel" />
        </div>
      </form>
    </div>
  </div>
</template>
