<script setup lang="ts">
import { useRoute } from "vue-router";
import SideNav from "./sidenav/SideNav.vue";
import EditProduct from "./list/EditProduct.vue";
import Static from "./dashboard/Static.vue";
import CreateProduct from "./create/CreateProduct.vue";
import { ref, watch } from "vue";

const route = useRoute();
const tabId = ref(Number(route.query.tab) || 0);

watch(
  () => route.query.tab,
  (newTab) => {
    tabId.value = Number(newTab) || 0;
  }
);
const ListMenu = [
  { id: 0, component: CreateProduct },
  { id: 1, component: EditProduct },
  { id: 2, component: Static },
];
</script>
<template>
  <div class="flex h-[88vh]">
    <SideNav />
    <component :is="ListMenu[tabId]?.component" />
  </div>
</template>

<style></style>
