import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/TestView.vue";
import ErrorMsg from "@/views/ErrorMsg.vue";
import AdminView from "@/views/AdminView.vue";
import accesslist from "@/access/access";
import AboutView from "@/views/AboutView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题目",
    component: HomeView,
  },
  {
    path: "/about",
    name: "ffff",
    component: AboutView,
  },

  {
    path: "/error",
    name: "错误",
    component: ErrorMsg,
    meta: {
      hide: true,
    },
  },
  {
    path: "/admin",
    name: "管理员",
    component: AdminView,
    meta: {
      access: accesslist.ADMIN,
    },
  },

  {
    path: "/addquest",
    name: "添加题目",
    component: AddQuestionView,
  },
];

export default routes;
