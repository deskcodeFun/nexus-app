<template>
  <div>
    <div class="flex flex-col bg-white py-16 px-2">
      <p class="text-lg tracking-widest text-blue-900">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: String
  })
</script>
