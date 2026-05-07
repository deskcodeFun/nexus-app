<template>
  <div class="fixed h-screen w-full">
    <div class="fixed top-0 left-0 right-0 z-1000">
      <TheTopbar />
    </div>
    <div class="h-screen mt-18 sm:pl-8 sm:mr-8 z-0">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TheTopbar from './components/TheTopbar.vue'

// detect screen
const isMobile = ref(false)
const breakpoint = 1024

const checkMobile = () => {
  isMobile.value = window.innerWidth <= breakpoint
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
