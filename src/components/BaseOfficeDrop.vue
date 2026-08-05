<template>
  <div class="flex flex-row text-blue-900">
    <div class="flex flex-row w-fit">
      <!-- <p class="pr-4 my-auto text-xs">Filter by Office:</p> -->
      <select
        v-model="selectChoice"
        @change="handleChange"
        class="text-xs border border-blue-800 rounded-full px-2 py-1 w-32"
      >
        <option value="" disabled selected hidden>Filter by Office</option>
        <option v-for="item in officeStores.officeAllName" :key="item.id" :value="item.id">
          {{ item.short_name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useOfficeNameStore } from '@/stores/officeData.js'

const selectChoice = ref('')
const officeStores = useOfficeNameStore()
// define event name to emited
const emit = defineEmits(['select-option'])
// function to handle the change event and emit event
function handleChange(event) {
  const value = event.target.value
  selectChoice.value = value
  // emit the event 'select-option' with selectChoice value
  emit('select-option', value)
}
</script>
