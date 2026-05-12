<template>
  <div class="py-4 px-8 bg-white flex flex-row text-blue-900">
    <!-- 3 section -->
    <div class="w-fit h-full gap-16 sm:flex sm:flex-row bg-white">
      <!-- accounting section -->
      <div class="text-nowrap flex flex-col">
        <p class="sm:pb-4 text-lg tracking-wide">Accounting information</p>
        <label for="asset_tag" class="label">Asset Tag</label>
        <input type="text" v-model.trim="newAsset.asset_tag" class="input" />
        <label for="asset_tag" class="label">Stock in</label>
        <input type="date" v-model.trim="newAsset.stock_in" class="input" />
        <label for="asset_tag" class="label">Price</label>
        <input type="text" v-model.trim="newAsset.price" class="input" />
        <label for="serial_tag" class="label">Serial Tag</label>
        <input type="text" v-model.trim="newAsset.serial_tag" class="input" />
        <label for="brand" class="label">Brand</label>
        <input type="text" v-model.trim="newAsset.brand" class="input" />
        <label for="model" class="label">Model</label>
        <input type="text" v-model.trim="newAsset.model" class="input" />
        <label for="color" class="label">Color</label>
        <input type="text" v-model.trim="newAsset.color" class="input" />
        <label for="color" class="label">Warranty End</label>
        <input type="text" v-model.trim="newAsset.warranty_end" class="input" />
        <label for="color" class="label">Store Location</label>
        <input type="text" v-model.trim="newAsset.store_location" class="input" />

        <label for="description" class="label">Description</label>
        <textarea row="3" cols="30" v-model.trim="newAsset.description" class="input" />
        <p class="py-2 text-sm text-gray-500">Office Name</p>
        <select
          name="officeName"
          id="officeName"
          v-model.trim="newAsset.office_id"
          class="text-lg bg-blue-100 py-2 px-4"
        >
          <option
            v-for="office_name in officeNameStore.officeName"
            :key="office_name"
            :value="office_name.id"
          >
            {{ office_name.name }}
          </option>
        </select>
      </div>
      <!-- add spec key:value -->
      <div class="text-nowrap flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Specification</p>
        <!-- header label -->
        <div class="flex flex-row gap-45">
          <label class="label">Property</label>
          <label class="label">Value</label>
        </div>
        <div class="flex flex-col">
          <!-- loop for each pair key:value -->
          <div v-for="(field, index) in specRow" :key="index" class="flex flex-row mb-9">
            <div class="flex flex-col mr-8">
              <input type="text" class="input" v-model.trim="field.key" />
            </div>
            <div class="flex flex-col">
              <input type="text" class="input" v-model.trim="field.value" />
            </div>
            <button @click="addSpecRow()">
              <PlusCircleIcon class="h-6 w-6 ml-4 text-green-700" />
            </button>
            <button v-show="index !== 0" @click="removeSpecRow(index)">
              <MinusCircleIcon class="h-6 w-6 ml-4 text-red-700" />
            </button>
          </div>
        </div>
      </div>
      <!-- Upload computer image  -->
      <div class="flex flex-col">
        <p class="pb-8">UPLOAD image</p>
        <!-- input directory  -->
        <div>
          <label for="directory-name">Directory :</label>
          <input type="text" id="directory-name" v-model="dirName" class="mx-4 bg-sky-50" />
        </div>

        <!-- input multiple image file with <input> attribute multiple -->
        <div class="mt-8">
          <label
            for="file-input"
            class="border borer-blue-800 px-4 py-1 rounded-full text-blue-800 text-sm bg-sky-50"
            >Selecte File</label
          >
          <input
            type="file"
            id="file-input"
            accept="image/*"
            @change="handleFileSelect"
            multiple
            hidden
          />
        </div>
        <!-- show each image preview -->
        <div class="bg-sky-50 p-12 mt-4 flex flex-row">
          <div class="flex flex-row flex-wrap gap-4">
            <div v-for="(image, index) in previewImages" :key="index" class="flex flex-col">
              <div class="flex flex-col items-end relative">
                <XCircleIcon
                  class="h-4 w-4 text-end rounded-full text-red-400 cursor-pointer"
                  @click="removeImage(index)"
                />
                <img
                  :src="image.url"
                  alt="Selected image preview"
                  class="w-auto h-30 object-fill"
                />
              </div>
              <p class="flex justify-center">
                {{ image.file.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- button section -->
        <form @submit.prevent="addSubmit">
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
            type="submit"
          >
            <BookmarkIcon class="h-4 w-4 mr-2" />
            <span> Save </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

import { supabase } from '@/lib/supabaseClient'
import { useOfficeNameStore } from '@/stores/officeData'
import { useAssetStore } from '@/stores/assetsData'

import { PlusCircleIcon, MinusCircleIcon, BookmarkIcon, XCircleIcon } from '@heroicons/vue/20/solid'

const router = useRouter()
const store = useAssetStore()
const officeNameStore = useOfficeNameStore()
const newAsset = reactive({
  asset_tag: '',
  serial_tag: '',
  brand: '',
  model: '',
  color: '',
  description: '',
  warranty_end: '',
  store_location: '',
  stock_in: new Date(),
  price: Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(0),
  user_id: Number,
  office_id: Number,
  image: [],
  spec: JSON,
})
const isUploaded = ref(false)
const previewImages = ref([])
const dirName = computed(() => newAsset.asset_tag)

// const specRow = ref([{ property: '', value: '' }])
const specRow = ref([{ key: '', value: '' }])
const addSpecRow = () => {
  specRow.value.push({ key: '', value: '' })
}
const removeSpecRow = (index) => specRow.value.splice(index, 1)

// const addSpec = () => {
//   console.log('add spec click', specRow)
//   newAsset.spec.value = specRow.value
//   console.log('newAsset before Add to DB : ', newAsset)
// }

async function handleFileSelect(event) {
  try {
    isUploaded.value = true
    const files = event.target.files
    if (!files || files.length === 0) {
      throw new Error('No files selected')
    }
    const uploadPromises = Array.from(files).map(async (file) => {
      const fileExt = file.name.split('.').pop()
      const fileName = `${file.name}.${fileExt}`
      // const filePath = dirName.value ? `${dirName.value}/${fileName}` : fileName
      const filePath = `${dirName.value}/${fileName}`
      console.log(' fileName: ', fileName)
      console.log(' filePath: ', filePath)

      // preview image storage on local , not upload to supabase storage
      // const previewUrl = URL.createObjectURL(file)
      // previewImages.value.push({ url: previewUrl, file })

      // upload file to supabase storage
      const { error } = await supabase.storage.from('image').upload(filePath, file)
      if (error) throw error
      const { data } = await supabase.storage.from('image').getPublicUrl(filePath)
      previewImages.value.push({ url: data.publicUrl, file })
      console.log(' data: ', data)
      console.log('previewImages:', previewImages)
      return
    })
    await Promise.all(uploadPromises)
  } catch (error) {
    console.error('Error uploading file:', error.message)
  } finally {
    isUploaded.value = false
  }
}

async function addSubmit() {
  const imageUrlArray = previewImages.value.map((image) => image.url)
  newAsset.image = imageUrlArray
  const specObject = Object.fromEntries(
    specRow.value.filter((item) => item.key).map((item) => [item.key, item.value]),
  )
  console.log('newAsset to add: ', specObject)
  console.log('add spec click', specRow)
  newAsset.spec = specObject
  console.log('newAsset before Add to DB : ', newAsset)
  try {
    await store.addAsset(newAsset)
  } catch (error) {
    console.error('Can not Add new Asset : ', error)
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
