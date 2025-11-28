<template>
  <div class="w-full flex-col mx-auto my-8">
    <div @click="toggleVisible" class="flex flex-row">
      <div v-if="visible">
        <ChevronDownIcon class="h-4 w-4 mt-1 bg-white/50 hover:cursor-pointer" />
      </div>
      <div v-else>
        <ChevronUpIcon class="h-4 w-4 mt-1 bg-white/50 hover:cursor-pointer" />
      </div>
      <p class="text-md pl-2">{{ props.title }}</p>
    </div>
    <div class="border-t border-blue-900 mt-4"></div>
    <Transition name="slide-down">
      <div v-if="visible">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'

const props = defineProps(['title'])

const visible = ref(false)
const toggleVisible = () => {
  visible.value = !visible.value
}
// const visible1 = ref(false)
// const toggleVisible1 = () => {
//   visible1.value = !visible1.value
//   if (visible1.value === true) {
//     visible.value = false
//     visible2.value = false
//   }
// }
// const visible2 = ref(false)
// const toggleVisible2 = () => {
//   visible2.value = !visible2.value
//   if (visible2.value === true) {
//     visible.value = false
//     visible1.value = false
//   }
// }
</script>

<style lang="scss" scoped></style>
