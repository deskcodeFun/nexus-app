<template>
  <div v-for="staff in store.StaffByOffice" :key="staff.id" @click="router.push(`/editUser/${staff.id}`)"
    class="flex justify-center mx-2">
    <BaseCard>
      <!-- show data -->
      <table
        class="[&_th]:pt-1 [&_th]:text-left [&_th]:align-baseline [&_th]:font-light [&_th]:text-xs [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-2">
        <tbody>
          <tr>
            <th>User ID</th>
            <!-- <td>{{ currentUser.fname + ' ' + currentUser.lname }}</td> -->
            <td>
              {{ staff.id }}
            </td>
          </tr>
          <tr>
            <th>User Name</th>
            <td>
              {{ staff.fname + ' ' + staff.lname.substring(0, 1) + '.' }}
            </td>
          </tr>

          <tr>
            <th scope="col">Email</th>
            <td>{{ staff.email }}</td>
          </tr>
          <tr>
            <th scope="col">Department</th>
            <td>{{ staff.department }}</td>
          </tr>
          <tr>
            <th scope="col">Office</th>
            <td>{{ staff.office_name.name }}</td>
          </tr>
        </tbody>
      </table>
    </BaseCard>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStaffStore } from '@/stores/staff'
  import BaseCard from '../BaseCard.vue'

  const router = useRouter()
  const store = useStaffStore()
  const fullName = computed(() => {
    if (store.staff.lname.length() !== 0) {
      return store.staff.fname + ' ' + store.staff.lname.substring(0, 1)
    } else {
      return store.staff.fname
    }
  })
  console.log('fullname', fullName)
</script>
