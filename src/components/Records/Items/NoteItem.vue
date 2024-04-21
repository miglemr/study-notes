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

function editItem(updatedText: string) {
  text.value = updatedText;

  const content: Note = {
    text: text.value
  };
  recordStore.editRecord(props.id, content);
  setChangeInProgressToFalse();
  editModeOn.value = false;
}

function deleteItem() {
  recordStore.deleteRecord(props.id);
  handleDeleteSave();
}

function handleDeleteSave() {
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
    class="w-80 min-h-[150px] max-h-fit mb-4 p-4 bg-purple-200/[0.5] rounded-xl"
  >
    <Menu @edit-click="editModeOn = true" @delete-click="showDeletePopup = true" />

    <div v-if="!editModeOn">
      <p data-testid="note-text" class="break-words text-sm">{{ text }}</p>
    </div>

    <div v-else>
      <TextForm @form-submitted="editItem" :text="text" :cols="25" :rows="10" />
    </div>

    <DeletePopup
      v-show="showDeletePopup"
      :type="type"
      @confirmed="deleteItem"
      @cancelled="handleDeleteSave"
    />
  </div>
</template>
