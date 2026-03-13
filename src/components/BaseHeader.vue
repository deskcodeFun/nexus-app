<template>
  <div class="flex flex-row items-baseline py-4 ">
    <BaseButttonBack />
    <div class="px-4">
      <p class="text-lg  tracking-widest  text-blue-900">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
  import BaseButttonBack from './BaseButttonBack.vue';
  defineProps({
    title: String
  })
</script>
