<template>
  <!--h-[630px]  -->
  <div class="h-full max-h-screen flex flex-row flex-wrap justify-around overflow-y-auto">
    <div
      v-for="item in store.asset"
      :key="item.id"
      @click="router.push(`/editAsset/${item.id}`)"
      class="my-4 mx-4"
    >
      <!-- each card layout -->
      <BaseCard>
        <!-- show image in each card -->
        <div class="flex justify-center items-center align-middle mb-8">
          <div v-if="item && item.image !== null">
            <img :src="item.image[1]" class="rounded-xl aspect-square" />
          </div>
          <div v-else>
            <PhotoIcon class="h-56 w-auto bg-amber-50/25 text-gray-300/50" />
          </div>
        </div>
        <!-- show data in each card -->
        <table
          class="[&_th]:pt-1 [&_th]:text-left [&_tr]:align-baseline [&_tr]:h-6 [&_th]:font-light [&_th]:text-xs [$_td]:text-base [&_th]:text-gray-500 [&_td]:text-blue-900 [&_td]:pl-4"
        >
          <tbody>
            <tr>
              <th>Asset Tag</th>
              <td class="font-bold">{{ item.asset_tag.substring(0, 13) }}</td>
            </tr>
            <tr>
              <th scope="col">Brand</th>
              <td>{{ item.brand + ' ' }}</td>
            </tr>
            <tr>
              <th scope="col">User Name</th>
              <td>
                <p v-if="item.employee">
                  {{ item.employee.fname + ' ' + item.employee.lname.substring(0, 1) + '.' }}
                </p>
                <p v-else class="text-green-800">FREE</p>
              </td>
            </tr>
            <tr>
              <th scope="col">Asset BU</th>
              <td class="font-semibold">{{ item.office_name.short_name }}</td>
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
// import BaseImage from '../BaseImage.vue'
import { useAssetStore } from '@/stores/assetsData'
import { PhotoIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const store = useAssetStore()
store.getAssetByOffice('0')
// console.log('asset property', store.asset)
</script>
