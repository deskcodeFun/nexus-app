<template>
  <div
    class="w-[300px] flex flex-row flex-wrap rounded-xl shadow-xl px-2 py-4 m-2 hover:transition-y-1 hover:scale-105"
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
            {{ props.currentUser.id }}
          </td>
        </tr>
        <tr>
          <th>User Name</th>
          <!-- <td>{{ props.currentUser.fname + ' ' + props.currentUser.lname }}</td> -->
          <td>{{ fullname }}</td>
        </tr>
        <tr>
          <th scope="col">Email</th>
          <td>{{ props.currentUser.email }}</td>
        </tr>
        <tr>
          <th scope="col">Department</th>
          <td>{{ props.currentUser.department }}</td>
        </tr>
        <tr>
          <th scope="col">Office</th>
          <td>{{ props.currentUser.office_id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ currentUser: Object })

const fullname = computed(() => {
  const fname = props.currentUser?.fname ?? ''
  const lname = props.currentUser?.lname ?? ''
  const shortLname = lname.length > 10 ? lname.substring(0, 10) + '...' : lname
  return (fname + ' ' + shortLname).trim()
})
</script>
