<script setup>
import { RouterView } from "vue-router";
import HeaderVue from "./layout/header/Header.vue";
import { useCartStore } from "./stores/cartStore";
import { useAuthStore } from "./stores/authStore";
import { useProductStore } from "./stores/productStore";
import { onMounted } from "vue";

onMounted(() => {
  useProductStore().fetchProducts();
  useCartStore().getTotals();
  useAuthStore().loadUser();
});
</script>

<template>
  <div>
    <HeaderVue />
    <RouterView />
  </div>
</template>
