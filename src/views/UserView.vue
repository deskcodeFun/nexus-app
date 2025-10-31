<template>
  <!-- Header -->
  <div class="flex flex-row justify-between sm:justify-normal px-2 sm:pl-8 py-2">
    <p class="font-semibold sm:text-2xl text-sky-900 text-shadow-lg">User Management</p>
    <span>
      <RouterLink
        class="flex flex-row mt-1 mx-4 px-2 py-1 rounded-full bg-blue-50/25 hover:text-white hover:bg-blue-800"
        to="/addUser"
      >
        <PlusIcon class="h-5 w-5" />
        <p class="ml-2">Add User</p>
      </RouterLink>
    </span>
  </div>
  <div class="flex flex-row flex-wrap justify-center sm:justify-start sm:ml-8">
    <div v-for="(user, index) in store.users" :key="index">
      <UserCard :currentUser="user"></UserCard>
    </div>
  </div>
</template>

<script setup>
import UserCard from '@/components/users/UserCard.vue'
import { PlusIcon } from '@heroicons/vue/20/solid'
import { usersStore } from '@/stores/usersData'

const store = usersStore()
console.log('users in usersStore', store.users)
</script>
