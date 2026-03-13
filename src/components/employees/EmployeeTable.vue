<template>
  <table class="w-full bg-white text-left">
    <thead>
      <tr class="border-b border-gray-400">
        <th class="m-2 p-2">User Name</th>
        <th class="m-2 p-2">Email</th>
        <th class="m-2 p-2">Department</th>
        <th class="m-2 p-2">Office</th>
        <!-- <th scope="col">Type</th> -->
      </tr>
    </thead>

    <tbody>
      <tr v-for="employee in store.employee" :key="employee.id" @click="router.push(`/editEmployee/${employee.id}`)"
        class="hover:scale-102 hover:bg-sky-100 hover:cursor-pointer m-2 p-2">
        <td>{{ employee.fname + ' ' + employee.lname }}</td>
        <td class="m-2 p-2">{{ employee.email }}</td>
        <td class="m-2 p-2">{{ employee.department }}</td>
        <!-- <td class="m-2 p-2">{{ employee.office_id}}</td> -->
        <td class="m-2 p-2">{{ employee.office_name.name }}</td>
        <!-- <td class="m-2 p-2">{{ staff.}}</td> -->

        <!-- <td>{{ item.catalog }}</td> -->
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useEmployeeStore } from '@/stores/employeeData.js'

  const router = useRouter()
  const store = useEmployeeStore()
  // store.getAllEmployee()




</script>
