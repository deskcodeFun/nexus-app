<template>
  <table class="w-full bg-white text-left">
    <thead>
      <tr class="border-b border-gray-400">
        <th class="text-center">User ID</th>
        <th class="m-2 p-2">User Name</th>
        <th class="m-2 p-2">Email</th>
        <th class="m-2 p-2">Department</th>
        <th class="m-2 p-2">Office</th>
        <!-- <th scope="col">Type</th> -->
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) in store.users" :key="index">
        <td class="text-center m-2 p-2">{{ item.id }}</td>
        <td
          @click="router.push(`/editUser/${index}`)"
          class="hover:scale-102 hover:bg-sky-100 hover:cursor-pointer m-2 p-2"
        >
          {{ item.fname + ' ' + item.lname }}
        </td>
        <td class="m-2 p-2">{{ item.email }}</td>
        <td class="m-2 p-2">{{ item.department }}</td>
        <td class="m-2 p-2">{{ item.office_id }}</td>
        <!-- <td>{{ item.catalog }}</td> -->
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { usersStore } from '@/stores/usersData'

const router = useRouter()
const store = usersStore()
</script>

<style lang="scss" scoped></style>
