<template>
  <!-- <div v-if="computer.isLoading" class="text-green-600 text-2xl text-center">Loading...</div> -->
  <div class="w-11/12 py-4">
    <!-- <ul
      class="flex flex-col pb-8 justify-center sm:justify-start sm:flex-row sm:flex-nowrap sm:overflow-x-auto"
    >
      <li v-for="(asset, index) in printerStore" :key="index">
        <PrinterCard :currentAsset="asset" />
      </li>
    </ul> -->
    <component :is="activeComponent"></component>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import PrinterCard from '@/components/printers/PrinterCard.vue'
import PrinterTable from '@/components/printers/PrinterTable.vue'
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
  return windowWidth.value <= 768 ? PrinterCard : PrinterTable
})
</script>

<style lang="scss" scoped></style>
