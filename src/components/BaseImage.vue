<template>
  <div>
    <div class="w-48 h-40 lg:w-38 flex lg:flex-col flex-row">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        alt="Image"
        @click="showPreview(image)"
        class="m-4 cursor-pointer"
      />
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
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(57, 55, 55, 0.8);
}

.modal img {
  display: block;
  width: 50%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
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
