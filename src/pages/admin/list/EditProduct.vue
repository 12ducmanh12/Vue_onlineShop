<script setup lang="ts">
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { createVNode, reactive, ref } from "vue";
import ModalEdit from "./components/ModalEdit.vue";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

interface product {
  _id: string;
  name: string;
  brand: string;
  shortDesc: string;
  image: any;
  price: number;
}
const productStore = useProductStore();
const showView = ref(false);
const dataProduct = reactive<product>({
  _id: "",
  name: "",
  brand: "",
  shortDesc: "",
  price: 0,
  image: "",
});

const { items } = storeToRefs(productStore) as unknown as { items: product[] };
const setShowView = (value: boolean) => {
  showView.value = value;
};

const showDeleteConfirm = (id: string) => {
  Modal.confirm({
    title: "Are you sure delete this product?",
    icon: createVNode(ExclamationCircleOutlined),
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      productStore.deleteProduct({ id: id });
    },
  });
};
</script>
<template>
  <div class="w-10/12 m-4">
    <ModalEdit v-model:open="showView" :dataProductProps="dataProduct" />
    <div
      v-for="item in items"
      :key="item._id"
      class="flex justify-between bg-white shadow-xl px-3 py-2 border h-fit border-gray-100"
    >
      <div className="flex flex-row gap-x-8">
        <img :src="item?.image?.url" :alt="item?.name" className="max-h-10" />
        <div className="flex flex-row items-center">
          <p className="text-xl">{{ item?.name }}</p>
        </div>
      </div>
      <div className="flex gap-x-4">
        <button
          @click="
            () => {
              setShowView(true);
              dataProduct = item;
            }
          "
        >
          View
        </button>
        <button @click="showDeleteConfirm(item._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
