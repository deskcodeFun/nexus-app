<template>
  <!-- <div v-if="computer.isLoading" class="text-green-600 text-2xl text-center">Loading...</div> -->
  <div class="w-11/12 py-4">
    <!-- <ul
      class="flex flex-col pb-8 justify-center sm:justify-start sm:flex-row sm:flex-nowrap sm:overflow-x-auto"
    >
      <li v-for="(asset, index) in computerStore" :key="index">
        <ComputerCard :currentAsset="asset" />
      </li>
    </ul> -->
    <component :is="activeComponent"></component>
    <!-- <ComputerTable :currentAsset="computerStore" /> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import ComputerCard from '@/components/computers/ComputerCard.vue'
import ComputerTable from '@/components/computers/ComputerTable.vue'

// detect screen
const windowWidth = ref(window.innerWidth)
const onWidthChange = () => {
  windowWidth.value = window.innerWidth
}
onMounted(() => {
  window.addEventListener('resize', onWidthChange)
})
onUnmounted(() => {
  window.removeEventListener('resize', onWidthChange)
})
const activeComponent = computed(() => {
  return windowWidth.value <= 768 ? ComputerCard : ComputerTable
})
</script>

<style lang="scss" scoped></style>
