<template>
  <!-- Header -->
  <div class="w-full justify-between flex flex-col sm:flex-row bg-white mx-auto pb-4 pt-2 mt-2">
    <p class="text-lg pl-2 py-4 sm:py-0 text-blue-900">User Management</p>

    <RouterLink
      class="w-fit flex flex-row mx-2 px-2 py-1 rounded-full bg-blue-50/25 hover:text-white hover:bg-blue-800"
      to="/addUser"
    >
      <div class="flex flex-row">
        <PlusIcon class="h-4 w-4" />
        <p class="ml-2 text-sm">Add User</p>
      </div>
    </RouterLink>
  </div>

  <div>
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
