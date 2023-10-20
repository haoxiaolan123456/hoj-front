import router from "@/router";
import store from "@/store";
import accesslist from "@/access/access";
import checkaccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  if (!store.state.user.currentUser.userRole) {
    try {
      await store.dispatch("user/getCurrentUser");
    } catch (Error) {}
  }

  const needAccess = to.meta?.access ?? accesslist.NOT_LOGIN;
  //跳转的页面需要用户登录的情况
  if (needAccess !== accesslist.NOT_LOGIN) {
    //用户未登录情况
    if (store.state.user.currentUser.userRole === accesslist.NOT_LOGIN) {
      next(`/user/login?redired${to.fullPath}`);
      return;
    }
    //用户权限不足情况
    if (!checkaccess(store.state.user.currentUser, needAccess as string)) {
      next(`/error`);
      return;
    }
  }
  next();
});
