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

    <div class="flex flex-row md:flex-row justify-between">
      <p class="text-sky-900 font-bold text-sm">
        {{ props.item.asset_tag }}
      </p>
      <span class="text-teal-800 py-1 mb-1 rounded-md text-xs">
        {{ dateFormat(props.item.appointment_date) }}
      </span>
    </div>
    <p class="w-full  text-mm text-teal-800 text-wrap">
      {{ props.item.detail }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ServiceEdit from "./ServiceEdit.vue";

const open = ref(false);
const props = defineProps({
  item: Object,
});
console.log("item in ServiceCard: ", props.item);
const fullName = computed(() => {
  return props.item.fname + " " + props.item.lname.substring(0, 1);
});
const dateFormat = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-EN", options);
};
</script>
