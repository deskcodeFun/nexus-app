<template>
  <!-- Header -->
  <BaseHeader title='EMPLOYEE MANAGEMENT' />
  <!-- Sub Menu -->
  <div class="flex flex-row justify-between items-baseline bg-white text-blue-900 tracking-wide px-2">
    <BaseOfficeDrop @select-option="handleChoice" />
    <!-- Add new user button -->
    <div class="flex flex-row bg-white text-blue-900 tracking-wide sm:px-2 pb-4 gap-4">
      <RouterLink
        class="w-fit flex flex-row mx-2 px-2 py-1 rounded-full bg-blue-50/25 hover:text-white hover:bg-blue-800"
        to="/addEmployee">
        <div class="flex flex-row">
          <PlusIcon class="h-6 w-6" />
          <p>Add Employee</p>
        </div>
      </RouterLink>
    </div>
  </div>
  <!-- show data -->
  <main class="px-2">
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
  import { PlusIcon } from '@heroicons/vue/20/solid'

  import EmployeeTable from '@/components/employees/EmployeeTable.vue'
  import EmployeeCard from '@/components/employees/EmployeeCard.vue'
  import { useEmployeeStore } from '@/stores/employeeData.js'


  const employeeStore = useEmployeeStore()

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
  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })


</script>
