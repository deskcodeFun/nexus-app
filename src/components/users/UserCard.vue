<template>
  <div
    class="w-[280px] flex flex-wrap bg-white/75 border-1 border-gray-400 rounded-xl shadow-xl px-2 py-4 m-2"
  >
    <!-- show data -->
    <table
      class="[&_th]:text-left [&_th]:font-light [&_th]:text-xs [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-2"
    >
      <tbody>
        <tr>
          <th scope="col">User Name</th>
          <td>{{ staff.fname + ' ' + staff.lname }}</td>
        </tr>
        <tr>
          <th scope="col">Eamil</th>
          <td>{{ staff.email }}</td>
        </tr>
        <tr>
          <th scope="col">Department</th>
          <td>{{ staff.department }}</td>
        </tr>
        <tr>
          <th scope="col">Office</th>
          <td>{{ staff.office_id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({ staff: Object })
</script>
