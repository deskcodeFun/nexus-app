<template>
  <div class="fixed top-0 right-0 z-1000 w-full">
    <TheTopbar />
  </div>
  <div class="w-full mt-24">
    <RouterView />
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
