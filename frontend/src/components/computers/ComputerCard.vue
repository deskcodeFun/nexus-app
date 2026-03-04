<template>
  <!--h-[630px]  -->
  <div class="h-full max-h-100 flex flex-row flex-wrap justify-start-end  overflow-y-auto">
    <div v-for="item in store.computer" :key="item.id" @click="router.push(`/editComputer/${item.id}`)">
      <!-- each card layout -->
      <BaseCard>
        <!-- show data in each card -->
        <table
          class="table-auto h-fit w-full [&_th]:pt-1 [&_th]:text-left [&_th]:align-baseline [&_th]:font-light [&_th]:text-xs [$_td]:text-base [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-4">
          <tbody>
            <tr>
              <th>ID</th>
              <td>
                {{ item.id }}
              </td>
            </tr>
            <tr>
              <th>Asset Tag</th>
              <td>{{ item.asset_tag.substring(0, 13) }}</td>
            </tr>
            <tr>
              <th scope="col">Brand</th>
              <td>{{ item.brand }}</td>
            </tr>
            <tr>
              <th scope="col">CPU</th>
              <td>{{ item.cpu.substring(0, 20) }}</td>
            </tr>
            <tr>
              <th scope="col">Ram</th>
              <td>{{ item.ram.substring(0, 16) }}</td>
            </tr>
            <tr>
              <th scope="col">Hard Disk</th>
              <td>{{ item.harddisk.substring(0, 18) }}</td>
            </tr>
            <tr>
              <th scope="col">User Name</th>
              <td>
                <p v-if="item.employee">
                  {{ item.employee.fname + ' ' + item.employee.lname.substring(0, 1) + '.' }}
                </p>
                <p v-else class="font-bold text-green-800">FREE</p>
              </td>
            </tr>
          </tbody>
        </table>
      </BaseCard>
    </div>

  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useComputerStore } from '@/stores/computerData.js'
  import BaseCard from '../BaseCard.vue'

  const router = useRouter()
  const store = useComputerStore()
</script>
