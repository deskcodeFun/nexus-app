<template>
  <div class="h-full max-h-180 flex flex-row flex-wrap justify-start overflow-y-auto">
    <div
      v-for="items in employeeStore.employee"
      :key="items.id"
      @click="router.push(`/editEmployee/${items.id}`)"
      class="my-4 mx-4"
    >
      <BaseCard>
        <!-- show data -->
        <table
          class="table-auto h-fit my-4 [&_th]:pt-1 [&_th]:text-left [&_tr]:align-baseline [&_tr]:h-6 [&_th]:font-light [&_th]:text-xs [$_td]:text-base [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-4"
        >
          <tbody>
            <!-- <tr>
              <th>User ID</th>
              <td>
                {{ employee.id }}
              </td>
            </tr> -->
            <tr>
              <th>User Name</th>
              <td class="font-bold">
                {{ items.fname + ' ' + items.lname.substring(0, 1) + '.' }}
              </td>
            </tr>
            <tr>
              <th>Job Title</th>
              <td class="font-bold">
                {{ items.job_title ?? 'No Title' }}
              </td>
            </tr>
            <tr>
              <th scope="col">Department</th>
              <td>{{ items.department_name?.name || 'No department' }}</td>
            </tr>
            <tr>
              <th scope="col">Office</th>
              <td>{{ items.office_name?.short_name || 'No office' }}</td>
            </tr>
          </tbody>
        </table>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useEmployeeStore } from '@/stores/employeeData'
import BaseCard from '../BaseCard.vue'

const router = useRouter()
const employeeStore = useEmployeeStore()
employeeStore.getAllEmployee()
</script>
