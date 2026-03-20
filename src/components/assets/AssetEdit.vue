<template>
  <!-- Header -->
  <BaseHeader title="ASSET DETAIL" />
  <main class="h-screen pt-8 bg-white text-blue-900">
    <!-- 5 section -->
    <div class="sm:gap-4 flex sm:items-baseline flex-col sm:flex-row h-screen overflow-scroll xl:overflow-hidden">
      <!-- show computer image  -->
      <div class="pb-4 px-4 flex-row sm:flex-col">
        <p class="sm:pb-4 font-semibold text-lg tracking-wide">Gallery</p>
        <div class="w-full text-nowrap mx-auto">
          <div v-if="store.assetDetail && store.assetDetail[0].image !== null">
            <BaseImage :images="store.assetDetail[0].image" />
          </div>
          <div v-else>
            <p class="w-25 text-lg italic text-gray-400">No Image</p>
          </div>
        </div>
        <br />
      </div>
      <!-- accounting section -->
      <div class="text-nowrap px-4 flex flex-col pb-2">
        <p class="sm:border-0 sm:pb-4 text-lg tracking-wide">Asset information</p>
        <div v-if="store.assetDetail && store.assetDetail.length > 0">
          <div v-for="(data, label) in accountData" :key="label" class="pl-4 pt-2 sm:pt-0 sm:pl-0">
            <BaseBox :label="label" :data="data"></BaseBox>
          </div>
        </div>
        <div v-else>Loading data....</div>
        <br />
      </div>
      <!-- asset spec section, replace JSONB key with label-->
      <div class="text-nowrap px-4 flex flex-col pb-2">
        <p class="sm:border-0 sm:pb-4 text-lg tracking-wide">Specification</p>
        <div v-if="store.assetDetail && store.assetDetail.length > 0">
          <div v-for="(data, label) in updateData.spec" :key="label" class="pl-4 sm:pl-0 pt-2 sm:pt-0">
            <BaseBox :label="label" :data="data"></BaseBox>
          </div>
        </div>
        <br />
      </div>
      <!-- can edit computer spec. section -->
      <div v-show="(updateData.spec.ram && updateData.spec.harddisk)" class="text-nowrap px-4 flex flex-col pb-2">
        <p class="sm:border-0 sm:pb-4 text-lg tracking-wide">Upgrade</p>
        <div class="pl-4 sm:pl-0 pt-2 sm:pt-0">
          <p class="py-2 text-sm text-gray-500">RAM</p>
          <input type="text" v-model="updateData.spec.ram" class="bg-blue-100 p-2" />
          <p class="py-2 text-sm text-gray-500">Hard Disk</p>
          <input type="text" v-model="updateData.spec.harddisk" class="bg-blue-100 p-2" />
          <p class="py-2 text-sm text-gray-500">Office Name</p>
          <select name="officeName" id="officeName" v-model.trim="store.assetDetail[0].office_id"
            class="text-md bg-blue-100 py-2 pl-1 pr-2">
            <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
              {{ office_name.name }}
            </option>
          </select>
        </div>
        <br />
      </div>
      <!-- user info section -->
      <div class="text-nowrap px-4 flex flex-col pb-2">
        <p class="pt-4 sm:pt-0 sm:border-0 sm:pb-4 text-lg tracking-wide">
          User Information
        </p>
        <div class="pl-4 sm:pl-0 pt-2 sm:pt-0">
          <div class="pb-2">
            <div class="flex justify-between">
              <p>{{ userNameLabel }}</p>
              <PencilSquareIcon @click="toggleUser" class="h-5 w-6 text-gray-400 hover:text-white hover:bg-green-800" />
            </div>
          </div>
        </div>
        <div class="contain h-95">
          <div v-if="user_name !== 'FREE'">
            <p class="bg-blue-100 text-md py-2 px-2 mb-2">{{ user_name }}</p>
            <p class="text-md text-gray-500">Office</p>
            <p class="text-gray-500 text-md py-2 px-1 mb-2">{{ user_officeName }}</p>
          </div>
          <div v-else class="bg-blue-100 text-lg py-2 px-1 mb-2">{{ user_name }}</div>
          <div v-if="editUser && user_name" class="bg-blue-50/50 rounded-lg border border-blue-300 py-2 px-2 mt-4">
            <p class="pb-2">Update User</p>
            <select v-model.trim="updateData.user_id" @change="handleUpdateUser"
              class="w-full bg-blue-100 py-2 text-md">
              <option :value="0" class="bg-blue-100">FREE</option>
              <option v-for="item in employeeStore.employee" :key="item.id" :value="item.id"
                class="text-lg bg-blue-100">
                {{ item.fname + ' ' + item.lname }}
              </option>
            </select>
            <div v-if="editUser && updateData.user_id > '0'">
              <p class="py-2">User Office</p>
              <div class="text-md text-blue-900 bg-blue-100 py-2 px-1 mb-2">
                {{ new_officeName || ' - ' }}
              </div>
            </div>
          </div>
          <div v-else></div>
        </div>
        <form @submit.prevent="editSubmit">
          <div class="flex flex-row justify-between gap-24">
            <button
              class="flex items-center justify-center border bg-white hover:bg-red-900 hover:scale-102 text-red-800 hover:text-white py-1 px-4 mt-8 rounded-xl"
              type="button" @click="toggleModal">
              <TrashIcon class="h-4 w-4 mr-2" /> Delete
            </button>
            <button
              class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
              type="submit">
              <BookmarkIcon class="h-4 w-4 mr-2" />
              <span> Save </span>
            </button>

            <BaseModal :modalActive="modalActive" title="Delete" @save-data="deleteAsset(paramID)"
              @close-modal="modalActive = false">
              <p class="flex justify-center pt-4 text-blue-900 text-lg">Are you sure to delete ?</p>
            </BaseModal>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { ref, reactive, computed, onMounted } from 'vue'

  import { useAssetStore } from '@/stores/assetsData'
  import { useOfficeNameStore } from '@/stores/officeData'
  import { useEmployeeStore } from '@/stores/employeeData'

  import { TrashIcon, BookmarkIcon, PencilSquareIcon } from '@heroicons/vue/20/solid'
  import BaseModal from '../BaseModal.vue'
  import BaseHeader from '../BaseHeader.vue'
  import BaseImage from '../BaseImage.vue'
  import BaseBox from '../BaseBox.vue'

  const route = useRoute()
  const router = useRouter()
  let paramID = +route.params.id
  const store = useAssetStore()
  const officeNameStore = useOfficeNameStore()
  const employeeStore = useEmployeeStore()
  const accountData = computed(() => {
    if (store.assetDetail && store.assetDetail[0]) {
      return {
        'Asset Tag': store.assetDetail[0].asset_tag,
        'S/N': store.assetDetail[0].serial_tag,
        Brand: store.assetDetail[0].brand,
        Model: store.assetDetail[0].model,
        officeName: store.assetDetail[0].office_name.name
      }
    }
    return {}
  })
  // const specData = computed(() => {
  //   if (store.assetDetail && store.assetDetail[0]) {
  //     const spec = store.assetDetail[0].spec
  //     const filtered = {}
  //     for (const [key, value] of Object.entries(spec)) {
  //       filtered[key] = value
  //       if (key !== 'ram' && key !== 'harddisk') {
  //         filtered[key] = value
  //       }
  //     }
  //     console.log('specData is : ', specData)
  //     return filtered
  //   }
  //   console.log('specData is : ', specData)
  //   return {}
  // })
  const updateData = reactive({
    id: paramID,
    asset_tag: '',
    serial_tag: '',
    brand: '',
    model: '',
    office_id: '',
    user_id: '',
    spec: {} // JSONB column
  })
  // separate user from updateDATA to save edit
  const user_name = ref('')
  const user_officeName = ref('')
  const new_officeName = ref('')
  const editUser = ref(false)
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
    updateData.user_id = value
    // console.log('updateData.user_id value', value)
    if (updateData.user_id !== '0') {
      await employeeStore.getEmployeeDetail(updateData.user_id)
      // console.log('employee detail', employeeStore.employeeDetail)
      new_officeName.value = employeeStore.employeeDetail[0].office_name.name
    } else {
      editUser.value = false
      new_officeName.value = ''
      user_name.value = 'FREE'
      updateData.user_id = null
    }
  }

  onMounted(async () => {
    await store.getAssetDetail(paramID)
    // console.log('computerDetail : ', store.assetDetail)
    if (store.assetDetail[0]) {
      updateData.asset_tag = store.assetDetail[0].asset_tag
      updateData.serial_tag = store.assetDetail[0].serial_tag
      updateData.brand = store.assetDetail[0].brand
      updateData.model = store.assetDetail[0].model
      updateData.office_id = store.assetDetail[0].office_id
      updateData.user_id = store.assetDetail[0].user_id
      updateData.spec = store.assetDetail[0].spec
    }
    if (store.assetDetail[0].employee) {
      // console.log('store.computerDetail[0].employee', store.computerDetail[0].employee)
      await employeeStore.getEmployeeDetail(store.assetDetail[0].user_id)
      user_name.value =
        employeeStore.employeeDetail[0].fname + ' ' + employeeStore.employeeDetail[0].lname
      user_officeName.value = employeeStore.employeeDetail[0].office_name.name
    } else {
      // employee data is not available-> computer is available in stock, free computer
      user_name.value = 'FREE' // Assign an empty string or a default value
    }
    if (store.assetDetail[0].user_id) {
      updateData.user_id = store.assetDetail[0].user_id
    }
  }) // END onMounted()

  const modalActive = ref(null)
  const toggleModal = () => {
    modalActive.value = !modalActive.value
  }

  async function editSubmit() {
    // TODO: validate data
    // console.log('UpdateData before call editsubmit : ', updateData)
    await store.updateAsset(paramID, updateData)
    router.push('/assets')
  }

  function deleteAsset(paramID) {
    store.deleteComputer(paramID)
    store.getAssetByOffice('0')
    router.push('/assets')
  }
</script>

<style scoped>
  .label {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: 0.1rem;
    color: #37383a;
  }
</style>
