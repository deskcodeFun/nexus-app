<template>
  <!-- Header -->
  <BaseHeader title="ASSETS ACCOUNTING" />
  <!-- Sub Menu -->
  <div class="flex flex-row justify-between bg-white text-blue-900 tracking-wide px-2">
    <BaseOfficeDrop @select-option="handleChoice" />
    <BaseButtonAdd Link="/addAsset" label="Add Asset"></BaseButtonAdd>
  </div>
  <!-- show data -->
  <main class="px-2 py-2 ">
    <div v-if="isMobile">
      <AssetCard />
    </div>
    <div v-else>
      <AssetTable />
    </div>
  </main>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import BaseHeader from '@/components/BaseHeader.vue'
  import BaseOfficeDrop from '@/components/BaseOfficeDrop.vue';


  import AssetTable from '@/components/assets/AssetTable.vue';
  import AssetCard from '@/components/assets/AssetCard.vue';
  import { useAssetStore } from '@/stores/assetsData';
  import BaseButtonAdd from '@/components/BaseButtonAdd.vue';

  const assetStore = useAssetStore()
  assetStore.getAssetByOffice('0')

  // detect screen
  const isMobile = ref(false)
  const breakpoint = 1024
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= breakpoint
  }

  // select dropdown BU
  function handleChoice(value) {
    checkMobile()
    if (value !== 0 && value !== null) {
      assetStore.getAssetByOffice(value)
    }
    if (value == 0 || value == null) {
      assetStore.getAssetByOffice('0')
    }
  }
  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })
</script>
