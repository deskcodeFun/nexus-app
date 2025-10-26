<template>
  <main class="w-auto flex flex-col px-4">
    <div class="flex flex-row justify-between py-2">
      <p class="font-semibold text-xl text-sky-900 text-shadow-lg">Edit User</p>
    </div>
    <div class="w-auto sm:max-w-screen-sm flex flex-col gap-2">
      <form class="sm:max-w-screen-sm flex flex-col gap-2" @submit.prevent="editSubmit">
        <label for="fname">First Name</label>
        <input
          type="text"
          v-model="fname"
          class="bg-sky-50/70 text-2xl p-2 rounded-xl focus:outline-blue-600 focus:shadow-xl focus:scale-101"
        />
        <label for="lname">Last Name</label>
        <input
          type="text"
          v-model="lname"
          class="bg-sky-50/70 text-2xl p-2 rounded-xl focus:outline-blue-600 focus:shadow-xl focus:scale-101"
        />
        <label for="email">Email</label>
        <input
          type="text"
          v-model="email"
          class="bg-sky-50/70 text-2xl p-2 rounded-xl focus:outline-blue-600 focus:shadow-xl focus:scale-101"
        />
        <label for="department">Department</label>
        <input
          type="text"
          v-model="department"
          class="bg-sky-50/70 text-2xl p-2 rounded-xl focus:outline-blue-600 focus:shadow-xl focus:scale-101"
        />

        <label for="offie_id">Office Name</label>
        <input
          type="number"
          v-model="office_id"
          class="bg-sky-50/70 text-2xl p-2 rounded-xl focus:outline-blue-600 focus:shadow-xl focus:scale-101"
        />

        <div class="flex flex-row gap-8 sm:justify-between">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 sm:px-8 mt-8 rounded-sm w-full sm:w-fit focus:outline-hidden focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 sm:px-8 mt-8 rounded-sm w-full sm:w-fit focus:outline-hidden focus:shadow-outline"
            type="button"
            @click="router.back()"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { mockStaff } from '@/dataMockup/staff'

const route = useRoute()
const router = useRouter()
let userId = route.params.id

const fname = ref(mockStaff[`${userId}`].fname)
const lname = ref(mockStaff[`${userId}`].lname)
const email = ref(mockStaff[`${userId}`].email)
const department = ref(mockStaff[`${userId}`].department)
const office_id = ref(mockStaff[`${userId}`].office_id)

const editSubmit = () => {
  // TODO: validate data
  mockStaff[userId].fname = fname.value
  mockStaff[userId].lname = lname.value
  mockStaff[userId].email = email.value
  mockStaff[userId].department = department.value
  mockStaff[userId].office_id = office_id.value
  // console.log('After add user: ', staff)
  router.back()
}

// console.log(' params', userId)
// console.log('mockStaff: ', mockStaff[`${userId}`].fname)
</script>
