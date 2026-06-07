<template>
  <BaseHeader title="ADD NEW Email" :isShow="true" />

  <main class="flex pl-8 py-4 bg-white">
    <div>
      <form class="flex flex-col justify-center gap-2" @submit.prevent="addSubmit">
        <label for="fname">First Name</label>
        <input type="text" v-model.trim="newEmployee.fname" class="bg-sky-50 text-md p-1" />
        <label for="lname">Last Name</label>
        <input type="text" v-model.trim="newEmployee.lname" class="bg-sky-50 text-md p-1" />
        <label for="lname">Job Titles</label>
        <input type="text" v-model.trim="newEmployee.title" class="bg-sky-50 text-md p-1" />
        <label for="department">Department</label>
        <input type="text" v-model.trim="newEmployee.department" class="bg-sky-50 text-md p-1" />
        <label for="department">Office</label>
        <input type="text" v-model.trim="newEmployee.office" class="bg-sky-50 text-md p-1" />
        <label for="department">Office Phone</label>
        <input
          type="text"
          v-model.trim="officeNameStore.office_address.phone"
          class="bg-sky-50 text-md p-1"
        />
        <label for="email">Fax Number</label>
        <input
          type="text"
          v-model.trim="officeNameStore.office_address.fax"
          class="bg-sky-50 text- p-1"
        />
        <label for="email">Mobile</label>
        <input type="text" v-model.trim="newEmployee.mobile" class="bg-sky-50 text- p-1" />
        <label for="email">Address</label>
        <input
          type="text"
          v-model.trim="officeNameStore.office_address.address"
          class="bg-sky-50 text- p-1"
        />
        <label for="email">City</label>
        <input
          type="text"
          v-model.trim="officeNameStore.office_address.city"
          class="bg-sky-50 text- p-1"
        />
        <label for="email">State</label>
        <input
          type="text"
          v-model.trim="officeNameStore.office_address.state"
          class="bg-sky-50 text- p-1"
        />
        <label for="email">Zip Code</label>
        <input
          type="text"
          v-model.trim="officeNameStore.office_address.zip"
          class="bg-sky-50 text- p-1"
        />
        <label for="email">Group Email</label>
        <input
          type="text"
          v-model.trim="officeNameStore.getGroupEmail"
          class="bg-sky-50 text- p-1"
        />

        <select
          name="officeName"
          id="officeName"
          v-model.trim="newEmployee.office_id"
          class="bg-sky-50 py-2"
        >
          <option
            v-for="office_name in officeNameStore.officeName"
            :key="office_name"
            :value="office_name.id"
          >
            {{ office_name.name }}
          </option>
        </select>
        <!-- Save Button -->
        <div class="flex flex-row justify-between">
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
            type="submit"
          >
            <BookmarkIcon class="h-4 w-4 mr-1" />
            <span> Save </span>
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { BookmarkIcon } from '@heroicons/vue/20/solid'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useEmployeeStore } from '@/stores/employeeData'
import { useOfficeNameStore } from '@/stores/officeData'

import BaseHeader from '../BaseHeader.vue'

const router = useRouter()
const employeeStore = useEmployeeStore()
const officeNameStore = useOfficeNameStore()
// console.log('office name', officeNameStore)
const newEmployee = reactive({
  fname: '',
  lname: '',
  email: '',
  department: '',
  office_id: null,
})

async function addSubmit() {
  try {
    await employeeStore.addEmployee({ ...newEmployee })
  } catch (error) {
    console.error('Can not Add new Employee: ', error)
  } finally {
    Object.assign(newEmployee, {
      fname: '',
      lname: '',
      email: '',
      department: '',
      office_id: null,
    })
    router.push('/employee')
  }
}
</script>
