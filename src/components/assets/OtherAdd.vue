<template>
  <main class="py-4 px-8 bg-white flex flex-row text-blue-900">
    <div class="gap-16 sm:flex sm:flex-row bg-white">
      <div class="w-fit text-nowrap flex flex-col">
        <p class="sm:pb-4 text-lg tracking-wide">Accounting information</p>
        <label for="asset_tag" class="label">Asset Tag</label>
        <input type="text" class="input" v-model.trim="newAsset.asset_tag" />
        <label for="serial_tag" class="label">Serial</label>
        <input type="text" class="input" v-model.trim="newAsset.serial_tag" />
        <label for="brand" class="label">Brand</label>
        <input type="text" class="input" v-model.trim="newAsset.brand" />
        <label for="model" class="label">Model</label>
        <input type="text" class="input" v-model.trim="newAsset.model" />
        <label for="color" class="label">Color</label>
        <input type="text" class="input" v-model.trim="newAsset.color" />
        <label for="description" class="label">Description</label>
        <textarea rows="4" cols="50" class="input" v-model.trim="newAsset.description" />
        <!-- office BU owner of assets field use select -->
        <p class="py-2 text-sm text-gray-500">Office Name</p>
        <select name="officeName" id="officeName" v-model.trim="newAsset.office_id"
          class="text-lg bg-blue-100 py-2 px-2">
          <option v-for="office_name in officeNameStore.officeName" :key="office_name" :value="office_name.id">
            {{ office_name.name }}
          </option>
        </select>
      </div>
      <!-- add spec key:value -->
      <div class="w-fit text-nowrap flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Specification</p>
        <!-- header lable -->
        <div class="flex flex-row gap-45">
          <label class="label">Property</label>
          <label class="label">Value</label>
        </div>
        <div class="flex flex-col">
          <!-- loop for each pair key:value -->
          <div v-for="(data, label) in specRow" :key="label" class="flex flex-row mb-4">
            <div class="flex flex-col mr-8">
              <input type="text" class="input" v-model.trim="data.label">
            </div>
            <div class="flex flex-col">
              <input type="text" class="input" v-model.trim="data.value" />
            </div>
            <button @click="addSpecRow">
              <PlusCircleIcon class="h-6 w-6  ml-4 text-green-700" />
            </button>
            <button @click="removeSpecRow(label)">
              <MinusCircleIcon class="h-6 w-6  ml-4 text-red-700" />
            </button>

          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { useOfficeNameStore } from '@/stores/officeData'
  import { useAssetStore } from '@/stores/assetsData'

  import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/20/solid';



  const store = useAssetStore()
  const officeNameStore = useOfficeNameStore()
  const newAsset = reactive({
    asset_tag: '',
    serial_tag: '',
    brand: '',
    model: '',
    color: '',
    description: '',
    user_id: Number,
    office_id: Number,
    spec: {}
  })

  const specRow = ref([{ property: '', value: '' }])
  const addSpecRow = () => {
    specRow.value.push({ property: '', value: '' })
  }
  const removeSpecRow = (index) => specRow.value.splice(index, 1)

  const addSpec = () => {

    console.log('add spec click', specRow)
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
    font-size: 1rem;
    padding-left: 8px;
    padding-bottom: 8px;
    padding-top: 8px;
    background-color: #dbeafe;
    border-radius: 8px;
  }
</style>
