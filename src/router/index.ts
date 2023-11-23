import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import routes from "@/router/routers";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: "/user",
      name: "用户",
      children: [
        {
          path: "/user/login",
          name: "登录",
          component: UserLoginView,
        },
        {
          path: "/user/register",
          name: "注册",
          component: UserRegisterView,
        },
      ],
    },
  ],
});
export default router;
