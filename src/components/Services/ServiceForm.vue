<template>
  <div class="w-auto min-h-screen mt-12 px-4 bg-teal-50 rounded-xl overflow-auto">
    <div class="flex flex-row justify-between">
      <BaseHeader title="SERVICE FORM" />
      <XMarkIcon
        @click="$emit('close-form')"
        class="h-6 w-6 mt-8 text-gray-400 font-extrabold border rounded-full hover:text-red-800 hover:cursor-pointer"
      />
    </div>
    <hr class="border-gray-300 mb-8" />

    <!-- asset and employee infomation -->
    <div class="mx-8 grid grid-cols-1 md:grid-cols-2 gap-y-2">
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
      class="mx-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-0"
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

    <!-- Service type selected, value of selected is a value of service_title feild in DB -->
    <div>
      <p class="text-blue-900 text-xl py-2 pb-4">Service Type :</p>
      <input type="radio" id="1" value="1" v-model="selectType" class="mr-1" />
      <label for="1" class="mr-6">Error</label>
      <input type="radio" id="2" value="2" v-model="selectType" class="mr-1" />
      <label for="2" class="mr-6">Format</label>
      <input type="radio" id="3" value="3" v-model="selectType" class="mr-1" />
      <label for="3" class="mr-6">Change User</label>

      <input type="radio" id="4" value="4" v-model="selectType" class="mr-1" />
      <label for="4" class="mr-6">Other</label>
    </div>

    <!-- Error type form -->
    <div v-if="selectType == 1">
      <p class="mt-4 mb-2">Error Detail</p>
      <textarea rows="6" cols="50" class="border bg-stone-50"></textarea>
    </div>
    <!-- Reformat type form -->
    <div v-else-if="selectType == 2">
      <p class="text-blue-900 text-xl mt-4 mb-2">Application</p>
      <hr />
      <p class="p-2">Check Program List {{ checkList }}</p>
      <ul class="flex flex-row gap-8">
        <!-- column 1 -->
        <div>
          <li>
            <input
              type="checkbox"
              id="msOffice"
              value="msOffice"
              v-model="checkList"
              class="mr-1"
            />
            <label for="msOffice" class="">Microsoft Office</label>
          </li>
          <li>
            <input type="checkbox" id="acrobat" value="acrobat" v-model="checkList" class="mr-1" />
            <label for="acrobat">Acrobat Reader</label>
          </li>
        </div>
        <!-- column 2 -->
        <div>
          <li>
            <input
              type="checkbox"
              id="printerNexus"
              value="printerNexus"
              v-model="checkList"
              class="mr-1"
            />
            <label for="printeNexus">Printer Toshiba - Nexus</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="printerNra"
              value="printerNra"
              v-model="checkList"
              class="mr-1"
            />
            <label for="printerNra">Printer Toshiba - NRA</label>
          </li>
        </div>
      </ul>
      <div class="w-fit flex flex-col">
        <label for="other">Other</label>
        <textarea
          rows="6"
          cols="45"
          name="other"
          id="ohter"
          v-model="other_prog"
          class="border"
        ></textarea>
      </div>
      <!-- map drive section -->
      <div>
        <p class="text-blue-900 text-xl my-2">Map Drive</p>
        <hr />
        <p class="p-2">Map Drive:{{ mapDriveName }}</p>
        <div class="w-fit flex flex-col gap-2">
          <!-- select BU first -->
          <div class="flex flex-row items-baseline">
            <p class="text-blue-900 text-md py-2 pr-4">Select BU</p>
            <input type="radio" id="map1" value="map1" v-model="selectBU" class="mr-1" />
            <label for="map1" class="mr-6">NPA</label>
            <input type="radio" id="map2" value="map2" v-model="selectBU" class="mr-1" />
            <label for="map2" class="mr-6">Admin</label>
            <input type="radio" id="map3" value="map3" v-model="selectBU" class="mr-1" />
            <label for="map3" class="mr-6">NPM</label>
            <input type="radio" id="map4" value="map4" v-model="selectBU" class="mr-1" />
            <label for="map4" class="mr-6">NRA</label>
            <input type="radio" id="4" value="map5" v-model="selectBU" class="mr-1" />
            <label for="map5" class="mr-6">Conspire</label>
          </div>
          <!-- show map drive npa -->
          <p>{{ selectBU }}</p>
          <div v-if="selectBU == 'map1'">
            <p>NPA</p>
            <ul class="flex flex-row gap-2">
              <li>
                <input type="checkbox" id="mapD1" value="mapD1" v-model="mapDriveName" />
                <label for="mapD1" class="px-1">Agency</label>
              </li>
              <li>
                <input type="checkbox" id="mapD2" value="mapD2" v-model="mapDriveName" />
                <label for="mapD2" class="px-1">Brokerage-Service</label>
              </li>
              <li>
                <input type="checkbox" id="mapD3" value="mapD3" v-model="mapDriveName" />
                <label for="mapD3" class="px-1">Investment</label>
              </li>
            </ul>
          </div>
          <div v-if="selectBU == 'map2'">
            <p>Admin</p>
            <ul class="flex flex-col flex-wrap gap-2">
              <li>
                <input type="checkbox" id="mapD4" value="mapD4" v-model="mapDriveName" />
                <label for="mapD4" class="pl-2">Administator</label>
              </li>
              <li>
                <input type="checkbox" id="mapD5" value="mapD5" v-model="mapDriveName" />
                <label for="mapD5" class="pl-2">Central Admin</label>>
              </li>
              <li>
                <input type="checkbox" id="mapD6" value="mapD6" v-model="mapDriveName" />
                <label for="mapD6" class="pl-2">Finance Management</label>
              </li>
              <li>
                <input type="checkbox" id="mapD7" value="mapD7" v-model="mapDriveName" />
                <label for="mapD7" class="pl-2">Finance&Accounting</label>
              </li>
              <li>
                <input type="checkbox" id="mapD8" value="mapD8" v-model="mapDriveName" />
                <label for="mapD8" class="pl-2">Humen Resource</label>
              </li>
              <li>
                <input type="checkbox" id="mapD9" value="mapD9" v-model="mapDriveName" />
                <label for="mapD9" class="pl-2">Management Team</label>
              </li>
              <li>
                <input type="checkbox" id="mapD10" value="mapD10" v-model="mapDriveName" />
                <label for="mapD10" class="pl-2">Template</label>
              </li>
            </ul>
          </div>
          <div v-if="selectBU == 'map3'">
            <p>NPM</p>
            <ul>
              <li>
                <input type="checkbox" id="mapD11" value="mapD11" v-model="mapDriveName" />
                <label for="mapD11" class="pl-2">Mailing list</label>
              </li>
              <li>
                <input type="checkbox" id="mapD12" value="mapD12" v-model="mapDriveName" />
                <label for="mapD12" class="pl-2">Real Estate Sulution</label>
              </li>
              <li>
                <input type="checkbox" id="mapD13" value="mapD13" v-model="mapDriveName" />
                <label for="mapD13" class="pl-2">Real Estate Sulution2</label>
              </li>
              <li>
                <input type="checkbox" id="mapD14" value="mapD14" v-model="mapDriveName" />
                <label for="mapD14" class="pl-2">Sales</label>
              </li>
            </ul>
          </div>
          <div v-if="selectBU == 'map4'">
            <p>NRA</p>
            <ul>
              <li>
                <input type="checkbox" id="mapD15" value="mapD15" v-model="mapDriveName" />
                <label for="mapD15" class="pl-2">Advisory</label>
              </li>
              <li>
                <input type="checkbox" id="mapD16" value="mapD16" v-model="mapDriveName" />
                <label for="mapD16" class="pl-2">Corporate Client</label>
              </li>
              <li>
                <input type="checkbox" id="mapD17" value="mapD17" v-model="mapDriveName" />
                <label for="mapD17" class="pl-2">General Admin</label>
              </li>
              <li>
                <input type="checkbox" id="mapD18" value="mapD18" v-model="mapDriveName" />
                <label for="mapD18" class="pl-2">Investment</label>
              </li>
              <li>
                <input type="checkbox" id="mapD19" value="mapD19" v-model="mapDriveName" />
                <label for="mapD19" class="pl-2">Research</label>
              </li>
              <li>
                <input type="checkbox" id="mapD20" value="mapD20" v-model="mapDriveName" />
                <label for="mapD20" class="pl-2">Valuation</label>
              </li>
              <li>
                <input type="checkbox" id="mapD21" value="mapD21" v-model="mapDriveName" />
                <label for="mapD21" class="pl-2">OLD NRA</label>
              </li>
            </ul>
          </div>
          <div v-if="selectBU == 'map5'">
            <p>Conspire</p>
            <div>
              <input type="checkbox" id="mapD22" value="mapD22" v-model="mapDriveName" />
              <label for="mapD22" class="pl-2">Conspire</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Change Computer type form -->
    <div v-else-if="selectType == 3">
      <div class="flex flex-row pr-4 mt-8">
        <p class="pt-2 pr-4">Chnage to New User Name</p>
        <select v-model.trim="selectEmployee" @change="handleEmployee" class="input">
          <option v-for="user in employeeStore.employee" :key="user.id" :value="user">
            {{ user.fname + ' ' + user.lname }}
          </option>
        </select>
      </div>
    </div>
    <!-- Other type form -->
    <div v-else-if="selectType == 4">
      <p class="mt-4 mb-2">Detail</p>
      <textarea rows="6" cols="50" class="border bg-stone-50"></textarea>
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
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// import { useServiceLog } from '@/stores/service_log'
import { useAssetStore } from '@/stores/assetsData'
import { useEmployeeStore } from '@/stores/employeeData'

import { XMarkIcon } from '@heroicons/vue/24/outline'
import { BookmarkIcon } from '@heroicons/vue/24/solid'

import BaseHeader from '@/components/BaseHeader.vue'

// const serviceLogStore = useServiceLog()

const assetStore = useAssetStore()
const employeeStore = useEmployeeStore()
// const dateFormat = (dateString) => {
//   const options = { year: 'numeric', month: 'short', day: 'numeric' }
//   return new Date(dateString).toLocaleDateString('en-EN', options)
// }
const selectAsset = ref(null)
const selectEmployee = ref(null)
const selectType = ref('')
const selectBU = ref('')
const checkList = ref([])
const mapDriveName = ref([])
const other_prog = ref('')
const newServiceLog = reactive({
  dateAppoint: '',
  asset_tag: '',
  employee: '',
})

function handleAssetTag(event) {
  const value = event.target.value
  newServiceLog.asset_tag = value
  // console.log('newServiceLog.asset_tag', selectAsset)
}
function handleEmployee(event) {
  const value = event.target.value
  newServiceLog.employee = value
  // console.log('newServiceLog.asset_tag', selectAsset)
}
onMounted(async () => {
  await assetStore.fetchAsset()
  await employeeStore.getAllEmployee()
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
  background-color: #dbeafe;
  border-radius: 8px;
}
</style>
