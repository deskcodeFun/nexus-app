<template>
  <div class="bg-green-50 p-4 w-200 rounded-xl border border-green-900">
    <div class="flex justify-end">
      <XMarkIcon
        @click="$emit('toggle-open')"
        class="h-6 w-6 text-gray-400 font-extrabold border rounded-full hover:text-red-800 hover:cursor-pointer"
      />
    </div>

    <div class="flex flex-row justify-between mr-4">
      <p>Appointment date: {{ props.itemDetail.appointment_date }}</p>
      <p>asset tag: {{ props.itemDetail.asset_tag }}</p>
    </div>
    <div class="mt-1 flex flex-row align-bottom">
      <p>User Name:</p>

      <p class="font-bold text-md ml-4 text-blue-900">
        {{ props.itemDetail.fname + ' ' + props.itemDetail.lname }}
      </p>
    </div>
    <p class="flex flex-row text-wrap text-sm text-blue-900 font-bold mt-4 mb-1 justify-between">
      DETAIL:
      <span class="justify-end flex flex-row">
        <PencilSquareIcon
          class="w-6 h-6 inline-block -mt-1 mx-2 text-green-900 hover:bg-green-100"
        />
        <TrashIcon class="w-6 h-6 inline-block -mt-1 mx-2 stroke-red-800 hover:bg-red-100" />
      </span>
    </p>
    <p class="text-lg border border-green-800 px-4 py-2">{{ props.itemDetail.detail }}</p>
    <div class="flex flex-row justify-end">
      <button
        @click="$emit('toggle-open')"
        class="px-4 py-1 mt-4 bg-green-600 text-white rounded-xl"
      >
        Close
      </button>
      <!-- <button class="px-4 py-1 mt-4 bg-green-600 text-white rounded-xl">Cancel</button> -->
    </div>
  </div>
</template>
<script setup>
import { XMarkIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

// const emit = defineEmits('open')
const props = defineProps({ itemDetail: Object })
console.log(props.itemDetail)
</script>
