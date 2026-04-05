<template>
  <div class="max-h-screen  m-2 overflow-clip">
    <!-- Table Header -->
    <table class="table-fixed w-full [&_th]:p-4 [&_th]:text-left [&_th]:align-baseline ">
      <thead class="table-header-group sticky top-0">
        <tr class="border-b border-gray-300 bg-sky-100 text-nowrap">
          <th scope="col" class="text-left text-base p-2 font-bold text-blue-900">User Name</th>
          <th scope="col" class="text-left text-base p-2 font-bold text-blue-900">Email</th>
          <th scope="col" class="text-left text-base p-2 font-bold text-blue-900">Department</th>
          <th scope="col" class="text-left text-base p-2 font-bold text-blue-900">Office</th>
        </tr>
      </thead>
    </table>
    <!-- Table body data -->
    <div class="flex-1 max-h-screen overflow-y-scroll">
      <table
        class="w-full table-fixed [&_td]:text-blue-900 [&_td]:py-4 [&_td]:px-2 [&_td]:border-b [&_td]:border-slate-300">
        <tbody class="text-blue-900">
          <tr v-for="employee in store.employee" :key="employee.id" @click="router.push(`/editEmployee/${employee.id}`)"
            class="table-row hover:shadow-2xl hover:bg-blue-50 hover:cursor-pointer text-nowrap">
            <td class="table-cell font-bold">{{ employee.fname + ' ' + employee.lname }}</td>
            <td class="table-cell">{{ employee.email }}</td>
            <td class="table-cell">{{ employee.department }}</td>
            <!-- <td class="m-2 p-2">{{ employee.office_id}}</td> -->
            <td class="table-cell m-2 p-2">{{ employee.office_name.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useEmployeeStore } from '@/stores/employeeData.js'

  const router = useRouter()
  const store = useEmployeeStore()
  store.getAllEmployee()
</script>
