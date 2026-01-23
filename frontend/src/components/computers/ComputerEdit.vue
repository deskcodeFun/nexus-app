<template>
  <header>
    <div class="flex flex-col justify-between bg-white sm:justify-normal py-16 px-2">
      <p class="text-lg tracking-widest mx-auto text-blue-900">COMPUTER DETAIL</p>
    </div>
  </header>
  <main class="flex justify-center bg-white">
    <div class="w-2/5 bg-white">
      <form class="flex flex-col justify-center gap-2" @submit.prevent="editSubmit">
        <div class="flex flex-row justify-between">
          <label for="asset_tag">Asset Tag</label>
          <button
            class="flex items-center justify-center hover:bg-gray-200 hover:scale-102 hover:text-blue-900 py-1 px-4 rounded-xl"
            type="button" @click="toggleModal">
            <TrashIcon class="h-4 w-4 mr-1 text-gray-400 hover:text-red-700" />
          </button>
        </div>
        <input type="text" v-model="updateData.asset_tag" class="bg-sky-50 text-md p-1" />
        <label for="serial">Serial Number</label>
        <input type="text" v-model="updateData.serial" class="bg-sky-50 text-md p-1" />
        <label for="brand">Brand</label>
        <input type="text" v-model="updateData.brand" class="bg-sky-50 text-md p-1" />
        <label for="catalog">Model</label>
        <input type="text" v-model="updateData.model" class="bg-sky-50 text-md p-1" />
        <label for="catalog">CPU</label>
        <input type="text" v-model="updateData.cpu" class="bg-sky-50 text-md p-1" />
        <label for="catalog">RAM</label>
        <input type="text" v-model="updateData.ram" class="bg-sky-50 text-md p-1" />
        <label for="catalog">Hard Disk</label>
        <input type="text" v-model="updateData.harddisk" class="bg-sky-50 text-md p-1" />

        <label for="user_name">User Name</label>
        <input type="text" v-model="updateData.user_name" class="bg-sky-50 text-md p-1" />
        <label for="office_name">Office Name</label>
        <input type="text" v-model="updateData.officeName" class="bg-sky-50 text-md p-1" />
        <!-- Show button -->
        <div class="flex flex-row justify-between">
          <BaseButttonBack />
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
            type="submit">
            <BookmarkIcon class="h-4 w-4 mr-1" />
            <span> Save </span>
          </button>

          <BaseModal :modalActive="modalActive" title="Delete" @save-data="deleteComputer(deleteID)"
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
  import { ref, onMounted, reactive } from 'vue'

  import { useComputerStore } from '@/stores/computerData'

  import { TrashIcon, BookmarkIcon } from '@heroicons/vue/20/solid'
  import BaseModal from '../BaseModal.vue'
  import BaseButttonBack from '../BaseButttonBack.vue'

  const route = useRoute()
  const router = useRouter()
  let paramID = +route.params.id
  const store = useComputerStore()
  const updateData = reactive({
    id: paramID,
    asset_tag: '',
    serial: '',
    brand: '',
    user_name: '',
    officeName: '',
  })

  onMounted(async () => {
    await store.getComputerDetail(paramID)
    if (store.computerDetail[0]) {
      updateData.asset_tag = store.computerDetail[0].asset_tag
      updateData.serial = store.computerDetail[0].serial_tag
      updateData.brand = store.computerDetail[0].brand
      updateData.model = store.computerDetail[0].model
      updateData.cpu = store.computerDetail[0].cpu
      updateData.ram = store.computerDetail[0].ram
      updateData.harddisk = store.computerDetail[0].model
      updateData.user_name =
        store.computerDetail[0].staff.fname + ' ' + store.computerDetail[0].staff.lname
      updateData.officeName = store.computerDetail[0].office_name.name
    }
  })
  const modalActive = ref(null)
  const toggleModal = () => {
    modalActive.value = !modalActive.value
  }

  async function editSubmit() {
    // TODO: validate data
    await store.updateComputer(paramID, updateData)
    router.push('/assets')
  }

  function deleteComputer(paramID) {
    store.deleteComputer(paramID)
    router.push('/assets')
  }
</script>
