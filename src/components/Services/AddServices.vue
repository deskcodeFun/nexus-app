<template>
  <BaseHeader title="IT Service" :isShow="true" />

  <div>
    <div class="w-fit py-4 flex flex-row">
      <p class="font-semibold text-blue-800">Select Service :</p>
      <CatalogMenuService @changeView="updateView" />
    </div>

    <!-- <div class="h-full pb-60 overflow-scroll"> -->
    <div class="">
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
