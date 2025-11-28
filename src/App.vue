<template>
  <!-- <div class="w-full min-h-screen bg-linear-180 from-indigo-100 to-red-100"> -->
  <div class="w-full min-h-screen bg-gray-50">
    <div>
      <TheTopbar />
    </div>
    <div class="min-w-11/12 px-8">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TheTopbar from '@/components/TheTopbar.vue'
</script>
