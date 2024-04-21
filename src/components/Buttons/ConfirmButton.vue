<template>
  <button
    class="inline-flex justify-center items-center w-20 my-2 mx-1 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition hover:duration-150 p-2 font-semibold"
    type="button"
    @click="$emit('clicked')"
  >
    Ok
  </button>
</template>
