<template>
  <div
    class="w-[300px] flex flex-row flex-wrap bg-white/65 border-1 border-gray-400 rounded-xl shadow-xl px-2 py-4 m-2 hover:transition-y-1 hover:scale-105"
  >
    <!-- show data -->
    <table
      class="[&_th]:pt-1 [&_th]:text-left [&_th]:align-baseline [&_th]:font-light [&_th]:text-xs [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-2"
    >
      <tbody>
        <tr>
          <th>Asset ID</th>
          <!-- <td>{{ currentUser.fname + ' ' + currentUser.lname }}</td> -->
          <td>
            {{ props.currentAsset.id }}
          </td>
        </tr>
        <tr>
          <th>User Name</th>
          <!-- <td>{{ props.currentAsset.fname + ' ' + props.currentAsset.lname }}</td> -->
          <td>{{ props.currentAsset.user_name }}</td>
        </tr>
        <tr>
          <th scope="col">Type</th>
          <td>{{ props.currentAsset.catalog }}</td>
        </tr>
        <tr>
          <th scope="col">Office</th>
          <td>{{ props.currentAsset.office_name }}</td>
        </tr>
        <tr>
          <th scope="col">Asset Tag</th>
          <td>{{ props.currentAsset.asset_tag }}</td>
        </tr>
        <tr>
          <th scope="col">Serial</th>
          <td>{{ props.currentAsset.serial }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({ currentAsset: Object })
console.log('currentComputer', props.currentComputer)
</script>

<style lang="scss" scoped></style>
