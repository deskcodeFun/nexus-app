<template>
  <!-- 1. show appointment date
       2. select assets
       3. show current user / FREE if no current user
       4. select new user and show detail
       5. save to service_log table and return to service view page
       6. check new card is show
       class="w-full md:w-md h-[clamp(300px,70dvh,900px)] md:h-fit md:mt-4 px-2 overflow-scroll md:overflow-auto"
       -->
  <!-- Appointment Date -->
  <main>
    <!-- Service Format -->
    <div class="flex flex-col justify-between items-baseline py-2">
      <p class="w-full bg-linear-to-r from bg-green-50 to-white px-2 py-1 text-md">
        Computer installation
      </p>

      <!-- Format Details -->
      <div class="w-full flex flex-row justify-between items-baseline">
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
  </main>
</template>
<script setup>
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'

import { useAssetStore } from '@/stores/assetsData'
import { useEmployeeStore } from '@/stores/employeeData'
// import { useServiceLog } from '@/stores/service_log'
// import { BookmarkIcon, XMarkIcon } from '@heroicons/vue/20/solid'

onMounted(async () => {
  await assetStore.fetchAsset() // use to show asset_tag in select assetID
  await employeeStore.getAllEmployee()
})
// const router = useRouter()
const assetStore = useAssetStore()
const employeeStore = useEmployeeStore()
// const serviceLogStore = useServiceLog()
const selectBU = ref('')
const checkList = ref([])
const mapDriveName = ref([])
const other_prog = ref('')
// 1. init ref variable for each column in service_log table
// const appointDate = ref('')
// const assetID = ref('')
// const assetTag = ref('')
// const newDetail = ref('')
// const currentFname = ref('')
// const currentLname = ref('')
// const currentDept = ref('')
// const currentBU = ref('')
// const newUserId = ref('')
// const newFname = ref('')
// const newLname = ref('')
// const newDept = ref('')
// const newBU = ref('')
// 2. init newServiceLog reactive object, each key is colomn name in service_log table
// const newService = reactive({
//   appointment_date: '',
//   asset_tag: '',
//   state: 1, // at first time state is alway 1 for notify list
//   detail: '',
//   fname: '',
//   lname: '',
//   service_id: 3, // change user
//   user_id: '', // link to employee detail page
// })

// async function handleassetID(event) {
//   if (!event || !event.target) return
//   assetID.value = event.target.value
//   await assetStore.getAssetDetail(assetID.value)
//   assetTag.value = assetStore.assetDetail[0].asset_tag
//   const employeeID = assetStore.assetDetail[0]?.employee?.id
//   // get user detail from assetStore employee id
//   if (employeeID) {
//     await employeeStore.getEmployeeDetail(employeeID)
//     currentFname.value = employeeStore.employeeDetail[0].fname
//     currentLname.value = employeeStore.employeeDetail[0].lname
//     currentDept.value = employeeStore.employeeDetail[0].department_name.name
//     currentBU.value = employeeStore.employeeDetail[0].office_name.name
//   } else {
//     currentFname.value = 'Free'
//     currentLname.value = ''
//     currentDept.value = ''
//     currentBU.value = assetStore.assetDetail[0].office_name.name
//   }

//   console.log('Emaployee detail', employeeStore.employeeDetail)
//   console.log('Asset Detail : ', assetStore.assetDetail)
//   // console.log('emaployee detail ', employeeStore.employeeDetail.id)
// }

// async function handleEmployee(event) {
//   if (!event || !event.target) return
//   const value = event.target.value
//   newUserId.value = value
//   // get employee detail by newServiceLog.user_id to show detail in page
//   // treat string "null" (from option value) or falsy values as FREE
//   if (newUserId.value && newUserId.value !== 'null') {
//     await employeeStore.getEmployeeDetail(newUserId.value)
//     console.log('employee detail : ', employeeStore.employeeDetail)
//     newFname.value = employeeStore.employeeDetail[0].fname
//     newLname.value = employeeStore.employeeDetail[0].lname
//     newDept.value = employeeStore.employeeDetail[0].department_name.name
//     newBU.value = employeeStore.employeeDetail[0].office_name.name
//   } else {
//     newFname.value = 'Free'
//     newLname.value = ''
//     newDept.value = ''
//     newBU.value = ''
//   }
// }
// async function addSubmit() {
//   try {
//     newService.appointment_date = appointDate.value
//     newService.asset_tag = assetTag.value
//     newService.detail = newDetail.value
//     newService.fname = newFname.value
//     newService.lname = newLname.value
//     newService.user_id = newUserId.value

//     await serviceLogStore.addService({ ...newService })
//     console.log('successful add service card', newService)
//   } catch (error) {
//     return { data: undefined, error: error }
//   } finally {
//     Object.assign(newService, {
//       appointment_date: '',
//       asset_tag: '',
//       state: 1, // at first time state is alway 1 for notify list
//       detail: '',
//       fname: '',
//       lname: '',
//       service_id: 3, // change user
//       user_id: '', // link to employee detail page
//     })
//     router.push('/services')
//   }
// }

// const dateFormat = (date) => {
//   return new Date(date).toLocaleDateString('en-EN', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   })
// }
// const formattedAppointmentDate = computed({
//   get: () => newServiceLog.appointmentDate.toISOString().split('T')[0],
//   set: (value) => {
//     newServiceLog.appointmentDate = new Date(value)
//   },
// })
</script>
