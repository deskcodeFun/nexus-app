<template>
  <BaseHeader title="ADD Service" :isShow="true" />
  <!-- container -->
  <div
    class="h-[clamp(300px,70dvh,600px)] overflow-y-auto flex flex-col mx-2 lg:flex-row gap-4 lg:gap-24"
  >
    <!-- asset and employee infomation -->
    <div class="w-sm md:w-md">
      <p class="text-blue-900 text-lg">Asset Information</p>

      <div class="flex flex-col justify-between">
        <div class="flex flex-row justify-between items-baseline py-2">
          <p>Appointment Date</p>
          <input
            type="date"
            class="w-fit px-2 bg-blue-50"
            v-model.trim="newServiceLog.dateAppoint"
          />
        </div>
        <div class="flex flex-row justify-between items-baseline py-2">
          <p class="pb-1">Asset Tag</p>
          <select v-model.trim="selectAsset" @change="handleAssetTag" class="w-fit px-2 bg-blue-50">
            <option
              v-for="selectAsset in assetStore.assetAll"
              :key="selectAsset.id"
              :value="selectAsset"
            >
              {{ selectAsset.asset_tag }}
            </option>
          </select>
        </div>
        <!-- employee detail -->
        <div v-if="selectAsset?.user_id" class="m-2 flex flex-col justify-between">
          <div class="flex flex-row justify-between items-baseline">
            <label for="employeeName" class="label">User Name</label>
            <p>{{ selectAsset.employee.fname + ' ' + selectAsset.employee.lname }}</p>
          </div>
          <div class="flex flex-row justify-between items-baseline">
            <label for="employeeEmail" class="label">Email</label>
            <p>{{ selectAsset.employee.email }}</p>
          </div>
          <div class="flex flex-row justify-between items-baseline">
            <label for="employeeDept" class="label">Department</label>
            <p>{{ selectAsset.employee.department }}</p>
          </div>
          <div class="flex flex-row justify-between items-baseline">
            <label for="employeeOffice" class="label">BU</label>
            <p>{{ selectAsset.office_name.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Service type selected -->
    <div class="max-w-md md:max-w-xl lg:max-w-3xl gap-4">
      <!-- Service type options -->
      <div class="flex flex-col md:flex-row items-baseline">
        <!-- Header -->
        <p class="flex sm:items-center text-blue-900 mr-4">Service Type :</p>
        <!-- Error -->
        <div>
          <input type="radio" id="1" value="1" v-model="selectType" class="mr-1" />
          <label for="1" class="mr-6">Error</label>
        </div>
        <!-- Format -->
        <div>
          <input type="radio" id="2" value="2" v-model="selectType" class="mr-1" />
          <label for="2" class="mr-6">Format</label>
        </div>
        <!-- Change User -->
        <div>
          <input type="radio" id="3" value="3" v-model="selectType" class="mr-1" />
          <label for="3" class="mr-6">Change User</label>
        </div>
        <!-- Other -->
        <div>
          <input type="radio" id="4" value="4" v-model="selectType" class="mr-1" />
          <label for="4" class="mr-6">Other</label>
        </div>
      </div>
      <!-- Form fields for each service type -->
      <div class="flex flex-col overflow-auto">
        <!-- Error type form -->
        <div v-if="selectType == 1" class="w-full max-w-md md:max-w-xl lg:max-w-3xl">
          <p class="mt-4 mb-2">Error Detail</p>
          <textarea
            rows="6"
            class="w-full max-w-md md:max-w-xl lg:max-w-3xl border bg-blue-50"
          ></textarea>
        </div>
        <!-- Reformat type form -->
        <div v-else-if="selectType == 2" class="w-full max-w-md md:max-w-xl lg:max-w-3xl">
          <p class="text-blue-900 mt-4 mb-2">Application</p>
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
                <input
                  type="checkbox"
                  id="acrobat"
                  value="acrobat"
                  v-model="checkList"
                  class="mr-1"
                />
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
          <div>
            <p class="mt-4 mb-2">Other Program</p>
            <textarea
              rows="6"
              class="w-full border bg-stone-50"
              v-model.trim="other_prog"
            ></textarea>
          </div>

          <!-- map drive section -->
          <div>
            <p class="text-blue-900 my-2"></p>
            <p class="p-2">Map Drive :{{ 'list' + ' ' + mapDriveName }}</p>
            <hr />
            <div class="w-fit flex flex-col">
              <!-- select BU first -->
              <p class="text-blue-900 text-nowrap">Select BU</p>
              <div class="flex items-baseline">
                <div class="flex flex-col md:flex-row gap-2">
                  <div class="flex flex-row">
                    <input type="radio" id="map1" value="map1" v-model="selectBU" class="mr-1" />
                    <label for="map1" class="mr-6">NPA</label>
                  </div>
                  <div class="flex flex-row">
                    <input type="radio" id="map2" value="map2" v-model="selectBU" class="mr-1" />
                    <label for="map2" class="mr-6">Admin</label>
                  </div>
                  <div class="flex flex-row">
                    <input type="radio" id="map3" value="map3" v-model="selectBU" class="mr-1" />
                    <label for="map3" class="mr-6">NPM</label>
                  </div>
                  <div class="flex flex-row">
                    <input type="radio" id="map4" value="map4" v-model="selectBU" class="mr-1" />
                    <label for="map4" class="mr-6">NRA</label>
                  </div>
                  <div class="flex flex-row">
                    <input type="radio" id="4" value="map5" v-model="selectBU" class="mr-1" />
                    <label for="map5" class="mr-6">Conspire</label>
                  </div>
                </div>
              </div>
              <!-- show map drive npa -->
              <!-- <p>{{ selectBU }}</p> -->
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
        <form @submit.prevent="addSubmit" class="flex flex-row justify-end gap-16">
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
            type="submit"
          >
            <BookmarkIcon class="h-4 w-4 mr-2" />
            <span> Save </span>
          </button>
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
            type="submit"
          >
            <BookmarkIcon class="h-4 w-4 mr-2" />
            <span> close </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// import { useServiceLog } from '@/stores/service_log'
import { useAssetStore } from '@/stores/assetsData'
import { useEmployeeStore } from '@/stores/employeeData'

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
  console.log('newServiceLog.asset_tag', selectAsset)
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
<style scoped></style>
