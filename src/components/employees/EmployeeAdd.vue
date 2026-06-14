<template>
  <BaseHeader title="ADD NEW USER" :isShow="true" />
  <main
    class="w-full h-[clamp(300px,70dvh,900px)] mx-2 overflow-y-auto flex flex-col md:flex-row md:gap-x-8"
  >
    <div class="w-sm flex flex-col gap-2">
      <label for="fname">First Name</label>
      <input type="text" v-model.trim="newEmployee.fname" class="w-fit bg-sky-50 text-md p-1" />
      <label for="lname">Last Name</label>
      <input type="text" v-model.trim="newEmployee.lname" class="w-fit bg-sky-50 text-md p-1" />
      <label for="lname">Job Title </label>
      <input type="text" v-model.trim="newEmployee.job_title" class="w-fit bg-sky-50 text-md p-1" />
      <label for="department">Department</label>
      <select
        name="departmentName"
        id="departmentName"
        v-model.trim="newEmployee.department_id"
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
      <label for="offie_id">Office</label>
      <select
        name="officeName"
        id="officeName"
        v-model.trim="newEmployee.office_id"
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
      <p class="mb-2">Group Email : {{ newEmployee.email_group }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div v-for="items in officeNameStore.emailGroupName" :key="items.id" :value="items.name">
          <div class="flex flex-row my-1">
            <input
              type="checkbox"
              :value="items.email_group_name"
              v-model="newEmployee.email_group"
            />
            <p class="px-2 w-fit text-nowrap">{{ items.email_group_name }}</p>
          </div>
        </div>
      </div>
      <!-- Save Button -->
      <div>
        <form @submit.prevent="addSubmit" class="flex flex-row justify-between">
          <button
            class="flex items-center justify-center hover:bg-red-900 hover:scale-102 border border-red-900 hover:text-white py-1 px-4 mt-8 rounded-xl"
            type="button"
            @click="router.back()"
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
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { BookmarkIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useEmployeeStore } from '@/stores/employeeData'
import { useOfficeNameStore } from '@/stores/officeData'
import { useDepartmentStore } from '@/stores/departmentData.js'
import { useServiceLog } from '@/stores/service_log.js'

import BaseHeader from '../BaseHeader.vue'
// import BaseBox from '../BaseBox.vue'

const router = useRouter()
const employeeStore = useEmployeeStore()
const officeNameStore = useOfficeNameStore()
const departmentNameStore = useDepartmentStore()
const serviceLogStore = useServiceLog()
// console.log('office name', officeNameStore)
const newEmployee = reactive({
  fname: '',
  lname: '',
  job_title: '',
  department_id: '',
  office_id: null,
  email_group: [],
})
const newService = reactive({
  appointment_date: new Date(),
  asset_tag: '',
  state: 1,
  service_id: 1, // service name is always 'Add Email'
  detail: newEmployee,
})
officeNameStore.getGroupEmail()
// console.log('office name store', officeNameStore.email_groupName)
// function addSubmit() {
//   console.log('NewEmaployee object ', toRaw(newEmployee))
// }
// console.log('office name store', officeNameStore.email_groupName)
async function addSubmit() {
  try {
    // 1. add new user and email to employye table
    await employeeStore.addEmployee({ ...newEmployee })

    console.log('suscessfull add emaployee ')

    // 2. create Service IT card for notify it to add new email to exchange server
    await serviceLogStore.addService({ ...newService })

    console.log('suscessfull add service card')
  } catch (error) {
    return { data: undefined, error: error }
  } finally {
    Object.assign(newEmployee, {
      fname: '',
      lname: '',
      job_title: '',
      department_id: '',
      office_id: null,
      email_group: [],
    })
    // 3. if succss back to before page
    // alert('suscessfull add emaployee and service card')
    router.push('/employee')
  }
}
</script>
