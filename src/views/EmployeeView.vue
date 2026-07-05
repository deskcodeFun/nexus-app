<template>
  <header>
    <BaseHeader title="EMPLOYEE MANAGEMENT" />
  </header>
  <main class="min-h-screen w-full my-2">
    <!-- Sub Menu -->
    <div
      class="flex flex-col lg:flex-row lg:justify-between gap-y-2 md:gap-y-0 bg-white text-blue-900 tracking-wide px-2"
    >
      <div class="flex flex-col gap-0 sm:flex-row justify-between items-baseline sm:gap-x-8">
        <BaseOfficeDrop @select-option="handleChoice" />
        <!-- Search -->
        <div class="mt-2 relative rounded-full group">
          <input
            type="text"
            placeholder="Search Employee"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            class="block w-full px-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-hidden"
          />

          <MagnifyingGlassIcon
            class="w-4 h-4 absolute inset-y-1.5 right-2 flex items-center pointer-events-none text-blue-800 group-focus-within:text-blue-800"
          />
        </div>
      </div>
      <BaseButtonAdd Link="/addEmployee" label="Employee"></BaseButtonAdd>
      <hr class="my-4 border-gray-300 lg:hidden" />
    </div>

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
import { ref, onMounted, onUnmounted } from 'vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseOfficeDrop from '@/components/BaseOfficeDrop.vue'
import BaseButtonAdd from '@/components/BaseButtonAdd.vue'

import EmployeeTable from '@/components/employees/EmployeeTable.vue'
import EmployeeCard from '@/components/employees/EmployeeCard.vue'
import { useEmployeeStore } from '@/stores/employeeData.js'

import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const employeeStore = useEmployeeStore()
const searchQuery = ref('')

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

function handleSearch() {
  checkMobile()
  if (searchQuery.value !== '') {
    // employeeStore.searchEmployee(searchQuery.value)
    console.log('searching for:', searchQuery.value)
  } else {
    employeeStore.getAllEmployee()
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
