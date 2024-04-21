<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  isBackground: boolean;
  color: string;
  colorOnHover: string;
}

const props = defineProps<Props>();

const hovered = ref(false);
</script>

<template>
  <div
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
    class="rounded-md"
    :class="{ 'bg-slate-200': props.isBackground }"
  >
    <div class="p-1">
      <svg
        class="transition"
        :class="{ 'duration-150': hovered }"
        width="15px"
        height="15px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

        <g id="SVGRepo_iconCarrier">
          <path
            d="M10 11V17"
            :stroke="hovered ? props.color : props.colorOnHover"
            stroke-width="1.7759999999999998"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 11V17"
            :stroke="hovered ? props.color : props.colorOnHover"
            stroke-width="1.7759999999999998"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 7H20"
            :stroke="hovered ? props.color : props.colorOnHover"
            stroke-width="1.7759999999999998"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
            :stroke="hovered ? props.color : props.colorOnHover"
            stroke-width="1.7759999999999998"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
            :stroke="hovered ? props.color : props.colorOnHover"
            stroke-width="1.7759999999999998"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>
  </div>
</template>
