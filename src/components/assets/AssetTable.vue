<template>
  <div class="max-h-screen mt-2">
    <!-- Table Header -->
    <table class="table-fixed w-full mb-2 [&_th]:py-6">
      <thead class="table-header-group sticky top-0">
        <tr class="border-b border-gray-300 bg-sky-100 text-nowrap">
          <th scope="col" class="text-left text-base font-bold pl-2 text-blue-900">Asset Tag</th>
          <th scope="col" class="text-left text-base font-bold text-blue-900">Serial</th>
          <th scope="col" class="text-left text-base font-bold text-blue-900">Brand</th>
          <th scope="col" class="text-left text-base font-bold text-blue-900">Model</th>
          <th scope="col" class="text-left text-base font-bold text-blue-900">Used By</th>
          <th scope="col" class="text-left text-base font-bold text-blue-900">Asset BU</th>
        </tr>
      </thead>
    </table>
    <!-- Table body data -->
    <div class="flex h-[calc(100vh-320px)] overflow-y-scroll">
      <table
        class="w-full table-fixed [&_td]:text-blue-900 [&_td]:py-4 [&_td]:px-2 [&_td]:border-b [&_td]:border-slate-300">
        <tbody class="text-blue-900">
          <tr v-for="item in store.asset" :key="item.id" @click="router.push(`/editAsset/${item.id}`)"
            class="table-row  hover:shadow-2xl hover:bg-blue-50  hover:cursor-pointer text-nowrap">
            <td class="table-cell font-bold">{{ item.asset_tag }}</td>
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
