<template>
  <!-- show data h-[430px] -->
  <div class="max-h-screen m-2 overflow-clip  rounded-lg">
    <!-- Table Header -->
    <table class="table-fixed w-full [&_th]:p-4 [&_th]:text-left [&_th]:align-baseline  ">
      <thead class=" sticky top-0 overflow-y-hidden bg-sky-100  z-10">
        <tr class="">
          <th class="text-left text-base p-2 font-bold text-blue-900">Asset Tag</th>
          <th class="text-left text-base p-2 font-bold text-blue-900">Serial</th>
          <th class="text-left text-base p-2 font-bold text-blue-900">Brand</th>
          <th class="text-left text-base p-2 font-bold text-blue-900">Model</th>
          <th class="text-left text-base p-2 font-bold text-blue-900">Used By</th>
          <th class="text-left text-base p-2 font-bold text-blue-900">
            Asset BU</th>
        </tr>
      </thead>
    </table>
    <!-- Table body data -->
    <div class="flex-1 max-h-screen overflow-y-scroll">
      <table
        class="w-full table-fixed [&_td]:text-blue-900 [&_td]:py-4 [&_td]:px-2 [&_td]:border-b [&_td]:border-slate-300">
        <tbody class="text-blue-900">
          <tr v-for="item in store.asset" :key="item.id" @click="router.push(`/editAsset/${item.id}`)"
            class="table-row  hover:shadow-2xl hover:bg-blue-50  hover:cursor-pointer text-nowrap">
            <!-- <td class=" flex justify-center">{{ item.id }}</td> -->
            <td class=" table-cell font-bold">{{ item.asset_tag }}</td>
            <td class="table-cell">{{ item.serial_tag }}</td>
            <td class="table-cell">{{ item.brand }}</td>
            <td class="table-cell">{{ item.model }}</td>

            <!-- User Full name -->
            <td class="table-cell ">
              <p v-if="item.employee">
                {{ item.employee.fname + ' ' + item.employee.lname }}
              </p>
              <p v-else class="font-bold text-green-800">Free</p>
            </td>
            <td class="  ">{{ item.office_name.name }}</td>
            <!-- <td>{{ item.catalog }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

  import { useRouter } from 'vue-router'
  import { useAssetStore } from '@/stores/assetsData';
  // import { computed } from 'vue';

  const router = useRouter()
  const store = useAssetStore()
  store.getAssetByOffice('0')


  // label
  // const itemLabel = computed(() => {
  //   return Object.keys(store.asset[0].spec)[1]
  // })
  // console.log('ITEM label is: ', itemLabel)
  // data

</script>
