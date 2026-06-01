<template>
  <div class="w-70 mb-2">
    <label class="capitalize text-gray-500 text-sm">{{ label }}</label>
    <div class="py-1 px-2 mt-1 font-semibold bg-blue-50 text-wrap">
      {{ data ?? '-' }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  data: String,
})
</script>
