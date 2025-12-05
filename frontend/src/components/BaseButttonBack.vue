<template>
  <button
    @click="router.back()"
    type="button"
    class="flex items-center justify-center bg-gray-50 text-black hover:bg-gray-200 hover:scale-102 hover:text-blue-900 py-1 px-4 mt-8 rounded-xl"
  >
    <ChevronDoubleLeftIcon class="h-4 w-4 mr-1" />
    <span> Back </span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ChevronDoubleLeftIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
</script>
