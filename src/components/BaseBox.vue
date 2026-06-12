<template>
  <div class="w-full flex flex-col mb-1">
    <label class="w-fit capitalize text-gray-500 text-sm">{{ label }}</label>
    <div class="w-2/3 py-1 px-2 mt-1 font-semibold bg-blue-50 text-wrap">
      {{ data ?? '-' }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  data: [String, Number],
})
</script>
