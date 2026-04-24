<template>
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
          <img :src="image.url" alt="Selected image preview" class="w-auto h-30 object-fill" />
        </div>
        <p class="flex justify-center">
          {{ image.file.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { XCircleIcon } from '@heroicons/vue/24/outline'

defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})
const isUploaded = ref(false)
const previewImages = ref([])
const dirName = ref('')
// const fileName = ref('')
// const fileExt = ref('')
// const filePath = ref('')

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
      const { error } = await supabase.storage.from('test').upload(filePath, file)
      if (error) throw error
      const { data } = supabase.storage.from('test').getPublicUrl(filePath)
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
</script>
<!-- function handleFileSelect(event) {
  const input = event.target
  const filesAsArray = Array.from(input?.files || [])
  files.value = files.value.concat(filesAsArray)
  console.log(' filesAsArray: ', filesAsArray)
  console.log(' files: ', files)
  const newPreviews = filesAsArray.map((file) => URL.createObjectURL(file))
  previews.value = previews.value.concat(newPreviews)
  console.log(' previews: ', previews)
} -->
