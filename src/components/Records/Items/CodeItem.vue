<script setup lang="ts">
import { ref } from 'vue';
import { useRecordStore } from '@/stores/record';
import { useModeStore } from '@/stores/mode';
import type { Code } from '@/types';
import Menu from '@/components/Menu/index.vue';
import TextForm from '../Forms/TextForm.vue';
import DeletePopup from '@/components/DeletePopup.vue';

interface Props {
  id: string;
  content: Code;
}

const props = defineProps<Props>();

const recordStore = useRecordStore();
const modeStore = useModeStore();

const type = 'code';

const code = ref(props.content.code);

const editModeOn = ref(false);
const showDeletePopup = ref(false);

function editItem(updatedText: string) {
  code.value = updatedText;

  const content: Code = {
    code: code.value
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
    data-testid="code-item"
    class="max-h-fit mb-4 p-4 border border-zinc-200 rounded-xl"
    :class="{ 'max-w-fit': !editModeOn }"
  >
    <Menu @edit-click="editModeOn = true" @delete-click="showDeletePopup = true" />

    <div v-if="!editModeOn" class="overflow-x-auto">
      <div class="text-xs">
        <highlightjs autodetect :code="code" />
      </div>
    </div>
    <div v-else>
      <TextForm @form-submitted="editItem" :text="code" :cols="80" :rows="15" />
    </div>

    <DeletePopup
      v-show="showDeletePopup"
      :type="type"
      @confirmed="deleteItem"
      @cancelled="handleDeleteSave"
    />
  </div>
</template>
