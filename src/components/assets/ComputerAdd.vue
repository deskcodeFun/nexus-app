<template>
  <main class="py-4 px-8 bg-white flex flex-row text-blue-900">
    <div class="gap-16 sm:flex sm:flex-row bg-white">
      <!-- 3 section -->
      <div class="gap-16 sm:flex sm:flex-row bg-white">
        <!-- accounting section -->
        <div class="w-fit text-nowrap flex flex-col">
          <p class="sm:pb-4 text-lg tracking-wide">Accounting information</p>
          <label for="asset_tag" class="label">Asset Tag</label>
          <input type="text" v-model.trim="newComputer.asset_tag" class="bg-sky-50 text-md p-1" />
          <label for="serial_tag" class="label">Serial</label>
          <input type="text" v-model.trim="newComputer.serial_tag" class="bg-sky-50 text-md p-1" />
          <label for="brand" class="label">Brand</label>
          <input type="text" v-model.trim="newComputer.brand" class="bg-sky-50 text-md p-1" />
          <label for="model" class="label">Model</label>
          <input type="text" v-model.trim="newComputer.model" class="bg-sky-50 text-md p-1" />

          <label for="color" class="label">Color</label>
          <input type="text" v-model.trim="newComputer.color" class="bg-sky-50 text-md p-1" />
          <label for="description" class="label">Description</label>
          <textarea row="6" v-model.trim="newComputer.description" class="bg-sky-50 text-md p-1" />
        </div>
        <!-- computer spec. section -->
        <div class="w-fit text-nowrap flex flex-col">
          <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Computer Specification</p>
          <label for="cpu" class="label">CPU</label>
          <input type="text" v-model.trim="newComputer.spec.cpu" class="bg-sky-50 text-md p-1" />
          <label for="Ram" class="label">Ram</label>
          <input type="text" v-model.trim="newComputer.spec.ram" class="bg-sky-50 text-md p-1" />
          <label for="Ram" class="label">Max Ram</label>
          <input type="text" v-model.trim="newComputer.spec.max_ram" class="bg-sky-50 text-md p-1" />
          <label for="Ram" class="label">Hard Disk slot</label>
          <input type="text" v-model.trim="newComputer.spec.harddisk_slot" class="bg-sky-50 text-md p-1" />
          <label for="Ram" class="label">Lan</label>
          <input type="text" v-model.trim="newComputer.spec.lan_port" class="bg-sky-50 text-md p-1" />
          <label for="Ram" class="label">Wireless</label>
          <input type="text" v-model.trim="newComputer.spec.wireless" class="bg-sky-50 text-md p-1" />
          <label for="Ram" class="label">Bluetooth</label>
          <input type="text" v-model.trim="newComputer.spec.bluetooth" class="bg-sky-50 text-md p-1" />
        </div>
        <div class="w-fit pt-11 text-nowrap flex flex-col">
          <label for="harddisk" class="label">Hard disk</label>
          <input type="text" v-model.trim="newComputer.spec.harddisk" class="bg-sky-50 text-md p-1" />
          <label for="cpu" class="label">AI Chipset</label>
          <input type="text" v-model.trim="newComputer.spec.ai" class="bg-sky-50 text-md p-1" />
          <label for="cpu" class="label">Graphic Chipset</label>
          <input type="text" v-model.trim="newComputer.spec.graphic" class="bg-sky-50 text-md p-1" />
          <label for="cpu" class="label">Screen Size</label>
          <input type="text" v-model.trim="newComputer.spec.screen_size" class="bg-sky-50 text-md p-1" />
          <p class="py-2 text-sm text-gray-500">Office Name</p>
          <select name="officeName" id="officeName" v-model.trim="newComputer.office_id"
            class="text-lg bg-blue-100 py-2 px-4">
            <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
              {{ office_name.name }}
            </option>
          </select>
        </div>
        <!-- Upload computer image  -->
        <div class="flex flex-col">
          <p class="pb-8">UPLOAD image</p>
          <div class="flex flex-row w-md h-50 bg-sky-50 border border-blue-800 rounded-xl"></div>
          <!-- button section -->
          <form @submit.prevent="addSubmit">
            <button
              class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
              type="submit">
              <BookmarkIcon class="h-4 w-4 mr-2" />
              <span> Save </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { BookmarkIcon } from '@heroicons/vue/20/solid'
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'

  import { useOfficeNameStore } from '@/stores/officeData'
  import { useAssetStore } from '@/stores/assetsData'

  const router = useRouter()
  const store = useAssetStore()
  const officeNameStore = useOfficeNameStore()
  const newComputer = reactive({
    // id: '',
    asset_tag: '',
    serial_tag: '',
    brand: '',
    model: '',
    color: '',
    description: '',
    user_id: Number,
    office_id: Number,
    spec: {
      ai: '',
      cpu: '',
      graphic: '',
      screen_size: '',
      max_ram: '',
      harddisk_slot: '',
      lan_port: '',
      wireless: '',
      bluetooth: '',
      ram: '',
      harddisk: '',
    },
  })

  async function addSubmit() {
    // console.log('newConmputer to add: ', newComputer)
    try {
      await store.addAsset(newComputer)

    } catch (error) {
      console.error('Can not Add new Computer : ', error)
    } finally {
      router.push('/assets')
    }
  }
</script>

<style scoped>
  .label {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: 0.1rem;
    color: #37383a;
  }

  input {
    font-size: large;
    padding-left: 8px;
    padding-bottom: 8px;
    background-color: #dbeafe;
    border-radius: 8px;
  }
</style>
