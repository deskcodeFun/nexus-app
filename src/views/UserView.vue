<template>
  <header class="flex flex-row justify-between p-4 sm:pl-8 py-2">
    <p class="font-semibold sm:text-xl text-sky-900 text-shadow-lg">User Management</p>
    <router-link
      to="/addUser"
      class="flex flex-row mt-1 ml-4 px-2 rounded-sm border-1 border-blue-800 text-blue-900 font-semibold bg-white/25 hover:bg-blue-900 hover:text-white"
    >
      <UserPlusIcon class="h-6 w-5 mr-1" />
      Add User
    </router-link>
  </header>
  <main>
    <div class="flex flex-row flex-wrap justify-center sm:justify-start sm:ml-8">
      <UserCard v-for="(staff, index) in staffs" :key="index" :staff="staff" />
    </div>
  </main>
</template>

<script setup>
import { reactive } from 'vue'

import { mockStaff } from '@/dataMockup/staff'
import UserCard from '@/components/users/UserCard.vue'

import { UserPlusIcon } from '@heroicons/vue/20/solid'

const staffs = reactive(mockStaff)
</script>
