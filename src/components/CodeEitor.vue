<template>
  <div ref="codeEditorRef" style="min-height: 700px"></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, reactive, ref, toRaw, watch } from "vue";
import { defineProps, withDefaults } from "vue/dist/vue";

const codeEditorRef = ref();
const myEditor = ref();
const value = ref();

interface Props {
  language: String;
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  language: () => "java",
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const options = reactive({
  value: props.value,
  language: props.language as string,
  lineHeight: 20,
  theme: "vs-dark",
  automaticLayout: true,
  minimap: {
    enabled: false,
  },
});

onMounted(() => {
  myEditor.value = monaco.editor.create(codeEditorRef.value, options);

  watch(
    () => props.language,
    (newVal) => {
      if (myEditor.value) {
        monaco.editor.setModelLanguage(
          toRaw(myEditor.value).getModel(),
          newVal as string
        );
      }
    }
  );

  // 编辑 监听内容变化
  myEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(myEditor.value).getValue());
  });
});
</script>

<style scoped></style>
