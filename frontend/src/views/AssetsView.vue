<template>
  <!-- Header -->
  <header>
    <div class="flex flex-col bg-white py-16 px-2">
      <p class="text-lg tracking-widest text-blue-900">ASSETS ACCOUNTING</p>
    </div>
  </header>
  <!-- sub menu -->
  <!-- <div class="flex flex-row justify-between items-baseline bg-white text-blue-900 tracking-wide p-2">
    <div class="flex flex-row w-fit">
      <p class="pr-4">SELETECT BU</p>
      <select v-model="selectChoice" @change="handleChange" class="bg-blue-50/25 ml-4">
        <option :value="0">All</option>
        <option v-for="item in officeStores.offices" :key="item.id" :value="item.id">
          {{ item.short_name }}
        </option>
      </select>
    </div> -->
  <!-- Add new asset -->
  <!-- <div class="flex flex-row w-fit rounded-full text-blue-900 tracking-wide">
      <RouterLink class="flex flex-row px-2 py-1 rounded-full bg-blue-50/25 hover:text-white hover:bg-blue-800"
        to="/addComputer">
        <div class="flex flex-row">
          <PlusIcon class="h-4 w-4 mt-1" />
          <p>Add New</p>
        </div>
      </RouterLink>
    </div>
  </div>-->
  <!-- select a kind of assets -->
  <div class="py-4 bg-white flex flex-row">
    <button @click="toggleCom"
      class="px-2 py-1 rounded-xl hover:scale-105 hover:cursor-pointer focus:bg-sky-100 active:bg-sky-100">
      Computer
    </button>
    <button @click="togglePrinter"
      class="px-2 py-1 rounded-xl hover:scale-105 hover:cursor-pointer focus:bg-sky-100 active:bg-sky-100">
      Printer
    </button>
    <button @click="toggleOther"
      class="px-2 py-1 rounded-xl hover:scale-105 hover:cursor-pointer focus:bg-sky-100 active:bg-sky-100">
      Other
    </button>
  </div>

  <!--Show data  -->
  <main class="bg-white pt-4">

    <ComputerView v-if="showCom"></ComputerView>


    <PrinterView v-if="showPrinter"></PrinterView>

    <PrinterView v-if="showOther"></PrinterView>

  </main>
</template>

<script setup>
  import { ref } from 'vue'
  // import { useOfficeStore } from '@/stores/officeData'
  // import { useComputerStore } from '@/stores/computerData'

  import ComputerView from './ComputerView.vue'
  import PrinterView from './PrinterView.vue'

  // import { PlusIcon } from '@heroicons/vue/20/solid'

  // import BaseAccordion from '@/components/BaseAccordion.vue'

  // const officeStores = useOfficeStore()
  // const computerStore = useComputerStore()
  // const selectChoice = ref(0)

  const showCom = ref(true)
  const showPrinter = ref(false)
  const showOther = ref(false)
  const toggleCom = () => {
    showCom.value = true
    showPrinter.value = false
    showOther.value = false
  }
  const togglePrinter = () => {
    showCom.value = false
    showPrinter.value = true
    showOther.value = false
  }
  const toggleOther = () => {
    showCom.value = false
    showPrinter.value = false
    showOther.value = true
  }

  // watch(selectChoice, () => {
  //   if (selectChoice.value !== undefined && selectChoice.value !== 0) {
  //     console.log('computer choice :', selectChoice)
  //     computerStore.getComputerByOffice(selectChoice.value)
  //   } else {
  //     computerStore.getAllComputer()
  //   }
  // })
</script>
