<template>
  <MdEditor :value="mdvalue" :handle-change="mdhandleChange"></MdEditor>
  <hr>
  <CodeEitor :value="codevalue" :handle-change="codehandleChange" ></CodeEitor>

</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEitor from "@/components/CodeEitor.vue"; // @ is an alias to /src

const codevalue = ref("");

const codehandleChange = (v: string) => {
  codevalue.value = v
};


const mdvalue = ref("");

const mdhandleChange = (v: string) => {
  mdvalue.value = v
};
</script>
