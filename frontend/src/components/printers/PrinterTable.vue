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
          <th>Asset Tag</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Use By</th>
          <!-- <th scope="col">Type</th> -->
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in store.printer" :key="item.id" @click="router.push(`/editPrinter/${item.id}`)"
          class="hover:shadow-2xl hover:scale-102 hover:font-bold hover:bg-blue-50 hover:cursor-pointer text-nowrap">
          <td>{{ item.asset_tag }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.model }}</td>

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
  <!-- </div> -->
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { usePrinterStore } from '@/stores/printerData'

  const router = useRouter()
  const store = usePrinterStore()
</script>

<style lang="scss" scoped></style>
