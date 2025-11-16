<template>
  <main class="w-auto flex flex-col">
    <div class="flex flex-row mx-auto py-4">
      <p class="font-semibold text-2xl text-sky-900 text-shadow-lg">Edit User</p>
    </div>

    <form
      class="sm:max-w-screen-sm sm:mx-auto mx-2 w-auto sm:w-full flex flex-col gap-2"
      @submit.prevent="editSubmit"
    >
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
          class="flex items-center justify-center bg-blue-800 hover:bg-blue-900 hover:scale-102 text-white py-2 px-4 mt-8 rounded-full"
          type="submit"
        >
          <BookmarkIcon class="h-6 w-6 mr-1" />
          <span> Save </span>
        </button>
        <button
          class="flex items-center justify-center hover:bg-red-900 hover:text-white hover:scale-102 text-black bg-white/65 border-1 py-2 px-4 mt-8 rounded-full"
          type="button"
          @click="toggleModal"
        >
          <!-- Conmfire dialog -->
          <TrashIcon class="h-6 w-6 mr-1" />
          <span> Delete </span>
        </button>
        <BaseModal
          :modalActive="modalActive"
          title="Delete"
          @save-data="delUser(deleteID)"
          @close-modal="modalActive = false"
        >
          <p class="flex justify-center pt-4 text-blue-900 text-lg">Are you sure to delete ?</p>
        </BaseModal>
      </div>
    </form>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

import { usersStore } from '@/stores/usersData'

import { TrashIcon, BookmarkIcon } from '@heroicons/vue/20/solid'
import BaseModal from '../BaseModal.vue'

const route = useRoute()
const router = useRouter()

const store = usersStore()
let id = +route.params.id

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}

const fname = ref(store.users[id].fname)
const lname = ref(store.users[id].lname)
const email = ref(store.users[id].email)
const department = ref(store.users[id].department)
const office_id = ref(store.users[id].office_id)

const editSubmit = () => {
  // TODO: validate data
  store.users[id].fname = fname.value
  store.users[id].lname = lname.value
  store.users[id].email = email.value
  store.users[id].department = department.value
  store.users[id].office_id = office_id.value
  // console.log('After add user: ', staff)
  router.push('/user')
}
const deleteID = store.users[id].id
const delUser = (deleteID) => {
  store.deleteUser(deleteID)
  router.push('/user')
}
</script>
