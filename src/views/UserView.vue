<template>
  <!-- Header -->
  <div class="w-full justify-between flex flex-col bg-white sm:flex-row mx-auto pb-4 pt-2 mt-2">
    <p class="text-lg pl-2 text-blue-900">User Management</p>

    <RouterLink
      class="flex flex-row sm:mx-4 sm:px-2 py-1 rounded-full bg-blue-50/25 hover:text-white hover:bg-blue-800"
      to="/addUser"
    >
      <PlusIcon class="h-4 w-4" />
      <p class="ml-2 text-sm">Add User</p>
    </RouterLink>
  </div>

  <div class="w-full">
    <component :is="activeComponent"></component>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { PlusIcon } from '@heroicons/vue/20/solid'

import UserTable from '@/components/users/UserTable.vue'
import UserCard from '@/components/users/UserCard.vue'
import { useMonitorSize } from '@/composables/DeviceScreen'

// detect screen
const sizes = useMonitorSize()
const activeComponent = computed(() => {
  return sizes.isMobile.value ? UserCard : UserTable
})
// const router = useRouter()
</script>
