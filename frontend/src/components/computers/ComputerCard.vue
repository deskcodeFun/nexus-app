<template>
  <div v-for="item in store.computer" :key="item.id" @click="router.push(`/editComputer/${item.id}`)"
    class="flex justify-center mx-2">
    <!-- each card layout -->
    <BaseCard>
      <!-- show data in each card -->
      <table
        class="[&_th]:pt-1 [&_th]:text-left [&_th]:align-baseline [&_th]:font-light [&_th]:text-xs [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-4">
        <tbody>
          <tr>
            <th>Asset ID</th>
            <td>
              {{ item.id }}
            </td>
          </tr>
          <tr>
            <th>Asset Tag</th>
            <td>{{ item.asset_tag }}</td>
          </tr>
          <tr>
            <th scope="col">Brand</th>
            <td>{{ item.brand }}</td>
          </tr>
          <tr>
            <th scope="col">CPU</th>
            <td>{{ item.cpu }}</td>
          </tr>
          <tr>
            <th scope="col">Ram</th>
            <td>{{ item.ram }}</td>
          </tr>
          <tr>
            <th scope="col">Hard Disk</th>
            <td>{{ item.harddisk }}</td>
          </tr>
          <tr>
            <th scope="col">User Name</th>
            <td>{{ item.employee.fname + ' ' + item.employee.lname.substring(0, 1) + '.' }}</td>
          </tr>
        </tbody>
      </table>
    </BaseCard>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useComputerStore } from '@/stores/computerData.js'
  import BaseCard from '../BaseCard.vue'

  const router = useRouter()
  const store = useComputerStore()
</script>
