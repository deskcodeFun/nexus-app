<template>
  <div
    v-for="(user, index) in store.users"
    :key="index"
    @click="router.push(`/editUser/${index}`)"
    class="flex justify-center mx-2"
  >
    <BaseCard>
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
    </BaseCard>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { usersStore } from '@/stores/usersData'
import BaseCard from '../BaseCard.vue'

const router = useRouter()
const store = usersStore()
</script>
