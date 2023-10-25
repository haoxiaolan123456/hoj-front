import { StoreOptions } from "vuex";
import { UserControllerService } from "@/service";
import accesslist from "@/access/access";
import store from "@/store/index";

export default {
  namespaced: true,
  state: () => ({
    currentUser: {},
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
          ...store.state.user.currentUser,
          userRole: accesslist.NOT_LOGIN,
        });
      }
    },
  },
  getters: {},
} as StoreOptions<any>;
