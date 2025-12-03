<template>
  <!-- Header -->
  <header>
    <div class="flex flex-col justify-between bg-white sm:justify-normal py-16 px-2">
      <p class="text-lg tracking-widest text-blue-900">ASSETS ACCOUNTING</p>
    </div>
  </header>
  <!-- sub menu -->
  <div class="flex flex-col sm:flex-row items-center bg-white text-blue-900 tracking-wide px-2 pb-4 gap-8">
    <div class="flex flex-row gap-4 ">
      <p>SELETECT BU</p>
      <select class="bg-gray-100">
        <option value="0">All</option>
        <option
          v-for="officeStore in officeStores.offices"
          :key="officeStore.id"
          :value="officeStore.id"
        >
          {{ officeStore.short_name }}
        </option>
      </select>
    </div>
    <div class="flex flex-row  gap-4 hover:cursor-pointer">
      <button @click="toggleCom" class="px-4 py-1 rounded-xl
               hover:scale-105 focus:bg-sky-100
               active:bg-sky-100" >Computer</button>
      <button @click="togglePrinter" class="px-2 py-1 rounded-xl
               hover:scale-105 focus:bg-sky-100
               active:bg-sky-100">Printer</button>
      <button @click="toggleOther" class="px-2 py-1 rounded-xl
               hover:scale-105 focus:bg-sky-100
               active:bg-sky-100">Other</button>
    </div>
  </div>
  <!--Show data  -->
  <main class="bg-white pt-4">
    <Transition name="slide-down">
      <ComputerView v-if="showCom"></ComputerView>
    </Transition>
    <Transition name="slide-down">
      <PrinterView v-if="showPrinter"></PrinterView>
    </Transition>
    <Transition name="slide-down">
      <PrinterView v-if="showOther"></PrinterView>
    </Transition>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useOfficeStore } from '@/stores/officeData'

import ComputerView from './ComputerView.vue'
import PrinterView from './PrinterView.vue'

// import BaseAccordion from '@/components/BaseAccordion.vue'

const officeStores = useOfficeStore()
console.log(officeStores.offices)

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
</script>
