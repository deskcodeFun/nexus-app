<template>
  <!-- Header -->
  <BaseHeader title="ASSET DETAIL" :isShow="true" />
  <div class="h-full pb-50 overflow-scroll pt-2 text-blue-900">
    <!-- show computer image and information -->
    <div class="flex flex-col lg:flex-row">
      <!-- computer gallery -->
      <div class="pb-4 px-4 flex-row">
        <p class="mb-4 text-lg tracking-wide">Gallery</p>
        <div class="px-4 sm:flex-row">
          <div v-if="assetStore.assetDetail && assetStore.assetDetail[0].image !== null">
            <BaseImage :images="assetStore.assetDetail[0].image" />
          </div>
          <div v-else>
            <p class="w-25 text-lg italic text-gray-400">No Image</p>
          </div>
        </div>
      </div>
      <!-- accounting section -->
      <div class="w-lg text-nowrap flex flex-wrap flex-col">
        <p class="ml-4 sm:ml-0 sm:pb-4 text-lg tracking-wide">Accounting information</p>
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-1 mb-8">
          <!-- get data from JSONB column -->
          <BaseBox label="'Asset Tag'" :data="assetStore.assetDetail[0].asset_tag"></BaseBox>
          <BaseBox label="'S/N'" :data="assetStore.assetDetail[0].serial_tag"></BaseBox>
          <BaseBox label="Brand" :data="assetStore.assetDetail[0].brand"></BaseBox>
          <BaseBox label="Color" :data="assetStore.assetDetail[0].color"></BaseBox>
          <BaseBox label="'Warranty End'" :data="assetStore.assetDetail[0].warranty_end"></BaseBox>
          <BaseBox label="Description" :data="assetStore.assetDetail[0].description"></BaseBox>
          <BaseBox
            label="'Store Location'"
            :data="assetStore.assetDetail[0].store_location"
          ></BaseBox>
          <BaseBox label="'Stock in Date'" :data="assetStore.assetDetail[0].stock_in"></BaseBox>
          <BaseBox label="Price" :data="assetStore.assetDetail[0].price"></BaseBox>
          <!-- user section -->
          <BaseBox
            :label="userNameLabel"
            :data="user_name"
            class="pl-4 pt-2 sm:pt-0 sm:pl-0"
          ></BaseBox>
          <!-- office name of asset -->
          <BaseBox label="Asset BU" :data="assetStore.assetDetail[0].office_name.name"> </BaseBox>
        </div>
      </div>
      <div>
        <BaseAccordion title="Specification">
          <!-- asset spec section, replace JSONB key with label-->
          <!-- <div class="text-nowrap px-4 flex flex-wrap flex-col pb-2"> -->
          <div class="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-x-8 gap-y-1">
            <div
              v-for="(data, label) in assetStore.assetDetail[0].spec"
              :key="label"
              class="pl-4 sm:pl-0 pt-2 sm:pt-0"
            >
              <BaseBox :label="label" :data="data"></BaseBox>
            </div>
          </div>
        </BaseAccordion>
        <BaseAccordion title="Update">
          <div class="flex flex-col gap-8">
            <div
              v-if="
                assetStore.assetDetail[0].spec.ram &&
                assetStore.assetDetail[0].spec.harddisk !== null
              "
              class="pl-4 sm:pl-0 pt-2 sm:pt-0"
            >
              <p class="mt-4 mb-1 text-sm text-gray-500">RAM</p>
              <input type="text" v-model="updateRAM" class="bg-green-100 py-1 px-2 mb-2" />
              <p class="mb-1 text-sm text-gray-500">Hard Disk</p>
              <input type="text" v-model="updateHarddisk" class="bg-green-100 py-1 px-2 mb-2" />
              <p class="mb-1 text-sm text-gray-500">Description</p>
              <textarea
                type="text"
                rows="4"
                cols="35"
                v-model="updateDescription"
                class="bg-green-100 py-1 px-2 mb-2"
              />
              <p class="mb-1 text-sm text-gray-500">Change BU asset</p>
              <select
                name="officeName"
                id="officeName"
                v-model.trim="assetStore.assetDetail[0].office_id"
                class="text-md bg-green-100 py-2 pl-1 pr-2"
              >
                <option
                  v-for="office_name in officeNameStore.officeName"
                  :key="office_name"
                  :value="office_name.id"
                >
                  {{ office_name.name }}
                </option>
              </select>
            </div>

            <!-- change user name section  -->
            <div class="text-nowrap px-4 flex flex-col">
              <p class="sm:pb-4 text-lg tracking-wide">User Information</p>
              <div class="sm:pl-0 pt-2 sm:pt-0">
                <div class="flex flex-row justify-between capitalize text-gray-500 text-sm mb-1">
                  <p>{{ userNameLabel }}</p>
                  <PencilSquareIcon
                    @click="toggleUser"
                    class="h-5 w-6 text-gray-400 hover:text-white hover:bg-green-800"
                  />
                </div>
              </div>
              <!-- show user name 2 state 'FREE' or user_name -->
              <div>
                <div v-if="user_name !== 'FREE'">
                  <p class="w-72 px py-1 px-2 mt-1 font-semibold bg-blue-50 text-wrap">
                    {{ user_name }}
                  </p>
                </div>
                <div v-else class="font-semibold bg-green-100 py-1 px-2 mb-2 mt-1">
                  {{ user_name }}
                </div>
                <!-- change user name section  -->
                <div
                  v-if="editUser && user_name"
                  class="bg-blue-50/50 rounded-lg border border-blue-300 py-2 px-2 mt-4"
                >
                  <p class="pb-2">Update User</p>
                  <select
                    v-model.trim="assetStore.assetDetail[0].user_id"
                    @change="handleUpdateUser"
                    class="w-full bg-green-100 py-2 text-md"
                  >
                    <option :value="0" class="bg-green-100">FREE</option>
                    <option
                      v-for="user in employeeStore.employee"
                      :key="user.id"
                      :value="user.id"
                      class="text-lg bg-green-100"
                    >
                      {{ user.fname + ' ' + user.lname }}
                    </option>
                  </select>
                  <!-- show office name of user if user name !== 'FREE' -->
                  <div v-if="editUser && updateData.user_id > '0'">
                    <p class="py-2">User Office</p>
                    <div class="text-md text-blue-900 bg-green-100 py-2 px-1 mb-2">
                      {{ new_officeName || ' - ' }}
                    </div>
                  </div>
                </div>
                <!-- <div v-else></div> -->
              </div>
              <!-- Action button for 'save' 'delete' button -->
              <form @submit.prevent="editSubmit">
                <div class="flex flex-row justify-between gap-24">
                  <button
                    class="flex items-center justify-center border bg-white hover:bg-red-900 hover:scale-102 text-red-800 hover:text-white py-1 px-4 mt-8 rounded-xl"
                    type="button"
                    @click="toggleModal"
                  >
                    <TrashIcon class="h-4 w-4 mr-2" /> Delete
                  </button>
                  <button
                    class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
                    type="submit"
                  >
                    <BookmarkIcon class="h-4 w-4 mr-2" />
                    <span> Save </span>
                  </button>
                  <!-- show BaseModal for confirm delete action -->
                  <BaseModal
                    :modalActive="modalActive"
                    title="Delete"
                    @save-data="deleteAsset(paramID)"
                    @close-modal="modalActive = false"
                  >
                    <p class="flex justify-center pt-4 text-blue-900 text-lg">
                      Are you sure to delete ?
                    </p>
                  </BaseModal>
                </div>
              </form>
            </div>
          </div>
        </BaseAccordion>
        <BaseAccordion title="Service Log">
          <div
            v-for="service in serviceLog"
            :key="service.id"
            class="flex flex-row gap-4 ml-6 mt-4"
          >
            <!-- <p type="date">{{ service.created_at.toLocaleDateString() }}</p> -->
            <p class="text-nowrap">
              {{
                new Date(service.created_at).toLocaleDateString('en-EN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              }}
            </p>
            <p class="text-wrap flex flex-wrap">{{ service.detail }}</p>
          </div>
        </BaseAccordion>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'

import { useAssetStore } from '@/stores/assetsData'
import { useOfficeNameStore } from '@/stores/officeData'
import { useEmployeeStore } from '@/stores/employeeData'

import { useServiceLog } from '@/stores/service_log.js'

import { TrashIcon, BookmarkIcon, PencilSquareIcon } from '@heroicons/vue/20/solid'
import BaseModal from '../BaseModal.vue'
import BaseHeader from '../BaseHeader.vue'
import BaseImage from '../BaseImage.vue'
import BaseBox from '../BaseBox.vue'
import BaseAccordion from '../BaseAccordion.vue'

const route = useRoute()
const router = useRouter()
let paramID = +route.params.id
const assetStore = useAssetStore()
const officeNameStore = useOfficeNameStore()
const employeeStore = useEmployeeStore()
const asset = await assetStore.getAssetDetail(paramID)

console.log('get asset, detail by paramID', assetStore.assetDetail)
console.log('Asset ', asset)

// const accountData = computed(() => {
//   if (store.assetDetail && store.assetDetail[0]) {
//     return {
//       'Asset Tag': store.assetDetail[0].asset_tag,
//       'S/N': store.assetDetail[0].serial_tag,
//       Brand: store.assetDetail[0].brand,
//       Model: store.assetDetail[0].model,
//       Color: store.assetDetail[0].color,
//       Description: store.assetDetail[0].description,
//       'Warranty End': store.assetDetail[0].warranty_end,
//       'Store Location': store.assetDetail[0].store_location,
//       'Stock in': store.assetDetail[0].stock_in,
//       Price: Intl.NumberFormat('th-TH', {
//         style: 'currency',
//         currency: 'THB',
//       }).format(store.assetDetail[0].price),
//       // officeName: store.assetDetail[0].office_name.name,
//     }
//   }
//   return {}
// })

// const updateData = reactive({
//   id: paramID,
//   asset_tag: store.assetDetail[0].asset_tag,
//   serial_tag: store.assetDetail[0].serial_tag,
//   brand: store.assetDetail[0].brand,
//   model: store.assetDetail[0].model,
//   color: store.assetDetail[0].color,
//   warranty_end: store.assetDetail[0].warranty_end,
//   store_location: store.assetDetail[0].store_location,
//   stock_in: store.assetDetail[0].stock_in,
//   price: Intl.NumberFormat('th-TH', {
//     style: 'currency',
//     currency: 'THB',
//   }).format(store.assetDetail[0].price),
//   description: store.assetDetail[0].description,
//   office_id: store.assetDetail[0].office_id,
//   user_id: store.assetDetail[0].user_id,
//   spec: store.assetDetail[0].spec, // JSONB column
// })
// console.log('updateDATA :', updateData)
// separate user from updateDATA to save edit

const editUser = ref(false)
const updateRAM = ref('')
const updateHarddisk = ref('')
const updateDescription = ref('')
const serviceStore = useServiceLog()
const serviceLog = computed(() => {
  if (!assetStore.assetDetail[0] || assetStore.assetDetail[0].asset_tag === null) {
    return []
  }
  return serviceStore.serviceLog.filter(
    (service) => service.asset_tag === assetStore.assetDetail[0].asset_tag,
  )
})
// const serviceDate = computed(() => {
//   return serviceLog.value.map((service) => {
//     return new Date(service.created_at).toLocaleDateString()
//   })
// })
const user_name = computed(() => {
  if (assetStore.assetDetail[0].user_id === null || undefined) {
    return 'FREE'
  }
  return assetStore.assetDetail[0].employee.fname + ' ' + assetStore.assetDetail[0].employee.lname
})
const userNameLabel = computed(() => {
  if (user_name.value === 'FREE') {
    return 'Status'
  } else {
    return 'User Name'
  }
})
const toggleUser = () => {
  editUser.value = !editUser.value
  // console.log('toggleUser value : ', editUser)
}

async function handleUpdateUser(event) {
  const value = event.target.value
  console.log('Value Change in handdleUpdateUser', value)
  // updateData.user_id = value
  // // console.log('updateData.user_id value', value)
  // if (updateData.user_id !== '0') {
  //   await employeeStore.getEmployeeDetail(updateData.user_id)
  //   // console.log('employee detail', employeeStore.employeeDetail)
  //   new_officeName.value = employeeStore.employeeDetail[0].office_name.name
  // } else {
  //   editUser.value = false
  //   new_officeName.value = ''
  //   user_name.value = 'FREE'
  //   updateData.user_id = null
  // }
}

// onMounted(async () => {
//   await store.getAssetDetail(paramID)
//   // console.log('computerDetail : ', store.assetDetail)
//   if (store.assetDetail[0]) {
//     // console.log('store.assetDetail[0]', store.assetDetail[0])
//     updateData.asset_tag = store.assetDetail[0].asset_tag
//     updateData.serial_tag = store.assetDetail[0].serial_tag
//     updateData.brand = store.assetDetail[0].brand
//     updateData.model = store.assetDetail[0].model
//     updateData.description = store.assetDetail[0].description
//     updateData.office_id = store.assetDetail[0].office_id
//     updateData.assetBU = store.assetDetail[0].office_name.name
//     updateData.user_id = store.assetDetail[0].user_id
//     updateData.spec = store.assetDetail[0].spec
//   }

//   // init value for updata filed
//   updateRAM.value = store.assetDetail[0].spec.ram
//   updateHarddisk.value = store.assetDetail[0].spec.harddisk
//   updateDescription.value = store.assetDetail[0].description

//   if (store.assetDetail[0].employee) {
//     await employeeStore.getEmployeeDetail(store.assetDetail[0].user_id)
//     userNameLabel.value = 'User Name'
//     user_name.value =
//       employeeStore.employeeDetail[0].fname + ' ' + employeeStore.employeeDetail[0].lname
//     user_officeName.value = employeeStore.employeeDetail[0].office_name.name
//   } else {
//     // employee data is not available-> computer is available in stock, free computer
//     userNameLabel.value = 'Status'
//     user_name.value = 'FREE' // Assign an empty string or a default value
//   }
// }) // END onMounted()

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}
async function editSubmit() {
  // TODO: validate data
  // console.log('UpdateData before call editsubmit : ', updateData)
  // upgrade ram and harddisk

  router.push('/assets')
}

async function deleteAsset(paramID) {
  await assetStore.deleteAsset(paramID)
  await assetStore.getAssetByOffice('0')
  router.push('/assets')
}
</script>
