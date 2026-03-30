<template>
  <div class="inset-0 top-0 left-0 flex flex-row  items-baseline py-8  ">
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
