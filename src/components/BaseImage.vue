<template>
  <div>
    <div class="image-container">
      <img v-for="(image, index) in images" :key="index" :src="image" alt="Image" @click="showPreview(image)" />
    </div>
    <div class="modal" v-if="previewImage">
      <span class="close" @click="closePreview"> &times; </span>
      <img :src="previewImage" alt="Preview" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  defineProps({
    images: {
      type: Array,
    },
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
    /* flex-direction: column;*/
    flex-wrap: wrap;
    /* padding-left: 8px; */
    justify-content: space-between;
    background: white;

  }

  .image-container img {
    width: 30%;
    height: auto;
    aspect-ratio: 4/3;
    object-fit: contain;
    margin: 0px;
    cursor: pointer;
  }

  .modal {
    display: block;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 95%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .modal img {
    display: block;
    width: 50%;
    height: auto;
    aspect-ratio: 4/3;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4%;
    margin-bottom: auto;
    transform: scale(1.1);
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
