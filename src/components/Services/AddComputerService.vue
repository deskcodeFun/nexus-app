<template>
  <BaseHeader title="Computer Service" :isShow="true"></BaseHeader>
  <!-- container -->
  <div
    class="h-[clamp(300px,70dvh,600px)] overflow-y-auto flex flex-col mx-2 lg:flex-row gap-4 lg:gap-24"
  >
    <!-- asset and employee infomation -->
    <div class="w-sm md:w-md">
      <p class="text-blue-900 text-lg">Asset Information</p>
      <hr class="my-1 mb-4 border-blue-900" />
      <!-- Appointment Date -->
      <div class="flex flex-col justify-between">
        <div class="flex flex-row justify-between items-baseline py-2">
          <p>Appointment Date</p>
          <input
            type="date"
            class="w-fit px-2 bg-blue-50"
            v-model.trim="newServiceLog.dateAppoint"
          />
        </div>
        <!-- select asset by tag -->
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
        <!-- case: user not free -->
        <div v-if="selectAsset?.user_id" class="m-2 flex flex-col justify-between">
          <div class="flex flex-row justify-between items-baseline">
            <label for="employeeName" class="label">User Name</label>
            <!-- <p>{{ selectAsset.employee.fname + ' ' + selectAsset.employee.lname }}</p> -->
            <p>
              {{
                employeeStore.employeeDetail[0]?.fname +
                ' ' +
                employeeStore.employeeDetail[0]?.lname
              }}
            </p>
          </div>
          <!-- <div class="flex flex-row justify-between items-baseline">
            <label for="employeeEmail" class="label">Email</label>
            <p>{{ selectAsset.employee.email }}</p>
          </div> -->
          <div class="flex flex-row justify-between items-baseline">
            <label for="employeeDept" class="label">Department</label>
            <p>{{ employeeStore.employeeDetail[0].department_name.name }}</p>
          </div>
          <div class="flex flex-row justify-between items-baseline">
            <label for="employeeOffice" class="label">User Office </label>
            <p>{{ employeeStore.employeeDetail[0]?.office_name?.name }}</p>
          </div>
        </div>
        <!--case: user is free  -->
        <div v-show="selectAsset?.user_id === null" class="w-full m-2 flex justify-end">
          <p class="text-green-500 font-bold mx-2">FREE</p>
        </div>
      </div>

      <!-- Service Change user  -->
      <div class="flex flex-col justify-between items-baseline py-2">
        <!-- Change User Checkbox -->
        <div class="w-full">
          <input type="checkbox" id="changeUser" value="changeUser" v-model="changeUser" />
          <label for="employeeName" class="text-lg items-baseline text-blue-900 mx-1"
            >Change User {{ changeUser }}</label
          >
          <hr class="my-1 mb-4 border-blue-900" />
        </div>
        <!-- Select new user -->
        <div v-show="changeUser" class="w-full flex flex-row justify-between items-baseline">
          <p class="text-blue-900">Select new user</p>
          <!-- option 1 : change user to FREE asset  option 2 : change user to other employee  -->
          <select v-model.trim="selectEmployee" @change="handleEmployee" class="px-2 bg-blue-50">
            <option value="null" class="text-green-500 font-bold">FREE</option>
            <option v-for="users in employeeStore.employee" :key="users.id" :value="users.id">
              {{ users.fname + ' ' + users.lname }}
            </option>
          </select>
        </div>
        <!-- user details -->
        <div
          v-if="employeeStore.employeeDetail[0] && changeUser"
          class="w-full m-2 flex flex-col justify-between"
        >
          <!-- <div class="w-full flex flex-row justify-between items-baseline">
            <label for="employeeEmail" class="label">Email</label>
            <p>{{ selectEmployee.email }}</p>
          </div> -->

          <div class="w-full flex flex-row justify-between items-baseline">
            <label for="employeeDept" class="label">Department</label>
            <p>{{ employeeStore.employeeDetail[0].department_name.name }}</p>
          </div>

          <div class="w-full flex flex-row justify-between items-baseline">
            <label for="employeeOffice" class="label">BU</label>
            <p>{{ employeeStore.employeeDetail[0].office_name.name }}</p>
          </div>
        </div>
      </div>

      <!-- Service Error  -->
      <div class="flex flex-col justify-between items-baseline py-2">
        <!-- Error Checkbox -->
        <div class="w-full">
          <input type="checkbox" id="changeUser" value="changeUser" v-model="errorType" />
          <label for="employeeName" class="text-lg items-baseline text-blue-900 mx-1"
            >Error - Other</label
          >
          <hr class="my-1 mb-4 border-blue-900" />
        </div>
        <!-- Error Details -->
        <div v-show="errorType" class="w-full flex flex-row justify-between items-baseline">
          <textarea
            rows="6"
            class="w-full max-w-md md:max-w-xl lg:max-w-3xl border bg-blue-50"
          ></textarea>
        </div>
      </div>

      <!-- Service Format -->
      <div class="flex flex-col justify-between items-baseline py-2">
        <!-- Format Checkbox -->
        <div class="w-full">
          <input type="checkbox" id="changeUser" value="changeUser" v-model="formatType" />
          <label for="employeeName" class="text-lg items-baseline text-blue-900 mx-1">Format</label>
          <hr class="my-1 mb-4 border-blue-900" />
        </div>
        <!-- Format Details -->
        <div v-show="formatType" class="w-full flex flex-row justify-between items-baseline">
          <!-- Reformat type form -->
          <div>
            <p class="text-sky-600 mb-2">Application {{ checkList }}</p>
            <ul class="flex flex-row gap-8">
              <!-- column 1 -->
              <div>
                <li>
                  <input
                    type="checkbox"
                    id="msOffice"
                    value="MS-office"
                    v-model="checkList"
                    class="mr-1"
                  />
                  <label for="msOffice" class="">Microsoft Office</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="msOffice"
                    value="Visio"
                    v-model="checkList"
                    class="mr-1"
                  />
                  <label for="msOffice" class="">Microsoft Visio</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="acrobat"
                    value="acrobat reader"
                    v-model="checkList"
                    class="mr-1"
                  />
                  <label for="acrobat">Acrobat Reader</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="acrobat"
                    value="acrobat pro"
                    v-model="checkList"
                    class="mr-1"
                  />
                  <label for="acrobat">Acrobat Pro</label>
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
                  <ul class="flex flex-col gap-2">
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
        </div>
      </div>

      <!-- button section -->
      <div class="w-full flex flex-row mb-4">
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
            <XMarkIcon class="h-4 w-4 mr-2" />
            <span> close </span>
          </button>
        </form>
      </div>
      <!-- end of asset and employee information -->
    </div>
    <!-- end container -->
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'

// import { useServiceLog } from '@/stores/service_log'
import { useAssetStore } from '@/stores/assetsData'
import { useEmployeeStore } from '@/stores/employeeData'
import { BookmarkIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import BaseHeader from '../BaseHeader.vue'

const assetStore = useAssetStore()
const employeeStore = useEmployeeStore()
const changeUser = ref(false)
const errorType = ref(false)
const formatType = ref(false)
// const dateFormat = (dateString) => {
//   const options = { year: 'numeric', month: 'short', day: 'numeric' }
//   return new Date(dateString).toLocaleDateString('en-EN', options)
// }
const selectAsset = ref(null)
const selectEmployee = ref(null)
// const selectType = ref('')
const selectBU = ref('')
const checkList = ref([])
const mapDriveName = ref([])
const other_prog = ref('')
const newServiceLog = reactive({
  dateAppoint: '',
  asset_tag: '',
  employee: '',
})

async function handleAssetTag(event) {
  const value = event.target.value
  newServiceLog.asset_tag = value
  if (selectAsset.value?.employee?.id) {
    await employeeStore.getEmployeeDetail(selectAsset.value.employee.id)
    console.log('selectAsset.value', selectAsset.value)
    console.log('emaployee detail ', employeeStore.employeeDetail)
  }
  console.log('newServiceLog.asset_tag', selectAsset)
}
async function handleEmployee(event) {
  const value = event.target.value
  if (value !== null) {
    newServiceLog.employee = value
    if (selectEmployee.value.employee !== null || undefined) {
      await employeeStore.getEmployeeDetail(selectAsset.value.employee.id)
      console.log('selectAsset.value', selectAsset.value)
      console.log('emaployee detail ', employeeStore.employeeDetail)
      console.log('newServiceLog.asset_tag', changeUser.value)
    }
  }
}
// console.log('newServiceLog.asset_tag', selectAsset)
// console.log('newServiceLog.asset_tag', newServiceLog)

onMounted(async () => {
  await assetStore.fetchAsset()
  await employeeStore.getAllEmployee()
})
// console.log('assetAll in serviceLog :', assetStore.assetAll)

const addSubmit = () => {
  console.log('submit form')
}
</script>
