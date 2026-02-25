<template>
  <div>
    <div class="flex flex-col bg-white pt-8 pb-8 px-2">
      <p class="text-2xl  tracking-widest  text-blue-900">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: String
  })
</script>
