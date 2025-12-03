<template>
  <header>
    <div class="flex flex-col justify-between bg-white sm:justify-normal py-16 px-2">
      <p class="text-lg tracking-widest mx-auto text-blue-900">EDIT USER</p>
    </div>
  </header>
  <main class="flex justify-center bg-white">
    <div class="w-2/5 bg-white">
      <form class="flex flex-col justify-center gap-2" @submit.prevent="editSubmit">
        <div class="flex flex-row justify-between">
          <label for="fname">First Name</label>
          <button
            class="flex items-center justify-center hover:bg-gray-200 hover:scale-102 hover:text-blue-900 py-1 px-4 rounded-xl"
            type="button"
            @click="toggleModal"
          >
            <TrashIcon class="h-4 w-4 mr-1 text-gray-400 hover:text-red-900" />
          </button>
        </div>
        <input type="text" v-model="fname" class="bg-sky-50 text-md p-1" />
        <label for="lname">Last Name</label>
        <input type="text" v-model="lname" class="bg-sky-50 text-md p-1" />
        <label for="email">Email</label>
        <input type="text" v-model="email" class="bg-sky-50 text-md p-1" />
        <label for="department">Department</label>
        <input type="text" v-model="department" class="bg-sky-50 text-md p-1" />

        <label for="offie_id">Office Name</label>
        <input type="text" v-model="office_id" class="bg-sky-50 text-md p-1" />
        <!-- Show button -->
        <div class="flex flex-row justify-between">
          <BaseButttonBack />
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
            type="submit"
          >
            <BookmarkIcon class="h-4 w-4 mr-1" />
            <span> Save </span>
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
    </div>

  </main>


</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

import { usersStore } from '@/stores/usersData'

import { TrashIcon, BookmarkIcon } from '@heroicons/vue/20/solid'
import BaseModal from '../BaseModal.vue'
import BaseButttonBack from '../BaseButttonBack.vue'

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
