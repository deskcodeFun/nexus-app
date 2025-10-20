<template>
  <div class="bg-linear-35 from-red-400 to-blue-500">
    <!-- <header class="w-auto px-2 py-1 sm:ml-6"> -->
    <header class="w-auto not-visited:mb-2 pt-1">
      <TheTopbar />
    </header>
    <main class="min-h-screen mt-1 bg-sky-50/65" id="mainApp">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheTopbar from '@/components/TheTopbar.vue'

import { provideToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

provideToast()
</script>

<!-- <style>
body {
  background-color: #fcfdfe;
}
.hide-scroll::-webkit-scrollbar {
  display: none;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: left;
  align-items: top;
  backdrop-filter: blur(4px);
  /* background: #57eb94; */
  /* background: linear-gradient(180deg, rgba(87, 176, 235, 0.15) 50%, rgba(243, 243, 237, 0.1) 100%); */
}
/* transition: 10s ease-in-out; */

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style> -->
