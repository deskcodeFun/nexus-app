<template>
  <!-- <div v-if="computer.isLoading" class="text-green-600 text-2xl text-center">Loading...</div> -->
  <div>
    <ul class="bg-sky-50/30 flex flex-nowrap overflow-x-scroll p-4 justify-center sm:justify-start">
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
