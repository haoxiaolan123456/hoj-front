import { StoreOptions } from "vuex";
import { UserControllerService } from "@/service";
import accesslist from "@/access/access";

export default {
  namespaced: true,
  state: () => ({
    currentUser: {
      userName:"未登录",
      userRole:accesslist.NOT_LOGIN,
    },
  }),
  mutations: {
    //state状态，payload传递过来的参数
    updateUser(state, payload) {
      state.currentUser = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      //第一个参数是mutations中的定义的方法
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          userName:"未登录",
          userRole: accesslist.NOT_LOGIN,
        });
      }
    },
  },
  getters: {},
} as StoreOptions<any>;
