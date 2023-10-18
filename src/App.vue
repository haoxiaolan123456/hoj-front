<template>
  <BaseLayout></BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@/layouts/BaseLayout.vue";
import Router from "@/router";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const user = store.state.user.currentUser;
router.beforeEach((to, from, next) => {
  if (to.meta?.access === "canAdmin") {
    if (user.roal !== "admin") {
      next("/error");
    }
  } else {
    next();
  }
});
</script>

<style scoped>
#app {
}
</style>
