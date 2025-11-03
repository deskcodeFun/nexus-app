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
            @click="toggleModal"
          >
            <!-- Conmfire dialog -->
            Delete
          </button>
        </div>

        <BaseModal :modalActive="modalActive" @close-modal="toggleModal" @save-data="delUser">
          <div>
            <h1 class="px-4 py-2 bg-red-600 font-semibold text-xl text-white">Delete User</h1>
            <p class="px-16 text-lg mt-4">Are you sure to DELETE USER ?</p>
            <p class="px-16 text-lg mt-4">user name:{{ store.users[idx].fname }}</p>
          </div>
        </BaseModal>
      </form>
    </div>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

import { usersStore } from '@/stores/usersData'
import BaseModal from '../BaseModal.vue'

const route = useRoute()
const router = useRouter()
const store = usersStore()
let userId = route.params.id
let idx = userId - 1

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}
// console.log('id in edit mode', userId)
// console.log('data in userId', store.users[idx])

const fname = ref(store.users[idx].fname)
const lname = ref(store.users[idx].lname)
const email = ref(store.users[idx].email)
const department = ref(store.users[idx].department)
const office_id = ref(store.users[idx].office_id)

const editSubmit = () => {
  // TODO: validate data
  store.users[idx].fname = fname.value
  store.users[idx].lname = lname.value
  store.users[idx].email = email.value
  store.users[idx].department = department.value
  store.users[idx].office_id = office_id.value
  // console.log('After add user: ', staff)
  router.back()
}

function delUser() {
  let id = userId
  let idx = id - 1
  console.log('user Id to delete : ', id, 'index is: ', idx)
  if (store.users && Array.isArray(store.users)) {
    store.users = store.users.filter((user) => user.id !== userId)
    console.log('User with ID ', userId, 'Deleted.')
  } else {
    console.warn('store.users.value is not an array or is undefined. Cannot delete user.')
  }
  router.back('/user')
  // store.users = store.users.filter((user) => store.users.id !== user.id)
  // store.users = store.users.splice(store.users.indexOf(store.users), 5)
}
</script>
