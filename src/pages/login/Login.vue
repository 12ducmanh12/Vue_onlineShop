<script lang="ts" setup>
import { watch } from "vue";
import { reactive } from "vue";
import { useRouter } from 'vue-router';
import { useAuthStore } from "../../stores/authStore";

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}
const router = useRouter();
const authStore = useAuthStore();

const formState = reactive<FormState>({
  email: "",
  password: "",
  remember: true,
});
const onFinish = (values: any) => {
  authStore.login(values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
watch(() => authStore._id, (newId : any) => {
  if (newId) {
    router.push('/cart');
  }
});

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
      label="email"
      name="email"
      :rules="[{ required: true, message: 'Please input your email!' }]"
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

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 8 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
      <a-button type="primary" html-type="submit">Login</a-button>
    </a-form-item>
  </a-form>
  <!-- </Container> -->
</template>
