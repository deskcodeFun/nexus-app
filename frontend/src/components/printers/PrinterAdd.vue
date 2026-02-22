<template>
  <BaseHeader :title="'ADD NEW PRINTER'" />
  <BaseButttonBack />
  <main class="py-4 px-8 bg-white flex flex-row text-blue-900">
    <div class="gap-16 sm:flex sm:flex-row bg-white">
      <!-- accounting section -->
      <div class="w-fit text-nowrap flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Accounting Information</p>
        <label for="asset_tag" class="label">Asset Tag</label>
        <input type="text" v-model.trim="newPrinter.asset_tag" class="bg-sky-50 text-md p-1">
        <label for="asset-tag" class="label">Serial Tag</label>
        <input type="text" v-model.trim="newPrinter.serial_tag" class="bg-sky-50 text-md p-1">
        <label for="asset-tag" class="label">Brand</label>
        <input type="text" v-model.trim="newPrinter.brand" class="bg-sky-50 text-md p-1">
        <label for="asset-tag" class="label">Model</label>
        <input type="text" v-model.trim="newPrinter.model" class="bg-sky-50 text-md p-1">
        <label for="asset-tag" class="label">Office</label>
        <select name="officeName" id="officeName" v-model.trim="newPrinter.office_id" class="bg-sky-50 py-2 pr-2">
          <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
            {{ office_name.name }}
          </option>
        </select>
      </div>
      <!-- specification -->
      <div class="flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Specification</p>
        <label for="asset-tag" class="label">Black Cartridge</label>
        <input type="text" v-model.trim="newPrinter.black_cartridge" class="bg-sky-50 text-md p-1">
        <label for="asset-tag" class="label">Color Cartridge</label>
        <input type="text" v-model.trim="newPrinter.color_cartridge" class="bg-sky-50 text-md p-1">
        <label for="asset-tag" class="label">Port</label>
        <input type="text" v-model.trim="newPrinter.port" class="bg-sky-50 text-md p-1">
        <label for="asset-tag" class="label">Type</label>
        <input type="text" v-model.trim="newPrinter.type" class="bg-sky-50 text-md p-1">
      </div>
      <!-- user information -->
      <!-- <div class="flex flex-col">
        <label for="asset-tag" class="label">Use By</label>
        <input type="text" v-model.trim="newPrinter.user_id" class="bg-sky-50 text-md p-1">
        <label for="asset-tag" class="label">User Office</label>
        <input type="text" v-model.trim="newPrinter.office_id" class="bg-sky-50 text-md p-1">
      </div> -->
      <!-- Upload computer image  -->
      <div class="flex flex-col">
        <p class="pb-8">UPLOAD image</p>
        <div class="flex flex-row w-[450px] h-50 bg-sky-50 border-1 border-blue-800 rounded-xl">
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
  </main>
</template>

<script setup>
  import { BookmarkIcon } from '@heroicons/vue/24/outline';
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { usePrinterStore } from '@/stores/printerData';
  import { useOfficeNameStore } from '@/stores/officeData';

  import BaseButttonBack from '../BaseButttonBack.vue';
  import BaseHeader from '../BaseHeader.vue';

  const router = useRouter()
  const printerStore = usePrinterStore()
  const officeNameStore = useOfficeNameStore()
  const newPrinter = reactive({
    // id: Number,
    asset_tag: '',
    serial_tag: '',
    brand: '',
    model: '',
    black_cartridge: '',
    color_cartridge: '',
    port: '',
    type: '',
    user_id: null,
    office_id: '',
  })

  async function addSubmit() {
    console.log('New Printer to Add: ', newPrinter)
    try {
      await printerStore.addPrinter(newPrinter)

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
    color: 6b7280;
  }
</style>
