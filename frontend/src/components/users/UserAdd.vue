<template>
  <header>
    <div class="flex flex-col justify-between bg-white sm:justify-normal py-16 px-2">
      <p class="text-lg tracking-widest mx-auto text-blue-900">ADD NEW USER</p>
    </div>
  </header>
  <main class="flex justify-center bg-white">
    <div class="w-2/5">
      <form class="flex flex-col justify-center gap-2" @submit.prevent="addSubmit">
        <label for="fname">First Name</label>
        <input type="text" v-model.trim="fname" class="bg-sky-50 text-md p-1" />
        <label for="lname">Last Name</label>
        <input type="text" v-model.trim="lname" class="bg-sky-50 text-md p-1" />
        <label for="email">Email</label>
        <input type="text" v-model.trim="email" class="bg-sky-50 text-md p-1" />
        <label for="department">Department</label>
        <input type="text" v-model.trim="department" class="bg-sky-50 text- p-1" />

        <label for="offie_id">Office</label>
        <select name="officeName" id="officeName" v-model.trim="office_id" class="bg-sky-50 py-2">
          <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
            {{ office_name.name }}
          </option>
        </select>
        <!-- <p>select office: {{ office_id }}</p> -->
        <!-- Save Button -->
        <div class="flex flex-row justify-between">
          <BaseButttonBack />
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
            type="submit">
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
  // import { users } from '@/dataMockup/staff'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  import { useEmployeeStore } from '@/stores/employeeData'
  import { useOfficeNameStore } from '@/stores/officeData'

  import BaseButttonBack from '../BaseButttonBack.vue'


  const router = useRouter()

  const employeeStore = useEmployeeStore()
  const officeNameStore = useOfficeNameStore()
  console.log('office name', officeNameStore)
  const fname = ref('')
  const lname = ref('')
  const email = ref('')
  const department = ref('')
  const office_id = ref('')

  const addSubmit = () => {
    // compute a simple next id (fallback to 1)

    const newEmployee = {
      fname: fname.value,
      lname: lname.value,
      email: email.value,
      department: department.value,
      office_id: office_id.value,
    }

    // console.log('newEmployee ', newUser)
    // emit the new user to parent instead of mutating prop
    // store.users.push(newUser)
    employeeStore.addEmployee(newEmployee)

    // reset inputs
    fname.value = ''
    lname.value = ''
    email.value = ''
    department.value = ''
    office_id.value = ''
    // navigate back to user list
    // employeeStore.getAllStaff()
    employeeStore.getEmployee()
    router.push('/user')
  }
</script>
