<template>
  <template v-if="route.path.startsWith('/user')">
    <UserLayout></UserLayout>
  </template>
  <template v-else>
    <BaseLayout></BaseLayout>
  </template>
</template>

<script setup lang="ts">
import BaseLayout from "@/layouts/BaseLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";

const route = useRoute();
const init = () => {
  console.log("haoshuai");
};

onMounted(() => {
  init();
});
</script>
<style scoped></style>
