<template>
  <!-- show data -->
  <div class="w-full flex justify-center">
    <table
      class="w-11/12 bg-white/30 [&_th]:p-2 [&_th]:text-left [&_th]:align-baseline  [&_th]:text-md [&_th]:text-gray-600 [&_td]:text-blue-900 [&_td]:py-4 [&_td]:px-2 [&_td]:mx-auto">
      <thead>
        <tr class="border-b border-gray-400 text-nowrap">
          <!-- <th scope="col">Asset ID</th> -->
          <th scope="col">Asset Tag</th>
          <th scope="col">Brand</th>
          <th scope="col">CPU</th>
          <th scope="col">Ram</th>
          <th scope="col">Harddisk</th>
          <th scope="col">User Name</th>
          <!-- <th scope="col">Type</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.computer" :key="item.id" @click="router.push(`/editComputer/${item.id}`)"
          class="hover:shadow-gray-400 hover:shadow-2xl hover:scale-102 hover:font-bold  hover:bg-blue-50 hover:cursor-pointer  text-nowrap">
          <!-- <td class=" flex justify-center">{{ item.id }}</td> -->
          <td>{{ item.asset_tag }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.cpu.substring(0, 18) }}</td>
          <td>{{ item.ram.substring(0, 18) }}</td>
          <td>{{ item.harddisk }}</td>
          <td>
            <p v-if="item.employee">
              {{ item.employee.fname + ' ' + item.employee.lname }}
            </p>
            <p v-else class="font-bold text-green-800">Free</p>
          </td>
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
