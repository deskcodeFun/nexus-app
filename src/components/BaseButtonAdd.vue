<template>
  <div class="bg-white text-blue-900">
    <RouterLink
      :to="props.Link"
      class="w-fit flex flex-row rounded-full px-2 py-1 border border-blue-800 bg-sky-100 hover:text-white hover:bg-blue-800"
    >
      <PlusIcon class="h-4 w-4" />
      <p class="text-xs">{{ label }}</p>
    </RouterLink>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid'

const props = defineProps({ Link: String, label: String })
</script>

<style lang="scss" scoped></style>
