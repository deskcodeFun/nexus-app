<template>
  <div
    class="w-[320px] flex flex-row flex-wrap bg-white/75 border-1 border-gray-400 rounded-xl shadow-xl px-2 py-4 m-2 hover:transition-y-1 hover:scale-105"
    @click="onClick"
  >
    <!-- show data -->
    <table
      class="[&_th]:text-left [&_th]:font-light [&_th]:text-xs [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-2"
    >
      <tbody>
        <tr>
          <th scope="col">User Name</th>
          <td>{{ props.staff.fname + ' ' + props.staff.lname }}</td>
        </tr>
        <tr>
          <th scope="col">Email</th>
          <td>{{ props.staff.email }}</td>
        </tr>
        <tr>
          <th scope="col">Department</th>
          <td>{{ props.staff.department }}</td>
        </tr>
        <tr>
          <th scope="col">Office</th>
          <td>{{ props.staff.office_id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({ staff: Object })
const router = useRouter()

const onClick = () => {
  console.log('id of card ', props.staff.id)
  // navigate to /edit/<id>
  const id = props.staff.id
  router.push(`editUser/${id}`)
}
</script>
