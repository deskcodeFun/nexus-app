<template>
  <!-- <div v-if="computer.isLoading" class="text-green-600 text-2xl text-center">Loading...</div> -->
  <!-- sub menu -->
  <div class="flex flex-row justify-between items-baseline bg-white text-blue-900 tracking-wide p-2">
    <div class="flex flex-row w-fit">
      <p class="pr-4">SELETECT BU</p>
      <select v-model="selectChoice" @change="handleChange" class="bg-blue-50/25 ml-4">
        <option :value="0">All</option>
        <option v-for="item in officeStores.officeName" :key="item.id" :value="item.id">
          {{ item.short_name }}
        </option>
      </select>
    </div>
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
  import { ref, computed, watch, onMounted } from 'vue'

  import { useComputerStore } from '@/stores/computerData'
  import { useOfficeNameStore } from '@/stores/officeData.js'

  import ComputerCard from '@/components/computers/ComputerCard.vue'
  import ComputerTable from '@/components/computers/ComputerTable.vue'
  import { useMonitorSize } from '@/composables/DeviceScreen'
  import { PlusIcon } from '@heroicons/vue/20/solid'


  const selectChoice = ref(0)
  const computerStores = useComputerStore()
  const officeStores = useOfficeNameStore()
  const sizes = useMonitorSize()

  watch(selectChoice, () => {
    console.log('select choice in ComputerView', selectChoice.value)
    if (selectChoice.value !== undefined) {
      computerStores.getComputerByOffice(selectChoice.value)
      console.log('Data from getComputerByOffice ', computerStores.getComputerByOffice)
    } else {
      computerStores.getAllComputer()
    }
  })
  onMounted(() => {
    computerStores.getAllComputer()
    computerStores.getComputerByOffice(selectChoice.value)
  })
  const activeComponent = computed(() => {
    return sizes.isMobile.value ? ComputerCard : ComputerTable
  })
</script>
