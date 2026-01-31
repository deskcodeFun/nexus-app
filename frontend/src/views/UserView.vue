<template>
  <!-- Header -->
  <header>
    <div class="flex flex-col justify-between bg-white sm:justify-normal py-16 px-2">
      <p class="text-lg tracking-widest text-blue-900">EMPLOYEE MANAGEMENT</p>
    </div>
  </header>
  <!-- Sub Menu -->
  <div class="flex flex-row justify-between items-baseline bg-white text-blue-900 tracking-wide p-2">
    <BaseOfficeDrop @select-option="handleChoice" />
    <!-- Add new user button -->
    <div class="flex flex-row bg-white text-blue-900 tracking-wide sm:px-2 pb-4 gap-4">
      <RouterLink
        class="w-fit flex flex-row mx-2 px-2 py-1 rounded-full bg-blue-50/25 hover:text-white hover:bg-blue-800"
        to="/addUser">
        <div class="flex flex-row">
          <PlusIcon class="h-6 w-6" />
          <p>Add Employee</p>
        </div>
      </RouterLink>
    </div>
  </div>
  <!-- show data -->
  <main class="bg-white px-8">
    <component :is="activeComponent"></component>
  </main>
</template>

<script setup>
  import { computed } from 'vue'
  import { PlusIcon } from '@heroicons/vue/20/solid'

  import { useEmployeeStore } from '@/stores/employeeData.js'
  import UserTable from '@/components/users/UserTable.vue'
  import UserCard from '@/components/users/UserCard.vue'
  import BaseOfficeDrop from '@/components/BaseOfficeDrop.vue'
  import { useMonitorSize } from '@/composables/DeviceScreen'

  const employeeStore = useEmployeeStore()
  employeeStore.getEmployee('0')
  // detect screen
  const sizes = useMonitorSize()
  // const selectChoice = ref(0)

  function handleChoice(value) {
    if (value !== undefined) {
      // use function from employee store
      employeeStore.getEmployee(value)
      console.log('data from staff store: ', value, employeeStore.employee)
    }
  }

  const activeComponent = computed(() => {
    return sizes.isMobile.value ? UserCard : UserTable
  })
</script>
