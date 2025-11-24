<template>
  <!-- Header -->
  <div class="flex flex-row justify-between sm:justify-normal px-2 py-2">
    <p class="text-lg mt-1 sm:text-2xl text-sky-900 text-shadow-lg">User Management</p>
    <span>
      <RouterLink
        class="flex flex-row mt-2 mx-4 px-2 py-1 rounded-full bg-blue-50/25 hover:text-white hover:bg-blue-800"
        to="/addUser"
      >
        <PlusIcon class="h-5 w-5" />
        <p class="ml-2 text-sm">Add User</p>
      </RouterLink>
    </span>
  </div>

  <div class="w-11/12 py-4">
    <component :is="activeComponent"></component>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { PlusIcon } from '@heroicons/vue/20/solid'

import UserTable from '@/components/users/UserTable.vue'
import UserCard from '@/components/users/UserCard.vue'

// detect screen
const windowWidth = ref(window.innerWidth)
const onWidthChange = () => {
  windowWidth.value = window.innerWidth
}
onMounted(() => {
  window.addEventListener('resize', onWidthChange)
})
onUnmounted(() => {
  window.removeEventListener('resize', onWidthChange)
})
const activeComponent = computed(() => {
  return windowWidth.value <= 768 ? UserCard : UserTable
})
// const router = useRouter()
</script>
