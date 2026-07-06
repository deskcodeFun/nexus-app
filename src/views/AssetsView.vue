<template>
  <!-- Header -->
  <header>
    <BaseHeader title="ASSETS ACCOUNTING" />
  </header>
  <main class="min-h-screen w-full my-2">
    <!-- Sub Menu -->
    <div
      class="flex flex-col lg:flex-row lg:justify-between gap-y-2 md:gap-y-0 bg-white text-blue-900 tracking-wide px-2"
    >
      <div class="flex flex-col gap-0 sm:flex-row justify-between items-baseline sm:gap-x-8">
        <BaseOfficeDrop @select-option="handleChoice" />
        <!-- Search -->
        <div class="mt-2 relative rounded-full group">
          <input
            type="text"
            placeholder="Search asset"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            class="block w-full px-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-hidden"
          />

          <MagnifyingGlassIcon
            class="w-4 h-4 absolute inset-y-1.5 right-2 flex items-center pointer-events-none text-blue-800 group-focus-within:text-blue-800"
          />
        </div>
      </div>
      <BaseButtonAdd Link="/addAsset" label="Add Asset"></BaseButtonAdd>
    </div>

    <!-- show data -->
    <div v-if="isMobile">
      <AssetCard />
    </div>
    <div v-else>
      <AssetTable />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseOfficeDrop from '@/components/BaseOfficeDrop.vue'

import AssetTable from '@/components/assets/AssetTable.vue'
import AssetCard from '@/components/assets/AssetCard.vue'
import { useAssetStore } from '@/stores/assetsData'
import BaseButtonAdd from '@/components/BaseButtonAdd.vue'

import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const assetStore = useAssetStore()
const searchQuery = ref('')
// const resultSearch = ref([])
let debounceTimeout = null

// assetStore.fetchAsset()

// detect screen
const isMobile = ref(false)
const breakpoint = 1024
const checkMobile = () => {
  isMobile.value = window.innerWidth <= breakpoint
}

// select dropdown BU
function handleChoice(value) {
  checkMobile()
  console.log('selected value: ', value)
  if (value !== 0 && value !== null) {
    assetStore.getAssetByOffice(value)
  }
  if (value == 0 || value == null) {
    assetStore.fetchAsset()
  }
}

async function handleSearch() {
  checkMobile()
  if (searchQuery.value !== '') {
    await assetStore.searchAsset(searchQuery.value)
    console.log('searching for:', searchQuery.value)
    if (assetStore.assetAll === null) {
      alert('No asset found')
    }
    console.log('searching for:', searchQuery.value)
  } else {
    await assetStore.getAssetByOffice('0')
  }
}

watch(searchQuery, (newValue) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    handleSearch()
  }, 300)
  if (newValue === '') {
    assetStore.getAssetByOffice('0')
  }
})
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
