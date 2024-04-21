<script setup lang="ts">
import { ref } from 'vue';
import { useCategoryStore } from '../../stores/category';
import EditPopup from './Popups/EditPopup.vue';
import DeletePopup from '../DeletePopup.vue';
import EditIcon from '../icons/EditIcon.vue';
import DeleteIcon from '../icons/DeleteIcon.vue';

interface Props {
  name: string;
  id: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['editDone']);

const categoryStore = useCategoryStore();

const iconColor = '#52525b';
const iconColorOnHover = '#3b82f6';

const type = 'category';

const showEditPopup = ref(false);
const showDeletePopup = ref(false);

const selectedCategoryName = ref('');

function handleEditClick() {
  selectedCategoryName.value = props.name;
  showEditPopup.value = true;
}

function handleDeleteClick() {
  showDeletePopup.value = true;
}

function handleEditSave() {
  showEditPopup.value = false;
  emit('editDone');
}

function handleDeleteSave() {
  showDeletePopup.value = false;
  emit('editDone');
}

function deleteCategory() {
  categoryStore.deleteCategory(props.id);
  handleDeleteSave();
}
</script>

<template>
  <div
    class="flex justify-between h-[45px] max-w-sm mx-auto my-4 py-2 px-4 bg-white rounded-lg shadow-md"
  >
    <span>{{ props.name }} </span>
    <div>
      <button data-testid="edit-btn" class="mr-2" type="button" @click="handleEditClick">
        <EditIcon :is-background="true" :color="iconColor" :color-on-hover="iconColorOnHover" />
      </button>
      <button data-testid="delete-btn" type="button" @click="handleDeleteClick">
        <DeleteIcon :is-background="true" :color="iconColor" :color-on-hover="iconColorOnHover" />
      </button>
    </div>

    <EditPopup
      v-show="showEditPopup"
      v-model="selectedCategoryName"
      :id="props.id"
      @edit-saved="handleEditSave"
      @cancelled="handleEditSave"
    />
    <DeletePopup
      v-show="showDeletePopup"
      :type="type"
      @confirmed="deleteCategory"
      @cancelled="handleDeleteSave"
    />
  </div>
</template>
