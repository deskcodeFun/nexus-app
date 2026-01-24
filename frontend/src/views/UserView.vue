<template>
  <!-- Header -->
  <header>
    <div class="flex flex-col justify-between bg-white sm:justify-normal py-16 px-2">
      <p class="text-lg tracking-widest text-blue-900">USER MANAGEMENT</p>
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
          <p>Add User</p>
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
  import { computed, onMounted } from 'vue'
  import { PlusIcon } from '@heroicons/vue/20/solid'

  import { useStaffStore } from '@/stores/staff'
  import UserTable from '@/components/users/UserTable.vue'
  import UserCard from '@/components/users/UserCard.vue'
  import BaseOfficeDrop from '@/components/BaseOfficeDrop.vue'
  import { useMonitorSize } from '@/composables/DeviceScreen'

  const staffStore = useStaffStore()
  // detect screen
  const sizes = useMonitorSize()
  // const selectChoice = ref(0)

  function handleChoice(value) {
    if (value !== undefined && value !== 0) {
      // use function from staff store
      staffStore.getStaffByOffice(value)
      console.log('data from staff store: ', value, staffStore.staff)
    } else if (value == 0) {
      staffStore.getStaffByOffice(0)
    }
  }

  onMounted(() => {
    staffStore.getStaffByOffice(0)

  })

  const activeComponent = computed(() => {
    return sizes.isMobile.value ? UserCard : UserTable
  })
</script>
