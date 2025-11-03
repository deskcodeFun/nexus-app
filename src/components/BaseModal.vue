<template>
  <teleport to="body">
    <div
      v-show="modalActive"
      class="absolute w-full bg-black/30 h-screen top-0 left-0 flex justify-center"
    >
      <div v-if="modalActive" class="bg-white self-start mt-32 max-w-screen-md">
        <slot />
        <div class="flex justify-between">
          <button
            class="text-white mt-8 mx-1 mb-1 rounded-2xl bg-blue-900 py-2 px-6"
            @click="$emit('close-modal')"
          >
            Cancel
          </button>
          <button
            class="text-white mt-8 mx-1 mb-1 rounded-2xl bg-red-900 py-2 px-8"
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
})
defineEmits(['close-modal', 'save-data'])
</script>

<style lang="scss" scoped></style>
