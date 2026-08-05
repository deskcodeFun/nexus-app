<template>
  <button
    class="w-fit rounded-full px-4 py-1 bg-blue-800 text-white hover:scale-102 hover:shadow-[2px_-2px_16px_2px_rgba(30,64,175,0.2)]"
  >
    <RouterLink :to="props.Link" class="flex flex-row">
      <PlusIcon class="h-4 w-4" />
      <p class="text-xs">{{ label }}</p>
    </RouterLink>
  </button>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid'

const props = defineProps({ Link: String, label: String })
</script>

<style lang="scss" scoped></style>
