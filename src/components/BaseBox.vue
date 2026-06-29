<template>
  <div class="flex flex-col md:flex-row md:w-11/12 mb-1 items-baseline">
    <label class="md:w-36 capitalize text-gray-500 text-sm">{{ label }}</label>
    <p class="w-11/12 md:w-xs py-1 px-2 mt-1 font-semibold bg-blue-50 text-wrap">
      {{ data ?? '-' }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  data: [String, Number],
})
</script>
