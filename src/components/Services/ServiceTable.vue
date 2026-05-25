<template>
  <!-- 
        1. in db table crate new table service_state 
            1 : Notify
            2.: In Progress
            3.: Waiting for spare parts
            4.: Done
        2. in db table crate new table service_type
            1 : Hardware
            2.: Software
        3. Link fname lname to employee table to show user name in service log table
        4. design UI for each state bg color and text color
      -->

  <div >   
    <div class="flex flex-col max-h-[calc(100vh-320px)] overflow-y-scroll">
      <BaseCard
        v-for="service in serviceStore.serviceLog"
        :key="service.id"
        class=" my-2 hover:shadow-2xl hover:bg-blue-50 hover:cursor-pointer"
      >
        <!-- <div>
          {{ service.fname + " " + service.lname.substring(0, 5) + "..." }}
        </div> -->
        <div>{{ service.asset_tag }}</div>
        <div>
          {{ dateFormat(service.appointment_date) }}
        </div>
        <div>{{ service.detail }}</div>
        <!-- <div>{{ dateFormat(service.created_at) }}</div> -->
        <div>{{ service.job_status }}</div>
        <!-- <td class="table-cell">{{ service.service_type }}</td> -->
        <!-- <td class="table-cell">{{ service.state }}</td> -->
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useServiceLog } from "@/stores/service_log.js";
import BaseCard from "../BaseCard.vue";

const router = useRouter();
const serviceStore = useServiceLog();

console.log("service log: ", serviceStore.serviceLog);

const dateFormat = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-EN", options);
};
</script>
