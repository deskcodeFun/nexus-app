<template>
  <div class="bg-white pl-8">
    <button @click="router.back()"
      class="flex items-center justify-center text-black bg-gray-100 border-1 border-gray-300 hover:bg-gray-300 hover:scale-110 hover:text-blue-900 py-1 px-4 rounded-xl">
      <ChevronDoubleLeftIcon class="h-4 w-4 mr-1" />
      <span> Back </span>
    </button>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { ChevronDoubleLeftIcon } from '@heroicons/vue/24/outline'

  const router = useRouter()
</script>
