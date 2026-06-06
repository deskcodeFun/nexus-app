<template>
  <div>
    <button
      class="px-2 py-1 mx-2 rounded-md bg-sky-100 text-blue-900 hover:bg-blue-900 hover:text-white active:bg-blue-900 focus:bg-blue-900 focus:text-white"
      @click="$emit('changeView', 'ComputerService')"
    >
      Computer Service
    </button>
    <button
      class="px-2 py-1 mx-2 rounded-md bg-sky-100 text-blue-900 hover:bg-blue-900 hover:text-white active:bg-blue-900 focus:bg-blue-900 focus:text-white"
      @click="$emit('changeView', 'EmailService')"
    >
      Add new Email
    </button>
    <button
      class="px-2 py-1 mx-2 rounded-md bg-sky-100 text-blue-900 hover:bg-blue-900 hover:text-white active:bg-blue-900 focus:bg-blue-900 focus:text-white"
      @click="$emit('changeView', 'AssetService')"
    >
      Asset Service
    </button>
  </div>
</template>

<script setup>
defineEmits(['changeView'])
</script>
