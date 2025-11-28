<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'

const navOpen = ref(false)
const visible = ref(false)
const toggleVisible = () => {
  visible.value = !visible.value
}
</script>

<template>
  <div>
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
      <p class="font-bold text-3xl m-4 w-fit text-blue-900 text-shadow-lg">
        Ne<span class="text-red-800">x</span>us Service
      </p>
    </div>
  </div>
  <Transition name="slide-fade">
    <Teleport to="body">
      <div v-if="navOpen" class="modal mt-16" @click.self="navOpen = false">
        <nav class="flex flex-col w-2/12 bg-gray-800 text-white">
          <RouterLink
            to="/"
            class="px-2 rounded-xl m-1 py-2 mx-2 hover:bg-gray-200 hover:text-blue-900"
            active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
            @click="navOpen = !navOpen"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/assets"
            class="px-2 mr-4 rounded-xl m-1 py-2 hover:bg-gray-200 hover:text-blue-900"
            active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
          >
            <p class="flex flex-row justify-between border-gray-400">
              Assets
              <span @click="toggleVisible">
                <div v-if="visible">
                  <ChevronDownIcon class="h-4 w-4 mt-1 bg-gray-400/50 hover:cursor-pointer" />
                </div>
                <div v-else>
                  <ChevronUpIcon class="h-4 w-4 mt-1 bg-gray-400/50 hover:cursor-pointer" />
                </div>
              </span>
            </p>
          </RouterLink>

          <div v-if="visible" class="w-11/12 mx-6 flex flex-col flex-wrap py-2 text-sm">
            <RouterLink
              to="/npa"
              class="px-2 mr-4 rounded-xl m-1 py-2 hover:bg-gray-200 hover:text-blue-900"
              active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen"
              >NPA
            </RouterLink>
            <RouterLink
              to="/npc"
              class="px-2 mr-4 rounded-xl m-1 py-2 mx-2 hover:bg-gray-200 hover:text-blue-900"
              active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen"
              >NPC
            </RouterLink>
            <RouterLink
              to="/npm"
              class="px-2 mr-4 rounded-xl m-1 py-2 mx-2 hover:bg-gray-200 hover:text-blue-900"
              active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen"
              >NPM
            </RouterLink>
            <RouterLink
              to="/nra"
              class="px-2 mr-4 rounded-xl m-1 py-2 mx-2 hover:bg-gray-200 hover:text-blue-900"
              active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen"
              >NRA
            </RouterLink>
            <RouterLink
              to="/nrt"
              class="px-2 mr-4 rounded-xl m-1 py-2 mx-2 hover:bg-gray-200 hover:text-blue-900"
              active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen"
              >NRT
            </RouterLink>
            <RouterLink
              to="/oho"
              class="px-2 mr-4 rounded-xl m-1 py-2 mx-2 hover:bg-gray-200 hover:text-blue-900"
              active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen"
              >OHO
            </RouterLink>
            <RouterLink
              to="/conspire"
              class="px-2 mr-4 rounded-xl m-1 py-2 mx-2 hover:bg-gray-200 hover:text-blue-900"
              active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen"
              >Conspire
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
