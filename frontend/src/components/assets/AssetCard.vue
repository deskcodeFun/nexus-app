<template>
  <!--h-[630px]  -->
  <div class="h-full max-h-180 flex flex-row flex-wrap justify-start overflow-y-auto">
    <div v-for="item in store.asset" :key="item.id" @click="router.push(`/editComputer/${item.id}`)" class="my-2 mx-4 ">
      <!-- each card layout -->
      <BaseCard>
        <!-- show data in each card -->
        <table
          class="table-auto h-fit  [&_th]:pt-1 [&_th]:text-left [&_tr]:align-baseline [&_tr]:h-6 [&_th]:font-light [&_th]:text-xs [$_td]:text-base [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-4">
          <tbody>
            <tr>
              <th>ID</th>
              <td>
                {{ item.id }}
              </td>
            </tr>
            <tr>
              <th>Asset Tag</th>
              <td class="font-bold">{{ item.asset_tag.substring(0, 13) }}</td>
            </tr>
            <tr>
              <th scope="col">Serial Number</th>
              <td>{{ item.serial_tag.substring(0, 13) + '...' }}</td>
            </tr>
            <tr>
              <th scope="col">Brand</th>
              <td>{{ item.brand }}</td>
            </tr>
            <tr>
              <th scope="col">Model</th>
              <td>{{ item.model.substring(0, 13) + '...' }}</td>
            </tr>
            <tr>
              <th scope="col">Office </th>
              <td>{{ item.office_name.short_name }}</td>
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
  import BaseCard from '../BaseCard.vue'
  import { useAssetStore } from '@/stores/assetsData'

  const router = useRouter()
  const store = useAssetStore()
</script>
