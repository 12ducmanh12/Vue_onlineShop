<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useFetch } from "@/hook/useFetch";
import type { SelectProps } from "ant-design-vue";
import BarChart from "./component/BarChart.vue";
import PieChart from "./component/PieChart.vue";
import axios from "axios";

const numberUser = ref();
const numberOrder = ref();
const revenue = ref();
const chartId = ref(0);
const options = ref<SelectProps["options"]>([
  {
    value: 0,
    label: "Bar Chart",
  },
  {
    value: 1,
    label: "Pie Chart",
  },
]);

const ListChart = [
  { id: 0, component: BarChart },
  { id: 1, component: PieChart },
];

const dataRaw = ref<any[]>([]);

numberUser.value = useFetch(
  `${import.meta.env.VITE_API_URL}/overview/number_user`
);
numberOrder.value = useFetch(
  `${import.meta.env.VITE_API_URL}/overview/number_order`
);
revenue.value = useFetch(`${import.meta.env.VITE_API_URL}/overview/revenue`);

onMounted(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/dashboard/revenue-by-brand`)
    .then((res) => {
      dataRaw.value = res.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

const data = computed(() =>
  dataRaw.value.map((item: any) => item.totalRevenue)
);
const labels = computed(() => dataRaw.value.map((item: any) => item.brand));

</script>

<template>
  <div class="m-8 flex gap-x-8 grow">
    <div class="w-7/12">
      <div class="bg-indigo-950 px-6 py-4 text-white rounded-lg shadow">
        <p class="text-3xl font-semibold">Overview</p>
        <p>How your shop is performing in this month</p>
        <div class="flex justify-between">
          <p>{{ numberUser?.data }} User</p>
          <p>{{ numberOrder?.data }} Orders</p>
          <p>{{ revenue?.data }} $</p>
        </div>
      </div>
      <div>
        <a-select
          ref="select"
          v-model:value="chartId"
          style="width: 120px"
          :options="options"
          class="flex ml-auto my-4"
        ></a-select>
      </div>
      <component
        :is="ListChart[chartId]?.component"
        :labels="labels"
        :data="data"
        v-if="dataRaw.length > 0"
      />
    </div>
    <div class="w-5/12"></div>
  </div>
</template>

<style lang=""></style>
