<template>
  <!-- <div v-if="computer.isLoading" class="text-green-600 text-2xl text-center">Loading...</div> -->
  <!-- sub menu -->
  <div class="flex flex-row justify-between items-baseline bg-white text-blue-900 tracking-wide p-2">
    <BaseOfficeDrop @select-option="handleChoice" />
    <!-- Add new asset -->
    <div class="flex flex-row w-fit rounded-full text-blue-900 tracking-wide">
      <RouterLink class="flex flex-row px-2 py-1 rounded-full bg-blue-50/25 hover:text-white hover:bg-blue-800"
        to="/addPrinter">
        <div class="flex flex-row">
          <PlusIcon class="h-4 w-4 mt-1" />
          <p>Add New</p>
        </div>
      </RouterLink>
    </div>
  </div>
  <!-- show data -->
  <div>
    <component :is="activeComponent"></component>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  import { usePrinterStore } from '@/stores/printerData'

  import PrinterCard from '@/components/printers/PrinterCard.vue'
  import PrinterTable from '@/components/printers/PrinterTable.vue'
  import BaseOfficeDrop from '@/components/BaseOfficeDrop.vue'
  import { PlusIcon } from '@heroicons/vue/24/outline'
  // detect screen
  import { useMonitorSize } from '@/composables/DeviceScreen'

  const printerStores = usePrinterStore()
  printerStores.getPrinterByOffice('0')

  const sizes = useMonitorSize()

  function handleChoice(value) {
    console.log('select choice in ComputerView', value)
    if (value !== 0 && value !== null) {
      printerStores.getPrinterByOffice(value)
      // printerStores.computer
    }
    if (value == 0 || value == null) {
      printerStores.getPrinterByOffice('0')
    }
  }
  const activeComponent = computed(() => {
    return sizes.isMobile.value ? PrinterCard : PrinterTable
  })
</script>

<style lang="scss" scoped></style>
