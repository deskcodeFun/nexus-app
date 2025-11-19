<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navOpen = ref(false)
</script>

<template>
  <div class="py-2 px-2 rounded-md">
    <div class="flex flex-row">
      <button @click="navOpen = !navOpen">
        <Bars3Icon
          :class="navOpen ? 'hidden' : ''"
          class="h-6 w-6 mt-1 rounded-full bg-gray-50/10 text-blue-900"
        />
        <!-- <XMarkIcon
          :class="navOpen ? '' : 'hidden'"
          class="h-6 w-6 rounded-full bg-gray-50/25 text-red-900"
        /> -->
      </button>
      <p class="ml-2 font-bold text-2xl text-blue-900 text-shadow-lg">Nexus Service</p>
    </div>
  </div>
  <Transition name="slide-fade">
    <Teleport to="body">
      <div v-if="navOpen" class="modal mt-16" @click.self="navOpen = false">
        <nav class="flex flex-col py-2 w-64 bg-sky-50">
          <button @click="navOpen = !navOpen" class="flex justify-end px-2">
            <XMarkIcon
              :class="navOpen ? '' : 'hidden'"
              class="h-6 w-6 rounded-full bg-gray-50/25 text-red-900 hover:bg-red-900 hover:text-white"
            />
          </button>
          <RouterLink
            to="/"
            class="px-8 text-lg rounded-xl m-1 p-1 hover:bg-gray-200 md:text-lg"
            active-class="bg-sky-200 px-2 rounded-lg text-xl hover:bg-sky-200 "
            @click="navOpen = !navOpen"
            >Home</RouterLink
          >
          <RouterLink
            to="/user"
            class="px-8 text-lg rounded-xl m-1 p-1 hover:bg-gray-200 md:text-lg"
            active-class="bg-sky-200 px-2 rounded-lg text-xl hover:bg-sky-200 "
            @click="navOpen = !navOpen"
            >User</RouterLink
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
