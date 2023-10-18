import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    currentUser: {
      username: "未登录",
      roal: "noruser",
    },
  }),
  mutations: {
    //state状态，payload传递过来的参数
    updateUser(state, payload) {
      state.currentUser = payload;
    },
  },
  actions: {
    getCurrentUser({ commit }, payload) {
      //第一个参数是mutations中的定义的方法
      commit("updateUser", payload);
    },
  },
  getters: {},
} as StoreOptions<any>;
