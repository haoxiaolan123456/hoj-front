import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/TestView.vue";
import ErrorMsg from "@/views/ErrorMsg.vue";
import AdminView from "@/views/AdminView.vue";
import accesslist from "@/access/access";
import AboutView from "@/views/AboutView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManagerQuestion from "@/views/question/ManagerQuestionView.vue";
import QuestionView from "@/views/question/QuestionView.vue";
import DoQuestionView from "@/views/question/DoQuestionView.vue";
import SubmitQuestionView from "@/views/question/SubmitQuestionView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题目",
    component: QuestionView,
    meta:{
      access: accesslist.USER,
    }
  },
  {
    path: "/submited",
    name: "已提交的题目",
    component: SubmitQuestionView,
    meta:{
      access: accesslist.USER,
    }
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
    path: "/addquestion",
    name: "添加题目",
    component: AddQuestionView,
    meta: {
      access: accesslist.ADMIN,
    },
  },

  {
    path: "/viewQuestion/:id",
    name: "做题",
    component: DoQuestionView,
    meta: {
      access: accesslist.USER,
      hide: true,
    },
  },

  {
    path: "/updatequest",
    name: "修改题目",
    component: AddQuestionView,
    meta: {
      hide: true,
      access: accesslist.USER,
    },
  },
  {
    path: "/admin/mangerquestion",
    name: "题目管理",
    component: ManagerQuestion,
    meta: {
      access: accesslist.ADMIN,
    },
  },

 /* {
    path: "/mangerquestion",
    name: "题目管理",
    component: ManagerQuestion,
    meta: {
      access: accesslist.USER,
    },
  },*/
];

export default routes;
