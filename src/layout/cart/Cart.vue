<script setup>
import { storeToRefs } from "pinia";
import ContainerVue from "../../components/Container.vue";
import { useCartStore } from "../../stores/cartStore";
import { useAuthStore } from "../../stores/authStore";
import { ArrowRightOutlined } from "@ant-design/icons-vue";
import { onMounted, watch } from "vue";

const cartStore = useCartStore();
const authStore = useAuthStore();
const { cartItems, itemsCount, cartTotalAmount } = storeToRefs(cartStore);

function handleRemoveFromCart(item) {
  cartStore.removeItemFromCart(item);
}
function handleDecreaseCart(item) {
  cartStore.decreaseCart(item);
}
function handleIncreaseCart(item) {
  cartStore.increaseCart(item);
}
function handleClearCart() {
  cartStore.ClearCart();
}
watch(
  () => cartStore.cartItems,
  () => {
    cartStore.getTotals();
  },
  { deep: true }
);

// onMounted(() => {
//   cartStore.getTotals();
// });
</script>
<template>
  <ContainerVue>
    <p class="text-center text-4xl font-normal">Shopping Cart</p>
    <div v-if="itemsCount === 0" class="mt-4">
      <p>Your cart is currently empty</p>
      <RouterLink
        to="/"
        class="flex flex-row gap-x-4 items-center mt-2 text-gray-500 hover:text-blue-400"
      >
        <ArrowRightOutlined />
        <p>Start Shopping</p>
      </RouterLink>
    </div>
    <div v-else>
      <div class="mt-8 divide-y divide-gray-400">
        <div class="flex-row flex my-4">
          <p class="w-5/12">PRODUCT</p>
          <p class="w-2/12">PRICE</p>
          <p class="w-3/12">QUANTITY</p>
          <p class="w-2/12 text-end">TOTAL</p>
        </div>
        <div>
          <div v-for="item in cartItems" :key="item._id">
            <div class="flex justify-between border-b border-gray-400 my-2">
              <div class="w-5/12 flex">
                <img
                  :src="item?.image.url"
                  class="w-2/12 h-2/12"
                  :alt="item.name"
                />
                <div class="ml-3">
                  <p class="text-xl mt-4">{{ item.name }}</p>
                  <p class="mt-1">{{ item.desc }}</p>
                  <button
                    class="w-fit mt-1 hover:text-red-500 hover:font-semibold"
                    @click="handleRemoveFromCart(item)"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div class="w-2/12 items-center flex">
                <p>${{ item.price }}</p>
              </div>
              <div class="w-3/12 flex flex-row items-center">
                <div
                  class="border border-gray-400 rounded-lg w-fit h-fit flex flex-row items-center"
                >
                  <button
                    class="px-5 py-3 hover:bg-slate-100 rounded-lg"
                    @click="handleDecreaseCart(item)"
                  >
                    -
                  </button>
                  <p class="px-4">{{ item.cartQuantity }}</p>
                  <button
                    class="px-5 py-3 hover:bg-slate-100 rounded-lg"
                    @click="handleIncreaseCart(item)"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="w-2/12 items-center justify-end flex">
                <p>${{ item.price * item.cartQuantity }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <button
          class="px-8 py-2 mt-6 h-fit border border-gray-400 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-500"
          @click="handleClearCart()"
        >
          Clear Cart
        </button>
        <div class="mt-3">
          <div class="flex flex-row justify-between">
            <p class="text-2xl font-medium">Subtotal</p>
            <p class="text-2xl font-medium">${{ cartTotalAmount }}</p>
          </div>
          <p class="my-2 text-gray-500">
            Taxes and shipping calculated at checkout
          </p>
          <div v-if="authStore._id">
            <button class="bg-blue-700 text-white w-full py-2 rounded-lg">
              Check out
            </button>
          </div>
          <div v-else>
            <RouterLink to="/login">
              <button class="bg-yellow-400 text-white w-full py-2 rounded-lg">
                Login to Check Out
              </button>
            </RouterLink>
          </div>
          <RouterLink
            to="/"
            class="flex flex-row items-center gap-x-2 text-gray-500 mt-3"
          >
            <i class="pi pi-arrow-left"></i>
            <p>Continue Shopping</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </ContainerVue>
</template>
<style></style>
