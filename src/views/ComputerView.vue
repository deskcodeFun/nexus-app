<template>
  <!-- <div v-if="computer.isLoading" class="text-green-600 text-2xl text-center">Loading...</div> -->
  <div>
    <ul
      class="bg-sky-50/30 flex flex-col justify-center sm:flex-row sm:flex-nowrap sm:overflow-x-scroll sm:p-4 sm:justify-start"
    >
      <li v-for="(asset, index) in computerStore" :key="index">
        <ComputerCard :currentAsset="asset" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAssetsStore } from '@/stores/assetsData'

import ComputerCard from '@/components/computers/ComputerCard.vue'

const store = useAssetsStore()
console.log('All asset store', store.assets)

const computerStore = store.assets.filter((item) => item.catalog === 'computer')

console.log('computer filter', computerStore)
</script>

<style lang="scss" scoped></style>
