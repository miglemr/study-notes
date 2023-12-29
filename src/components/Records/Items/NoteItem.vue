<script setup lang="ts">
import { ref } from 'vue';
import { useRecordStore } from '@/stores/record';
import type { Note } from '@/types';
import Menu from '@/components/Menu/index.vue';
import TextForm from '../Forms/TextForm.vue';
import DeletePopup from '@/components/DeletePopup.vue';
import { useModeStore } from '../../../stores/mode';

interface Props {
  id: string;
  content: Note;
}

const props = defineProps<Props>();

const recordStore = useRecordStore();
const modeStore = useModeStore();

const type = 'note';

const text = ref(props.content.text);

const editModeOn = ref(false);
const showDeletePopup = ref(false);

function handleEditSubmit(updatedText: string) {
  text.value = updatedText;

  const content: Note = {
    text: text.value,
  };
  recordStore.editRecord(props.id, content);
  setChangeInProgressToFalse();
  editModeOn.value = false;
}

function handleEditCancel() {
  setChangeInProgressToFalse();
  editModeOn.value = false;
}

function handleDeleteConfirm() {
  recordStore.deleteRecord(props.id);
  showDeletePopup.value = false;
  setChangeInProgressToFalse();
}

function handleDeleteCancel() {
  showDeletePopup.value = false;
  setChangeInProgressToFalse();
}

function setChangeInProgressToFalse() {
  modeStore.changeInProgress = false;
}
</script>

<template>
  <div
    data-testid="note-item"
    class="w-64 min-h-[100px] sm:w-80 sm:min-h-[150px] max-h-fit mb-4 p-4 bg-purple-200/[0.5] rounded-xl"
  >
    <Menu
      @on-edit-click="editModeOn = true"
      @on-delete-click="showDeletePopup = true"
    />

    <div v-if="!editModeOn">
      <p data-testid="note-text" class="whitespace-pre-wrap text-sm">
        {{ text }}
      </p>
    </div>

    <div v-else>
      <TextForm
        @on-submit="handleEditSubmit"
        @on-cancel="handleEditCancel"
        :text="text"
        :cols="25"
        :rows="10"
      />
    </div>

    <DeletePopup
      v-show="showDeletePopup"
      :type="type"
      @on-confirm="handleDeleteConfirm"
      @on-cancel="handleDeleteCancel"
    />
  </div>
</template>
