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
        <div style="color: skyblue">
          {{ store.state.user.currentUser.userName }}
        </div>
      </a-menu-item>

      <a-menu-item v-for="item in visibleRouters" :key="item.path">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
    <div>
      <span style="margin-left: 1000px; cursor: pointer" @click="logout"
        >退出登录</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import routers from "@/router/routers";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkaccess from "@/access/checkAccess";
import accesslist from "@/access/access";
import { UserControllerService } from "@/service";

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

//退出登录
const logout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code === 0) {
    store.commit("user/updateUser", {
      userName: "未登录",
      userRole: accesslist.NOT_LOGIN,
    });
    router.push({
      path: "/user/login",
    });
  }
};
</script>
<style scoped>
.arco-menu {
  font-size: 20px;
  margin-bottom: 30px;
}

span {
  position: absolute;
  top: 16px;
  left: 520px;
}
</style>
