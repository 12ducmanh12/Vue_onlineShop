<template>
  <div id="app">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      @input="handeChange"
    ></ckeditor>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const props = defineProps({
  longDesc: String,
});
const emit = defineEmits(["update:longDesc"]);
const editor = ClassicEditor;
const editorData = ref("");
const editorConfig = {
  // The configuration of the editor.
};
function handeChange() {
  emit("update:longDesc", editorData.value);
}
</script>
