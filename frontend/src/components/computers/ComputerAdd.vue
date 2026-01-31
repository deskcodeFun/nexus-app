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
        <label for="brand">Brand</label>
        <input type="text" v-model.trim="brand" class="bg-sky-50 text-md p-1" />
        <label for="model">Model</label>
        <input type="text" v-model.trim="model" class="bg-sky-50 text-md p-1" />
        <label for="serial_tag">Serial</label>
        <input type="text" v-model.trim="serial_tag" class="bg-sky-50 text-md p-1" />
        <label for="asset_tag">Asset Tag</label>
        <input type="text" v-model.trim="asset_tag" class="bg-sky-50 text-md p-1" />
        <label for="cpu">CPU</label>
        <input type="text" v-model.trim="cpu" class="bg-sky-50 text-md p-1" />
        <label for="Ram">Ram</label>
        <input type="text" v-model.trim="ram" class="bg-sky-50 text-md p-1" />
        <label for="harddisk">Hard disk</label>
        <input type="text" v-model.trim="harddisk" class="bg-sky-50 text-md p-1" />

        <label for="office_id">Office</label>
        <select name="officeName" id="officeName" v-model.trim="office_id" class="bg-sky-50 py-2">
          <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
            {{ office_name.name }}
          </option>
        </select>

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
  import { useComputerStore } from '@/stores/computerData'
  import { useOfficeNameStore } from '@/stores/officeData'

  import BaseButttonBack from '../BaseButttonBack.vue'

  const router = useRouter()

  const store = useComputerStore()
  const officeNameStore = useOfficeNameStore()

  const brand = ref('')
  const model = ref('')
  const serial_tag = ref('')
  const asset_tag = ref('')
  const cpu = ref('')
  const ram = ref('')
  const harddisk = ref('')
  const office_id = ref('')
  const user_id = ref(0)

  // use array data type so we have to create assetID
  // const assetId =
  //   store.$state.assets && Array.isArray(store.$state.assets) ? store.$state.assets.length + 1 : 1
  // console.log('assetId', assetId)

  const addSubmit = () => {
    // compute a simple next id (fallback to 1)
    const newComputer = {
      brand: brand.value,
      model: model.value,
      serial_tag: serial_tag.value,
      asset_tag: asset_tag.value,
      cpu: cpu.value,
      ram: ram.value,
      harddisk: harddisk.value,
      office_id: office_id.value,
      user_id: user_id.value
    }
    console.log('newUser ', newComputer)
    // emit the new user to parent instead of mutating prop
    // store.users.push(newUser)
    store.addComputer(newComputer)

    // reset inputs
    brand.value = ''
    model.value = ''
    serial_tag.value = ''
    asset_tag.value = ''
    cpu.value = ''
    ram.value = ''
    harddisk.value = ''
    office_id.value = ''
    // navigate back to user list
    router.push('/assets')
  }
</script>
