<script setup lang="ts">
import { useProductStore } from "../stores/productStore";
import { useCartStore } from "../stores/cartStore";
import { ref, watch, computed, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import Container from "../components/Container.vue";
import { useRoute } from "vue-router";

interface items {
  _id: any;
  name: string;
  image: any;
  shortDesc: string;
  price: number;
  brand: string;
}

const productStore = useProductStore();
const cartStore = useCartStore();
const { items } = storeToRefs(productStore);
const { cartItems } = storeToRefs(cartStore);
const route = useRoute();

function handleAddToCart(item: any) {
  cartStore.addToCart(item);
}

// const search = ref(String(route.query.search) || "");
// const price = ref(String(route.query.price) || "");
// const brand = ref(String(route.query.brand) || "");

// watch(
//   () => route.query.search,
//   (newTab) => {
//     search.value = String(newTab) || "";
//   },
//   { immediate: true }
// );
// watch(
//   () => route.query.price,
//   (newTab) => {
//     price.value = String(newTab) || "";
//   }
// );
// watch(
//   () => route.query.brand,
//   (newTab) => {
//     brand.value = String(newTab) || "";
//   }
// );

// const arrayBrand = computed(() => brand.value.split(",").filter(Boolean));
// const arrayPrice = computed(() => price.value.split(",").filter(Boolean));

// const priceInRange = (itemPrice: number, range: string) => {
//   const [min, max] = range.split("-").map(Number);
//   return itemPrice >= min && itemPrice <= max;
// };

// const filteredData = computed(() => {
//   return items.value.filter((item: items) => {
//     const matchesBrand =
//       arrayBrand.value.length === 0 || arrayBrand.value.includes(item.brand);
//     const matchesPrice =
//       arrayPrice.value.length === 0 ||
//       arrayPrice.value.some((range) => priceInRange(item.price, range));
//     const matchesSearch = item.name.includes(search.value);
//     return matchesBrand && matchesPrice && matchesSearch;
//   });
// });
watchEffect(() => {
  console.log('Items:', items.value);
});
// Watch effect to log changes in filteredData
</script>

<template>
  <Container>
    <div class="flex flex-wrap gap-x-[13px] gap-y-6">
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white shadow-xl rounded-xl w-[300px] px-3 py-4 border border-gray-100"
      >
        <div>
          <p class="text-2xl font-medium mb-2">{{ item?.name }}</p>
          <img
            :src="item.image.url"
            :alt="item?.name"
            class="w-10/12 h-[300px] transition duration-150 ease-in-out"
          />
        </div>
        <div class="flex flex-row justify-between">
          <span>{{ item.shortDesc }}</span>
          <span class="font-semibold text-xl">${{ item?.price }}</span>
        </div>
        <button
          class="w-full py-2 bg-blue-700 rounded-lg cursor-pointer border border-gray-400 text-white"
          @click="handleAddToCart(item)"
        >
          Add To Cart
        </button>
      </div>
    </div>
  </Container>
  <RouterView />
</template>

<style></style>
