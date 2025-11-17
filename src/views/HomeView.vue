<template>
  <main class="mx-8">
    <!-- submenu filter dropdown select BU-->
    <div class="flex flex-row py-8 gap-8">
      <p class="text-lg">Select BU</p>
      <div class="flex flex-row">
        <!-- <p>Filter by :</p> -->
        <!-- <select class="px-8 py-1 w-fit border-1" @change="handleChange" v-model="officeFilter"> -->
        <select class="text-sm rounded-md px-4 bg-white/80">
          <!-- <option value="" disabled>Select BU</option> -->
          <option value="0">All</option>
          <option
            v-for="officeStore in officeStores.office"
            :key="officeStore.id"
            :value="officeStore.id"
          >
            {{ officeStore.short_name }}
          </option>
        </select>
      </div>
    </div>

    <!--Show computer  -->
    <div>
      <h1>Computer</h1>
    </div>
    <!--Show printer  -->
    <div>
      <h1>Printer</h1>
    </div>
    <!--Show other -->
    <div>
      <h1>Other</h1>
    </div>
  </main>
</template>

<script setup>
// import { ref, watch } from 'vue'
import { useOfficeStore } from '@/stores/officeData'

const officeStores = useOfficeStore()
console.log(officeStores.office)
</script>

<style scoped></style>
