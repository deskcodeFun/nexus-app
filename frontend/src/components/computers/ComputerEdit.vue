<template>
  <!-- Header -->
  <header>
    <div class="flex flex-col bg-white h-50 pt-16 px-2">
      <p class=" h-40 text-lg tracking-widest text-blue-900">COMPUTER DETAIL</p>
      <div class=" items-end">
        <BaseButttonBack />

      </div>
    </div>
  </header>

  <main class="py-4 px-8 bg-white flex flex-row text-blue-900">
    <!-- 3 section -->
    <div class="w-11/12 gap-16 sm:flex sm:flex-row bg-white">
      <!-- accounting section -->
      <div class="flex flex-col">
        <p class="sm:pb-4 text-lg tracking-wide">Accounting information</p>
        <p class="py-2 text-sm text-gray-500 tracking-widest">Asset Tag</p>
        <p class="bg-sky-50 text-md p-1 pr-4">{{ updateData.asset_tag }}</p>
        <p class="py-2 text-sm text-gray-500 tracking-widest">Serial Number</p>
        <p class="bg-sky-50 text-md p-1 pr-4">{{ updateData.serial_tag }}</p>
      </div>
      <!-- computer spec. section -->
      <!-- TODO:
          1. allow some field to edit 'ram','harddsik' 'user',office of computer
          2. define auth to edit NOT allow to all user
        -->
      <div class="flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Computer Specification</p>
        <p class="py-2 text-sm text-gray-500 tracking-widest">Brand</p>
        <input type="text" v-model="updateData.brand" class="bg-sky-50 text-md p-1" />
        <p class="py-2 text-sm text-gray-500 tracking-widest">Model</p>
        <input type="text" v-model="updateData.model" class="bg-sky-50 text-md p-1" />
        <p class="py-2 text-sm text-gray-500 tracking-widest">CPU</p>
        <input type="text" v-model="updateData.cpu" class="bg-sky-50 text-md p-1" />
        <!-- can edit computer spec. section -->
        <p class="py-2 text-sm text-gray-500 tracking-widest">RAM</p>
        <input type="text" v-model="updateData.ram" class="bg-sky-50 text-md p-1" />
        <p class="py-2 text-sm text-gray-500 tracking-widest">Hard Disk</p>
        <input type="text" v-model="updateData.harddisk" class="bg-sky-50 text-md p-1" />
        <p class="py-2 text-sm text-gray-500 tracking-widest">Office Name</p>
        <select name="officeName" id="officeName" v-model.trim="updateData.office_id" class="bg-sky-50 py-2 pr-2">
          <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
            {{ office_name.name }}
          </option>
        </select>
      </div>
      <!-- user info section -->
      <div class="flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">User Infomation</p>
        <div v-if="user_name === 'FREE'" class="pb-2">
          <label for="user_name">Status</label>
          <div class="bg-sky-50 text-md mb-2 font-bold text-green-800">{{ user_name }}</div>
        </div>
        <div v-else>
          <p class="py-2 text-sm text-gray-500 tracking-widest">User Name</p>
          <input type="text" v-model="user_name" class="bg-sky-50 text-md mb-2" />
          <p class="py-2 text-sm text-gray-500 tracking-widest">Office</p>
          <select name="officeName" id="officeName" v-model.trim="updateData.office_id" class="bg-sky-50 py-2 pr-2">
            <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
              {{ office_name.name }}
            </option>
          </select>
        </div>
        <!-- button section -->
        <form class="gap-2" @submit.prevent="editSubmit">
          <!-- Show button -->
          <div class="flex flex-row justify-between">
            <div class="flex flex-row justify-between">
              <button
                class="flex items-center justify-center border-1 bg-white hover:bg-red-900 hover:scale-102 text-red-800 hover:text-white py-1 px-4 mt-8 rounded-xl"
                type="button" @click="toggleModal">
                <TrashIcon class="h-4 w-4 mr-2 " /> Delete
              </button>
            </div>
            <!-- <BaseButttonBack /> -->
            <button
              class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
              type="submit">
              <BookmarkIcon class="h-4 w-4 mr-2" />
              <span> Save </span>
            </button>

            <BaseModal :modalActive="modalActive" title="Delete" @save-data="deleteComputer(deleteID)"
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
  import { ref, onMounted, reactive } from 'vue'

  import { useComputerStore } from '@/stores/computerData'
  import { useOfficeNameStore } from '@/stores/officeData'
  // import { useEmployeeStore } from '@/stores/employeeData'

  import { TrashIcon, BookmarkIcon } from '@heroicons/vue/20/solid'
  import BaseModal from '../BaseModal.vue'
  import BaseButttonBack from '../BaseButttonBack.vue'

  const route = useRoute()
  const router = useRouter()
  let paramID = +route.params.id
  const store = useComputerStore()
  const officeNameStore = useOfficeNameStore()
  // const employeeStore = useEmployeeStore()
  const updateData = reactive({
    id: paramID,
    asset_tag: '',
    serial_tag: '',
    brand: '',
    model: '',
    cpu: '',
    ram: '',
    harddisk: '',
    office_id: '',
  })
  // separate user from updateDATA to save edit
  const user_name = ref(null)

  onMounted(async () => {
    await store.getComputerDetail(paramID)
    if (store.computerDetail[0]) {
      updateData.asset_tag = store.computerDetail[0].asset_tag
      updateData.serial_tag = store.computerDetail[0].serial_tag
      updateData.brand = store.computerDetail[0].brand
      updateData.model = store.computerDetail[0].model
      updateData.cpu = store.computerDetail[0].cpu
      updateData.ram = store.computerDetail[0].ram
      updateData.harddisk = store.computerDetail[0].model
      updateData.office_id = store.computerDetail[0].office_id
      if (store.computerDetail[0].employee) {
        user_name.value =
          store.computerDetail[0].employee.fname + ' ' + store.computerDetail[0].employee.lname
      } else {
        // Handle the case where employee data is not available, e.g.,
        user_name.value = 'FREE' // Assign an empty string or a default value
      }
      // user_name.value =
      //   store.computerDetail[0].employee?.fname + ' ' + store.computerDetail[0].employee?.lname
    }
  })
  const modalActive = ref(null)
  const toggleModal = () => {
    modalActive.value = !modalActive.value
  }

  async function editSubmit() {
    // TODO: validate data
    await store.updateComputer(paramID, updateData)
    router.push('/assets')
  }

  function deleteComputer(paramID) {
    store.deleteComputer(paramID)
    router.push('/assets')
  }
</script>
