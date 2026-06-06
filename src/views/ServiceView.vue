<template>
  <!-- Header page and table -->
  <BaseHeader title="IT SERVICE" />
  <div class="w-fit flex flex-row mb-8 border-blue-800 gap-4 md:mx-0">
    <p class="text-lg mt-1 text-blue-900">Service Type</p>
    <BaseButtonAdd Link="/addComputerService" label="Computer Service" />
    <BaseButtonAdd Link="/addAsset" label="Assest" />
    <BaseButtonAdd Link="/addEmployee" label="Employee" />
  </div>

  <!-- show Service table -->
  <div
    class="relative w-full h-[clamp(300px,70dvh,600px)] mx-2 md:mx-0 grid grid-row-3 gap-8 sm:grid-cols-3 overflow-auto"
  >
    <!-- Drop zone 1 -->
    <div class="bg-sky-50/30">
      <!-- Header Table -->
      <div class="text-blue-800 border-b border-gray-400">
        <p class="text-center mb-2">Notify</p>
      </div>
      <!-- Content Notify -->
      <div
        @drop="onDrop($event, 1)"
        @dragenter.prevent
        @dragover.prevent
        class="overflow-y-auto overflow-auto w-full h-80 md:h-140 md:w-auto mx-1 md:mx-4 min-h-50px"
      >
        <!-- get item state notify from DB -->
        <div
          v-for="item in getList(1)"
          :key="item.id"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          <ServiceCard :item="item" class="bg-sky-50" />
        </div>
      </div>
    </div>
    <!-- Drop zone 2 -->
    <div class="bg-red-50/30">
      <!-- Header Table -->
      <div class="border-b border-gray-400">
        <p class="text-red-800 text-center mb-2">In Progress</p>
      </div>
      <!-- Content In Progress -->
      <div
        @drop="onDrop($event, 2)"
        @dragenter.prevent
        @dragover.prevent
        class="overflow-y-auto overflow-auto w-full h-80 md:h-140 md:w-auto mx-1 md:mx-4 min-h-50px"
      >
        <!-- class="overflow-y-scroll hide-scroll w-full h-80 md:h-140 md:w-auto mx-1 md:mx-4 min-h-50px" -->
        <div
          v-for="item in getList(2)"
          :key="item.id"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          <ServiceCard :item="item" class="bg-red-50 mx-4 md:mx-0" />
          <!-- {{ item.id + ' ' + item.detail + ' ' + item.state }} -->
        </div>
      </div>
    </div>
    <!-- Drop zone 3 -->
    <div class="bg-green-50/30">
      <!-- Header Table -->
      <div class="border-b border-gray-400">
        <p class="text-green-800 text-center mb-2">Done</p>
      </div>
      <!-- Content Done -->
      <div
        @drop="onDrop($event, 3)"
        @dragenter.prevent
        @dragover.prevent
        class="overflow-y-auto overflow-auto w-full h-80 md:h-140 md:w-auto mx-1 md:mx-4 min-h-50px"
      >
        <div
          v-for="item in getList(3)"
          :key="item.id"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          <ServiceCard :item="item" class="bg-green-50 mx-4 md:mx-0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { useServiceLog } from '@/stores/service_log.js'

import BaseHeader from '@/components/BaseHeader.vue'
import ServiceCard from '@/components/Services/ServiceCard.vue'

import BaseButtonAdd from '@/components/BaseButtonAdd.vue'

const store = useServiceLog()
store.fetchService()
// console.log('service log: ', store.serviceLog)

// store.serviceStore

const getList = (list) => {
  if (store.serviceLog) {
    // Check if store.computerLog is defined

    return store.serviceLog.filter((item) => item.state == list)
  }
  return [] // Return an empty array if undefined
}

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('itemID', item.id)
  // console.log('startDrag', item)
}
const onDrop = (event, list) => {
  const itemID = event.dataTransfer.getData('itemID')
  const item = store.serviceLog.find((item) => item.id == itemID)

  store.updateServiceState(list, itemID)
  // console.log('update state onDrop', store.computerLog)
  item.state = list
  // item.state = store.updateComputerLog(list, itemID)
}
</script>
