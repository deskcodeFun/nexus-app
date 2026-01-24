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
      <tr v-for="staff in store.staff" :key="staff.id" @click="router.push(`/editUser/${staff.id}`)"
        class="hover:scale-102 hover:bg-sky-100 hover:cursor-pointer m-2 p-2">
        <td class="text-center m-2 p-2">{{ staff.id }}</td>
        <td>{{ staff.fname + ' ' + staff.lname }}</td>
        <td class="m-2 p-2">{{ staff.email }}</td>
        <td class="m-2 p-2">{{ staff.department }}</td>
        <!-- <td class="m-2 p-2">{{ staff.office_id}}</td> -->
        <td class="m-2 p-2">{{ staff.office_name.name }}</td>
        <!-- <td class="m-2 p-2">{{ staff.}}</td> -->

        <!-- <td>{{ item.catalog }}</td> -->
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useStaffStore } from '@/stores/staff.js'

  const router = useRouter()
  const store = useStaffStore()



</script>
