<template>
  <button class="px-8 py-1 rounded-xl text-blue-800 bg-gray-200 hover:bg-blue-200">
    {{ props.label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: String,
})
</script>
