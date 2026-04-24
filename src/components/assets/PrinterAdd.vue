<template>
  <div class="py-4 px-8 bg-white flex flex-row text-blue-900">
    <!-- 3 section -->
    <div class="w-fit h-full gap-16 sm:flex sm:flex-row bg-white">
      <!-- accounting section -->
      <div class="text-nowrap flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Accounting Information</p>
        <label for="asset_tag" class="label">Asset Tag</label>
        <input type="text" v-model.trim="newPrinter.asset_tag" class="input" />
        <label for="serial_tag" class="label">Serial Tag</label>
        <input type="text" v-model.trim="newPrinter.serial_tag" class="input" />
        <label for="brand" class="label">Brand</label>
        <input type="text" v-model.trim="newPrinter.brand" class="input" />
        <label for="Model" class="label">Model</label>
        <input type="text" v-model.trim="newPrinter.model" class="input" />
        <label for="color" class="label">Color</label>
        <input type="text" v-model.trim="newPrinter.color" class="input" />
        <label for="description" class="label">Description</label>
        <textarea row="3" cols="30" class="input" v-model.trim="newPrinter.description" />
        <p class="py-2 text-sm text-gray-500">Office Name</p>
        <select
          name="officeName"
          id="officeName"
          v-model.trim="newPrinter.office_id"
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
      <!-- specification -->
      <div class="flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Specification</p>
        <label for="asset-tag" class="label">Black Cartridge</label>
        <input type="text" v-model.trim="newPrinter.spec.black_cartridge" class="input" />
        <label for="asset-tag" class="label">Color Cartridge</label>
        <input type="text" v-model.trim="newPrinter.spec.color_cartridge" class="input" />
        <label for="asset-tag" class="label">Port</label>
        <input type="text" v-model.trim="newPrinter.spec.port" class="input" />
        <label for="asset-tag" class="label">Type</label>
        <input type="text" v-model.trim="newPrinter.spec.type" class="input" />
      </div>

      <!-- Upload computer image and button submit section -->
      <div class="flex flex-col">
        <!-- upload image -->
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

import { BookmarkIcon } from '@heroicons/vue/24/outline'
import { XCircleIcon } from '@heroicons/vue/24/outline'

import { supabase } from '@/lib/supabaseClient'
import { useOfficeNameStore } from '@/stores/officeData'
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
  image: [],
  spec: {
    black_cartridge: '',
    color_cartridge: '',
    port: '',
    type: '',
  },
})

const isUploaded = ref(false)
const previewImages = ref([])
const dirName = computed(() => newPrinter.asset_tag)

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
const removeImage = (index) => {
  previewImages.value.splice(index, 1)
  console.log('previewImages after DELETE:', previewImages.value)
}

async function addSubmit() {
  // console.log('New Printer to Add: ', newPrinter)
  const imageUrlArray = previewImages.value.map((image) => image.url)
  newPrinter.image = imageUrlArray
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
