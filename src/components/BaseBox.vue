<template>
  <div class="flex flex-col mb-1">
    <label class="w-fit capitalize text-gray-500 text-sm">{{ label }}</label>
    <p class="w-full py-1 px-2 mt-1 font-semibold bg-blue-50 text-wrap">
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
