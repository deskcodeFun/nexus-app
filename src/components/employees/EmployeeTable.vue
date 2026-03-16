<template>
  <div class="h-full max-h-150 flex overflow-y-scroll overflow-x-hidden">
    <table
      class="table-auto h-fit w-full [&_th]:p-4 [&_th]:text-left [&_th]:align-baseline [&_td]:text-blue-900 [&_td]:py-3 [&_td]:px-4 [&_td]:border-b [&_td]:border-slate-300">
      <thead class="table-header-group sticky top-0">
        <tr class="border-b border-gray-300 bg-sky-100 text-nowrap">
          <th class="m-2 p-2">User Name</th>
          <th class="m-2 p-2">Email</th>
          <th class="m-2 p-2">Department</th>
          <th class="m-2 p-2">Office</th>
        </tr>
      </thead>

      <tbody class="p-4 text-blue-900 overflow-hidden">
        <tr v-for="employee in store.employee" :key="employee.id" @click="router.push(`/editEmployee/${employee.id}`)"
          class="table-row hover:shadow-2xl hover:bg-blue-50  hover:cursor-pointer text-nowrap">
          <td class="table-cell font-bold">{{ employee.fname + ' ' + employee.lname }}</td>
          <td class="table-cell">{{ employee.email }}</td>
          <td class="table-cell">{{ employee.department }}</td>
          <!-- <td class="m-2 p-2">{{ employee.office_id}}</td> -->
          <td class="table-cell m-2 p-2">{{ employee.office_name.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useEmployeeStore } from '@/stores/employeeData.js'

  const router = useRouter()
  const store = useEmployeeStore()
  // store.getAllEmployee()
</script>
