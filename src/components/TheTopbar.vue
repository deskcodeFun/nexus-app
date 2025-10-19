<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navOpen = ref(false)
</script>

<template>
  <div class="pt-2 pb-4 px-2 rounded-md bg-blue-50/65">
    <div class="flex flex-row">
      <button @click="navOpen = !navOpen">
        <Bars3Icon
          :class="navOpen ? 'hidden' : ''"
          class="h-6 w-6 mt-1 bg-gray-50/25 text-blue-900"
        />
        <XMarkIcon :class="navOpen ? '' : 'hidden'" class="h-6 w-6 bg-gray-50/25 text-red-900" />
      </button>
      <p class="ml-2 font-bold text-2xl text-sky-900 text-shadow-lg">Nexus Service</p>
    </div>
  </div>
  <Transition name="slide-fade">
    <Teleport to="body">
      <div v-if="navOpen" class="modal mt-14 sm:ml-8" @click.self="navOpen = false">
        <nav class="flex flex-col py-4 w-64 bg-sky-50">
          <RouterLink
            to="/"
            class="px-8 text-lg rounded-xl m-1 p-1 hover:bg-gray-200 md:text-lg"
            active-class="bg-sky-200 px-2 rounded-lg text-xl hover:bg-sky-200 "
            @click="navOpen = !navOpen"
            >Home</RouterLink
          >
          <RouterLink
            to="/services"
            class="px-8 text-lg rounded-xl m-1 p-1 hover:bg-gray-200 md:text-lg"
            active-class="bg-sky-200 px-2 rounded-lg text-xl hover:bg-sky-200 "
            @click="navOpen = !navOpen"
          >
            Services
          </RouterLink>
          <RouterLink
            to="/about"
            class="px-8 text-lg rounded-xl m-1 p-1 hover:bg-gray-200 md:text-lg"
            active-class="bg-sky-200 px-2 rounded-lg  md:px-4 py-1 md:py-2hover:bg-sky-200"
            @click="navOpen = !navOpen"
          >
            About
          </RouterLink>
        </nav>
      </div>
    </Teleport>
  </Transition>
</template>
