import NProgress from "@/utils/nprogress";
import user from "@/utils/user";
import router from "@/router/index.js";
import { usePermissionStore, useUserStore } from "@/store/index.js";

export function setupPermission() {
  // 白名单路由
  const whiteList = ["/login"];

  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const isLogin = !!user.getToken(); // 判断是否登录
    if (isLogin) {
      if (to.path === "/login") {
        // 已登录，访问登录页，跳转到首页
        next({ path: "/" });
      } else {
        const permissionStore = usePermissionStore();
        // 如果路由还没加载，尝试加载
        if (!permissionStore.isRoutesLoaded) {
          try {
            await permissionStore.generateRoutes();
            // 路由加载完成后，重新跳转到目标路由，让 Vue Router 重新解析
            next({ path: to.fullPath, replace: true });
            return;
          } catch (error) {
            console.error("路由加载失败:", error);
            await useUserStore().clearUserData();
            redirectToLogin(to, next);
            NProgress.done();
            return;
          }
        }

        // 路由已加载，正常处理
        if (to.matched.length === 0) {
          // 路由未匹配，跳转到404
          next("/404");
        } else {
          // 动态设置页面标题
          const title = to.params.title || to.query.title;
          if (title) {
            to.meta.title = title;
          }
          next();
        }
      }
    } else {
      // 未登录，判断是否在白名单中
      if (whiteList.includes(to.path)) {
        next();
      } else {
        // 不在白名单，重定向到登录页
        redirectToLogin(to, next);
        NProgress.done();
      }
    }
  });

  // 后置守卫，保证每次路由跳转结束时关闭进度条
  router.afterEach(() => {
    NProgress.done();
  });
}

// 重定向到登录页
function redirectToLogin(to, next) {
  const params = new URLSearchParams(to.query);
  const queryString = params.toString();
  const redirect = queryString ? `${to.path}?${queryString}` : to.path;
  next(`/login?redirect=${encodeURIComponent(redirect)}`);
}

/** 判断是否有权限 */
export function hasAuth(value, type = "button") {
  const { roles, perms } = useUserStore().userInfo;

  // 超级管理员 拥有所有权限
  if (type === "button" && roles.includes("ROOT")) {
    return true;
  }

  const auths = type === "button" ? perms : roles;
  return typeof value === "string"
    ? auths.includes(value)
    : value.some(perm => auths.includes(perm));
}
