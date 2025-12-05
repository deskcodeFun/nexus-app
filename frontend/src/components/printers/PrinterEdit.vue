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
          <label for="asset_tag">Asset Tag</label>
          <button
            class="flex items-center justify-center hover:bg-gray-200 hover:scale-102 hover:text-blue-900 py-1 px-4 rounded-xl"
            type="button"
            @click="toggleModal"
          >
            <TrashIcon class="h-4 w-4 mr-1 text-gray-400 hover:text-red-700" />
          </button>
        </div>
        <input type="text" v-model="asset_tag" class="bg-sky-50 text-md p-1" />
        <label for="serial">Serial Number</label>
        <input type="text" v-model="serial" class="bg-sky-50 text-md p-1" />
        <label for="brand">Brand</label>
        <input type="text" v-model="brand" class="bg-sky-50 text-md p-1" />
        <label for="catalog">Catalog</label>
        <input type="text" v-model="catalog" class="bg-sky-50 text-md p-1" />

        <label for="user_name">User Name</label>
        <input type="text" v-model="user_name" class="bg-sky-50 text-md p-1" />
        <label for="office_name">Office Name</label>
        <input type="text" v-model="office_name" class="bg-sky-50 text-md p-1" />
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
            @save-data="delAsset(deleteID)"
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

import { useAssetsStore } from '@/stores/assetsData'

import { TrashIcon, BookmarkIcon } from '@heroicons/vue/20/solid'
import BaseModal from '../BaseModal.vue'
import BaseButttonBack from '../BaseButttonBack.vue'

const route = useRoute()
const router = useRouter()

const store = useAssetsStore()
let id = +route.params.id -1

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}

const catalog  = ref(store.assets[id].catalog)
const user_name  = ref(store.assets[id].user_name)
const office_name = ref(store.assets[id].office_name)
const asset_tag = ref(store.assets[id].asset_tag)
const serial = ref(store.assets[id].serial)
const brand = ref(store.assets[id].brand)

const editSubmit = () => {
  // TODO: validate data
  store.assets[id].catalog = catalog.value
  store.assets[id].user_name = user_name.value
  store.assets[id].office_name = office_name.value
  store.assets[id].asset_tag = asset_tag.value
  store.assets[id].serial = serial.value
  store.assets[id].brand = brand.value
  // console.log('After add user: ', staff)
  router.push('/assets')
}
const deleteID = store.assets[id].id
const delAsset = (deleteID) => {
  store.deleteAsset(deleteID)
  router.push('/assets')
}
</script>
