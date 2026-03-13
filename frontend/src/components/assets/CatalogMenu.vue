<template>
  <div class="submenu">
    <button class="px-2 mx-2  rounded-md bg-sky-100 text-blue-900 hover:bg-blue-900 hover:text-white"
      @click="$emit('changeView', 'ComputerAdd')">Computer</button>
    <button class="px-2 mx-2  rounded-md bg-sky-100 text-blue-900 hover:bg-blue-900 hover:text-white"
      @click="$emit('changeView', 'PrinterAdd')">Printer</button>
    <button class="px-2 mx-2  rounded-md bg-sky-100 text-blue-900 hover:bg-blue-900 hover:text-white"
      @click="$emit('changeView', 'OtherAdd')">Other</button>

  </div>
</template>

<script setup>
  defineEmits(['changeView']);
</script>
