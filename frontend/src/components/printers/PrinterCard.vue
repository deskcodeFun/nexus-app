<template>
  <div class="flex justify-center flex-row flex-wrap ">
    <div v-for="item in printerStore.printer" :key="item.id" @click="router.push(`/editPrinter/${item.id}`)"
      class="sm:flex-row sm:flex-wrap justify-center">
      <!-- each card layout -->
      <BaseCard>
        <table
          class="[&_th]:pt-1 [&_th]:text-left [&_th]:align-baseline [&_th]:font-light [&_th]:text-xs [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-4">
          <tbody>
            <tr>
              <th>ID</th>
              <!-- <td>{{ currentUser.fname + ' ' + currentUser.lname }}</td> -->
              <td>
                {{ item.id }}
              </td>
            </tr>
            <tr>
              <th>Asset Tag</th>
              <!-- <td>{{ props.currentAsset.fname + ' ' + props.currentAsset.lname }}</td> -->
              <!-- <td>{{ item.user_name.substring(0, 16) + '...' }}</td> -->
              <td>{{ item.asset_tag }}</td>
            </tr>
            <tr>
              <th>Serial Tag</th>
              <!-- <td>{{ props.currentAsset.fname + ' ' + props.currentAsset.lname }}</td> -->
              <!-- <td>{{ item.user_name.substring(0, 16) + '...' }}</td> -->
              <td>{{ item.serial_tag }}</td>
            </tr>
            <tr>
              <th scope="col">Brand</th>
              <td>{{ item.brand }}</td>
            </tr>

            <tr>
              <th scope="col">Model</th>
              <td>{{ item.model }}</td>
            </tr>

            <tr>
              <th scope="col">Use By</th>
              <td>
                <p v-if="item.employee">
                  {{ item.employee.fname + ' ' + item.employee.lname }}
                </p>
                <p v-else class="font-bold text-green-800">Free</p>

              </td>
            </tr>
          </tbody>
        </table>
      </BaseCard>
      <!-- show data in each card -->
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { usePrinterStore } from '@/stores/printerData'
  import BaseCard from '../BaseCard.vue'

  const router = useRouter()
  const printerStore = usePrinterStore()

</script>

<style lang="scss" scoped></style>
