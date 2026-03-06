<template>
  <!-- Header -->
  <BaseHeader title="ASSETS ACCOUNTING" />
  <!-- Sub Menu -->
  <div class="flex flex-row justify-between items-baseline bg-white text-blue-900 tracking-wide px-2">
    <BaseOfficeDrop @select-option="handleChoice" />
    <!-- Add new user button -->
    <div class="flex flex-row bg-white text-blue-900 tracking-wide sm:px-2 pb-4 gap-4">
      <RouterLink
        class="w-fit flex flex-row mx-2 px-2 py-1 rounded-full bg-blue-50/25 hover:text-white hover:bg-blue-800"
        to="/addEmployee">
        <div class="flex flex-row">
          <PlusIcon class="h-6 w-6" />
          <p>Add Asset</p>
        </div>
      </RouterLink>
    </div>
  </div>
  <!-- show data -->
  <main class=" px-2 ">
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
  import { PlusIcon } from '@heroicons/vue/20/solid'

  import AssetTable from '@/components/assets/AssetTable.vue';
  import AssetCard from '@/components/assets/AssetCard.vue';
  import { useAssetStore } from '@/stores/assetsData';

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

<style scoped>
  .catalog {
    margin-right: 1rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.75rem;
    border: none;
    font-size: 14px;
  }

  .catalog:hover {
    transform: scale(1.1);
    font-weight: bold;
    cursor: pointer;
    background-color: #E0F2FE;
  }

  .catalog:active {
    background-color: #E0F2FE;
    border: none;
  }


  .catalog:focus {
    background-color: #E0F2FE;
    border: none;
  }


</style>
