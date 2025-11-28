<template>
  <main class="bg-white">
    <!-- submenu filter dropdown select BU-->
    <div class="flex flex-col justify-between bg-white sm:justify-normal px-2 py-2">
      <p class="text-lg mt-1 mb-4 text-blue-900">Assets Account</p>
      <div class="flex flex-row mb-4 gap-4">
        <p>Select BU</p>
        <select class="text-sm bg-gray-50">
          <!-- <option value="" disabled>Select BU</option> -->
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
    </div>

    <!--Show computer  -->
    <div class="flex flex-row px-2 gap-4 hover:cursor-pointer">
      <p @click="toggleCom" class="hover:border-b">Computer</p>
      <p @click="togglePrinter" class="hover:border-b">Printer</p>
      <p @click="toggleOther" class="hover:border-b">Other</p>
    </div>
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

const showCom = ref(false)
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
