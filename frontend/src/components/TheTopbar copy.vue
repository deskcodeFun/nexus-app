<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navOpen = ref(false)
</script>

<template>
  <div class="flex flex-row mx-4">
    <button @click="navOpen = !navOpen">
      <Bars3Icon
        :class="navOpen ? 'hidden' : ''"
        class="h-6 w-6 mt-1 rounded-full bg-gray-50/50 text-blue-900 hover:cursor-pointer"
      />
      <XMarkIcon
        :class="navOpen ? '' : 'hidden'"
        class="h-6 w-6 rounded-full bg-gray-50/25 text-red-900 hover:cursor-pointer"
      />
    </button>
    <p class="font-bold text-2xl m-4 w-fit text-blue-900 text-shadow-lg">
      Ne<span class="text-red-800">x</span>us Service
    </p>
  </div>

  <Transition name="slide-fade">
    <Teleport to="body">
      <div v-if="navOpen" class="modal mt-16" @click.self="navOpen = false">
        <nav class="flex flex-col w-fit px-4 pt-4 bg-gray-100 shadow-2xl text-blue-900">
          <RouterLink
            to="/"
            class="px-2 rounded-xl m-1 py-2 mx-2 hover:bg-gray-200 hover:text-blue-900"
            active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
            @click="navOpen = !navOpen"
          >
            Home
          </RouterLink>
          <div
            class="flex flex-row justify-between"
            active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
          >
            <RouterLink
              to="/assets"
              class="w-full px-2 rounded-xl m-1 py-2 hover:bg-gray-200 hover:text-blue-900"
              active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen"
            >
              Assets
            </RouterLink>
          </div>

          <RouterLink
            to="/user"
            class="px-2 rounded-xl m-1 py-2 mx-2 hover:bg-gray-200 hover:text-blue-900"
            active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
            @click="navOpen = !navOpen"
            >User</RouterLink
          >
          <RouterLink
            to="/services"
            class="px-2 rounded-xl m-1 py-2 mx-2 hover:bg-gray-200 hover:text-blue-900"
            active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
            @click="navOpen = !navOpen"
          >
            Services
          </RouterLink>
          <RouterLink
            to="/about"
            class="px-2 rounded-xl m-1 py-2 mx-2 hover:bg-gray-200 hover:text-blue-900"
            active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
            @click="navOpen = !navOpen"
          >
            About
          </RouterLink>
        </nav>
      </div>
    </Teleport>
  </Transition>
</template>
