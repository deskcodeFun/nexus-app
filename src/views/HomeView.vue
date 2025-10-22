<template>
  <button @click="addUser">Add user</button>
  <!-- <div><h2 class="text-2xl text-blue-900">HomeView</h2></div>
  <button @click="showSuccess">Show Success Toast</button> -->
  <div class="flex flex-row flex-wrap justify-center sm:justify-start sm:ml-8">
    <UserCard v-for="(staff, index) in staffs" :key="index" :staff="staff" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { mockStaff } from '@/dataMockup/staff'
import UserCard from '@/components/users/UserCard.vue'
import router from '@/router'
// import { useToast } from 'vue-toastification'

// const toast = useToast()

const staffs = reactive(mockStaff)
const addUser = () => {
  router.push('/addUser')
}

// const showSuccess = () => {
//   toast.success('Testing success Tostification')
// }
</script>

<style scoped></style>
