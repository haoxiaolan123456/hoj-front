<template>
  <div ref="codeEditorRef" style="min-height: 500px"></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import {onMounted, ref, toRaw} from "vue";
import {defineProps, withDefaults} from "vue/dist/vue";

const codeEditorRef = ref();
const myEditor = ref();
const value = ref();

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});


onMounted(() => {
  myEditor.value = monaco.editor.create(codeEditorRef.value, {
    value:props.value,
    language: "java",
    lineNumbers: "on",
    lineHeight: 20,
    theme: "hc-black",
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
  });

  // 编辑 监听内容变化
  myEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(myEditor.value).getValue())
  })
});
</script>

<style scoped></style>
