import { defineStore } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { store } from "@/store";

export const useTagsViewStore = defineStore("tagsView", () => {
  const visitedViews = ref([]);
  const cachedViews = ref([]);
  const router = useRouter();
  const route = useRoute();

  /**
   * 添加已访问视图到已访问视图列表中
   * @param {object} view 视图对象
   */
  function addVisitedView(view) {
    if (visitedViews.value.some(v => v.path === view.path)) {
      return;
    }
    if (view.affix) {
      visitedViews.value.unshift(view);
    } else {
      visitedViews.value.push(view);
    }
  }

  /**
   * 添加缓存视图到缓存视图列表中
   * @param {object} view 视图对象
   */
  function addCachedView(view) {
    const viewName = view.name;
    if (cachedViews.value.includes(viewName)) {
      return;
    }
    if (view.keepAlive) {
      cachedViews.value.push(viewName);
    }
  }

  /**
   * 从已访问视图列表中删除指定的视图
   * @param {object} view 视图对象
   * @returns {Promise} Promise对象
   */
  function delVisitedView(view) {
    const { promise, resolve } = Promise.withResolvers();
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1);
        break;
      }
    }
    resolve([...visitedViews.value]);
    return promise;
  }

  /**
   * 从缓存视图列表中删除指定的视图
   * @param {object} view 视图对象
   * @returns {Promise} Promise对象
   */
  function delCachedView(view) {
    const { promise, resolve } = Promise.withResolvers();
    const index = cachedViews.value.indexOf(view.name);
    index > -1 && cachedViews.value.splice(index, 1);
    resolve([...cachedViews.value]);
    return promise;
  }

  /**
   * 删除其他已访问视图
   * @param {object} view 视图对象
   * @returns {Promise} Promise对象
   */
  function delOtherVisitedViews(view) {
    const { promise, resolve } = Promise.withResolvers();
    visitedViews.value = visitedViews.value.filter(v => {
      return v.affix || v.path === view.path;
    });
    resolve([...visitedViews.value]);
    return promise;
  }

  /**
   * 删除其他缓存视图
   * @param {object} view 视图对象
   * @returns {Promise} Promise对象
   */
  function delOtherCachedViews(view) {
    const { promise, resolve } = Promise.withResolvers();
    const index = cachedViews.value.indexOf(view.name);
    if (index > -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1);
    } else {
      cachedViews.value = [];
    }
    resolve([...cachedViews.value]);
    return promise;
  }

  /**
   * 更新已访问视图
   * @param {object} view 视图对象
   */
  function updateVisitedView(view) {
    for (let v of visitedViews.value) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }

  /**
   * 添加视图
   * @param {object} view 视图对象
   */
  function addView(view) {
    addVisitedView(view);
    addCachedView(view);
  }

  /**
   * 删除视图
   * @param {object} view 视图对象
   * @returns {Promise} Promise对象
   */
  function delView(view) {
    const { promise, resolve } = Promise.withResolvers();
    Promise.all([delVisitedView(view), delCachedView(view)]).then(result => {
      resolve({
        visitedViews: result[0],
        cachedViews: result[1],
      });
    });
    return promise;
  }

  /**
   * 删除其他视图
   * @param {object} view 视图对象
   * @returns {Promise} Promise对象
   */
  function delOtherViews(view) {
    const { promise, resolve } = Promise.withResolvers();
    Promise.all([delOtherVisitedViews(view), delOtherCachedViews(view)]).then(result => {
      resolve({
        visitedViews: result[0],
        cachedViews: result[1],
      });
    });
    return promise;
  }

  /**
   * 删除左侧视图
   * @param {object} view 视图对象
   * @returns {Promise} Promise对象
   */
  function delLeftViews(view) {
    const { promise, resolve } = Promise.withResolvers();
    const currIndex = visitedViews.value.findIndex(v => v.path === view.path);
    if (currIndex === -1) {
      return;
    }
    visitedViews.value = visitedViews.value.filter((item, index) => {
      if (index >= currIndex || item.affix) {
        return true;
      }

      const cacheIndex = cachedViews.value.indexOf(item.name);
      if (cacheIndex > -1) {
        cachedViews.value.splice(cacheIndex, 1);
      }
      return false;
    });
    resolve({
      visitedViews: [...visitedViews.value],
    });
    return promise;
  }

  /**
   * 删除右侧视图
   * @param {object} view 视图对象
   * @returns {Promise} Promise对象
   */
  function delRightViews(view) {
    const { promise, resolve } = Promise.withResolvers();
    const currIndex = visitedViews.value.findIndex(v => v.path === view.path);
    if (currIndex === -1) {
      return;
    }
    visitedViews.value = visitedViews.value.filter((item, index) => {
      if (index <= currIndex || item.affix) {
        return true;
      }

      const cacheIndex = cachedViews.value.indexOf(item.name);
      if (cacheIndex > -1) {
        cachedViews.value.splice(cacheIndex, 1);
      }
      return false;
    });
    resolve({
      visitedViews: [...visitedViews.value],
    });
    return promise;
  }

  /**
   * 删除所有视图
   * @returns {Promise} Promise对象
   */
  function delAllViews() {
    const { promise, resolve } = Promise.withResolvers();
    Promise.all([delAllVisitedViews(), delAllCachedViews()]).then(result => {
      resolve({
        visitedViews: result[0],
        cachedViews: result[1],
      });
    });
    return promise;
  }

  /**
   * 删除所有已访问视图
   * @returns {Promise} Promise对象
   */
  function delAllVisitedViews() {
    const { promise, resolve } = Promise.withResolvers();
    visitedViews.value = visitedViews.value.filter(tag => tag.affix);
    resolve([...visitedViews.value]);
    return promise;
  }

  /**
   * 删除所有缓存视图
   * @returns {Promise} Promise对象
   */
  function delAllCachedViews() {
    const { promise, resolve } = Promise.withResolvers();
    cachedViews.value = [];
    resolve([...cachedViews.value]);
    return promise;
  }

  /**
   * 关闭当前视图
   * @param {object} view 视图对象
   */
  function closeCurrentView(view) {
    delView(view).then(({ visitedViews }) => {
      toLastView(visitedViews, view);
    });
  }

  /**
   * 判断是否是活动视图
   * @param {object} view 视图对象
   * @returns {boolean} 是否是活动视图
   */
  function isActive(view) {
    return view.path === route.path;
  }

  /**
   * 跳转到最后一个视图
   * @param {Array} visitedViews 已访问视图列表
   * @param {object} view 视图对象
   */
  function toLastView(visitedViews, view) {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
      router.push(latestView.fullPath);
    } else {
      // 如果当前路由是根路由 redirect，则跳转到 redirect 所指向的路由
      if (view.name === "Dashboard") {
        // 刷新首页
        router.replace("/redirect" + view.fullPath);
      } else {
        router.push("/");
      }
    }
  }

  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    addCachedView,
    delVisitedView,
    delCachedView,
    delOtherVisitedViews,
    delOtherCachedViews,
    updateVisitedView,
    addView,
    delView,
    delOtherViews,
    delLeftViews,
    delRightViews,
    delAllViews,
    delAllVisitedViews,
    delAllCachedViews,
    closeCurrentView,
    isActive,
    toLastView,
  };
});

/**
 * 用于在组件外部使用 TagsView Store
 */
export function useTagsViewStoreHook() {
  return useTagsViewStore(store);
}
