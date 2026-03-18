<template>
  <BaseHeader title="ADD NEW ASSET" />
  <!-- <div class="w-auto h-24 flex flex-row text-base ">
    <p class="pt-6 ml-8 italic bg-red-50 text-red-800">
      Work in process: idea is add by catalog: computer , printer or User key pair of label-value
    </p>
  </div> -->
  <!-- catalog menu, computer, printer etc.. -->
  <div class="px-8 py-4 flex flex-row gap-4">
    <p class="font-semibold text-blue-800">Select Catalog :</p>
    <CatalogMenu @changeView="updateView" />
  </div>

  <main>
    <component :is="currentComponent" />
  </main>
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
