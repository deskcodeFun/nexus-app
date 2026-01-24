<template>
  <div class="flex flex-row justify-between items-baseline bg-white text-blue-900 tracking-wide p-2">
    <div class="flex flex-row w-fit">
      <p class="pr-4">SELETECT BU</p>
      <select v-model="selectChoice" @change="handleChange" class="bg-blue-50/25 ml-4">
        <option v-for="item in officeStores.officeName" :key="item.id" :value="item.id">
          {{ item.short_name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useOfficeNameStore } from '@/stores/officeData.js'

  const selectChoice = ref(0)
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
