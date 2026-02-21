<template>
  <div>
    <h1 class="bg-white px-8 text-lg font-light">
      Gallery
    </h1>
    <div class="image-container">
      <img v-for="(image, index) in images" :key="index" :src="image" alt="Image" @click="showPreview(image)">
    </div>
    <div class="modal" v-if="previewImage">
      <span class="close" @click="closePreview">
        &times;
      </span>
      <img :src="previewImage" alt="Preview">
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

  const previewImage = ref(null)

  const showPreview = (image) => {
    previewImage.value = image
  }

  const closePreview = () => {
    previewImage.value = !previewImage.value
  }
</script>

<style scoped>
  .image-container {
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    background: white;
  }

  .image-container img {
    width: 200px;
    height: auto;
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
    height: 80%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .modal img {
    display: block;
    width: 50%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    margin-bottom: auto;
    transform: scale(1.2);
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
