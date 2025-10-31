<template>
  <header class="w-fit flex flex-row p-4 sm:pl-8 py-2">
    <p class="font-semibold text-xl text-sky-900 text-shadow-lg">Add New User</p>
  </header>

  <main class="flex flex-col p-2 w-auto sm:pl-8">
    <form class="sm:max-w-screen-sm flex flex-col gap-2" @submit.prevent="addSubmit">
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

      <!-- Save Button -->
      <div class="flex flex-row justify-between">
        <button
          class="flex items-center justify-center bg-blue-800 hover:bg-blue-900 hover:scale-102 text-white py-2 px-4 mt-8 rounded-full"
          type="submit"
        >
          <BookmarkIcon class="h-6 w-6 mr-1" />
          <span> Save </span>
        </button>
        <button
          @click="router.push('/user')"
          type="button"
          class="flex items-center justify-center bg-gray-700 hover:bg-gray-900 hover:scale-102 text-white py-2 px-4 mt-8 rounded-full"
        >
          <ChevronDoubleLeftIcon class="h-6 w-6 mr-1" />
          <span> Back </span>
        </button>
      </div>
    </form>
  </main>
</template>

<script setup>
import { ChevronDoubleLeftIcon, BookmarkIcon } from '@heroicons/vue/20/solid'
// import { users } from '@/dataMockup/staff'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { usersStore } from '@/stores/usersData'

const router = useRouter()

const store = usersStore()

const fname = ref('')
const lname = ref('')
const email = ref('')
const department = ref('')
const office_id = ref('')

const addSubmit = () => {
  // compute a simple next id (fallback to 1)
  const staffId = store.users && Array.isArray(store.users) ? store.users.length + 1 : 1
  const newUser = {
    id: staffId,
    fname: fname.value,
    lname: lname.value,
    email: email.value,
    department: department.value,
    office_id: office_id.value,
  }

  console.log('newUser ', newUser)
  // emit the new user to parent instead of mutating prop
  store.users.push(newUser)

  // reset inputs
  fname.value = ''
  lname.value = ''
  email.value = ''
  department.value = ''
  office_id.value = ''
  // navigate back to user list
  router.push('/user')
}
</script>
