<template>
  <BaseHeader title="IT Service" :isShow="true" />

  <div>
    <div class="py-4 ml-2 flex flex-col md:flex-row md:w-fit">
      <p class="text-gray-800 mb-2 md:mb-0">Select Service :</p>
      <CatalogMenuService @changeView="updateView" />
    </div>

    <!-- <div class="h-full pb-60 overflow-scroll"> -->
    <div class="border border-gray-300 m-2 md:w-fit">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { shallowRef } from 'vue'

import BaseHeader from '../BaseHeader.vue'
import CatalogMenuService from './CatalogMenuService.vue'

import FormatService from './FormatService.vue'
import OtherService from './OtherService.vue'
import ChangeUserService from './ChangeUserService.vue'

const componentMap = {
  ChangeUserService,
  FormatService,
  OtherService,
}
const currentComponent = shallowRef()

const updateView = (viewName) => {
  currentComponent.value = componentMap[viewName]
}
</script>
