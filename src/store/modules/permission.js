import { defineStore } from "pinia";
import { ref } from "vue";
import { constantRoutes, moduleRoutes } from "@/router";
import { store } from "@/store";
import router from "@/router";
import { getRoutes as getRoutesFn } from "@/api/menu.js";
import { treeFilter, treeFind, treeForEach } from "@/utils/tree.js";
import { cloneDeep } from "lodash-es";
import user from "@/utils/user";

export const usePermissionStore = defineStore("permission", () => {
  // 所有路由，包括静态和动态路由
  const routes = ref([]);
  const menuList = ref([]);
  // 混合模式左侧菜单
  const mixLeftMenus = ref([]);
  // 路由是否已加载
  const isRoutesLoaded = ref(false);
  const routerMap = ref({});

  /**
   * 生成动态路由
   */
  function generateRoutes() {
    const { resolve, promise, reject } = Promise.withResolvers();
    const menuListStore = user.getMenu();

    const formatMenu = data => {
      const dynamicRoutes = generateRoutesFromBackend(data);
      menuList.value = data || [];
      routes.value = constantRoutes.concat(dynamicRoutes);
      addRouteRecursively(dynamicRoutes);
      router.getRoutes().forEach(route => {
        routerMap.value[route.path] = route;
      });
      isRoutesLoaded.value = true;
    };
    if (menuListStore) {
      formatMenu(menuListStore);
      resolve();
    } else {
      getRoutesFn()
        .then(data => {
          treeForEach(data, node => {
            node.title ||= node.name;
            node.path ||= node.router;
          });
          formatMenu(data);
          resolve();
        })
        .catch(reject);
    }

    return promise;
  }

  /**
   * 混合模式菜单下根据顶部菜单路径设置左侧菜单
   * @param {string} topMenuPath - 顶部菜单路径
   */
  const setMixLeftMenus = topMenuPath => {
    const matchedItem = menuList.value.find(item => item.path === topMenuPath);
    mixLeftMenus.value = matchedItem?.children || [];
  };

  /**
   * 重置路由
   */
  const resetRouter = () => {
    // 删除动态路由，保留静态路由
    routes.value.forEach(route => {
      if (route.name && !constantRoutes.find(r => r.name === route.name)) {
        // 从 router 实例中移除动态路由
        router.removeRoute(route.name);
      }
    });

    routes.value = [];
    mixLeftMenus.value = [];
    isRoutesLoaded.value = false;
  };

  return {
    menuList,
    routes,
    generateRoutes,
    mixLeftMenus,
    setMixLeftMenus,
    isRoutesLoaded,
    resetRouter,
    routerMap,
  };
});

function generateRoutesFromBackend(menuList, setUser = true) {
  const filterRoutes = treeFilter(cloneDeep(moduleRoutes), route => {
    // 检查当前路由是否匹配菜单
    const directMatch = treeFind(menuList, node => {
      const isMatch = node.router === route.path;
      if (isMatch) {
        route.title = node.name || route.meta.title;
        node.name = route.name;
        node.meta ??= route.meta;
        node.path ||= route.path;
      }
      return isMatch;
    });

    // 如果直接匹配，返回 true
    if (directMatch) return true;

    // 检查是否是某个菜单路由的子路由（详情页等）
    const isChildRoute = treeFind(menuList, node => {
      // 如果当前路由路径以菜单路径开头，且包含动态参数，则认为是子路由
      return (
        route.path.startsWith(node.router + "/") ||
        (route.path.includes("/:") && route.path.replace(/\/:[^/]+/g, "") === node.router)
      );
    });

    return !!isChildRoute;
  });
  setUser && user.setMenu(menuList);
  return filterRoutes;
}

const addRouteRecursively = (routes, parent = null) => {
  routes.forEach(route => {
    try {
      if (!parent) {
        if (!router.hasRoute(route.name)) {
          router.addRoute(route);
        }
      } else {
        if (!router.hasRoute(route.name)) {
          router.addRoute(parent.name, route);
        }
      }
      if (route.children?.length) {
        addRouteRecursively(route.children, route);
      }
    } catch (error) {
      console.warn(`Failed to add route: ${route.name}`, error);
    }
  });
};

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
