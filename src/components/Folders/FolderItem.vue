<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useFolderStore } from '@/stores/folder';
import { useModeStore } from '../../stores/mode';
import Menu from '../Menu/index.vue';
import EditPopup from './Popups/EditPopup.vue';
import DeletePopup from '../DeletePopup.vue';
import FolderIcon from '../icons/FolderIcon.vue';

interface Props {
  id: string;
  name: string;
  categoryName: string;
}

const props = defineProps<Props>();

const folderStore = useFolderStore();
const modeStore = useModeStore();

const type = 'folder';

const primFolderColor = '#7dd3fc';
const secFolderColor = '#38bdf8';

const showEditPopup = ref(false);
const showDeletePopup = ref(false);

const selectedFolderName = ref('');

function handleEditClick() {
  showEditPopup.value = true;
  selectedFolderName.value = props.name;
}

function handleDeleteClick() {
  showDeletePopup.value = true;
}

function handleEditSave() {
  showEditPopup.value = false;
  setChangeInProgressToFalse();
}

function handleDeleteSave() {
  showDeletePopup.value = false;
  setChangeInProgressToFalse();
}

function deleteFolder() {
  folderStore.deleteFolder(props.id);
  handleDeleteSave();
}

function setChangeInProgressToFalse() {
  modeStore.changeInProgress = false;
}
</script>

<template>
  <div
    data-testid="folder-item"
    class="bg-white p-2 rounded-lg transition hover:duration-150 hover:ring-2 shadow-md h-full"
  >
    <Menu @edit-click="handleEditClick" @delete-click="handleDeleteClick" />

    <RouterLink
      :to="{
        name: 'folder',
        params: { categoryName: props.categoryName, folderName: props.name }
      }"
    >
      <div class="flex flex-col justify-evenly items-start">
        <FolderIcon
          class="mb-2 ml-2"
          :primary-color="primFolderColor"
          :second-color="secFolderColor"
        />
        <p class="mb-2 ml-2 text-sm">{{ props.name }}</p>
      </div>
    </RouterLink>
  </div>

  <EditPopup
    v-show="showEditPopup"
    v-model="selectedFolderName"
    :id="props.id"
    @edit-saved="handleEditSave"
    @cancelled="handleEditSave"
  />
  <DeletePopup
    v-show="showDeletePopup"
    :type="type"
    @confirmed="deleteFolder"
    @cancelled="handleDeleteSave"
  />
</template>
