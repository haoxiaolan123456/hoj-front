<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange"/>
</template>
<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, withDefaults, defineProps } from "vue";

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

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];
</script>
<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
