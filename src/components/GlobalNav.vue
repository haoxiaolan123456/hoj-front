<template>
  <div class="menu-demo">
    <a-menu
      mode="horizontal"
      :selected-keys="selectKeys"
      @menu-item-click="skiprouter"
    >
      <a-menu-item
        key="0"
        :style="{ padding: 0, marginRight: '38px' }"
        disabled
      >
        <div>{{ store.state.user.currentUser.username }}</div>
      </a-menu-item>
      <a-menu-item v-for="item in routers" :key="item.path">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import routers from "@/router/routers";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const selectKeys = ref(["/"]);
const user = store.state.user.currentUser;
// console.log(user);

setTimeout(() => {
  store.dispatch("user/getCurrentUser", {
    username: "苏暖年",
    roal: "noruser",
  });
  console.log(123);
}, 3000);

router.afterEach((to) => {
  selectKeys.value = [to.path];
});

const skiprouter = (key: string) => {
  router.push({
    path: key,
  });
};
</script>
<style scoped></style>
