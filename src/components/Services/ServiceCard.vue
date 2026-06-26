<template>
  <!-- each Service card in each Zone -->
  <div
    @click="open = true"
    class="mx-1 my-4 p-2 border border-gray-300 rounded-lg hover:bg-sky-100"
  >
    <Transition name="slide-fade">
      <Teleport to="body">
        <div v-if="open" class="modal" @click.self="open = false">
          <ServiceEdit :itemDetail="item" @toggle-open="open = false" />
        </div>
      </Teleport>
    </Transition>

    <div class="flex flex-col md:flex-row justify-between">
      <p class="text-sky-900 font-semibold">
        <!-- {{ props.item.asset_tag }} -->
        {{ props.item.service_type.service_name }}
      </p>
      <p class="text-teal-800 py-1 mb-1 text-xs">
        {{ dateFormat(props.item.appointment_date) }}
      </p>
    </div>
    <!-- service type 4-Todo, 5-HW-upgrade or change-->
    <div v-if="props.item.service_id === 4 || props.item.service_id === 5">
      <p class="text-sm text-blue-900 mt-2">
        {{ 'asset tag: ' + ' ' + props.item.asset?.asset_tag }}
      </p>
      <p class="w-fit text-mm text-teal-800">
        <!-- {{ props.item.id + ' ' + props.item.detail }} -->
        {{ props.item.detail }}
      </p>
    </div>
    <div v-if="props.item.service_id === 1">
      <p class="w-fit text-mm text-teal-800">
        {{ 'First name : ' + props.item.fname }}
      </p>
      <p class="w-fit text-mm text-teal-800">
        {{ 'Last Name : ' + props.item.lname }}
      </p>
    </div>
    <div v-if="props.item.service_id === 3">
      <p class="w-fit text-mm text-teal-800">
        {{ 'asset tag: ' + ' ' + props.item.asset?.asset_tag }}
      </p>
      <p class="w-fit text-mm text-teal-800">
        {{ 'Current User ' + ' ' + (props.item.fname || 'FREE') + ' ' + (props.item.lname || '') }}
      </p>
      <p>
        {{
          'New User ' +
          (props.item.employee?.fname || 'Free') +
          ' ' +
          (props.item.employee?.lname || '')
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ServiceEdit from './ServiceEdit.vue'

const open = ref(false)
const props = defineProps({
  item: Object,
})
// console.log('props.item', props.item)

const dateFormat = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-EN', options)
}

// const itemDetail = computed(() => {
//   if (props.item.service_id == 1) {
//     try {
//       return JSON.parse(props.item.detail)
//     } catch {
//       return {}
//     }
//   } else {
//     return props.item.detail
//   }
// })
// console.log('Item detail with computed :', itemDetail.value)
// const { itemRef } = toRefs(props)
// console.log('item to Refs ', itemRef)
// Use Object.entries() on props.item
// Object.entries(props.item).forEach(([key, value]) => {
//   console.log(`${key}: ${value}`)
// })

// console.log('item in ServiceCard: ', props.item)
// const fullName = computed(() => {
//   return props.item.fname + " " + props.item.lname.substring(0, 1);
// });
</script>
