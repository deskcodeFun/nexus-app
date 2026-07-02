<template>
  <div class="w-full md:w-md h-screen px-4 mt-15 mx-1 bg-white rounded-xl border border-green-900">
    <div class="flex flex-row justify-between">
      <BaseHeader title="Service Detail" />
      <XMarkIcon
        @click="$emit('toggle-open')"
        class="h-6 w-6 mt-9.5 text-red-800 hover:scale-110 hover:rounded-full hover:bg-red-800 hover:text-white hover:cursor-pointer"
      />
    </div>
    <hr class="border-gray-300 mb-4" />
    <!-- Section : show detail -->
    <div>
      <BaseBox label="Service" :data="props.itemDetail.service_type.service_name" />
      <BaseBox label="Appointment Date" :data="dateFormat(props.itemDetail.appointment_date)" />
      <!-- service type 1, add email -->
      <div v-if="props.itemDetail.service_id === 1">
        <BaseBox
          label="link to detail"
          :data="userFullName"
          @click="$router.push(`/editEmployee/${props.itemDetail.eUser_id}`)"
          class="hover:cursor-pointer hover:text-blue-500"
        />
      </div>
      <!-- service type 3 change user -->
      <div v-if="props.itemDetail.service_id === 3">
        <BaseBox label="Asset Tag" :data="props.itemDetail.asset.asset_tag" />
        <BaseBox label="Current User" :data="props.itemDetail?.fname || 'FREE'" />
        <BaseBox label="New User ID" :data="props.itemDetail.nUser_id" />
        <BaseBox
          label="New User Name"
          :data="userFullName"
          @click="$router.push(`/editEmployee/${props.itemDetail.nUser_id}`)"
          class="hover:cursor-pointer hover:text-blue-500"
        />
        <BaseBox label="" :data="employeeStore.employeeDetail[0].department_name?.name || 'N/A'" />
        <BaseBox label="" :data="employeeStore.employeeDetail[0].office_name?.name || 'N/A'" />
        <!-- application section -->
        <div class="grid grid-cols-2 my-4">
          <p>Application</p>
          <div class="">
            <div
              v-for="appName in props.itemDetail.application_list"
              :key="appName.id"
              :value="appName.value"
            >
              <p>{{ appName }}</p>
            </div>
          </div>
        </div>
        <!-- map drive section -->
        <div class="grid grid-cols-2 my-4">
          <p>Application</p>
          <div class="">
            <div
              v-for="mapDrive in props.itemDetail.map_drive"
              :key="mapDrive.id"
              :value="mapDrive.value"
            >
              <p>{{ mapDrive }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- service type 4 and 5 todo or HW update  -->
      <div v-if="props.itemDetail.service_id === 4 || props.itemDetail.service_id === 5">
        <BaseBox label="Asset Tag" :data="props.itemDetail.asset.asset_tag" />
        <BaseBox label="Detail" :data="props.itemDetail.detail" />
      </div>

      <!-- <BaseBox label="Asset Tag" :data="props.itemDetail.asset.asset_tag" /> -->
      <!-- current user if fname = null show label='Status' data:'FREE'
           else show Current User with userFullName -->

      <!-- in case Service 3:
           Change user we show new user name
           if service type .eq 3 then show new user
           else no show-->

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
  </div>
</template>
<script setup>
import { ref } from 'vue'

import BaseHeader from '@/components/BaseHeader.vue'
import BaseBox from '../BaseBox.vue'

import { XMarkIcon } from '@heroicons/vue/24/outline'

import { useEmployeeStore } from '@/stores/employeeData'

// const emit = defineEmits('open')
const props = defineProps({ itemDetail: Object })
// console.log('props.itemDetail in Service edit', props.itemDetail)
// console.log('Service_id in Service edit', props.itemDetail.service_id)

// const userFullName = ref('')
const userFullName = ref('')

const employeeStore = useEmployeeStore()

const fetchUserFullName = async () => {
  if (props.itemDetail.nUser_id) {
    // console.log('nUser_id in Service edit', props.itemDetail.nUser_id)
    await employeeStore.getEmployeeDetail(props.itemDetail.nUser_id)
    // console.log('employee in Service edit', employeeStore.employeeDetail)
    userFullName.value =
      employeeStore.employeeDetail[0].fname + ' ' + employeeStore.employeeDetail[0].lname
  } else {
    userFullName.value = props.itemDetail.fname + ' ' + props.itemDetail.lname
  }
}

fetchUserFullName()

const dateFormat = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-EN', options)
}
</script>
