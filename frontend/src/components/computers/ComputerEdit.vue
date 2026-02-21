<template>
  <!-- Header -->
  <BaseHeader :title="'COMPUTER DETAIL'" />
  <BaseButttonBack />
  <!-- show computer image  -->
  <div v-if="store.computerDetail && store.computerDetail[0].image !== null">
    <BaseImage :images="store.computerDetail[0].image" />
  </div>
  <div v-else class="bg-white px-8 w-full h-100px ">
    <p class="py-8 px-4 bg-blue-50/20">No Image</p>
  </div>

  <main class="py-4 px-8 bg-white flex flex-row text-blue-900">
    <!-- 3 section -->
    <div class="gap-8 sm:flex sm:flex-row bg-white">
      <!-- accounting section -->
      <div class="w-fit text-nowrap flex flex-col">
        <p class="sm:pb-4 text-lg tracking-wide">Accounting information</p>
        <p class="py-2 text-sm text-gray-500 tracking-widest">Asset Tag</p>
        <p class="bg-gray-50 text-md p-1 pr-4">{{ updateData.asset_tag }}</p>
        <p class="py-2 text-sm text-gray-500 tracking-widest">Serial Number</p>
        <p class="bg-gray-50 text-md p-1 pr-4">{{ updateData.serial_tag }}</p>
        <p class="py-2 text-sm text-gray-500">Brand</p>
        <div class="bg-gray-50 text-md p-1">{{ updateData.brand }}</div>
        <p class="py-2 text-sm text-gray-500">Model</p>
        <div class="bg-gray-50 text-md p-1">{{ updateData.model }}</div>
        <p class="py-2 text-sm text-gray-500">CPU</p>
        <div class="bg-gray-50 text-md p-1">{{ updateData.cpu }}</div>
        <p class="py-2 text-sm text-gray-500">AI Chipset</p>
        <div class="bg-gray-50 text-md p-1">{{ updateData.ai }}</div>
        <p class="py-2 text-sm text-gray-500">Graphic Chipset</p>
        <div class="bg-gray-50 text-md p-1">{{ updateData.graphic }}</div>
        <p class="py-2 text-sm text-gray-500">Screen Size</p>
        <div class="bg-gray-50 text-md p-1">{{ updateData.screen_size }}</div>
      </div>
      <!-- computer spec section -->
      <div class="flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Computer Specification</p>
        <p class="py-2 text-sm text-gray-500">Max Ram</p>
        <div class="bg-gray-50 text-md p-1">{{ updateData.max_ram }}"</div>
        <p class="py-2 text-sm text-gray-500">Hard Disk slot</p>
        <div class="bg-gray-50 text-md p-1">{{ updateData.harddisk_slot }}</div>
        <p class="py-2 text-sm text-gray-500">Lan</p>
        <div class="bg-gray-50 text-md p-1">{{ updateData.lan_port }}</div>
        <p class="py-2 text-sm text-gray-500">Wireless</p>
        <div class="bg-gray-50 text-md p-1">{{ updateData.wireless }}</div>
        <p class="py-2 text-sm text-gray-500">Bluetooth</p>
        <div class="bg-gray-50 text-md p-1">{{ updateData.bluetooth }}</div>
        <!-- can edit computer spec. section -->
        <p class="py-2 text-sm text-gray-500">RAM</p>
        <input type="text" v-model="updateData.ram" class="bg-sky-50 text-md p-1" />
        <p class="py-2 text-sm text-gray-500">Hard Disk</p>
        <input type="text" v-model="updateData.harddisk" class="bg-sky-50 text-md p-1" />
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
        <!-- Show userDetail -->
        <div v-if="user_name !== 'FREE'">
          <p class="bg-sky-50 text-md py-2 px-1 mb-2">{{ user_name }}</p>
          <p class="text-md text-gray-500">Office</p>
          <p class="bg-sky-50 text-md py-2 px-1 mb-2">{{ user_officeName }}</p>
        </div>
        <div v-else class="bg-sky-50 text-md py-2 px-1 mb-2">{{ user_name }}</div>
        <!-- editUser = true && user_name = true -->
        <div v-if="editUser && user_name" class="bg-red-50/50 rounded-lg border-1 border-red-300 py-2 px-2 mt-4">
          <p class="pb-2">Update Computer User</p>
          <select v-model.trim="updateData.user_id" @change="handleChange" class="w-full bg-sky-50 py-2 pr-2">
            <option :value="0" class="bg-sky-50 pr-4">FREE</option>
            <option v-for="item in employeeStore.employee" :key="item.id" :value="item.id" class="bg-sky-50 pr-4">
              {{ item.fname + ' ' + item.lname }}
            </option>
          </select>
          <p class="py-2">Office BU</p>
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
    </div>
  </main>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { ref, computed, onMounted, reactive } from 'vue'

  import { useComputerStore } from '@/stores/computerData'
  import { useOfficeNameStore } from '@/stores/officeData'
  import { useEmployeeStore } from '@/stores/employeeData'

  import { TrashIcon, BookmarkIcon, PencilSquareIcon } from '@heroicons/vue/20/solid'
  import BaseModal from '../BaseModal.vue'
  import BaseHeader from '../BaseHeader.vue'
  import BaseButttonBack from '../BaseButttonBack.vue'
  import BaseImage from '../BaseImage.vue'

  const route = useRoute()
  const router = useRouter()
  let paramID = +route.params.id
  const store = useComputerStore()
  const officeNameStore = useOfficeNameStore()
  const employeeStore = useEmployeeStore()
  const updateData = reactive({
    id: paramID,
    asset_tag: '',
    serial_tag: '',
    brand: '',
    model: '',
    cpu: '',
    ai: '',
    graphic: '',
    screen_size: '',
    max_ram: '',
    harddisk_slot: '',
    lan_port: '',
    wireless: '',
    bluetooth: '',
    ram: '',
    harddisk: '',
    office_id: '',
    user_id: '',
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
    console.log('toggleUser value : ', editUser)
  }

  async function handleChange(event) {
    const value = event.target.value
    updateData.user_id = value
    console.log('updateData.user_id value', value)
    if (updateData.user_id !== '0') {
      await employeeStore.getEmployeeDetail(updateData.user_id)
      console.log('employee detail', employeeStore.employeeDetail)
      new_officeName.value = employeeStore.employeeDetail[0].office_name.name
    } else {
      editUser.value = false
      new_officeName.value = ''
      user_name.value = 'FREE'
      updateData.user_id = null
    }
  }

  onMounted(async () => {
    await store.getComputerDetail(paramID)
    // console.log('computerDetail : ', store.computerDetail)
    if (store.computerDetail[0]) {
      ; ((updateData.asset_tag = store.computerDetail[0].asset_tag),
        (updateData.serial_tag = store.computerDetail[0].serial_tag),
        (updateData.brand = store.computerDetail[0].brand),
        (updateData.model = store.computerDetail[0].model),
        (updateData.cpu = store.computerDetail[0].cpu),
        (updateData.ai = store.computerDetail[0].ai),
        (updateData.graphic = store.computerDetail[0].graphic),
        (updateData.screen_size = store.computerDetail[0].screen_size),
        (updateData.max_ram = store.computerDetail[0].max_ram),
        (updateData.harddisk_slot = store.computerDetail[0].harddisk_slot),
        (updateData.lan_port = store.computerDetail[0].lan_port),
        (updateData.wireless = store.computerDetail[0].wireless),
        (updateData.bluetooth = store.computerDetail[0].bluetooth),
        (updateData.ram = store.computerDetail[0].ram),
        (updateData.harddisk = store.computerDetail[0].harddisk),
        (updateData.office_id = store.computerDetail[0].office_id),
        (updateData.user_id = store.computerDetail[0].user_id))
    }
    if (store.computerDetail[0].employee) {
      // console.log('store.computerDetail[0].employee', store.computerDetail[0].employee)
      await employeeStore.getEmployeeDetail(store.computerDetail[0].user_id)
      user_name.value =
        employeeStore.employeeDetail[0].fname + ' ' + employeeStore.employeeDetail[0].lname
      user_officeName.value = employeeStore.employeeDetail[0].office_name.name
    } else {
      // employee data is not available-> computer is available in stock, free computer
      user_name.value = 'FREE' // Assign an empty string or a default value
    }
    updateData.user_id = employeeStore.id
  }) // END onMounted()

  const modalActive = ref(null)
  const toggleModal = () => {
    modalActive.value = !modalActive.value
  }

  async function editSubmit() {
    // TODO: validate data
    await store.updateComputer(paramID, updateData)
    router.push('/assets')
  }

  function deleteAssets(paramID) {
    store.deleteComputer(paramID)
    store.getComputerByOffice('0')
    router.push('/assets')
  }
</script>

<style scoped></style>
