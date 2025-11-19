<template>
  <div class="bg-linear-180 from-indigo-400 to-red-300">
    <!-- <div class="bg-linear-to-b from-indigo-500 via-green-400 to-red-400"> -->
    <!-- <header class="w-auto px-2 py-1 sm:ml-6"> -->
    <header class="w-auto mb-2 pt-1">
      <TheTopbar />
    </header>
    <main class="min-h-screen mt-1 bg-sky-50/35" id="mainApp">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TheTopbar from '@/components/TheTopbar.vue'
</script>
