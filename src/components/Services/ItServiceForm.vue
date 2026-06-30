<template>
  <!-- 1. show appointment date
       2. select assets
       3. show current user / FREE if no current user
       4. select new user and show detail
       5. save to service_log table and return to service view page
       6. check new card is show -->
  <!-- Appointment Date -->
  <BaseHeader
    title="IT Service Form"
    :isShow="true"
    class="bg-linear-to-r from-gray-100 to-white p-6 rounded-lg text-blue-900 text-lg font-semibold mb-8 py-2 px-2"
  />
  <main class="w-full h-[clamp(300px,70dvh,900px)] md:mt-4 px-2 overflow-scroll md:overflow-auto">
    <!--  separate 2 colomn 1. header, 2. format -->
    <div class="w-full flex flex-col md:flex-row md:gap-14">
      <!-- column 1 General info and service type-->
      <div class="w-sm">
        <p class="bg-linear-to-r from bg-amber-50 to-white px-2 py-1 text-lg">General Info</p>
        <!-- 1. show appontment date -->
        <div class="w-full flex flex-col mr-4 md:mr-0 md:flex-row justify-between">
          <p class="mx-1 mt-4 mb-2 md:mb-0 text-gray-500">Appointment Date</p>
          <input
            type="date"
            class="w-fit items-center mx-1 px-2 bg-blue-50 text-blue-900 font-bold"
            v-model="newService.appointment_date"
          />
        </div>
        <!-- 2. show select asset -->
        <div class="flex flex-col mr-4 md:mr-0 md:flex-row md:justify-between my-4 items-baseline">
          <p class="mx-1 mb-2 md:mb-0 text-gray-500">Asset Tag</p>
          <select
            v-model.trim="newService.asset_id"
            @change="handleassetID"
            class="w-fit items-center mx-1 px-2 py-1 bg-blue-50 text-blue-900 font-bold"
          >
            <option v-for="assetID in assetStore.assetAll" :key="assetID.id" :value="assetID.id">
              {{ assetID.id + assetID.asset_tag }}
            </option>
          </select>
        </div>
        <!-- 2.1 show asset user, BU -->
        <div v-show="assetID" class="bg-gray-50/50 grid-col md:mr-0 md:flex-row my-1 py-2">
          <div class="grid grid-cols-2 mb-2">
            <p class="text-gray-500">Current user</p>
            <p class="text-blue-700">{{ currentFname + ' ' + currentLname }}</p>
          </div>

          <div class="grid grid-cols-2">
            <p class="text-gray-500">Asset BU</p>
            <p class="text-blue-700">
              {{ currentBU.substring(0, currentBU.length - 9) }}
            </p>
          </div>
        </div>
        <hr class="mt-2 border-gray-300" />

        <!-- SubMenu select service type
             value is id column in service_type table  -->
        <div class="flex flex-col mt-4">
          <p class="bg-linear-to-r from bg-amber-50 to-white px-2 py-1 mb-2 text-lg">
            Service Type
          </p>
          <div class="mb-2">
            <input type="radio" id="4" value="4" v-model="newService.service_id" />
            <label for="4" class="ml-2 hover:cursor-pointer">Todo, Eror, Repair, Replace</label>
          </div>
          <div class="mb-2">
            <input type="radio" id="3" value="3" v-model="newService.service_id" />
            <label for="3" class="ml-2 hover:cursor-pointer">Change Commputer User</label>
          </div>
          <div class="mb-2">
            <input type="radio" id="5" value="5" v-model="newService.service_id" />
            <label for="5" class="ml-2 hover:cursor-pointer">HW - upgrade or change</label>
          </div>
        </div>
      </div>
      <!-- column 2 Show form by service type  -->
      <div>
        <!--column 2  service_type = 4, Todo  -->
        <div v-show="newService.service_id == 4" class="w-full md:w-md">
          <p class="font-semibold bg-linear-to-r from bg-amber-50 to-white px-2 py-1 text-md">
            Todo, Eror, Repair, Replace
          </p>

          <textarea
            rows="4"
            name="detail"
            id="detail"
            v-model="newService.detail"
            class="w-full mt-4 bg-green-50 border border-green-900"
          ></textarea>
        </div>
        <!-- column 2 service_type = 3b -->
        <div v-show="newService.service_id == 3">
          <p class="font-semibold bg-linear-to-r from bg-amber-50 to-white px-2 py-1 text-md">
            Change computer User
          </p>
          <!-- select new user -->
          <div
            class="flex flex-col mr-4 md:mr-0 md:flex-row md:justify-between my-4 items-baseline"
          >
            <p class="mx-1 mb-2 md:mb-0 text-gray-500">New user</p>
            <!-- option 1 : change user to FREE asset  option 2 : change user to other employee  -->
            <select
              v-model.trim="newService.nUser_id"
              @change="handleEmployee"
              class="w-fit p-2 items-center mx-1 px-2 bg-blue-50 text-blue-900 font-bold"
            >
              <option value="null" class="text-green-500 font-bold">FREE</option>
              <option v-for="users in employeeStore.employee" :key="users.id" :value="users.id">
                {{ users.fname + ' ' + users.lname }}
              </option>
            </select>
          </div>
          <!-- Show employee detail -->
          <div v-show="newUserId" class="bg-gray-50/50 mt-4">
            <div class="flex flex-row justify-between items-baseline mb-2">
              <p class="text-gray-400">user Name</p>
              <p class="text-blue-700">{{ newFname + ' ' + newLname }}</p>
            </div>
            <div class="flex flex-row justify-between items-baseline mb-2">
              <p class="text-gray-400">Department</p>
              <p class="text-blue-700">{{ newDept }}</p>
            </div>
            <div class="flex flex-row justify-between items-baseline mb-2">
              <p class="text-gray-400">User Office</p>
              <p class="text-blue-700">{{ newBU.substring(0, newBU.length - 9) }}</p>
            </div>
          </div>
          <!-- column 3 install program and map drive  -->
          <div v-show="newUserId">
            <!-- application -->
            <p class="bg-linear-to-r from bg-amber-50 to-white px-2 py-1 text-md">
              Install Program and printer
            </p>
            <p class="text-sky-600 mb-2">Application {{ checkList }}</p>
            <div
              v-for="items in appNameStore.appNameAll"
              :key="items.id"
              :value="items.application_name"
            >
              <input
                type="checkbox"
                :value="items.application_name"
                v-model="newService.application_list"
                class="mr-1"
              />
              <label>{{ items.application_name }}</label>
            </div>
            <!-- detail -->
            <div>
              <p class="text-sky-600 mb-2 mt-4">Other detail</p>
              <textarea
                rows="4"
                class="w-xs border bg-green-50/50"
                v-model.trim="newService.detail"
              ></textarea>
            </div>
          </div>
          <!-- Map drive -->
          <div v-show="newUserId" class="flex flex-col items-baseline">
            <p class="w-full bg-linear-to-r from bg-amber-50 to-white px-2 py-1 text-md">
              Map Drive
            </p>
            <!-- select bu -->
            <p class="text-blue-900 text-nowrap">Select BU {{ selectBU }}</p>
            <div class="w-xs flex-wrap flex flex-col md:flex-row gap-2" @change="handleNasList">
              <div class="flex flex-row">
                <input type="radio" value="0" v-model="selectBU" class="mr-1" />
                <label>ALL</label>
              </div>
              <div class="flex flex-row">
                <input type="radio" value="1" v-model="selectBU" class="mr-1" />
                <label>NPA</label>
              </div>
              <div class="flex flex-row">
                <input type="radio" value="2" v-model="selectBU" class="mr-1" />
                <label>Admin</label>
              </div>
              <div class="flex flex-row">
                <input type="radio" value="3" v-model="selectBU" class="mr-1" />
                <label>NPM</label>
              </div>
              <div class="flex flex-row">
                <input type="radio" value="4" v-model="selectBU" class="mr-1" />
                <label>NRA</label>
              </div>
              <div class="flex flex-row">
                <input type="radio" value="7" v-model="selectBU" class="mr-1" />
                <label>Conspire</label>
              </div>
            </div>
            <hr class="w-full mt-4 p-2 border-blue-800" />

            <!-- show map drive name if selectBU !== null -->
            <div
              v-show="selectBU"
              class="grid grid-cols-1 md:grid-cols-2 md:w-content md:gap-x-4 p-2 bg-amber-50"
            >
              <div
                v-for="items in nasNameStore.nasNameAll"
                :key="items.id"
                :value="items.name"
                class="flex flex-row"
              >
                <input type="checkbox" :value="items.name" v-model="newService.map_drive" />
                <p class="ml-1">{{ items.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 5. service_type = 3 HW-upgrade or change  -->
        <div v-show="newService.service_id == 5">
          <p class="font-semibold bg-linear-to-r from bg-amber-50 to-white px-2 py-1 text-md">
            HW - upgrade or change
          </p>
          <div class="w-full flex flex-col my-4">
            <div class="flex justify-between my-2">
              <label for="upgrade-ram">Upgrade RAM</label>
              <input
                id="upgrade-ram"
                type="text"
                v-model="updateRAM"
                @change="handleUpgrade"
                class="bg-green-50 mx-4"
              />
            </div>
            <div class="my-2">
              <label for="upgrade Harddisk">Upgrade Hard disk</label>
              <input
                type="text"
                v-model="updateHD"
                @change="handleUpgrade"
                class="bg-green-50 mx-4"
              />
            </div>

            <p class="w-sm text-wrap">{{ newDetail }}</p>
          </div>
        </div>
        <!-- button section -->
        <div v-show="assetID && newService.service_id">
          <form @submit.prevent="addSubmit" class="w-full flex flex-row justify-between">
            <button
              class="flex items-center justify-center hover:bg-red-900 hover:scale-102 border border-red-900 hover:text-white py-1 px-4 mt-8 rounded-xl"
              type="button"
              @click="$router.back()"
            >
              <XMarkIcon class="h-4 w-4 mr-2" />
              <span> Canccel </span>
            </button>
            <button
              class="flex items-center justify-center bg-blue-700 hover:bg-blue-900 hover:scale-102 text-white py-1 px-4 mt-8 rounded-xl"
              type="submit"
            >
              <BookmarkIcon class="h-4 w-4 mr-2" />
              <span> Save </span>
            </button>
          </form>
        </div>
      </div>
    </div>
    <!-- <div v-for="(key, index) in newService" :key="index">
      <p>{{ index }}: {{ key }}</p>
    </div> -->
  </main>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAssetStore } from '@/stores/assetsData'
import { useEmployeeStore } from '@/stores/employeeData'
import { useServiceLog } from '@/stores/service_log'
import { useAppNameStore } from '@/stores/applicationData'
import { useNasStore } from '@/stores/nasData'
import { useOfficeNameStore } from '@/stores/officeData'
import { BookmarkIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import BaseHeader from '../BaseHeader.vue'
// import BaseAccordion from '../BaseAccordion.vue'

// import FormatService from './FormatService.vue'

onMounted(async () => {
  try {
    await assetStore.fetchAsset() // use to show asset_tag in select assetID
    await employeeStore.getAllEmployee()
    await appNameStore.fetchAppNameAll()
    await officeNameStore.getAllOffice()
    // await nasNameStore.fetchNasNameAll(officeID)
  } catch (error) {
    console.error(error)
  }
})

const router = useRouter()
const assetStore = useAssetStore()
const employeeStore = useEmployeeStore()
const officeNameStore = useOfficeNameStore()
const appNameStore = useAppNameStore()
const nasNameStore = useNasStore()

// get nas drive name by officeID
const serviceLogStore = useServiceLog()
// 1. init ref variable for each column in service_log table
// const appointDate = new Date()
const assetID = ref('')
const assetTag = ref('')
const newDetail = ref('')
const currentFname = ref('')
const currentLname = ref('')
const currentDept = ref('')
const currentBU = ref('')
const newUserId = ref('')
const newFname = ref('')
const newLname = ref('')
// const newServiceID = ref('')
const newDept = ref('')
const newBU = ref('')
const updateRAM = ref()
const updateHD = ref()
const descriptRAM = ref('')
const descriptHD = ref('')
// 2. init newServiceLog reactive object, each key is colomn name in service_log table
const newService = reactive({
  appointment_date: '',
  asset_id: '',
  state: +1, // at first time state is alway 1 for notify list
  detail: '',
  fname: '',
  lname: '',
  service_id: '', // change user
  eUser_id: null, // link to employee detail page
  nUser_id: null, // link to employee detail page
  map_drive: [],
  application_list: [],
})

const selectBU = ref('')
const checkList = ref([])
// const mapDriveName = ref([])

async function handleassetID(event) {
  // if (!event || !event.target) return
  assetID.value = event.target.value
  await assetStore.getAssetDetail(assetID.value)
  assetTag.value = assetStore.assetDetail[0].asset_tag
  const employeeID = assetStore.assetDetail[0]?.employee?.id
  // get user detail from assetStore employee id
  if (employeeID) {
    await employeeStore.getEmployeeDetail(employeeID)
    currentFname.value = employeeStore.employeeDetail[0].fname
    currentLname.value = employeeStore.employeeDetail[0].lname
    currentDept.value = employeeStore.employeeDetail[0].department_name.name
    currentBU.value = employeeStore.employeeDetail[0].office_name.name
    newService.fname = currentFname.value
    newService.lname = currentLname.value
  } else {
    currentFname.value = 'FREE'
    currentLname.value = ''
    currentDept.value = null
    currentBU.value = assetStore.assetDetail[0].office_name.name
    newService.fname = null
    newService.lname = null
  }

  console.log('Emaployee detail', employeeStore.employeeDetail)
  console.log('Asset Detail : ', assetStore.assetDetail)
  // console.log('emaployee detail ', employeeStore.employeeDetail.id)
}

async function handleEmployee(event) {
  if (!event || !event.target) return
  const value = event.target.value
  newUserId.value = value
  // get employee detail by newServiceLog.user_id to show detail in page
  // treat string "null" (from option value) or falsy values as FREE
  if (newUserId.value && newUserId.value !== 'null') {
    await employeeStore.getEmployeeDetail(newUserId.value)
    console.log('employee detail : ', employeeStore.employeeDetail)
    newFname.value = employeeStore.employeeDetail[0].fname
    newLname.value = employeeStore.employeeDetail[0].lname
    newDept.value = employeeStore.employeeDetail[0].department_name.name
    newBU.value = employeeStore.employeeDetail[0].office_name.name
    newService.service_id = 3
    newService.detail =
      'Chnage user from' +
      ' ' +
      currentFname.value +
      ' ' +
      currentLname.value +
      ' TO ' +
      ' ' +
      newFname.value +
      ' ' +
      newLname.value
  } else {
    newFname.value = 'Free'
    newLname.value = ''
    newDept.value = ''
    newBU.value = ''
    newService.service_id = 3
  }
}

async function handleNasList(event) {
  if (!event || !event.target) return
  if (selectBU.value == 0) {
    await nasNameStore.getAllNas()
    nasNameStore.nasNameAll = nasNameStore.allNas
  } else {
    await nasNameStore.fetchNasNameAll(selectBU.value)
  }
  console.log('event in handleNasList', event, event.target)
  console.log('list of nas by selectBU', selectBU.value, nasNameStore.nasNameAll)
}
const handleUpgrade = () => {
  descriptHD.value = updateHD.value ? 'update Harddisk to ' + updateHD.value : ''
  descriptRAM.value = updateRAM.value ? 'update RAM to ' + updateRAM.value : ''
  newService.detail = descriptRAM.value + ' ' + descriptHD.value
}

async function addSubmit() {
  try {
    console.log('newService object', newService)
    await serviceLogStore.addService({ ...newService })
    console.log('successful add service card', newService)
  } catch (error) {
    return { data: undefined, error: error }
  } finally {
    Object.assign(newService, {
      appointment_date: '',
      asset_id: Number,
      state: 1, // at first time state is alway 1 for notify list
      detail: '',
      fname: '',
      lname: '',
      service_id: 3, // change user
      euser_id: Number, // link to employee detail page
      nuser_id: Number, // link to employee detail page
      map_drive: [],
      application_list: [],
    })
    router.push('/services')
  }
}
</script>
