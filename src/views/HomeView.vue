<template>
  <div><h2 class="text-2xl text-red-800">HomeView</h2></div>
  <button @click="showSuccess">Show Success Toast</button>

  <div v-for="(person, index) in staff" :key="index">
    {{ person.fname + ' ' + person.lname }}
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { mockStaff } from '@/dataMockup/staff'
import { useToast } from 'vue-toastification'

const toast = useToast()

const staff = reactive(mockStaff)
console.log('staff : ', staff)
const showSuccess = () => {
  toast.success('Testing success Tostification')
}
</script>

<style scoped></style>
