<template>
  <!-- <div class="w-full min-h-screen bg-linear-180 from-indigo-100 to-red-100"> -->
  <div class="w-full min-h-screen">
    <header>
      <TheTopbar />
    </header>
    <main class=" sm:px-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TheTopbar from '@/components/TheTopbar.vue'
</script>
