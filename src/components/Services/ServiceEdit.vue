<template>
  <div class="max-w-1/2 min-w-fit bg-green-50 rounded-xl border border-green-900">
    <div class="flex flex-row justify-between bg-amber-50">
      <BaseHeader title="Service Edit" />
      <XMarkIcon
        @click="$emit('toggle-open')"
        class="h-4 w-4 mt-9.5 text-red-400 font-extrabold border border-red-600 rounded hover:scale-140 hover:shadow-red-400 hover:cursor-pointer"
      />
    </div>
    <hr class="border-gray-300 mb-4" />
    <!-- asset and employee infomation -->
    <div class="grid grid-cols md:grid-cols-2 gap-y-4">
      <label for="dateAppoint" class="label">Appointment Date</label>
      <input type="date" class="input w-fit" v-model.trim="updateService.appointment_date" />
      <p>Asset Tag</p>
      <p>{{ serviceAssetTag }}</p>
      <p>User Name:</p>
      <p>{{ userFullName }}</p>
      <p>Service Type:</p>
      <p>{{ serviceType }}</p>
    </div>

    <div class="flex flex-row justify-between text-wrap text-blue-900 mt-4 mb-1">
      <p>Detail :</p>
      <span>
        <PencilSquareIcon
          class="w-5 h-5 inline-block -mt-1 mx-1 text-green-900 hover:bg-green-100"
        />
        <TrashIcon class="w-5 h-5 inline-block -mt-1 mx-1 stroke-red-800 hover:bg-red-100" />
      </span>
    </div>

    <textarea
      cols="50"
      class="border border-green-800 px-2 py-2"
      v-model.trim="updateService.detail"
    ></textarea>
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
import { ref, reactive, computed } from 'vue'

import BaseHeader from '@/components/BaseHeader.vue'

import { XMarkIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

// const emit = defineEmits('open')
const props = defineProps({ itemDetail: Object })
console.log(props.itemDetail)

const serviceAssetTag = ref(props.itemDetail.asset_tag)
const userFullName = computed(() => {
  return props.itemDetail.fname + ' ' + props.itemDetail.lname
})
const serviceType = ref(props.itemDetail.service_type)
const updateService = reactive({
  appointment_date: props.itemDetail.appointment_date,
  detail: props.itemDetail.detail || '',
})
</script>
