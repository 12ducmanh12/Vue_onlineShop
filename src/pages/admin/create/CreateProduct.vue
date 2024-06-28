<script setup lang="ts">
import { reactive } from "vue";
import type { UploadChangeParam } from "ant-design-vue";
import { useProductStore } from "@/stores/productStore";
import Editor from "@/components/Editor.vue";
import { UploadOutlined } from "@ant-design/icons-vue";

interface FormState {
  name: string;
  brand: string;
  shortDesc: string;
  longDesc: string;
  price: number;
  image: string;
}

const useProduct = useProductStore();

const formState = reactive<FormState>({
  name: "",
  brand: "",
  shortDesc: "",
  longDesc: "",
  price: 0,
  image: "",
});

function handleUploadImage(e: UploadChangeParam) {
  const file = e.file.originFileObj;
  TranformFile(file);
}

function TranformFile(file: any) {
  const reader: any = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      formState.image = reader.result;
    };
  } else {
    formState.image = "";
  }
}

const onFinish = (values: any) => {
  useProduct.createProduct(values)
};
</script>
<template>
  <div class="m-4 w-10/12">
    <p className="text-3xl">Create a Product</p>
    <div class="flex flex-row">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        class="mt-4 w-8/12"
      >
        <a-form-item name="image" label="Upload">
          <a-upload
            :rule="[{ required: true }]"
            list-type="picture"
            type="file"
            accept="image/"
            @change="handleUploadImage"
            :show-upload-list="false"
          >
            <a-button>
              <template #icon><UploadOutlined /></template>
              Click to upload
            </a-button>
          </a-upload>
        </a-form-item>

        <a-form-item
          label="name"
          name="name"
          :rules="[{ required: true, message: 'Please input your name!' }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item label="Brand" name="brand">
          <a-select
            v-model:value="formState.brand"
            placeholder="please select your zone"
            :rules="[{ required: true }]"
          >
            <a-select-option value="Apple">Apple</a-select-option>
            <a-select-option value="SamSung">SamSung</a-select-option>
            <a-select-option value="Xoami">Xoami</a-select-option>
            <a-select-option value="Realmi">Realmi</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="Price"
          name="price"
          :rules="[{ required: true}]"
        >
          <a-input v-model:value="formState.price" />
        </a-form-item>

        <a-form-item
          label="Short Description"
          name="shortDesc"
          :rules="[{ required: true}]"
        >
          <a-input v-model:value="formState.shortDesc" />
        </a-form-item>

        <a-form-item
          label="Long Description"
          name="longDesc"
        >
          <Editor v-model:longDesc="formState.longDesc" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
      <div class="w-4/12 border border-gray-400 rounded-lg">
        <img :src="formState.image" alt="preview" class="p-4" />
      </div>
    </div>
  </div>
</template>

<style></style>
