<script setup lang="ts">
import { ref, watch } from "vue";
import ItemSideNav from "./itemSideNav/ItemSideNav.vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const tabId = ref(Number(route.query.tab) || 0);

watch(
  () => route.query.tab,
  (newTab) => {
    tabId.value = Number(newTab) || 0;
  }
);
function ChangeTab(id: number) {
  router.push({ query: { tab: id.toString() } });
}
</script>
<template>
  <div className="pt-4 border-r border-gray-400 w-2/12">
    <p className="text-2xl font-normal mb-5 text-center">Admin</p>
    <div @click="ChangeTab(0)">
      <ItemSideNav :active="tabId == 0">
        <p>Create product</p>
      </ItemSideNav>
    </div>
    <div @click="ChangeTab(1)">
      <ItemSideNav :active="tabId == 1">
        <p>List product</p>
      </ItemSideNav>
    </div>
    <div @click="ChangeTab(2)">
      <ItemSideNav :active="tabId == 2">
        <p>Dashboard</p>
      </ItemSideNav>
    </div>
  </div>
</template>

<style></style>
