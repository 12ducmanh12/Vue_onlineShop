<script setup lang="ts">
import { useProductStore } from "@/stores/productStore";
import { UploadChangeParam } from "ant-design-vue";
import { reactive } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";

const useProduct = useProductStore();

const props = defineProps({
  dataProductProps: Object,
  open: Boolean,
});
const updateProduct = reactive({
  name: props.dataProductProps?.name,
  id: props.dataProductProps?._id,
  brand: props.dataProductProps?.brand,
  shortDesc: props.dataProductProps?.shortDesc,
  price: props.dataProductProps?.price,
  image: props.dataProductProps?.image,
});

const emit = defineEmits(["update:open"]);
const handleOk = () => {
  emit("update:open", false);
};

const handleCancel = () => {
  emit("update:open", false);
};
const onFinish = (values: any) => {
  useProduct.updateProduct({ id: props.dataProductProps?._id, values: values });
};
function handleUploadImage(e: UploadChangeParam) {
  const file = e.file.originFileObj;
  TranformFile(file);
}

function TranformFile(file: any) {
  const reader: any = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      updateProduct.image = reader.result;
    };
  } else {
    updateProduct.image = "";
  }
}
</script>
<template>
  <div>
    <a-modal
      :open="open"
      title="Basic Modal"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="flex flex-row">
        <a-form
          :model="updateProduct"
          name="basic"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="on"
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
            <a-input v-model:value="updateProduct.name" />
          </a-form-item>

          <a-form-item label="Brand" name="brand">
            <a-select
              v-model:value="updateProduct.brand"
              placeholder="please select your zone"
              :rules="[{ required: true }]"
              @change=""
            >
              <a-select-option value="Apple">Apple</a-select-option>
              <a-select-option value="SamSung">SamSung</a-select-option>
              <a-select-option value="Xoami">Xoami</a-select-option>
              <a-select-option value="Realmi">Realmi</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Price" name="price" :rules="[{ required: true }]">
            <a-input v-model:value="updateProduct.price" />
          </a-form-item>

          <a-form-item
            label="Short Description"
            name="shortDesc"
            :rules="[{ required: true }]"
          >
            <a-input v-model:value="updateProduct.shortDesc" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item>
        </a-form>
        <div class="w-4/12 border border-gray-400 rounded-lg">
          <img :src="updateProduct.image" alt="preview" class="p-4" />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style lang=""></style>
