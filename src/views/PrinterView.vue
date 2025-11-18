<template>
  <!-- <div v-if="computer.isLoading" class="text-green-600 text-2xl text-center">Loading...</div> -->
  <div>
    <ul class="bg-sky-50/30 flex flex-row flex-wrap justify-center sm:justify-start">
      <li v-for="(asset, index) in printerStore" :key="index">
        <PrinterCard :currentAsset="asset" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAssetsStore } from '@/stores/assetsData'

import PrinterCard from '@/components/printers/PrinterCard.vue'
const store = useAssetsStore()
console.log('All asset store', store.assets)

const printerStore = store.assets.filter((item) => item.catalog === 'printer')

console.log('computer filter', printerStore)
</script>

<style lang="scss" scoped></style>
