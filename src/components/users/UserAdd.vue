<template>
  <header class="flex flex-row justify-between p-4 sm:pl-8 py-2">
    <p class="font-semibold text-xl text-sky-900 text-shadow-lg">Add New User</p>
    <button
      @click="router.back()"
      class="flex flex-row mt-1 ml-4 px-2 rounded-sm border-1 border-blue-800 text-blue-900 font-semibold bg-white/25 hover:bg-blue-900 hover:text-white"
    >
      <ChevronDoubleLeftIcon class="h-6 w-6 mr-1 text-gray-500" />

      Back
    </button>
  </header>

  <main class="flex flex-col p-2 sm:pl-8">
    <form class="w-auto sm:max-w-screen-sm flex flex-col gap-2" @submit.prevent="addSubmit">
      <label for="fname">First Name</label>
      <input type="text" v-model="fname" class="bg-sky-50 text-2xl" />
      <label for="lname">Last Name</label>
      <input type="text" v-model="lname" class="bg-sky-50 text-2xl" />
      <label for="email">Email</label>
      <input type="text" v-model="email" class="bg-sky-50 text-2xl" />
      <label for="department">Department</label>
      <input type="text" v-model="department" class="bg-sky-50 text-2xl" />

      <label for="offie_id">Office Name</label>
      <input type="number" v-model="office_id" class="bg-sky-50 text-2xl" />
    </form>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 mt-8 rounded-sm w-full sm:w-fit focus:outline-hidden focus:shadow-outline"
      type="submit"
      @click="addSubmit"
    >
      Save
    </button>
  </main>
</template>

<script setup>
import { ChevronDoubleLeftIcon } from '@heroicons/vue/20/solid'
import { mockStaff } from '@/dataMockup/staff'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

const router = useRouter()

const staff = reactive(mockStaff)
const fname = ref('')
const lname = ref('')
const email = ref('')
const department = ref('')
const office_id = ref('')
const newUser = reactive({
  fname: fname,
  lname: lname,
  email: email,
  department: department,
  office_id: office_id,
})
const addSubmit = () => {
  // console.log(newUser)
  // TODO: validate data
  staff.push(newUser)
  // console.log('After add user: ', staff)
  router.back()
}
</script>
