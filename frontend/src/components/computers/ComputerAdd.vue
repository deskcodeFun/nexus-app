<template>
  <BaseHeader :title="'ADD NEW COMPUTER'" />
  <BaseButttonBack />
  <main class="py-4 px-8 bg-white flex flex-row text-blue-900">
    <!-- <div class="w-2/5"> -->
    <div class="gap-16 sm:flex sm:flex-row bg-white">
      <!-- <form class="flex flex-col justify-center gap-2" @submit.prevent="addSubmit"> -->
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
        </div>
        <!-- computer spec. section -->
        <div class="flex flex-col">
          <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Computer Specification</p>
          <label for="cpu" class="label">CPU</label>
          <input type="text" v-model.trim="newComputer.cpu" class="bg-sky-50 text-md p-1" />
          <label for="Ram" class="label">Ram</label>
          <input type="text" v-model.trim="newComputer.ram" class="bg-sky-50 text-md p-1" />
          <label for="harddisk" class="label">Hard disk</label>
          <input type="text" v-model.trim="newComputer.harddisk" class="bg-sky-50 text-md p-1" />
          <p class="py-2 text-sm text-gray-500">Office Name</p>
          <select name="officeName" id="officeName" v-model.trim="newComputer.office_id" class="bg-sky-50 py-2 pr-2">
            <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
              {{ office_name.name }}
            </option>
          </select>
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
  import { useComputerStore } from '@/stores/computerData'
  import { useOfficeNameStore } from '@/stores/officeData'

  import BaseButttonBack from '../BaseButttonBack.vue'
  import BaseHeader from '../BaseHeader.vue'

  const router = useRouter()
  const store = useComputerStore()
  const officeNameStore = useOfficeNameStore()
  const newComputer = reactive({
    // id: Number,
    asset_tag: '',
    serial_tag: '',
    brand: '',
    model: '',
    cpu: '',
    ram: '',
    harddisk: '',
    office_id: null,
  })

  async function addSubmit() {
    try {
      await store.addComputer({ ...newComputer })
    } catch (error) {
      console.error('Can not Add new Computer: ', error)
    } finally {
      Object.assign(newComputer, {
        asset_tag: '',
        serial_tag: '',
        brand: '',
        model: '',
        cpu: '',
        ram: '',
        harddisk: '',
        office_id: null,
      })
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
    letter-spacing: 0.1em;
    color: #6b7280;
  }
</style>
