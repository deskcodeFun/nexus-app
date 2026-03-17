<template>
  <main class="py-4 px-8 bg-white flex flex-row text-blue-900">
    <div class="gap-16 sm:flex sm:flex-row bg-white">
      <div class="w-fit text-nowrap flex flex-col">
        <p class="sm:pb-4 text-lg tracking-wide">Accounting information</p>
        <label for="asset_tag" class="label">Asset Tag</label>
        <input type="text" class="bg-sky-50 text-md p-1" />
        <label for="serial_tag" class="label">Serial</label>
        <input type="text" class="bg-sky-50 text-md p-1" />
        <label for="brand" class="label">Brand</label>
        <input type="text" class="bg-sky-50 text-md p-1" />
        <label for="model" class="label">Model</label>
        <input type="text" class="bg-sky-50 text-md p-1" />
        <label for="cpu" class="label">CPU</label>
        <input type="text" class="bg-sky-50 text-md p-1" />
      </div>
      <div class="w-fit text-nowrap flex flex-col">
        <p class="pt-8 sm:pt-0 sm:pb-4 text-lg tracking-wide">Specification</p>
        <div class="flex flex-row gap-16">
          <p>Property</p>
          <p>Value</p>
        </div>
        <div class="flex flex-row gap-4">
          <input type="text" class="w-24 bg-sky-50 text-md p-1" />
          <input type="text" class="bg-sky-50 text-md p-1" />
          <PlusCircleIcon class="h-6 w-6 mt-1 text-gray-500" />
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
  import { PlusCircleIcon } from '@heroicons/vue/20/solid';
</script>
