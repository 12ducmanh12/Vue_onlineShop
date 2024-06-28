<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { useCartStore } from "../../stores/cartStore";
import { storeToRefs } from "pinia";
import Container from "../../components/Container.vue";
import { useAuthStore } from "../../stores/authStore";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";

const { cartTotalQuantity } = storeToRefs(useCartStore());
const authStore = useAuthStore();
const router = useRouter();
const confirm = () => {
  Modal.confirm({
    title: "Bạn có muốn đăng xuất tài khoản này",
    icon: createVNode(ExclamationCircleOutlined),
    okText: "Có",
    cancelText: "Không",
    onOk() {
      authStore.logOutUser();
    },
  });
};
import { ref } from "vue";
const value = ref<string>("");

const isWhitespaceString = (str: string) => !str.replace(/\s/g, "").length;
const onSearch = (searchValue: string) => {
  if (value && !isWhitespaceString(searchValue))
    router.push(`/?search=${searchValue}`);
  else router.push("/");
};
</script>
<template>
  <nav class="bg-black py-4 sticky top-0">
    <Container>
      <ul class="flex flex-row justify-between items-center">
        <RouterLink to="/">
          <li>
            <div class="text-white text-4xl font-semibold">OnlineShop</div>
          </li>
        </RouterLink>
        <a-input-search
          v-model:value="value"
          placeholder="Sản phẩm bạn cần tìm"
          style="width: 40%"
          @search="onSearch"
        />
        <div class="flex gap-x-6">
          <RouterLink to="/cart" class="flex flex-row">
            <img
              src="/src/assets/cart.svg"
              width="{40}"
              height="{40}"
              alt="card"
            />
            <a-badge :count="cartTotalQuantity" />
          </RouterLink>
          <div v-if="!authStore._id" class="flex items-center">
            <li class="flex flex-row gap-x-6">
              <RouterLink to="/register" class="text-white text-lg">
                Register
              </RouterLink>
              <RouterLink to="/login" class="text-white text-lg">
                Login
              </RouterLink>
            </li>
          </div>
          <div v-else class="flex items-center">
            <li class="flex flex-row gap-x-6">
              <RouterLink to="/admin" class="text-white text-lg"
                >Admin
              </RouterLink>
              <p @click="confirm" class="text-white text-lg cursor-pointer">
                Logout
              </p>
            </li>
          </div>
        </div>
      </ul>
    </Container>
  </nav>
</template>

<style></style>
