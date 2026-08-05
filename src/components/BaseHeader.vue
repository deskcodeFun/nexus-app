<template>
  <div class="flex flex-row items-baseline py-4">
    <BaseButttonBack v-show="isShow" class="mr-2" />
    <div>
      <p class="text-lg tracking-widest text-blue-900">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
import BaseButttonBack from './BaseButttonBack.vue'
defineProps({
  title: String,
  isShow: Boolean,
})
</script>
