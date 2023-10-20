import accesslist from "@/access/access";

const checkaccess = (currentUser: any, needaccess = accesslist.NOT_LOGIN) => {
  //用户权限
  const loginuseruserRole = currentUser?.userRole ?? accesslist.NOT_LOGIN;
  //未登录情况
  if (needaccess === accesslist.NOT_LOGIN) {
    return true;
  }

  //普通用户能访问
  if (needaccess === accesslist.USER) {
    if (loginuseruserRole === accesslist.NOT_LOGIN) {
      return false;
    }
  }

  //管理员能登录
  if (needaccess === accesslist.ADMIN) {
    if (loginuseruserRole !== accesslist.ADMIN) {
      return false;
    }
  }

  return true;
};

export default checkaccess;
