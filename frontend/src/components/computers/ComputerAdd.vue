<template>
  <header>
    <div class="flex flex-col justify-between bg-white sm:justify-normal py-16 px-2">
      <p class="text-lg tracking-widest mx-auto text-blue-900">ADD NEW COMPUTER</p>
    </div>
  </header>
  <main class="flex justify-center bg-white">
    <div class="w-2/5">
      <form class="flex flex-col justify-center gap-2" @submit.prevent="addSubmit">
        <!-- <label for="id">ID</label>
        <input type="text" v-model="id" class="bg-sky-50 text-md p-1" /> -->
        <label for="catalog">Catalog</label>
        <input type="text" v-model="catalog" class="bg-sky-50 text-md p-1" />
        <label for="email">User Name</label>
        <input type="text" v-model="user_name" class="bg-sky-50 text-md p-1" />
        <label for="department">Office</label>
        <input type="text" v-model="office_name" class="bg-sky-50 text- p-1" />

        <label for="offie_id">Asset Tag</label>
        <input type="number" v-model="asset_tag" class="bg-sky-50 text-md p-1" />

        <label for="offie_id">Serial Tag</label>
        <input type="number" v-model="serial" class="bg-sky-50 text-md p-1" />
        <label for="offie_id">Brand</label>
        <input type="number" v-model="brand" class="bg-sky-50 text-md p-1" />

        <!-- Save Button -->
        <div class="flex flex-row justify-between">
          <BaseButttonBack />
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
            type="submit"
          >
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
import { useAssetsStore } from '@/stores/assetsData'

import BaseButttonBack from '../BaseButttonBack.vue'

const router = useRouter()

const store = useAssetsStore()

const catalog = ref('')
const user_name = ref('')
const office_name = ref('')
const asset_tag = ref('')
const serial = ref('')
const brand = ref('')

const assetId =
  store.$state.assets && Array.isArray(store.$state.assets) ? store.$state.assets.length + 1 : 1
console.log('assetId',assetId)
const addSubmit = () => {
  // compute a simple next id (fallback to 1)
  const newAsset = {
    id: assetId,
    catalog: catalog.value,
    user_name: user_name.value,
    office_name: office_name.value,
    asset_tag: asset_tag.value,
    serial: serial.value,
    brand: brand.value,
  }
  // console.log('newUser ', newUser)
  // emit the new user to parent instead of mutating prop
  // store.users.push(newUser)
  store.addAsset(newAsset)

  // reset inputs
  catalog.value = ''
  user_name.value = ''
  office_name.value = ''
  asset_tag.value = ''
  serial.value = ''
  brand.value = ''
  // navigate back to user list
  router.push('/assets')
}
</script>
