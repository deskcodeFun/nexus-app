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
    <BaseAccordion title="Computer">
      <ComputerView />
    </BaseAccordion>
    <BaseAccordion title="Printer">
      <PrinterView />
    </BaseAccordion>
    <BaseAccordion title="Other">
      <PrinterView />
    </BaseAccordion>
  </main>
</template>

<script setup>
import { useOfficeStore } from '@/stores/officeData'

import ComputerView from './ComputerView.vue'
import PrinterView from './PrinterView.vue'

import BaseAccordion from '@/components/BaseAccordion.vue'

const officeStores = useOfficeStore()
console.log(officeStores.offices)
</script>
