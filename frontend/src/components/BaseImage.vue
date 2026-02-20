<template>
  <div>
    <h1 class="bg-white px-8 text-lg font-light">
      Image Gallery App
    </h1>
    <div class="image-container">
      <img v-for="(image, index) in images" :key="index" :src="image" alt="Image" @click="showPreview(image)">
    </div>
    <div class="modal" v-if="previewImage">
      <span class="close" @click="closePreview">
        &times;
      </span>
      <img :src="previewImage" alt="Preview" class="hover:scale-200">
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  defineProps({
    images: {
      type: Array
    }
  })
  console.log('preViewImage')
  const previewImage = ref(null)

  const showPreview = (image) => {
    console.log('image ref from computerDetail store', image)
    previewImage.value = image
  }
  const closePreview = () => {
    previewImage.value = !previewImage.value
  }
  // export default {
  //   data() {
  //     return {
  //       images: [
  //         'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190718150152/Java-tutorials-by-GeeksForGeeks.png',
  //         'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210713211702/System-Design-Tutorial.png',
  //         'https://media.geeksforgeeks.org/wp-content/uploads/20240304152903/python-tutorial-2.webp'
  //       ],
  //       previewImage: ''
  //     };
  //   },
  //   methods: {
  //     showPreview(image) {
  //       this.previewImage = image;
  //     },
  //     closePreview() {
  //       this.previewImage = '';
  //     }
  //   }
  // };
</script>
<style>
  .image-container {
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    background: white;
  }

  .image-container img {
    width: 200px;
    height: 200px;
    margin: 10px;
    cursor: pointer;
  }

  .modal {
    display: block;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .modal img {
    margin: auto;
    display: block;
    max-width: 80%;
    max-height: 80%;
    transform: scale(1.5);
  }


  .close {
    color: #fff;
    position: absolute;
    top: 15px;
    right: 35px;
    font-size: 30px;
    cursor: pointer;
  }

  .close:hover,
  .close:focus {
    color: #ccc;
    text-decoration: none;
    cursor: pointer;
  }
</style>
