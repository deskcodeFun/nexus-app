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
  <div class="flex flex-row flex-wrap justify-center sm:justify-start sm:ml-8">
    <div v-for="(user, index) in store.users" :key="index">
      <UserCard :currentUser="user" @click="router.push(`/editUser/${index}`)"></UserCard>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import UserCard from '@/components/users/UserCard.vue'
import { PlusIcon } from '@heroicons/vue/20/solid'
import { usersStore } from '@/stores/usersData'

const store = usersStore()
const router = useRouter(0)
console.log('users in usersStore', store.users)
</script>
