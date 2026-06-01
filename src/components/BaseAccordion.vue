<template>
  <div class="w-fit flex-col mx-8 mb-8">
    <div @click="toggleVisible" class="flex flex-row">
      <div v-if="visible">
        <ChevronDownIcon class="h-4 w-4 mt-1 bg-white/50 hover:cursor-pointer" />
      </div>
      <div v-else>
        <ChevronUpIcon class="h-4 w-4 mt-1 bg-white/50 hover:cursor-pointer" />
      </div>
      <p class="text-lg font-semibold tracking-wide pl-2">{{ props.title }}</p>
    </div>
    <div class="w-120 border-t border-blue-900 mt-4"></div>
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
</script>
