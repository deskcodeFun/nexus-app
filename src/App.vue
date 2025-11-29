<template>
  <!-- <div class="w-full min-h-screen bg-linear-180 from-indigo-100 to-red-100"> -->

  <TheTopbar />
  <RouterView />
</template>

<script setup>
// import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TheTopbar from '@/components/TheTopbar.vue'
</script>
