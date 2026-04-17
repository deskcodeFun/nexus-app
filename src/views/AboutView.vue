<template>
  <div class="mt-28">
    <label for="file-input" class="border px-4 py-2 bg-amber-50">Upload File</label>
    <input type="file" id="file-input" accept="image/*" @change="handleFileSelect" multiple hidden />
  </div>

  <div class="bg-sky-100 p-12 mt-4 flex flex-row ">
    <div class="flex flex-row gap-12">
      <div v-for="(url, index) in previews" :key="index" class="flex flex-col items-center gap-3">
        <img :src="url" alt="Selected image preview" class="w-25 h-25 object-cover" />
        <p class="flex ">{{ files[index].name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const files = ref([])
  const previews = ref([])

  function handleFileSelect(event) {
    const input = event.target
    const filesAsArray = Array.from(input?.files || [])
    files.value = files.value.concat(filesAsArray)
    console.log(' filesAsArray: ', filesAsArray)
    console.log(' files: ', files)
    const newPreviews = filesAsArray.map((file) => URL.createObjectURL(file))
    previews.value = previews.value.concat(newPreviews)
  }
  // const fetchImages = async () => {
  //   // 1. List all files in the bucket
  //   const { data, error } = await supabase.storage.from('test').list()
  //   console.log('fetch images error: ', error)
  //   if (data) {
  //     // 2. Generate public URLs for each file
  //     images.value = data.map((file) => {
  //       const {
  //         data: { publicUrl },
  //       } = supabase.storage.from('test').getPublicUrl(file.name)
  //       return { name: file.name, url: publicUrl }
  //     })
  //   }
  // }

  // const uploadImage = async (event) => {
  //   const file = event.target.files[0]
  //   const fileName = `${file.name}`

  //   const { data, error } = await supabase.storage
  //     .from('test')
  //     .upload(fileName, file)
  //   console.log('data to uploadImage', data)
  //   if (error) console.error('Upload error:', error.message)
  //   else fetchImages() // Refresh test after upload
  // }

  // function uploadImage(e) {
  //   const file = e.target.files[0]
  //   console.log('file to upload is: ', file)
  //   try {
  //     isLoading.value = true
  //     const { data, error } = supabase
  //       .storage
  //       .from('test')
  //       .upload(file)
  //     // .upload(userId + "/"+uuid4(), file)
  //     if (data) {
  //       getImage()
  //     }
  //     if (error) throw error
  //   } catch (error) {
  //     console.log('ERROR upload image: ', error)
  //   } finally {
  //     isLoading.value = false

  //   }
  // }

  // filesAsArray.forEach((file) => {
  //   const reader = new FileReader()
  //   reader.onload = (event) => {
  //     const content = event.target.result
  //     console.log('contensts of file: ', content)
  //   }
  //   reader.onerror = (error) => console.error('Error reading file: ', error)

  // })
</script>

<style lang="scss" scoped></style>
