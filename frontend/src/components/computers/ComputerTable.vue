<template>
  <!-- show data h-[430px] -->
  <div class="h-[630px] flex justify-center overflow-y-scroll overflow-x-hidden">
    <table
      class="table-auto h-fit w-full [&_th]:p-4 [&_th]:text-left [&_th]:align-baseline  [&_td]:text-blue-900 [&_td]:py-3 [&_td]:px-4 [&_td]:border-b [&_td]:border-slate-300">
      <!-- Table Header -->
      <thead class="table-header-group sticky top-0">
        <tr class=" border-b border-gray-300  bg-sky-100 text-nowrap">
          <th class=" text-left text-base p-2 font-bold text-blue-900">Asset Tag</th>
          <th class=" text-left text-base p-2 font-bold text-blue-900">Brand</th>
          <th class=" text-left text-base p-2 font-bold text-blue-900">CPU</th>
          <th class=" text-left text-base p-2 font-bold text-blue-900">Ram</th>
          <th class=" text-left text-base p-2 font-bold text-blue-900">Harddisk</th>
          <th class=" text-left text-base p-2 font-bold text-blue-900">User Name</th>
        </tr>
      </thead>
      <!-- Table body data -->
      <tbody class="p-8 text-blue-900 ">
        <tr v-for="item in store.computer" :key="item.id" @click="router.push(`/editComputer/${item.id}`)"
          class="p-8 table-row hover:shadow-2xl hover:scale-102 hover:font-bold  hover:bg-blue-50 hover:text-center hover:cursor-pointer text-nowrap">
          <!-- <td class=" flex justify-center">{{ item.id }}</td> -->
          <td class="font-semibold hover:font-bold">{{ item.asset_tag }}</td>
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
