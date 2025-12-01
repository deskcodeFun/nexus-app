<template>
  <!-- <div
    class="w-[300px] flex flex-row flex-wrap bg-white/65 border-1 border-gray-400 rounded-xl shadow-xl px-2 py-4 m-2 hover:transition-y-1 hover:scale-105"
  > -->
  <!-- show data -->
  <div class="w-full flex justify-center">
    <table
      class="w-11/12 bg-white/30 [&_th]:p-2 [&_th]:text-left [&_th]:align-baseline [&_td]:py-2 [&_th]:text-md [&_th]:text-gray-600 [&_td]:text-blue-900 [&_td]:px-4"
    >
      <thead>
        <tr class="border-b border-gray-400">
          <th>Asset ID</th>
          <th>Asset Tag</th>
          <th>Serial</th>
          <th>User Name</th>
          <th>Office</th>
          <!-- <th scope="col">Type</th> -->
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in computerStore" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.asset_tag }}</td>
          <td>{{ item.serial }}</td>
          <td>{{ item.user_name }}</td>
          <td>{{ item.office_name }}</td>
          <!-- <td>{{ item.catalog }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { useAssetsStore } from '@/stores/assetsData'
const store = useAssetsStore()
const computerStore = store.assets.filter((item) => item.catalog === 'computer')
</script>

<style lang="scss" scoped></style>
