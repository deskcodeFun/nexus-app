<template>
  <div
    v-for="item in computerStore"
    :key="item.id"
    @click="router.push(`/editPrinter/${item.id}`)"
    class="sm:flex-row sm:flex-wrap justify-center"
  >
    <!-- each card layout -->
    <BaseCard>
      <table
        class="[&_th]:pt-1 [&_th]:text-left [&_th]:align-baseline [&_th]:font-light [&_th]:text-xs [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-4"
      >
        <tbody>
          <tr>
            <th>Asset ID</th>
            <!-- <td>{{ currentUser.fname + ' ' + currentUser.lname }}</td> -->
            <td>
              {{ item.id }}
            </td>
          </tr>
          <tr>
            <th>User Name</th>
            <!-- <td>{{ props.currentAsset.fname + ' ' + props.currentAsset.lname }}</td> -->
            <!-- <td>{{ item.user_name.substring(0, 16) + '...' }}</td> -->
            <td>{{ shortName(item.user_name) }}</td>
          </tr>
          <tr>
            <th scope="col">Type</th>
            <td>{{ item.catalog }}</td>
          </tr>
          <tr>
            <th scope="col">Office</th>
            <td>{{ item.office_name }}</td>
          </tr>
          <tr>
            <th scope="col">Asset Tag</th>
            <td>{{ shortName(item.asset_tag) }}</td>
          </tr>
          <tr>
            <th scope="col">Serial</th>
            <td>{{ shortName(item.serial) }}</td>
          </tr>
        </tbody>
      </table>
    </BaseCard>
    <!-- show data in each card -->
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import { useAssetsStore } from '@/stores/assetsData'
import BaseCard from '../BaseCard.vue'

const router =useRouter()
const store = useAssetsStore()
const computerStore = store.assets.filter((item) => item.catalog === 'printer')

function shortName(name) {
  if (!name) return ''
  return name.length > 12 ? name.substring(0, 15) + '...' : name
}
</script>

<style lang="scss" scoped></style>
