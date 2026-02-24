<template>
  <!-- Header -->
  <BaseHeader title='PRINTER DETAIL' />
  <BaseButttonBack />
  <!-- show computer image  -->
  <div v-if="printerStore.printerDetail && printerStore.printerDetail[0].image !== null">
    <BaseImage :images="printerStore.printerDetail[0].image" />
  </div>
  <div v-else class="bg-white px-8 w-full h-100px">
    <p class="py-8 px-4 bg-blue-50/20">No Image</p>
  </div>

  <main class="py-4 px-8 bg-white flex flex-row text-blue-900">
    <!-- accounting section -->
    <div class="w-fit text-nowrap flex flex-col">
      <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Accounting Information</p>
      <label for="asset_tag" class="label">Asset Tag</label>
      <p class="bg-gray-50 text-md p-1 pr-4">{{ updateData.asset_tag }}</p>
      <label for="asset-tag" class="label">Serial Tag</label>
      <p class="bg-gray-50 text-md p-1 pr-4">{{ updateData.serial_tag }}</p>
      <label for="asset-tag" class="label">Brand</label>
      <p class="bg-gray-50 text-md p-1 pr-4">{{ updateData.brand }}</p>
      <label for="asset-tag" class="label">Model</label>
      <p class="bg-gray-50 text-md p-1 pr-4">{{ updateData.model }}</p>
      <label for="asset-tag" class="label">Black Cartridge</label>
      <p class="bg-gray-50 text-md p-1 pr-4">{{ updateData.black_cartridge }}</p>
      <label for="asset-tag" class="label">Coler Cartridge</label>
      <p class="bg-gray-50 text-md p-1 pr-4">{{ updateData.color_cartridge }}</p>
      <p class="py-2 text-sm text-gray-500">Office Name</p>
      <select name="officeName" id="officeName" v-model.trim="updateData.office_id" class="bg-sky-50 py-2 pr-2">
        <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
          {{ office_name.name }}
        </option>
      </select>
    </div>

    <!-- user info section -->
    <div class="flex flex-col">
      <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">User Information</p>
      <!-- header label and edit icon -->
      <div class="pb-2">
        <div class="flex fles-row justify-between">
          <p>{{ userNameLabel }}</p>
          <PencilSquareIcon @click="toggleUser" class="h-5 w-6 text-gray-400 hover:text-white hover:bg-green-800" />
        </div>
      </div>
      <!-- show user detail -->
      <div v-if="user_name !== 'FREE'">
        <p class="bg-sky-50 text-md py-2 px-1 mb-2">{{ user_name }}</p>
        <p class="text-md text-gray-500">Office</p>
        <p class="bg-sky-50 text-md py-2 px-1 mb-2">{{ user_officeName }}</p>
      </div>
      <div v-else class="bg-sky-50 text-md py-2 px-1 mb-2">{{ user_name }}</div>
      <!-- editUser = true && user_name = true -->
      <div v-if="editUser && user_name" class="bg-red-50/50 rounded-lg border-1 border-red-300 py-2 px-2 mt-4">
        <p class="pb-2">Update Printer User</p>
        <select v-model.trim="updateData.user_id" @change="handleChange" class="w-full bg-sky-50 py-2 pr-2">
          <option :value="0" class="bg-sky-50 pr-4">FREE</option>
          <option v-for="item in employeeStore.employee" :key="item.id" :value="item.id" class="bg-sky-50 pr-4">
            {{ item.fname + ' ' + item.lname }}
          </option>
        </select>
        <p class="py-2">User Office</p>
        <div class="bg-sky-50 py-2 px-1 mb-2">{{ new_officeName || ' - ' }}</div>
      </div>
      <div v-else></div>

      <!-- button section -->
      <form @submit.prevent="editSubmit">
        <!-- Show button -->
        <div class="flex flex-row justify-between gap-24">
          <button
            class="flex items-center justify-center border-1 bg-white hover:bg-red-900 hover:scale-102 text-red-800 hover:text-white py-1 px-4 mt-8 rounded-xl"
            type="button" @click="toggleModal">
            <TrashIcon class="h-4 w-4 mr-2" /> Delete
          </button>
          <!-- <BaseButttonBack /> -->
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
            type="submit">
            <BookmarkIcon class="h-4 w-4 mr-2" />
            <span> Save </span>
          </button>

          <BaseModal :modalActive="modalActive" title="Delete" @save-data="deleteAssets(paramID)"
            @close-modal="modalActive = false">
            <p class="flex justify-center pt-4 text-blue-900 text-lg">Are you sure to delete ?</p>
          </BaseModal>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { computed, onMounted, reactive, ref } from 'vue'
  import { usePrinterStore } from '@/stores/printerData'

  import { TrashIcon, BookmarkIcon, PencilSquareIcon } from '@heroicons/vue/20/solid'
  import BaseModal from '../BaseModal.vue'
  import BaseButttonBack from '../BaseButttonBack.vue'
  import BaseHeader from '../BaseHeader.vue'
  import BaseImage from '../BaseImage.vue'
  import { useOfficeNameStore } from '@/stores/officeData'
  import { useEmployeeStore } from '@/stores/employeeData'

  const route = useRoute()
  const router = useRouter()
  let paramID = +route.params.id
  const printerStore = usePrinterStore()
  const officeNameStore = useOfficeNameStore()
  const employeeStore = useEmployeeStore()

  const updateData = reactive({
    id: paramID,
    asset_tag: '',
    serial_tag: '',
    brand: '',
    model: '',
    black_cartridge: '',
    color_cartridge: '',
    port: '',
    type: '',
    user_id: '',
    office_id: '',
  })
  // separate user from updataData to save edit
  const user_name = ref('')
  const user_officeName = ref('')
  const new_officeName = ref('')
  const editUser = ref(false)
  const userNameLabel = computed(() => {
    if (user_name.value === 'FREE') {
      return 'Status'
    } else {
      return 'Use By'
    }
  })
  const toggleUser = () => {
    editUser.value = !editUser.value
  }
  async function handleChange(event) {
    const value = event.target.value
    updateData.user_id = value
    if (updateData.user_id !== '0') {
      await employeeStore.getEmployeeDetail(updateData.user_id)
      new_officeName.value = employeeStore.employeeDetail[0].office_name.name
    } else {
      editUser.value = false
      new_officeName.value = ''
      user_name.value = 'FREE'
      updateData.user_id = null
    }
  }
  const modalActive = ref(null)
  const toggleModal = () => {
    modalActive.value = !modalActive.value
  }

  const editSubmit = async () => {
    await printerStore.updatePrinter(paramID, updateData)
    router.push('/assets')
  }

  const deleteAssets = async (paramID) => {
    try {
      const { error } = await printerStore.deleteAsset(paramID)
      if (error) throw error
    } catch (error) {
      console.error('DELETE printer Fail : ', error)
    } finally {
      await printerStore.getPrinterByOffice('0')
    }

    router.push('/assets')
  }

  onMounted(async () => {
    await printerStore.getPrinterDetail(paramID)
    if (printerStore.printerDetail[0]) {
      updateData.asset_tag = printerStore.printerDetail[0].asset_tag
      updateData.serial_tag = printerStore.printerDetail[0].serial_tag
      updateData.brand = printerStore.printerDetail[0].brand
      updateData.model = printerStore.printerDetail[0].model
      updateData.black_cartridge = printerStore.printerDetail[0].black_cartridge
      updateData.color_cartridge = printerStore.printerDetail[0].color_cartridge
      updateData.port = printerStore.printerDetail[0].port
      updateData.type = printerStore.printerDetail[0].type
      updateData.user_id = printerStore.printerDetail[0].user_id
      updateData.office_id = printerStore.printerDetail[0].office_id
    }
    if (printerStore.printerDetail[0].employee) {
      await employeeStore.getEmployeeDetail(printerStore.printerDetail[0].user_id)
      user_name.value =
        employeeStore.employeeDetail[0].fname + ' ' + employeeStore.employeeDetail[0].lname
      user_officeName.value = employeeStore.employeeDetail[0].officeName.name
    } else {
      user_name.value = 'FREE'
    }
    updateData.user_id = employeeStore.id
  }) // end onMounted
</script>

<style scoped>
  .label {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: 0.1rem;
    color: 6b7280;
  }
</style>
