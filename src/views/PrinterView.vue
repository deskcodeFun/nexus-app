<template>
  <!-- <div v-if="computer.isLoading" class="text-green-600 text-2xl text-center">Loading...</div> -->
  <div>
    <component :is="activeComponent"></component>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import PrinterCard from '@/components/printers/PrinterCard.vue'
import PrinterTable from '@/components/printers/PrinterTable.vue'
// detect screen
import { useMonitorSize } from '@/composables/DeviceScreen'

const sizes = useMonitorSize()
const activeComponent = computed(() => {
  return sizes.isMobile.value ? PrinterCard : PrinterTable
})
</script>

<style lang="scss" scoped></style>
