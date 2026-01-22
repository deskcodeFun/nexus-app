<template>
  <!-- <div
    class="w-[300px] flex flex-row flex-wrap bg-white/65 border-1 border-gray-400 rounded-xl shadow-xl px-2 py-4 m-2 hover:transition-y-1 hover:scale-105"
  > -->
  <!-- show data -->
  <div class="w-full flex justify-center">
    <table
      class="w-11/12 bg-white/30 [&_th]:p-2 [&_th]:text-left [&_th]:align-baseline [&_td]:py-2 [&_th]:text-md [&_th]:text-gray-600 [&_td]:text-blue-900 [&_td]:px-4">
      <thead>
        <tr class="border-b border-gray-400">
          <th>Asset ID</th>
          <th>Asset Tag</th>
          <th>Serial</th>
          <th>Model</th>
          <th>User Name</th>
          <!-- <th scope="col">Type</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.computerByOffice" :key="item.id" @click="router.push(`/editComputer/${item.id}`)"
          class="hover:scale-102 hover:bg-sky-100 hover:cursor-pointer m-2 p-2">
          <td>{{ item.id }}</td>
          <td>{{ item.asset_tag }}</td>
          <td>{{ item.serial_tag }}</td>
          <td>{{ item.model }}</td>
          <td>{{ item.staff.fname + ' ' + item.staff.lname }}</td>
          <!-- <td>{{ item.catalog }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup>

  import { useRouter } from 'vue-router'
  import { useComputerStore } from '@/stores/computerData'


  const router = useRouter()
  const store = useComputerStore()






</script>
