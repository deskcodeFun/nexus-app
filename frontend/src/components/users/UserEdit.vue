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
          <p>User ID: {{ updateData.id }}</p>

          <button
            class="flex items-center justify-center hover:bg-gray-200 hover:scale-102 hover:text-blue-900 py-1 px-4 rounded-xl"
            type="button" @click="toggleModal">
            <TrashIcon class="h-4 w-4 mr-1 text-gray-400 hover:text-red-700" />
          </button>
        </div>
        <label for="fname">First Name</label>
        <input type="text" v-model.trim="updateData.fname" class="bg-sky-50 text-md p-1" />
        <label for="lname">Last Name</label>
        <input type="text" v-model.trim="updateData.lname" class="bg-sky-50 text-md p-1" />
        <label for="email">Email</label>
        <input type="text" v-model.trim="updateData.email" class="bg-sky-50 text-md p-1" />

        <label for="department">Department</label>
        <input type="text" v-model.trim="updateData.department" class="bg-sky-50 text-md p-1" />
        <label for="offie_id">Office Name</label>
        <select name="officeName" id="officeName" v-model.trim="updateData.office_id" class="bg-sky-50 py-2">
          <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
            {{ office_name.name }}
          </option>
        </select>
        <!-- <input type="text" v-model.trim="updateData.office_id" class="bg-sky-50 text-md p-1" /> -->
        <!-- Show button -->
        <div class="flex flex-row justify-between">
          <BaseButttonBack />
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
            type="submit">
            <BookmarkIcon class="h-4 w-4 mr-1" />
            <span> Save </span>
          </button>

          <BaseModal :modalActive="modalActive" title="Delete user" @save-data="delUser(paramID)"
            @close-modal="modalActive = false">
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

  import { TrashIcon, BookmarkIcon } from '@heroicons/vue/20/solid'
  import BaseModal from '../BaseModal.vue'
  import BaseButttonBack from '../BaseButttonBack.vue'

  const route = useRoute()
  const router = useRouter()
  const officeNameStore = useOfficeNameStore()
  const store = useEmployeeStore()
  let paramID = +route.params.id
  // console.log('paramID from route:', paramID)

  // store.getStaffDetail(paramID)
  // console.log('getstaffDetail: ', store.staffDetail[0])

  const updateData = reactive({
    id: paramID,
    fname: '',
    lname: '',
    email: '',
    department: '',
    office_id: '',
  })
  onMounted(async () => {
    // Await the completion of the getStaffDetail action
    await store.getEmployeeDetail(paramID)
    console.log('getstaffDetail: ', store.employeeDetail)

    // After the data is loaded, populate updateData
    if (store.employeeDetail[0]) {
      updateData.fname = store.employeeDetail[0].fname
      updateData.lname = store.employeeDetail[0].lname
      updateData.email = store.employeeDetail[0].email
      updateData.department = store.employeeDetail[0].department
      updateData.office_id = store.employeeDetail[0].office_name.id
    } else {
      // Handle the case where no staff detail is found (e.g., redirect or show an error)
      console.error(`ERROR Employee with ID ${paramID} not found.`)
      // Example: Redirect to a 404 page or list page
      // router.push('/staff');
    }
  })
  const modalActive = ref(null)
  const toggleModal = () => {
    modalActive.value = !modalActive.value
  }



  async function editSubmit() {
    // TODO: validate data
    // check value in updateUser
    // console.log('updateUser in editSubmit() : ', updateData)
    await store.updateEmployee(paramID, updateData)
    // console.log('After add user: ', staff)
    router.push('/user')
  }
  function delUser(paramID) {
    console.log('store.deleteUser: ', paramID)
    store.deleteEmployee(paramID)
    store.getEmployee()
    router.push('/user')

  }
  // const deleteID = store.staffDetail[id].id
  // const delUser = (deleteID) => {
  //   store.deleteUser(deleteID)
  //   router.push('/user')
  // }
</script>
