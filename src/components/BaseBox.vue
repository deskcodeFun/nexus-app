<template>
  <div class="w-75 xl:w-auto mb-2">
    <label class="capitalize text-gray-500 text-sm">{{ label }}</label>
    <div class="w-auto py-1 px-2 mt-1 mr-8 lg:mr-20 font-semibold bg-blue-50 text-wrap">
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
