<template>
  <BaseHeader title="EDIT USER" :isShow="true" />

  <main
    class="w-full h-[clamp(300px,70dvh,900px)] mx-2 overflow-y-auto flex flex-col md:flex-row md:gap-x-8"
  >
    <div class="bg-white">
      <form class="flex flex-col justify-center gap-2" @submit.prevent="editSubmit">
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
        <input type="text" v-model.trim="updateData.fname" class="bg-sky-50 text-md p-1" />
        <label for="lname">Last Name</label>
        <input type="text" v-model.trim="updateData.lname" class="bg-sky-50 text-md p-1" />
        <label for="email">Email</label>
        <input type="text" v-model.trim="updateData.email" class="bg-sky-50 text-md p-1" />
        <label for="department">Department</label>
        <select
          name="departmentName"
          id="departmentName"
          v-model.trim="updateData.department_id"
          class="bg-sky-50 py-2"
        >
          <option
            v-for="items in departmentNameStore.departmentAllName"
            :key="items.id"
            :value="items.id"
          >
            {{ items.name }}
          </option>
        </select>

        <label for="offie_id">Office Name</label>
        <select
          name="officeName"
          id="officeName"
          v-model.trim="updateData.office_id"
          class="bg-sky-50 py-2"
        >
          <option
            v-for="office_name in officeNameStore.officeName"
            :key="office_name.id"
            :value="office_name.id"
          >
            {{ office_name.name }}
          </option>
        </select>

        <div class="flex flex-row justify-between">
          <button
            class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-900 hover:scale-110 py-1 px-4 my-4 rounded-xl"
            type="submit"
          >
            <BookmarkIcon class="h-4 w-4 mr-2" />
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
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'

import { useEmployeeStore } from '@/stores/employeeData'
import { useOfficeNameStore } from '@/stores/officeData'
import { useDepartmentStore } from '@/stores/departmentData.js'

import { TrashIcon, BookmarkIcon } from '@heroicons/vue/20/solid'
import BaseModal from '../BaseModal.vue'
import BaseHeader from '../BaseHeader.vue'

const route = useRoute()
const router = useRouter()
const officeNameStore = useOfficeNameStore()
const departmentNameStore = useDepartmentStore()
const store = useEmployeeStore()
let paramID = +route.params.id
const updateData = reactive({
  id: paramID,
  fname: '',
  lname: '',
  email: '',
  department_id: '',
  office_id: '',
})

onMounted(async () => {
  await store.getEmployeeDetail(paramID)
  console.log('getstaffDetail: ', store.employeeDetail)
  if (store.employeeDetail[0]) {
    updateData.fname = store.employeeDetail[0].fname
    updateData.lname = store.employeeDetail[0].lname
    updateData.email = store.employeeDetail[0].email
    updateData.department_id = store.employeeDetail[0].department_name?.id || 'No department'
    updateData.office_id = store.employeeDetail[0].office_name.id
  } else {
    console.error(`ERROR Employee with ID ${paramID} not found.`)
  }
})

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}

async function editSubmit() {
  await store.updateEmployee(paramID, updateData)
  router.push('/employee')
}

function delEmployee(paramID) {
  // console.log('store.deleteUser: ', paramID)
  store.deleteEmployee(paramID)
  store.getEmployee()
  router.push('/employee')
}
</script>
