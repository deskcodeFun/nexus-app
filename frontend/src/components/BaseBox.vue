<template>
  <div class="mb-4">
    <label class="mb-2">{{ label }}</label>
    <div class="py-1 px-2 mt-1 bg-blue-50">{{ data }}</div>
  </div>
</template>

<script setup>
  defineProps({
    label: String,
    data: null
  })
</script>
