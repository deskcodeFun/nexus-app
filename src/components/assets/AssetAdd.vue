<template>
  <BaseHeader title="ADD NEW ASSET" :isShow="true" />
  <!-- catalog menu, computer, printer etc.. -->
  <div class="px-8 py-4 flex flex-row gap-4">
    <p class="font-semibold text-blue-800">Select Catalog :</p>
    <CatalogMenu @changeView="updateView" />
  </div>

  <div class="h-full pb-60 overflow-scroll">
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { shallowRef } from 'vue'

import BaseHeader from '../BaseHeader.vue'
import CatalogMenu from './CatalogMenu.vue'
import ComputerAdd from './ComputerAdd.vue'
import PrinterAdd from './PrinterAdd.vue'
import OtherAdd from './OtherAdd.vue'

const componentMap = {
  ComputerAdd,
  PrinterAdd,
  OtherAdd,
}
const currentComponent = shallowRef()

const updateView = (viewName) => {
  currentComponent.value = componentMap[viewName]
}
</script>
