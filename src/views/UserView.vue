<template>
  <header class="flex flex-row gap-8 sm:pl-8 py-2">
    <p class="font-semibold text-2xl text-sky-900 text-shadow-lg">User Management</p>
    <router-link
      to="/addUser"
      class="flex flex-row p-2 text-blue-900 hover:bg-blue-900 hover:text-white"
    >
      <PlusIcon class="h-6 w-6 mr-0.5" />
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

import { PlusIcon } from '@heroicons/vue/20/solid'

const staffs = reactive(mockStaff)
</script>
