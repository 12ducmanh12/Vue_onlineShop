<script setup lang="ts">
defineProps({
  active: Boolean,
});
</script>
<template>
  <div
    :class="{
      'bg-gray-300 text-red-500': active,
      'hover:bg-gray-300 cursor-pointer py-2 pl-2 m-2 rounded-md hover:text-red-500': true,
    }"
  >
    <slot></slot>
  </div>
</template>

<style></style>
