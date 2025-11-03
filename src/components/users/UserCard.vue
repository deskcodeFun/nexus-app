<template>
  <div
    class="w-[300px] flex flex-row flex-wrap bg-white/65 border-1 border-gray-400 rounded-xl shadow-xl px-2 py-4 m-2 hover:transition-y-1 hover:scale-105"
    @click="router.push(`/editUser/${props.currentUser.id}`)"
  >
    <!-- show data -->
    <table
      class="[&_th]:pt-1 [&_th]:text-left [&_th]:align-baseline [&_th]:font-light [&_th]:text-xs [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-2"
    >
      <tbody>
        <tr>
          <th>User Name</th>
          <!-- <td>{{ currentUser.fname + ' ' + currentUser.lname }}</td> -->
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
  <!-- </div> -->
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ currentUser: Object })

const router = useRouter()
const fullname = computed(() => {
  return props.currentUser.fname + ' ' + props.currentUser.lname
})

// const onClick = () => {
//   console.log('id of card ', props.staff.id)
//   // navigate to /edit/<id>
//   const id = props.staff.id - 1
//   router.push(`/editUser/${id}`)
// }
</script>
