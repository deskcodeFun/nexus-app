<template>
  <main class="mx-8">
    <!-- submenu filter dropdown select BU-->
    <div class="flex flex-row py-8 gap-8">
      <p class="text-lg">Select BU</p>
      <div class="flex flex-row">
        <!-- <p>Filter by :</p> -->
        <!-- <select class="px-8 py-1 w-fit border-1" @change="handleChange" v-model="officeFilter"> -->
        <select class="text-sm rounded-md px-4 bg-white/80">
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
    <div class="w-full my-8">
      <div @click="toggleVisible" class="w-48 flex flex-row justify-between">
        <p class="text-xl text-shadow-lg px-4">Computer</p>
        <div v-if="visible">
          <ChevronDownIcon class="h-6 w-6 mt-1 bg-white" />
        </div>
        <div v-else>
          <ChevronUpIcon class="h-6 w-6 mt-1 text-gray-500" />
        </div>
      </div>
      <div v-if="visible">
        <ComputerView />
      </div>
    </div>

    <!--Show printer  -->
    <div class="w-full my-8">
      <div @click="toggleVisible1" class="w-48 justify-between flex flex-row gap-4">
        <p class="text-xl text-shadow-lg px-4">Printer</p>
        <div v-if="visible1">
          <ChevronDownIcon class="h-6 w-6 mt-1 bg-white" />
        </div>
        <div v-else>
          <ChevronUpIcon class="h-6 w-6 mt-1 text-gray-500" />
        </div>
      </div>
      <div v-if="visible1">
        <PrinterView />
      </div>
    </div>

    <!--Show other -->
    <div class="w-full my-8">
      <div @click="toggleVisible2" class="w-48 justify-between flex flex-row gap-4">
        <p class="text-xl text-shadow-lg px-4">Other</p>
        <div v-if="visible2">
          <ChevronDownIcon class="h-6 w-6 mt-1 bg-white" />
        </div>
        <div v-else>
          <ChevronUpIcon class="h-6 w-6 mt-1 text-gray-500" />
        </div>
      </div>
      <div v-if="visible2">
        <PrinterView />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useOfficeStore } from '@/stores/officeData'

import ComputerView from './ComputerView.vue'
import PrinterView from './PrinterView.vue'

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'

const officeStores = useOfficeStore()
console.log(officeStores.offices)

const visible1 = ref(false)
const toggleVisible1 = () => {
  visible1.value = !visible1.value
  console.log(toggleVisible1)
}
const visible = ref(false)
const toggleVisible = () => {
  visible.value = !visible.value
  console.log(toggleVisible)
}
const visible2 = ref(false)
const toggleVisible2 = () => {
  visible2.value = !visible2.value
  console.log(toggleVisible2)
}
</script>

<style scoped></style>
