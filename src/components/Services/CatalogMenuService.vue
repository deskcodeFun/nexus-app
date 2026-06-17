<template>
  <div>
    <button
      class="px-2 mx-2 rounded-md bg-sky-100 text-blue-900 hover:bg-blue-900 hover:text-white active:bg-blue-900 focus:bg-blue-900 focus:text-white"
      @click="$emit('changeView', 'ChangeUserService')"
    >
      Change User
    </button>
    <button
      class="px-2 mx-2 rounded-md bg-sky-100 text-blue-900 hover:bg-blue-900 hover:text-white active:bg-blue-900 focus:bg-blue-900 focus:text-white"
      @click="$emit('changeView', 'FormatService')"
    >
      Format
    </button>
    <button
      class="px-2 mx-2 rounded-md bg-sky-100 text-blue-900 hover:bg-blue-900 hover:text-white active:bg-blue-900 focus:bg-blue-900 focus:text-white"
      @click="$emit('changeView', 'OtherService')"
    >
      Other
    </button>
  </div>
</template>

<script setup>
defineEmits(['changeView'])
</script>
