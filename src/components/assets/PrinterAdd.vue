<template>
  <div class="py-4 px-8 bg-white flex flex-row text-blue-900">
    <!-- 3 section -->
    <div class="w-fit h-full gap-16 sm:flex sm:flex-row bg-white">
      <!-- accounting section -->
      <div class=" text-nowrap flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Accounting Information</p>
        <label for="asset_tag" class="label">Asset Tag</label>
        <input type="text" v-model.trim="newPrinter.asset_tag" class="input">
        <label for="serial_tag" class="label">Serial Tag</label>
        <input type="text" v-model.trim="newPrinter.serial_tag" class="input">
        <label for="brand" class="label">Brand</label>
        <input type="text" v-model.trim="newPrinter.brand" class="input">
        <label for="Model" class="label">Model</label>
        <input type="text" v-model.trim="newPrinter.model" class="input">
        <label for="color" class="label">Color</label>
        <input type="text" v-model.trim="newPrinter.color" class="input">
        <label for="description" class="label">Description</label>
        <textarea row="3" cols="30" class="input" v-model.trim="newPrinter.description" />
        <p class="py-2 text-sm text-gray-500">Office Name</p>
        <select name="officeName" id="officeName" v-model.trim="newPrinter.office_id"
          class="text-lg bg-blue-100 py-2 px-4">
          <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
            {{ office_name.name }}
          </option>
        </select>
      </div>
      <!-- specification -->
      <div class="flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Specification</p>
        <label for="asset-tag" class="label">Black Cartridge</label>
        <input type="text" v-model.trim="newPrinter.spec.black_cartridge" class="input">
        <label for="asset-tag" class="label">Color Cartridge</label>
        <input type="text" v-model.trim="newPrinter.spec.color_cartridge" class="input">
        <label for="asset-tag" class="label">Port</label>
        <input type="text" v-model.trim="newPrinter.spec.port" class="input">
        <label for="asset-tag" class="label">Type</label>
        <input type="text" v-model.trim="newPrinter.spec.type" class="input">

      </div>

      <!-- Upload computer image  -->
      <div class="flex flex-col">
        <p class="pb-8">UPLOAD image</p>
        <div class="flex flex-row w-112.5 h-50 bg-sky-50 border border-blue-800 rounded-xl">
        </div>
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
</template>

<script setup>
  import { BookmarkIcon } from '@heroicons/vue/24/outline';
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';

  import { useOfficeNameStore } from '@/stores/officeData';
  import { useAssetStore } from '@/stores/assetsData'




  const router = useRouter()
  const store = useAssetStore()
  const officeNameStore = useOfficeNameStore()
  const newPrinter = reactive({
    // id: Number,
    asset_tag: '',
    serial_tag: '',
    brand: '',
    model: '',
    color: '',
    description: '',
    user_id: Number,
    office_id: Number,
    spec: {
      black_cartridge: '',
      color_cartridge: '',
      port: '',
      type: '',
    }
  })

  async function addSubmit() {
    // console.log('New Printer to Add: ', newPrinter)
    try {
      await store.addAsset(newPrinter)

    } catch (error) {
      console.error('Can not Add new Printer : ', error)
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

  .input {
    font-size: large;
    padding-left: 8px;
    padding-bottom: 8px;
    background-color: #dbeafe;
    border-radius: 8px;
  }
</style>
