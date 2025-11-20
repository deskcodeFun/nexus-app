<template>
  <!-- <div v-if="computer.isLoading" class="text-green-600 text-2xl text-center">Loading...</div> -->
  <div class="w-11/12 py-4">
    <ul
      class="flex flex-col pb-8 justify-center sm:justify-start sm:flex-row sm:flex-nowrap sm:overflow-x-auto"
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

const computerStore = store.assets.filter((item) => item.catalog === 'computer')
</script>

<style lang="scss" scoped></style>
