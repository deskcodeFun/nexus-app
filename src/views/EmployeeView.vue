<template>
  <!-- Header -->
  <BaseHeader title='EMPLOYEE MANAGEMENT' />
  <!-- Sub Menu -->
  <div class="flex flex-row justify-between bg-white text-blue-900 tracking-wide px-2">
    <BaseOfficeDrop @select-option="handleChoice" />
    <BaseButtonAdd Link="/addEmployee" label="Add Employee"></BaseButtonAdd>
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
  import BaseButtonAdd from '@/components/BaseButtonAdd.vue'

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
