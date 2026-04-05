<template>
  <div class="bg-white ">
    <button @click="router.back()"
      class="p-1 flex justify-center text-blue-900 font-bold bg-blue-100 hover:bg-blue-900 hover:text-blue-100 rounded-full">
      <ChevronDoubleLeftIcon class="h-4 w-4" />
      <!-- <span> Back </span> -->
    </button>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { ChevronDoubleLeftIcon } from '@heroicons/vue/24/outline'

  const router = useRouter()
</script>
