<template>
  <main class="min-h-screen md:w-11/12 flex flex-col mx-auto my-2">
    <BaseHeader title="EMPLOYEE MANAGEMENT" />
    <!-- Sub Menu -->
    <div class="w-full flex flex-col gap-y-4 lg:flex-row lg:justify-between">
      <BaseButtonAdd Link="/addEmployee" label="Employee"></BaseButtonAdd>
      <div class="flex flex-row justify-between items-baseline sm:gap-x-8">
        <BaseOfficeDrop @select-option="handleChoice" />
        <!-- Search -->
        <div class="relative rounded-full group">
          <input
            type="text"
            placeholder="Search Employee"
            v-model="searchQuery"
            @blur="searchQuery = ''"
            @keyup.enter="handleSearch"
            class="text-xs px-2 border border-full border-blue-800 py-1 rounded-full text-blue-900 placeholder:text-blue-900"
          />

          <MagnifyingGlassIcon
            class="w-4 h-5 absolute inset-y-1 right-2 flex items-center pointer-events-none text-blue-900 group-focus-within:text-blue-800"
          />
        </div>
      </div>
    </div>

    <hr class="my-4 border-gray-300 lg:hidden" />

    <!-- show data -->
    <div v-if="isMobile">
      <EmployeeCard />
    </div>
    <div v-else>
      <EmployeeTable />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseOfficeDrop from '@/components/BaseOfficeDrop.vue'
import BaseButtonAdd from '@/components/BaseButtonAdd.vue'

import EmployeeTable from '@/components/employees/EmployeeTable.vue'
import EmployeeCard from '@/components/employees/EmployeeCard.vue'
import { useEmployeeStore } from '@/stores/employeeData.js'

import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const employeeStore = useEmployeeStore()
const searchQuery = ref('')
// const resultSearch = ref([])
let debounceTimeout = null

// detect screen
const isMobile = ref(false)
const breakpoint = 1024
const checkMobile = () => {
  isMobile.value = window.innerWidth <= breakpoint
}
// const selectChoice = ref(0)

function handleChoice(value) {
  checkMobile()
  if (value !== '0' && value !== null) {
    // use function from employee store
    employeeStore.getEmployee(value)
  } else if (value == 0 || value == null) {
    employeeStore.getAllEmployee()
  }
}

async function handleSearch() {
  checkMobile()
  if (searchQuery.value !== '') {
    await employeeStore.searchEmployee(searchQuery.value)
    if (employeeStore.employee.length === 0) {
      alert('No employee found')
    }
    // console.log('searching for:', searchQuery.value)
  } else {
    await employeeStore.getAllEmployee()
  }
}
watch(searchQuery, (newValue) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    handleSearch()
  }, 300)
  if (newValue === '') {
    employeeStore.getAllEmployee()
  }
})

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
