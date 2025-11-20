<template>
  <main>
    <!-- submenu filter dropdown select BU-->
    <div class="flex flex-col justify-between sm:justify-normal px-2 py-2">
      <p class="text-lg mt-1 mb-8 sm:text-2xl text-sky-900 text-shadow-lg">Assets Account</p>
      <div class="flex flex-row gap-2">
        <p>Select BU</p>
        <select class="text-sm rounded-md px-4 bg-white/50">
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
    <div class="my-8">
      <div @click="toggleVisible" class="sm:w-48 flex flex-row">
        <div v-if="visible">
          <ChevronDownIcon class="h-6 w-6 mt-1 bg-white/50" />
        </div>
        <div v-else>
          <ChevronUpIcon class="h-6 w-6 mt-1 bg-white/50" />
        </div>
        <p class="text-xl text-shadow-lg pl-4">Computer</p>
      </div>
      <div class="w-11/12 border-t border-blue-900 mt-4"></div>
      <Transition name="slide-down">
        <div v-if="visible">
          <ComputerView />
        </div>
      </Transition>
    </div>

    <!--Show printer  -->
    <div class="w-full my-8">
      <div @click="toggleVisible1" class="max-w-screen flex flex-row">
        <div v-if="visible1">
          <ChevronDownIcon class="h-6 w-6 mt-1 bg-white/50" />
        </div>
        <div v-else>
          <ChevronUpIcon class="h-6 w-6 mt-1 bg-white/50" />
        </div>
        <p class="text-xl text-shadow-lg pl-4">Printer</p>
      </div>
      <div class="w-11/12 border-t border-blue-900 mt-4"></div>
      <Transition name="slide-down">
        <div v-if="visible1">
          <PrinterView />
        </div>
      </Transition>
    </div>

    <!--Show other -->
    <div class="w-full my-8">
      <div @click="toggleVisible2" class="max-w-screen flex flex-row">
        <div v-if="visible2">
          <ChevronDownIcon class="h-6 w-6 mt-1 bg-white/50" />
        </div>
        <div v-else>
          <ChevronUpIcon class="h-6 w-6 mt-1 bg-white/50" />
        </div>
        <p class="text-xl text-shadow-lg pl-4">Other</p>
      </div>
      <div class="w-11/12 border-t border-blue-900 mt-4"></div>
      <Transition name="slide-down">
        <div v-if="visible2">
          <PrinterView />
        </div>
      </Transition>
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

const visible = ref(false)
const toggleVisible = () => {
  visible.value = !visible.value
  if (visible.value === true) {
    visible1.value = false
    visible2.value = false
  }
}
const visible1 = ref(false)
const toggleVisible1 = () => {
  visible1.value = !visible1.value
  if (visible1.value === true) {
    visible.value = false
    visible2.value = false
  }
}
const visible2 = ref(false)
const toggleVisible2 = () => {
  visible2.value = !visible2.value
  if (visible2.value === true) {
    visible.value = false
    visible1.value = false
  }
}
</script>
