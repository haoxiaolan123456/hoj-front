import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ErrorMsg from "@/views/ErrorMsg.vue";
import AdminView from "@/views/AdminView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题目",
    component: HomeView,
  },
  {
    path: "/error",
    name: "错误",
    component: ErrorMsg,
  },

  {
    path: "/admin",
    name: "管理员",
    component: AdminView,
    meta: {
      access: "canAdmin",
    },
  },
  {
    path: "/about",
    name: "个人",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

export default routes;
