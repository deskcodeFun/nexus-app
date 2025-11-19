<template>
  <div class="min-h-screen min-w-11/12 px-8 bg-linear-180 from-indigo-100 to-red-100">
    <TheTopbar />
    <RouterView />
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TheTopbar from '@/components/TheTopbar.vue'
</script>
