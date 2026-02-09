<script setup>
  import { RouterLink } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

  const scrolledNav = ref(null)
  const mobileNav = ref(null)
  const mobile = ref(null)
  const windowWidth = ref(null)
  const navOpen = ref(false)

  const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value
    navOpen.value = !navOpen.value
  }
  onMounted(() => {
    window.addEventListener('resize', checkScreen)
    window.addEventListener('scroll', updateScroll)
  })
  const checkScreen = () => {
    windowWidth.value = window.innerWidth
    if (windowWidth.value <= 931) {
      mobile.value = true
      return
    }
    mobile.value = false
    mobileNav.value = false
    return
  }
  const updateScroll = () => {
    const scrollPosition = window.scrollY
    if (scrollPosition > 50) {
      scrolledNav.value = true
      return
    }
    scrolledNav.value = false
    return
  }
</script>

<template>
  <div class="w-full z-10 flex sm:flex-row justify-between py-8 sm:pr-8">
    <!-- Logo -->
    <p class="pb-2 font-semibold pl-2 sm:pl-8 text-2xl text-blue-900 text-shadow-lg">
      Ne<span class="text-red-800">x</span>us Service
    </p>
    <!-- show menu item row  -->
    <ul v-show="!mobile" class="flex items-center justify-end ">
      <li>
        <RouterLink class="link" active-class="bg-sky-100 rounded-lg" :to="{ name: 'home' }">Home</RouterLink>
      </li>
      <li>
        <RouterLink class="link" active-class="bg-sky-100 rounded-lg" :to="{ name: 'assets' }">Assets</RouterLink>
      </li>
      <li>
        <RouterLink class="link" active-class="bg-sky-100 rounded-lg" :to="{ name: 'user' }">User</RouterLink>
      </li>
      <li>
        <RouterLink class="link" active-class="bg-sky-100 rounded-lg" :to="{ name: 'service' }">Services</RouterLink>
      </li>
      <li>
        <RouterLink class="link" active-class="bg-sky-100 rounded-lg" :to="{ name: 'about' }">About</RouterLink>
      </li>
    </ul>
    <!-- show icon menu -->
    <div v-show="mobile" class="pr-4">
      <button @click="toggleMobileNav">
        <Bars3Icon :class="navOpen ? 'hidden' : ''"
          class="h-6 w-6 mt-1 rounded-full text-blue-900 hover:cursor-pointer" />
        <XMarkIcon :class="navOpen ? '' : 'hidden'" class="h-6 w-6 rounded-full text-red-900 hover:cursor-pointer" />
      </button>
    </div>
    <Transition name="slide-right-to-left">
      <Teleport to="body">
        <div v-if="navOpen" class="modal-menu  mt-14" @click.self="navOpen = false">
          <nav class="flex flex-col w-fit px-4 pt-4 bg-gray-100 shadow-2xl text-blue-900">
            <RouterLink to="/" class="link" active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen">
              Home
            </RouterLink>

            <RouterLink to="/assets" class="link" active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen">
              Assets
            </RouterLink>


            <RouterLink to="/user" class="link" active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen">User</RouterLink>
            <RouterLink to="/services" class="link" active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen">
              Services
            </RouterLink>
            <RouterLink to="/about" class="link" active-class="bg-sky-50 rounded-lg  hover:bg-sky-100 text-blue-900"
              @click="navOpen = !navOpen">
              About
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

    &:hover {
      color: white;
      background-color: #1e3a8a;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    position: relative;
    top: 0;
    right: 24px;
    height: 100%;

    i {
      cursor: pointer;
      font-size: 24px;
      transition: 0.8s ease all;
    }
  }

  .icon-active {
    transform: rotate(90deg);
  }
</style>
