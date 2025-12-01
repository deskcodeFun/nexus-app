<template>
  <teleport to="body">
    <div
      v-show="modalActive"
      @click.self="emit('close-modal')"
      class="backdrop-blur-xs absolute w-full bg-black/10 h-screen top-0 left-0 flex justify-center"
    >
      <div v-if="modalActive" class="bg-white self-start mt-36 mx-4 w-full sm:w-96">
        <!-- Title of model props from parent -->
        <p class="bg-linear-to-r from-red-900 to-gray-400 text-white text-xl px-4 py-2">
          {{ title }}
        </p>
        <!-- contents of modal create in parent -->
        <slot />
        <div class="flex justify-between">
          <button
            class="text-blue-900 border border-blue-900 mt-8 mx-1 mb-1 rounded-full py-1 px-4 hover:scale-102"
            @click="emit('close-modal')"
          >
            Cancel
          </button>
          <button
            class="text-white mt-8 mx-1 mb-1 rounded-full bg-red-900 py-1 px-8 hover:scale-102"
            @click="$emit('save-data')"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
  title: String,
})
const emit = defineEmits(['close-modal', 'save-data'])
</script>
