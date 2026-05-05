<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ServerStackIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  InformationCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const mobileNav = ref(null)
const navOpen = ref(false)

// detect screen
const isMobile = ref(true)
const breakpoint = 1024
const checkMobile = () => {
  isMobile.value = window.innerWidth <= breakpoint
}

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value
  navOpen.value = !navOpen.value
}
async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    // Clear the auth token from local storage
    // localStorage.removeItem('authToken')
    console.log('User signed out successfully.')
    if (error) throw error
    // Optionally, you can redirect the user to the sign-in page after signing out
    router.push('/sign-in')
  } catch (error) {
    console.error('Error signing out:', error.message)
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div class="w-full fixed flex justify-between py-2 pr-4 bg-[#dfc2b5]/25">
    <!-- Logo -->
    <div>
      <p class="pb-2 font-semibold pl-8 text-2xl text-blue-900 text-shadow-lg">
        Ne<span class="text-red-800">x</span>us Service
      </p>
    </div>
    <!-- show Desktop menu  -->
    <nav v-if="!isMobile" class="flex items-center justify-end">
      <RouterLink class="link" active-class="bg-sky-100 rounded-lg" :to="{ name: 'home' }">
        <HomeIcon class="h-6 w-6" />
        <p class="px-1 mt-1">Home</p>
      </RouterLink>

      <RouterLink class="link" active-class="bg-sky-100 rounded-lg" :to="{ name: 'assets' }">
        <ServerStackIcon class="h-6 w-6" />
        <p class="px-1 mt-1">Assets</p>
      </RouterLink>

      <RouterLink class="link" active-class="bg-sky-100 rounded-lg" :to="{ name: 'employee' }">
        <UsersIcon class="h-6 w-6" />
        <p class="px-1 mt-1">Employee</p>
      </RouterLink>

      <RouterLink class="link" active-class="bg-sky-100 rounded-lg" :to="{ name: 'service' }">
        <WrenchScrewdriverIcon class="h-6 w-6" />
        <p class="px-1 mt-1">Services</p>
      </RouterLink>

      <RouterLink class="link" active-class="bg-sky-100 rounded-lg" :to="{ name: 'about' }">
        <InformationCircleIcon class="h-6 w-6" />
        <p class="px-1 mt-1">about</p>
      </RouterLink>
      <RouterLink class="link" active-class="bg-sky-100 rounded-lg" :to="{ name: 'sign-in' }">
        <ArrowRightStartOnRectangleIcon class="h-6 w-6" />
        <p @click="signOut" class="px-1 mt-1">Log Out</p>
      </RouterLink>
    </nav>
    <!-- show Mobile menu icon -->
    <div v-else class="pr-4">
      <!-- toggle menu icon-->
      <button @click="toggleMobileNav">
        <Bars3Icon
          :class="navOpen ? 'hidden' : ''"
          class="h-6 w-6 mt-1 rounded-full text-blue-900 hover:cursor-pointer"
        />
        <XMarkIcon
          :class="navOpen ? '' : 'hidden'"
          class="h-6 w-6 rounded-full text-red-900 hover:cursor-pointer"
        />
      </button>
    </div>
    <Transition name="slide-right-to-left">
      <Teleport to="body">
        <div v-if="navOpen" class="modal-menu mt-18" @click.self="navOpen = false">
          <nav class="flex flex-col w-9/12 bg-amber-50/70 shadow-2xl text-blue-900">
            <RouterLink
              to="/"
              class="flex flex-row text-xl py-8 px-6 border-b border-neutral-400"
              active-class="bg-sky-100 rounded-lg text-blue-900"
              @click="navOpen = !navOpen"
            >
              <HomeIcon class="h-6 w-6 text-blue-800" />
              <p class="px-4">Home</p>
            </RouterLink>

            <RouterLink
              to="/assets"
              class="flex flex-row text-xl py-8 px-6 border-b border-neutral-400"
              active-class="bg-sky-50 rounded-lg text-blue-900"
              @click="navOpen = !navOpen"
            >
              <ServerStackIcon class="h-6 w-6 text-blue-800" />
              <p class="px-4">Assets</p>
            </RouterLink>
            <RouterLink
              to="/employee"
              class="flex flex-row text-xl py-8 px-6 border-b border-neutral-400"
              active-class="bg-sky-50 rounded-lg text-blue-900"
              @click="navOpen = !navOpen"
            >
              <UsersIcon class="h-6 w-6 text-blue-800" />
              <p class="px-4">Employee</p>
            </RouterLink>
            <RouterLink
              to="/services"
              class="flex flex-row text-xl py-8 px-6 border-b border-neutral-400"
              active-class="bg-sky-50 rounded-lg text-blue-900"
              @click="navOpen = !navOpen"
            >
              <WrenchScrewdriverIcon class="h-6 w-6 text-blue-800" />
              <p class="px-4">Services</p>
              Services
            </RouterLink>
            <RouterLink
              to="/about"
              class="flex flex-row text-xl py-8 px-6 border-b border-neutral-400"
              active-class="bg-sky-50 rounded-lg text-blue-900"
              @click="navOpen = !navOpen"
            >
              <InformationCircleIcon class="h-6 w-6 text-blue-800" />

              <p class="px-4">About</p>
            </RouterLink>
          </nav>
        </div>
      </Teleport>
    </Transition>
  </div>
</template>

<style scoped>
li {
  text-transform: uppercase;
  margin-left: 16px;
}

.link {
  font-size: 14px;
  font-weight: 500;
  color: #1e3a8a;
  transition: 0.05s ease all;
  padding: 8px 12px 8px 12px;
  border-radius: 0.5rem;
  display: flex;
  direction: row;

  &:hover {
    color: white;
    background-color: #1e3a8a;
  }
}
</style>
