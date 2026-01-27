<template>
  <!-- <div v-if="computer.isLoading" class="text-green-600 text-2xl text-center">Loading...</div> -->
  <!-- sub menu -->
  <div class="flex flex-row justify-between items-baseline bg-white text-blue-900 tracking-wide p-2">
    <BaseOfficeDrop @select-option="handleChoice" />
    <!-- Add new asset -->
    <div class="flex flex-row w-fit rounded-full text-blue-900 tracking-wide">
      <RouterLink class="flex flex-row px-2 py-1 rounded-full bg-blue-50/25 hover:text-white hover:bg-blue-800"
        to="/addComputer">
        <div class="flex flex-row">
          <PlusIcon class="h-4 w-4 mt-1" />
          <p>Add New</p>
        </div>
      </RouterLink>
    </div>
  </div>
  <!-- show data -->
  <main class="bg-white px-2">
    <component :is="activeComponent"></component>
  </main>
</template>

<script setup>
  import { computed } from 'vue'

  import { useComputerStore } from '@/stores/computerData'

  import ComputerCard from '@/components/computers/ComputerCard.vue'
  import ComputerTable from '@/components/computers/ComputerTable.vue'
  import BaseOfficeDrop from '@/components/BaseOfficeDrop.vue'
  import { useMonitorSize } from '@/composables/DeviceScreen'
  import { PlusIcon } from '@heroicons/vue/20/solid'

  const computerStores = useComputerStore()
  computerStores.getComputerByOffice('0')

  const sizes = useMonitorSize()

  function handleChoice(value) {
    console.log('select choice in ComputerView', value)
    if (value == 0 && value === null) {
      computerStores.getComputerByOffice(value)
      // computerStores.computer
    }
    if (value !== undefined) {
      computerStores.getComputerByOffice(value)
    }
  }
  const activeComponent = computed(() => {
    return sizes.isMobile.value ? ComputerCard : ComputerTable
  })
</script>
