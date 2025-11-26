<template>
  <!-- show data -->
  <div class="w-full flex justify-center">
    <table
      class="w-11/12 bg-white/30 [&_th]:p-2 [&_th]:text-left [&_th]:align-baseline [&_td]:py-2 [&_th]:text-md [&_th]:text-gray-600 [&_td]:text-blue-900 [&_td]:px-2"
    >
      <thead>
        <tr class="border-b border-gray-400">
          <th>User ID</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Office</th>
          <!-- <th scope="col">Type</th> -->
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in store.users" :key="index">
          <td>{{ item.id }}</td>
          <td
            @click="router.push(`/editUser/${index}`)"
            class="hover:scale-102 hover:bg-sky-100 hover:pointer"
          >
            {{ item.fname + ' ' + item.lname }}
          </td>
          <td>{{ item.email }}</td>
          <td>{{ item.department }}</td>
          <td>{{ item.office_id }}</td>
          <!-- <td>{{ item.catalog }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { usersStore } from '@/stores/usersData'

const router = useRouter()
const store = usersStore()
</script>

<style lang="scss" scoped></style>
