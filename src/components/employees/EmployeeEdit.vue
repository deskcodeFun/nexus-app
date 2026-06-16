<template>
  <BaseHeader title="EDIT USER" :isShow="true" />

  <main
    class="w-full h-[clamp(300px,70dvh,900px)] mx-2 overflow-y-auto flex flex-col md:flex-row md:gap-x-8"
  >
    <div class="w-sm flex flex-col gap-2">
      <div class="flex flex-row justify-between">
        <label for="fname">First Name</label>
        <button
          class="flex items-center justify-center hover:bg-gray-200 hover:scale-102 hover:text-blue-900 py-1 px-4 rounded-xl"
          type="button"
          @click="toggleModal"
        >
          <TrashIcon class="h-4 w-4 mr-1 text-gray-400 hover:text-red-700" />
        </button>
      </div>
      <input type="text" v-model.trim="updateEmployee.fname" class="w-fit bg-sky-50 text-md p-1" />

      <label for="lname">Last Name</label>
      <input type="text" v-model.trim="updateEmployee.lname" class="w-fit bg-sky-50 text-md p-1" />
      <label for="lname">Job Title </label>
      <input
        type="text"
        v-model.trim="updateEmployee.job_title"
        class="w-fit bg-sky-50 text-md p-1"
      />
      <label for="department" class="flex flex-row"
        >Department
        <span class="ml-4 text-blue-900 font-semibold">{{ currentDepartmantName }}</span>
      </label>
      <select
        name="departmentName"
        id="departmentName"
        v-model.trim="updateEmployee.department_id"
        class="w-fit px-2 text-blue-900 bg-sky-50 py-2"
      >
        <option
          v-for="items in departmentNameStore.departmentAllName"
          :key="items.id"
          :value="items.id"
          class="bg-white"
        >
          {{ items.name }}
        </option>
      </select>
      <label for="offie_id" class="flex flex-row"
        >Office <span class="ml-4 text-blue-900 font-semibold">{{ currentOfficeName }}</span></label
      >
      <select
        name="officeName"
        id="officeName"
        v-model.trim="updateEmployee.office_id"
        class="w-fit px-2 text-blue-900 bg-sky-50 py-2 mb-4"
      >
        <option
          v-for="office_name in officeNameStore.officeName"
          :key="office_name"
          :value="office_name.id"
          class="bg-white"
        >
          {{ office_name.name }}
        </option>
      </select>
      <!-- <p>Office Address</p>
      <div v-for="(items, index) in officeNameStore.office_address" :key="index">
        <BaseBox :label="index" :data="items"></BaseBox>
      </div> -->
    </div>
    <!-- email column and save button-->
    <div>
      <p class="mb-2">Group Email : {{ updateEmployee.email_group }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div v-for="items in officeNameStore.emailGroupName" :key="items.id" :value="items.name">
          <div class="flex flex-row my-1">
            <input
              type="checkbox"
              :value="items.email_group_name"
              v-model="updateEmployee.email_group"
            />
            <p class="px-2 w-fit text-nowrap">{{ items.email_group_name }}</p>
          </div>
        </div>
      </div>
      <!-- Save Button -->
      <div>
        <form @submit.prevent="editSubmit" class="flex flex-row justify-between">
          <button
            class="flex items-center justify-center hover:bg-red-900 hover:scale-102 border border-red-900 hover:text-white py-1 px-4 mt-8 rounded-xl"
            type="submit"
          >
            <XMarkIcon class="h-4 w-4 mr-2" />
            <span> Cancel </span>
          </button>
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
            type="submit"
          >
            <BookmarkIcon class="h-4 w-4 mr-1" />
            <span> Save </span>
          </button>
          <BaseModal
            :modalActive="modalActive"
            title="Delete user"
            @save-data="delEmployee(paramID)"
            @close-modal="modalActive = false"
          >
            <p class="flex justify-center pt-4 text-blue-900 text-lg">Are you sure to delete ?</p>
          </BaseModal>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'

import { useEmployeeStore } from '@/stores/employeeData'
import { useOfficeNameStore } from '@/stores/officeData'
import { useDepartmentStore } from '@/stores/departmentData.js'

import { TrashIcon, BookmarkIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import BaseModal from '../BaseModal.vue'
import BaseHeader from '../BaseHeader.vue'

const route = useRoute()
const router = useRouter()
const officeNameStore = useOfficeNameStore()
const departmentNameStore = useDepartmentStore()
const currentDepartmantName = ref(null)
const currentOfficeName = ref(null)
const store = useEmployeeStore()
let paramID = +route.params.id
const updateEmployee = reactive({
  id: paramID,
  fname: '',
  lname: '',
  job_title: '',
  department_id: '',
  office_id: '',
  email_group: [],
})
officeNameStore.getGroupEmail()

onMounted(async () => {
  await store.getEmployeeDetail(paramID)
  console.log('getstaffDetail: ', store.employeeDetail)
  if (store.employeeDetail[0]) {
    updateEmployee.fname = store.employeeDetail[0].fname
    updateEmployee.lname = store.employeeDetail[0].lname
    updateEmployee.job_title = store.employeeDetail[0].job_title
    updateEmployee.department_id = store.employeeDetail[0].department_name?.id || '-'
    currentDepartmantName.value = store.employeeDetail[0].department_name?.name || '-'
    updateEmployee.office_id = store.employeeDetail[0].office_name?.id || '-'
    currentOfficeName.value = store.employeeDetail[0].office_name?.name || '-'
    updateEmployee.email_group = store.employeeDetail[0].email_group
  } else {
    console.error(`ERROR Employee with ID ${paramID} not found.`)
  }
})

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}

async function editSubmit() {
  try {
    await store.updateEmployee(paramID, updateEmployee)
  } catch (error) {
    console.log('Can noet Edit Employee', error)
  } finally {
    Object.assign(updateEmployee, {
      fname: '',
      lname: '',
      job_title: '',
      department_id: '',
      office_id: null,
      email_group: [],
    })
    router.push('/employee')
  }
}

function delEmployee(paramID) {
  // console.log('store.deleteUser: ', paramID)
  store.deleteEmployee(paramID)
  store.getEmployee()
  router.push('/employee')
}
</script>
