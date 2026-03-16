<template>
  <div class="h-full max-h-180 flex flex-row flex-wrap justify-start overflow-y-auto">
    <div v-for="employee in store.employee" :key="employee.id" @click="router.push(`/editEmployee/${employee.id}`)"
      class="my-4 mx-2">
      <BaseCard>
        <!-- show data -->
        <table
          class="[&_th]:pt-1 [&_th]:text-left [&_th]:align-baseline [&_th]:font-light [&_th]:text-xs [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-2">
          <tbody>
            <tr>
              <th>User ID</th>
              <!-- <td>{{ currentUser.fname + ' ' + currentUser.lname }}</td> -->
              <td>
                {{ employee.id }}
              </td>
            </tr>
            <tr>
              <th>User Name</th>
              <td>
                {{ employee.fname + ' ' + employee.lname.substring(0, 1) + '.' }}
              </td>
            </tr>

            <tr>
              <th scope="col">Email</th>
              <td>{{ employee.email }}</td>
            </tr>
            <tr>
              <th scope="col">Department</th>
              <td>{{ employee.department }}</td>
            </tr>
            <tr>
              <th scope="col">Office</th>
              <td>{{ employee.office_name.name }}</td>
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
  const store = useEmployeeStore()


</script>
