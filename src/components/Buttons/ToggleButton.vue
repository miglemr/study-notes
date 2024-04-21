<template>
  <div>
    <button
      class="inline-flex my-2 mx-1 py-2 px-6 rounded-lg bg-cyan-400 text-white hover:bg-cyan-300 transition ease-in-out delay-50 hover:-translate-y-1 duration-300 hover:duration-150"
      type="button"
      @click="$emit('clicked')"
    >
      Edit
    </button>
  </div>
</template>
