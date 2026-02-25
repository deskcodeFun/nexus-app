<template>
  <!-- Header -->
  <BaseHeader title="ASSETS ACCOUNTING" />

  <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white">
    <div v-for="option in options" :key="option.id" @click="selectCard(option.id)" :value="option.id" :class="[
      'border-2 rounded-lg p-4 cursor-pointer transition-all',
      selectedId === option.id
        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
        : 'border-gray-200 hover:border-blue-300'
    ]">
      <h3 class="font-bold text-lg">{{ option.title }}</h3>
      <p class="text-gray-600">{{ option.description }}</p>
    </div>

  </div>

  <main class="bg-white pt-4">
    <ComputerView v-if="selectedId == '1'"></ComputerView>
    <PrinterView v-if="selectedId == '2'"></PrinterView>
    <OtherView v-if="selectedId == '3'"></OtherView>
  </main>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import ComputerView from './ComputerView.vue'
  import PrinterView from './PrinterView.vue'
  import BaseHeader from '@/components/BaseHeader.vue'
  import OtherView from './OtherView.vue'


  // const computer = ref(null)

  onMounted(() => {
    selectedId.value = 1;
  })
  // replace button with selected card
  const options = ref([
    { id: 1, title: 'Computer', description: 'NoteBook, PC, All-in-One' },
    { id: 2, title: 'Printer', description: 'inkjet, laser, All-in-One printer' },
    { id: 3, title: 'Other', description: 'Network Device, Spare Part, Acessory' },
  ]);

  const selectedId = ref(null);

  const selectCard = (id) => {
    selectedId.value = id;
  };
</script>

<style scoped>
  .catalog {
    margin-right: 1rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.75rem;
    border: none;
    font-size: 14px;
  }

  .catalog:hover {
    transform: scale(1.1);
    font-weight: bold;
    cursor: pointer;
    background-color: #E0F2FE;
  }

  .catalog:active {
    background-color: #E0F2FE;
    border: none;
  }


  .catalog:focus {
    background-color: #E0F2FE;
    border: none;
  }


</style>
