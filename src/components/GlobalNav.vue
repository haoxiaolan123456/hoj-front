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
        <div>{{ store.state.user.currentUser.userName }}</div>
      </a-menu-item>

      <a-menu-item v-for="item in visibleRouters" :key="item.path">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import routers from "@/router/routers";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkaccess from "@/access/checkAccess";

const store = useStore();
const router = useRouter();
const selectKeys = ref(["/"]);

//根据用户权限隐藏部分导航路由
const visibleRouters = computed(() => {
  return routers.filter((item, index) => {
    if (item.meta?.hide) {
      return false;
    }
    return checkaccess(
      store.state.user.currentUser,
      item.meta?.access as string
    );
  });
});

//页面创新导航
router.afterEach((to) => {
  selectKeys.value = [to.path];
});

//路由跳转
const skiprouter = (key: string) => {
  router.push({
    path: key,
  });
};
</script>
<style scoped></style>
