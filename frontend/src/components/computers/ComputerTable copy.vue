<template>
  <!-- show data -->
  <div class=" h-100 flex justify-center overflow-y-auto">
    <table
      class="w-full  [&_th]:p-4 [&_th]:text-left [&_th]:align-baseline  [&_td]:text-blue-900 [&_td]:py-2 [&_td]:px-4 [&_td]:border-b [&_td]:border-slate-300">
      <thead class="sticky top-0">
        <tr class="border-b border-gray-300  bg-sky-100 text-nowrap">
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
          class="max-h-0 hover:shadow-2xl hover:scale-102 hover:font-bold  hover:bg-blue-50 hover:text-center hover:cursor-pointer text-nowrap">
          <!-- <td class=" flex justify-center">{{ item.id }}</td> -->
          <td class="font-bold">{{ item.asset_tag }}</td>
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
