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

function handleEditSubmit(updatedTitle: string, updatedUrl: string) {
  title.value = updatedTitle;
  url.value = updatedUrl;

  const content: Link = {
    title: title.value,
    url: url.value,
  };
  recordStore.editRecord(props.id, content);
  setChangeInProgressToFalse();
  editModeOn.value = false;
}

function handleEditCancel() {}

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
    data-testid="link-item"
    class="w-auto max-w-lg max-h-fit mb-4 px-4 py-2 border border-green-200 rounded-lg"
  >
    <Menu
      @on-edit-click="editModeOn = true"
      @on-delete-click="showDeletePopup = true"
    />

    <div v-if="!editModeOn">
      <a :href="url" target="_blank">
        <p
          class="text-green-500 underline underline-offset-2 font-bold hover:text-green-300 break-words"
        >
          {{ title }}
        </p>
      </a>
    </div>

    <div v-else>
      <LinkForm
        @on-submit="handleEditSubmit"
        @on-cancel="handleEditCancel"
        :title="title"
        :url="url"
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
