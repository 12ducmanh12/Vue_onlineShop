<script lang="ts" setup>
import { watch } from "vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";

interface FormState {
  name: string;
  email: string;
  password: string;
}
const router = useRouter();
const authStore = useAuthStore();

const formState = reactive<FormState>({
  name: "",
  email: "",
  password: "",
});
const onFinish = (values: any) => {
  authStore.register(values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
watch(
  () => authStore._id,
  (newId: any) => {
    if (newId) {
      router.push("/cart");
    }
  }
);
</script>
<template>
  <!-- <Container> -->
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 8 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    class="mt-12"
  >
    <a-form-item
      label="Name"
      name="name"
      :rules="[{ required: true, message: 'Please input your name!' }]"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
      <a-button type="primary" html-type="submit">Register</a-button>
    </a-form-item>
  </a-form>
  <!-- </Container> -->
</template>
