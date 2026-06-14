<template>
  <div class="mt-2">
    <!-- Table Header -->
    <table class="table-fixed w-full mb-2 [&_th]:py-6">
      <thead class="table-header-group sticky top-0">
        <tr class="border-b border-gray-300 bg-sky-100 text-nowrap">
          <th scope="col" class="text-left text-base pl-2 font-bold text-blue-900">User Name</th>
          <th scope="col" class="text-left text-base pl-2 font-bold text-blue-900">Job Title</th>
          <th scope="col" class="text-left text-base font-bold text-blue-900">Department</th>
          <th scope="col" class="text-left text-base font-bold text-blue-900">Office</th>
        </tr>
      </thead>
    </table>
    <!-- Table body data -->
    <div class="flex max-h-[calc(100vh-320px)] overflow-y-scroll">
      <table
        class="w-full table-fixed [&_td]:text-blue-900 [&_td]:py-4 [&_td]:px-2 [&_td]:border-b [&_td]:border-slate-300"
      >
        <tbody class="text-blue-900">
          <tr
            v-for="items in employeeStore.employee"
            :key="items.id"
            @click="router.push(`/editEmployee/${items.id}`)"
            class="table-row hover:shadow-2xl hover:bg-blue-50 hover:cursor-pointer text-nowrap"
          >
            <td class="table-cell font-bold">
              {{ items.fname + ' ' + (items.lname ? items.lname : '.') }}
            </td>
            <!-- <td class="table-cell">{{ employee.email }}</td> -->
            <td class="table-cell">{{ items.job_title ?? 'No department' }}</td>
            <td class="table-cell">{{ items.department_name?.name || 'No department' }}</td>
            <!-- <td class="m-2 p-2">{{ employee.office_id}}</td> -->
            <td class="table-cell m-2 p-2">{{ items.office_name?.name || 'No Office' }}</td>
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
const employeeStore = useEmployeeStore()
employeeStore.getAllEmployee()
// console.log(' get all employee ', employeeStore.employee)
</script>
