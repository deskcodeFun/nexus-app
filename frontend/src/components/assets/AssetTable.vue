<template>
  <!-- show data h-[430px] -->
  <div class="h-full max-h-150 flex  overflow-y-scroll overflow-x-hidden">
    <table
      class="table-auto h-fit w-full [&_th]:p-4 [&_th]:text-left [&_th]:align-baseline  [&_td]:text-blue-900 [&_td]:py-3 [&_td]:px-4 [&_td]:border-b [&_td]:border-slate-300">
      <!-- Table Header -->
      <thead class="table-header-group sticky top-0">
        <tr class=" border-b border-gray-300  bg-sky-100 text-nowrap">
          <th scope="col" class=" text-left text-base p-2 font-bold text-blue-900">Asset Tag</th>
          <th scope="col" class=" text-left text-base p-2 font-bold text-blue-900">Serial</th>
          <th scope="col" class=" text-left text-base p-2 font-bold text-blue-900">Brand</th>
          <th scope="col" class=" text-left text-base p-2 font-bold text-blue-900">Model</th>
          <th scope="col" class=" text-left text-base p-2 font-bold text-blue-900">Used By</th>
          <th scope="col" class=" text-left text-base p-2  font-bold text-blue-900">
            Office</th>
        </tr>
      </thead>
      <!-- Table body data -->
      <tbody class="p-4 text-blue-900 overflow-hidden  ">
        <tr v-for="item in store.asset" :key="item.id" @click="router.push(`/editAsset/${item.id}`)"
          class="table-row  hover:shadow-2xl hover:scale-102 hover:font-bold  hover:bg-blue-50 hover:text-center hover:cursor-pointer text-nowrap">
          <!-- <td class=" flex justify-center">{{ item.id }}</td> -->
          <td class=" table-cell font-bold">{{ item.asset_tag }}</td>
          <td class="table-cell">{{ item.serial_tag }}</td>
          <td class="table-cell">{{ item.brand }}</td>
          <td class="table-cell">{{ item.model }}</td>

          <!-- User Full name -->
          <td class="table-cell">
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
  <!-- <h2>Asset specification</h2>
  <div v-for="(item, index) in store.asset" :key="index">
    <p>{{ item.asset_tag }}</p>
    <div v-for="(data, label) in item.spec" :key="label" class="flex flex-row ">
      <p class="px-4 capitalize">{{ label }}</p>
      <div>{{ data }}</div>
    </div>
  </div> -->


</template>

<script setup>

  import { useRouter } from 'vue-router'
  import { useAssetStore } from '@/stores/assetsData';
  // import { computed } from 'vue';

  const router = useRouter()
  const store = useAssetStore()
  // store.getAssetByOffice('0')


  // label
  // const itemLabel = computed(() => {
  //   return Object.keys(store.asset[0].spec)[1]
  // })
  // console.log('ITEM label is: ', itemLabel)
  // data

</script>
