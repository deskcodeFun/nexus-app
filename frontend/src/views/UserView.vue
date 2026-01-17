<template>
  <!-- Header -->
  <header>
    <div class="flex flex-col justify-between bg-white sm:justify-normal py-16 px-2">
      <p class="text-lg tracking-widest text-blue-900">USER MANAGEMENT</p>
    </div>
  </header>
  <!-- Sub Menu -->
  <div class="flex flex-col sm:flex-row justify-between bg-white text-blue-900 tracking-wide p-2">
    <div class="flex flex-col sm:flex-row w-fit items-baseline">
      <p class="pr-4 mb-4 sm:mb-0">SELETECT BU</p>
      <select v-model="selectChoice" @change="handleChange" class="w-[150px] py-4 sm:py-0 bg-blue-50 ml-4 mb-4">
        <option :value="0">All</option>
        <option v-for="item in officeStores.offices" :key="item.id" :value="item.id">
          {{ item.short_name }}
        </option>
      </select>
    </div>
    <!-- Add new user button -->
    <div class="flex flex-row bg-white text-blue-900 tracking-wide sm:px-2 pb-4 gap-4">
      <RouterLink
        class="w-fit flex flex-row mx-2 px-2 py-1 rounded-full bg-blue-50/25 hover:text-white hover:bg-blue-800"
        to="/addUser">
        <div class="flex flex-row">
          <PlusIcon class="h-6 w-6" />
          <p>Add User</p>
        </div>
      </RouterLink>
    </div>
  </div>
  <!-- show data -->
  <main class="bg-white px-8">
    <!-- <div v-if="activeComponent">
      <UserCard />
    </div>
    <div>
      <UserTable />
    </div> -->
    <component :is="activeComponent"></component>
  </main>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { PlusIcon } from '@heroicons/vue/20/solid'
  import { useOfficeStore } from '@/stores/officeData'
  import { useStaffStore } from '@/stores/staff'
  import UserTable from '@/components/users/UserTable.vue'
  import UserCard from '@/components/users/UserCard.vue'
  import { useMonitorSize } from '@/composables/DeviceScreen'

  const officeStores = useOfficeStore()
  const staffStore = useStaffStore()
  // detect screen
  const sizes = useMonitorSize()
  const selectChoice = ref(0)

  watch(selectChoice, () => {
    console.log('select choice is ', selectChoice.value)
    if (selectChoice.value !== undefined) {
      // use function from staff store
      staffStore.getStaffByOffice(selectChoice.value)
      console.log('data from staff store: ', staffStore.StaffByOffice)
    } else {
      staffStore.getAllStaff()
    }
  })
  onMounted(() => {
    staffStore.getStaffByOffice(selectChoice.value)
    staffStore.getAllStaff()
  })

  const activeComponent = computed(() => {
    return sizes.isMobile.value ? UserCard : UserTable
  })
</script>
