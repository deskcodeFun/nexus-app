<template>
  <div class="w-fit mt-12 px-4 bg-teal-50 rounded-xl">
    <div class="flex flex-row justify-between">
      <BaseHeader title="SERVICE FORM" />
      <XMarkIcon
        @click="$emit('close-form')"
        class="h-6 w-6 mt-8 text-gray-400 font-extrabold hover:text-red-800 hover:cursor-pointer"
      />

      <!-- <button @click.self="$router.push('/services')" class="hover:cursor-pointer">x</button> -->
    </div>
    <hr class="border-gray-300 mb-8" />

    <div class="w-125 mx-8 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-0">
      <!-- asset and employee infomation -->
      <label for="dateAppoint" class="label">Appointment Date</label>
      <input type="date" class="input" v-model.trim="newServiceLog.dateAppoint" />
      <label for="asset_tag" class="label">Asset Tag</label>
      <select v-model.trim="selectAsset" @change="handleAssetTag" class="input">
        <option v-for="item in assetStore.assetAll" :key="item.id" :value="item">
          {{ item.asset_tag }}
        </option>
      </select>
    </div>
    <!-- employee detail -->
    <div
      v-if="selectAsset !== null || undefined"
      class="w-125 mx-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-0"
    >
      <label for="employeeName" class="label">User Name</label>
      <p class="input">{{ selectAsset.employee.fname + ' ' + selectAsset.employee.lname }}</p>

      <label for="employeeEmail" class="label">Email</label>
      <p class="input">{{ selectAsset.employee.email }}</p>

      <label for="employeeDept" class="label">Department</label>
      <p class="input">{{ selectAsset.employee.department }}</p>

      <label for="employeeOffice" class="label">BU</label>
      <p class="input">{{ selectAsset.office_name.short_name }}</p>
    </div>
    <div>
      <p class="text-blue-900 text-xl py-2 pb-4">Service Type :</p>
      <input type="radio" id="1" value="1" v-model="selectType" />
      <label for="1" class="mx-1">Error</label>
      <input type="radio" id="2" value="2" v-model="selectType" />
      <label for="2">Format</label>
      <input type="radio" id="3" value="3" v-model="selectType" />
      <label for="3">Change Computer</label>
      <input type="radio" id="4" value="4" v-model="selectType" />
      <label for="4">Other</label>
    </div>

    <!-- service type section -->

    <!-- Error type form -->
    <div v-if="selectType == 1">
      <p>Error Detail</p>
      <textarea rows="4" class="border-2 w-full h-md"></textarea>
    </div>
    <!-- Reformat type form -->
    <div v-else-if="selectType == 2">
      <p class="text-blue-900 text-xl py-2 pt-4">Application</p>
      <p class="p-2">Check Program List {{ checkList }}</p>
      <ul class="flex flex-col gap-2">
        <li>
          <input type="checkbox" id="msOffice" value="msOffice" v-model="checkList" />
          <label for="msOffice">Microsoft Office</label>
        </li>
        <li>
          <input type="checkbox" id="acrobat" value="acrobat" v-model="checkList" />
          <label for="acrobat">Acrobat Reader</label>
        </li>
        <li>
          <input type="checkbox" id="printerNexus" value="printerNexus" v-model="checkList" />
          <label for="printeNexus">Printer Toshiba - Nexus</label>
        </li>
        <li>
          <input type="checkbox" id="printerNra" value="printerNra" v-model="checkList" />
          <label for="printerNra">Printer Toshiba - NRA</label>
        </li>
      </ul>
      <div>
        <p class="text-blue-900 text-xl py-2 pt-4">Map Drive</p>
        <p class="p-2">{{ mapDrive }}</p>
        <div class="w-fit flex flex-col gap-2">
          <p>NPA</p>
          <ul class="flex flex-col gap-2">
            <li>
              <input type="checkbox" id="mapD1" value="mapD1" v-model="mapDrive" />
              <label for="mapD1" class="px-1">NPA-Agency</label>
            </li>
            <li>
              <input type="checkbox" id="mapD2" value="mapD2" v-model="mapDrive" />
              <label for="mapD2" class="px-1">NPA-Brokerage-Service</label>
            </li>
            <li>
              <input type="checkbox" id="mapD3" value="mapD3" v-model="mapDrive" />
              <label for="mapD3" class="px-1">NPA-Investment</label>
            </li>
          </ul>
          <p>Admin</p>
          <ul class="flex flex-col flex-wrap gap-2">
            <li>
              <input type="checkbox" id="mapD4" value="mapD4" v-model="mapDrive" />
              <label for="mapD4">Admin-Administator</label>
            </li>
            <li>
              <input type="checkbox" id="mapD5" value="mapD5" v-model="mapDrive" />
              <label for="mapD5">Admin-Central Admin</label>>
            </li>
            <li>
              <input type="checkbox" id="mapD6" value="mapD6" v-model="mapDrive" />
              <label for="mapD6">Admin-Finance Management</label>
            </li>
            <li>
              <input type="checkbox" id="mapD7" value="mapD7" v-model="mapDrive" />
              <label for="mapD7">Admin-Finance&Accounting</label>
            </li>
            <li>
              <input type="checkbox" id="mapD8" value="mapD8" v-model="mapDrive" />
              <label for="mapD8">Admin-Humen Resource</label>
            </li>
            <li>
              <input type="checkbox" id="mapD9" value="mapD9" v-model="mapDrive" />
              <label for="mapD9">Admin-Management Team</label>
            </li>
            <li>
              <input type="checkbox" id="mapD10" value="mapD10" v-model="mapDrive" />
              <label for="mapD10">Admin-Template</label>
            </li>
          </ul>
          <p>NPM</p>
          <ul>
            <li>
              <input type="checkbox" id="mapD11" value="mapD11" v-model="mapDrive" />
              <label for="mapD11">NPM-Mailing list</label>
            </li>
            <li>
              <input type="checkbox" id="mapD12" value="mapD12" v-model="mapDrive" />
              <label for="mapD12">NPM-Real Estate Sulution</label>
            </li>
            <li>
              <input type="checkbox" id="mapD13" value="mapD13" v-model="mapDrive" />
              <label for="mapD13">NPM-Real Estate Sulution2</label>
            </li>
            <li>
              <input type="checkbox" id="mapD14" value="mapD14" v-model="mapDrive" />
              <label for="mapD14">NPM-Sales</label>
            </li>
          </ul>
          <p>NRA</p>
          <ul>
            <li>
              <input type="checkbox" id="mapD15" value="mapD15" v-model="mapDrive" />
              <label for="mapD15">NRA-Advisory</label>
            </li>
            <li>
              <input type="checkbox" id="mapD16" value="mapD16" v-model="mapDrive" />
              <label for="mapD16">NRA-Corporate Client</label>
            </li>
            <li>
              <input type="checkbox" id="mapD17" value="mapD17" v-model="mapDrive" />
              <label for="mapD17">NRA-General Admin</label>
            </li>
            <li>
              <input type="checkbox" id="mapD18" value="mapD18" v-model="mapDrive" />
              <label for="mapD18">NRA-Investment</label>
            </li>
            <li>
              <input type="checkbox" id="mapD19" value="mapD19" v-model="mapDrive" />
              <label for="mapD19">NRA-Research</label>
            </li>
            <li>
              <input type="checkbox" id="mapD20" value="mapD20" v-model="mapDrive" />
              <label for="mapD20">NRA-Valuation</label>
            </li>
            <li>
              <input type="checkbox" id="mapD21" value="mapD21" v-model="mapDrive" />
              <label for="mapD21">NRA-OLD NRA</label>
            </li>
          </ul>
          <p>Conspire</p>
          <div>
            <input type="checkbox" id="mapD22" value="mapD22" v-model="mapDrive" />
            <label for="mapD22" class="pl-2">Conspire</label>
          </div>
        </div>
      </div>
    </div>
    <!-- Change Computer type form -->
    <div v-else-if="selectType == 3">
      <p>Current computer Asset Tag:</p>
      <p>New computer Asset Tag:</p>
    </div>
    <!-- Other type form -->
    <div v-else-if="selectType == 4">
      <p>Detail</p>
      <textarea
        class="border border-green-800 w-full h-20 bg-sky-50"
        placeholder=" other service  "
      ></textarea>
    </div>
    <div v-else></div>

    <!-- button section -->
    <form @submit.prevent="addSubmit" class="flex flex-row">
      <button
        class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
        type="submit"
      >
        <BookmarkIcon class="h-4 w-4 mr-2" />
        <span> Save </span>
      </button>
    </form>
  </div>

  <!-- button submit form -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// import { useServiceLog } from '@/stores/service_log'
import { useAssetStore } from '@/stores/assetsData'

import { XMarkIcon } from '@heroicons/vue/24/outline'
import { BookmarkIcon } from '@heroicons/vue/24/solid'

import BaseHeader from '@/components/BaseHeader.vue'

// const serviceLogStore = useServiceLog()

const assetStore = useAssetStore()
// const dateFormat = (dateString) => {
//   const options = { year: 'numeric', month: 'short', day: 'numeric' }
//   return new Date(dateString).toLocaleDateString('en-EN', options)
// }
const selectType = ref('')
const selectAsset = ref(null)
const newServiceLog = reactive({
  dateAppoint: '',
  asset_tag: '',
})

function handleAssetTag(event) {
  const value = event.target.value
  newServiceLog.asset_tag = value
  // console.log('newServiceLog.asset_tag', selectAsset)
}
onMounted(async () => {
  await assetStore.fetchAsset()
})
// console.log('assetAll in serviceLog :', assetStore.assetAll)

const addSubmit = () => {
  console.log('submit form')
}
</script>

<style scoped>
.label {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0.1rem;
  color: #37383a;
}

.input {
  font-size: large;
  padding-left: 8px;
  padding-bottom: 8px;
  background-color: #dbeafe;
  border-radius: 8px;
}
</style>
