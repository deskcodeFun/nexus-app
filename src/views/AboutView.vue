<template>
  <div class="p-24 bg-amber-50">

    <input type="file" @change="uploadImage" accept="image/*" />
  </div>

  <div class="bg-sky-100 p-12">
    <div v-for="image in images" :key="image.name">
      <div v-if="image.name !== '.emptyFolderPlaceholder'">
        <p>{{ image.name }}</p>
        <img :src="image.url" :alt="image.name" style="width: 200px; margin: 10px;" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { supabase } from '@/lib/supabaseClient'
  import { onMounted, ref } from 'vue'
  const images = ref([])

  const fetchImages = async () => {
    // 1. List all files in the bucket
    const { data, error } = await supabase.storage.from('test').list()
    console.log('fetch images error: ', error)
    if (data) {
      // 2. Generate public URLs for each file
      images.value = data.map((file) => {
        const { data: { publicUrl } } = supabase.storage
          .from('test')
          .getPublicUrl(file.name)
        return { name: file.name, url: publicUrl }
      })
    }
  }

  const uploadImage = async (event) => {
    const file = event.target.files[0]
    const fileName = `${file.name}`

    const { data, error } = await supabase.storage
      .from('test')
      .upload(fileName, file)
    console.log('data to uploadImage', data)
    if (error) console.error('Upload error:', error.message)
    else fetchImages() // Refresh test after upload
  }

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




  onMounted(() => {
    fetchImages()
  })

</script>

<style lang="scss" scoped></style>
