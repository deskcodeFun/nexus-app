<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
// import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navOpen = ref(false)
</script>

<template>
  <div class="w-full block pt-4 sm:flex sm:flex-row sm:justify-between">
    <p class="pt-1 pl-8 text-2xl text-blue-900 text-shadow-lg">
      Ne<span class="text-red-800">x</span>us Service
    </p>
    <!-- check width screnn for responsive  -->
    <div
      class="flex flex-row sm:px-4 mx-auto sm:mx-4 sm:justify-between sm:gap-2 mt-4 sm:mt-0 py-2"
    >
      <RouterLink
        to="/"
        class="px-4 py-1 hover:border-b hover:border-red-900"
        active-class="bg-blue-900 text-white rounded-lg   "
        @click="navOpen = !navOpen"
      >
        Home
      </RouterLink>

      <RouterLink
        to="/assets"
        class="px-4 py-1 hover:border-b hover:border-red-900"
        active-class="bg-blue-900 text-white rounded-lg   "
        @click="navOpen = !navOpen"
      >
        Assets
      </RouterLink>

      <RouterLink
        to="/user"
        class="px-4 py-1 hover:border-b hover:border-red-900"
        active-class="bg-blue-900 text-white rounded-lg   "
        @click="navOpen = !navOpen"
        >User</RouterLink
      >
      <RouterLink
        to="/services"
        class="px-4 py-1 hover:border-b hover:border-red-900"
        active-class="bg-blue-900 text-white rounded-lg   "
        @click="navOpen = !navOpen"
      >
        Services
      </RouterLink>
      <RouterLink
        to="/about"
        class="px-4 py-1 hover:border-b hover:border-red-900"
        active-class="bg-blue-900 text-white rounded-lg   "
        @click="navOpen = !navOpen"
      >
        About
      </RouterLink>
    </div>
  </div>
</template>
