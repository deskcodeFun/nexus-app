<template>
  <div class=" bg-white text-blue-900">
    <RouterLink :to=props.Link class="w-fit flex flex-row rounded-md bg-blue-50/25 hover:text-white hover:bg-blue-800">
      <div class="inline-flex py-1 my-1 px-1 gap-1 ">
        <PlusIcon class="h-5 w-5" />
        <p class="pr-1">Add Asset</p>
      </div>
    </RouterLink>
  </div>

</template>

<script setup>
  import { PlusIcon } from '@heroicons/vue/20/solid'

  const props = defineProps({ Link: String })

</script>

<style lang="scss" scoped></style>
