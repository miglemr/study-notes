<script setup lang="ts">
import { ref } from 'vue';
import { useRecordStore } from '@/stores/record';
import { useModeStore } from '@/stores/mode';
import type { Link } from '@/types';
import Menu from '@/components/Menu/index.vue';
import LinkForm from '../Forms/LinkForm.vue';
import DeletePopup from '@/components/DeletePopup.vue';

interface Props {
  id: string;
  content: Link;
}

const props = defineProps<Props>();

const recordStore = useRecordStore();
const modeStore = useModeStore();

const type = 'link';

const title = ref(props.content.title);
const url = ref(props.content.url);

const editModeOn = ref(false);
const showDeletePopup = ref(false);

function editItem(updatedTitle: string, updatedUrl: string) {
  title.value = updatedTitle;
  url.value = updatedUrl;

  const content: Link = {
    title: title.value,
    url: url.value
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
    data-testid="link-item"
    class="w-auto max-w-lg max-h-fit mb-4 px-4 py-2 border border-green-200 rounded-lg"
  >
    <Menu @edit-click="editModeOn = true" @delete-click="showDeletePopup = true" />

    <div v-if="!editModeOn">
      <a :href="url">
        <p
          class="text-green-500 underline underline-offset-2 font-bold hover:text-green-300 break-words"
        >
          {{ title }}
        </p>
      </a>
    </div>

    <div v-else>
      <LinkForm @form-submitted="editItem" :title="title" :url="url" />
    </div>

    <DeletePopup
      v-show="showDeletePopup"
      :type="type"
      @confirmed="deleteItem"
      @cancelled="handleDeleteSave"
    />
  </div>
</template>
