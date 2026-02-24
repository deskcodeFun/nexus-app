<template>
  <!-- <BaseHeader :title="'OTHER DETAIL'" /> -->
  <BaseButttonBack />
  <!-- show computer image  -->
  <!-- <div v-if="printerStore.printerDetail && printerStore.printerDetail[0].image !== null">
    <BaseImage :images="printerStore.printerDetail[0].image" />
  </div>
  <div v-else class="bg-white px-8 w-full h-100px">
    <p class="py-8 px-4 bg-blue-50/20">No Image</p>
  </div> -->
  <div class="bg-white px-8 w-full h-100px">
    <p class="py-8 px-4 bg-blue-50/20">No Image</p>
  </div>
  <!-- show data -->
  <div class="flex flex-col mx-auto w-full h-50">
    <h1 class="text-2xl mx-auto p-8">Other view</h1>
    <h1 class="text-2xl mx-auto p-8 italic ">Work in Process</h1>
  </div>
</template>

<script setup>
  // import BaseHeader from '@/components/BaseHeader.vue';
  import BaseButttonBack from '@/components/BaseButttonBack.vue';
  // import BaseImage from '@/components/BaseImage.vue';

</script>

<style lang="scss" scoped></style>
