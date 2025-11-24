<template>
  <div v-for="(user, index) in store.users" :key="index" @click="router.push(`/editUser/${index}`)">
    <div
      class="w-full sm:w-[300px] flex flex-row flex-wrap justify-center sm:flex-col rounded-xl shadow-xl px-2 py-4 m-2 hover:transition-y-1 hover:scale-105"
    >
      <!-- show data -->
      <table
        class="[&_th]:pt-1 [&_th]:text-left [&_th]:align-baseline [&_th]:font-light [&_th]:text-xs [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-2"
      >
        <tbody>
          <tr>
            <th>User ID</th>
            <!-- <td>{{ currentUser.fname + ' ' + currentUser.lname }}</td> -->
            <td>
              {{ user.id }}
            </td>
          </tr>
          <tr>
            <th>User Name</th>
            <!-- <td>{{ props.currentUser.fname + ' ' + props.currentUser.lname }}</td> -->
            <td>{{ user.fname + ' ' + user.lname.substring(0, 15) + '...' }}</td>
          </tr>
          <tr>
            <th scope="col">Email</th>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <th scope="col">Department</th>
            <td>{{ user.department }}</td>
          </tr>
          <tr>
            <th scope="col">Office</th>
            <td>{{ user.office_id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { usersStore } from '@/stores/usersData'

const router = useRouter()
const store = usersStore()
</script>
