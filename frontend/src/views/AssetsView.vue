<template>
  <!-- Header -->
  <BaseHeader title="ASSETS ACCOUNTING" />
  <div class="bg-white flex flex-row text-blue-900 tracking-wide">
    <button @click="toggleCom"
      class="px-2 py-1 rounded-xl hover:scale-105 hover:cursor-pointer focus:bg-sky-100 active:bg-sky-100">
      COMPUTER
    </button>
    <button @click="togglePrinter"
      class="px-2 py-1 rounded-xl hover:scale-105 hover:cursor-pointer focus:bg-sky-100 active:bg-sky-100">
      PRINTER
    </button>
    <button @click="toggleOther"
      class="px-2 py-1 rounded-xl hover:scale-105 hover:cursor-pointer focus:bg-sky-100 active:bg-sky-100">
      OTHER
    </button>
  </div>
  <!--Show data  -->
  <main class="bg-white pt-4">
    <ComputerView v-if="showCom"></ComputerView>
    <PrinterView v-if="showPrinter"></PrinterView>
    <OtherView v-if="showOther"></OtherView>
  </main>
</template>

<script setup>
  import { ref } from 'vue'
  import ComputerView from './ComputerView.vue'
  import PrinterView from './PrinterView.vue'
  import BaseHeader from '@/components/BaseHeader.vue'
  import OtherView from './OtherView.vue'

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
