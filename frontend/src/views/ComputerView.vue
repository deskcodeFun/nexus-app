<template>
  <!-- <div v-if="computer.isLoading" class="text-green-600 text-2xl text-center">Loading...</div> -->
  <div>
    <component :is="activeComponent"></component>
  </div>
</template>

<script setup>
// import { ref, computed, onMounted, onUnmounted } from 'vue'
import { computed } from 'vue'
import ComputerCard from '@/components/computers/ComputerCard.vue'
import ComputerTable from '@/components/computers/ComputerTable.vue'
import { useMonitorSize } from '@/composables/DeviceScreen'

const sizes = useMonitorSize()
const activeComponent = computed(() => {
  return sizes.isMobile.value ? ComputerCard : ComputerTable
})
</script>

<style lang="scss" scoped></style>
