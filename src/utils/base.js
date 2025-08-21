// 数据处理相关 API

import dayjs from "dayjs";

/**
 * 深度冻结对象，用于无需处理响应式的数据
 * @param {*} o
 */
export const deepFreeze = o => {
  const propNames = Object.getOwnPropertyNames(o);
  propNames.forEach(name => {
    const prop = o[name];
    if (typeof prop === "object" && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(o);
};

/**
 * 树遍历
 * @param tree
 * @param func
 * @param childrenKey
 */
export const treeForEach = (tree, func, childrenKey = "children") => {
  // 循环比递归快
  let node;
  const list = [...tree];
  while ((node = list.shift())) {
    func(node);
    node[childrenKey] && list.push(...node[childrenKey]);
  }
};

/**
 *
 * @param tree
 * @param func
 * @param childrenKey
 */
export const treeForEachDep = (tree, func, childrenKey = "children") => {
  if (!tree.length || r) return;
  for (let i = 0; i < tree.length; i++) {
    func(tree[i]);
    node[childrenKey] && treeForEachDep(node[childrenKey], func, childrenKey);
  }
};

export function treeFind(tree, cb, childrenKey = "children") {
  if (!tree || !tree.length) return null;
  if (!cb || typeof cb !== "function") return null;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (cb(node)) return node;
    if (node?.[childrenKey].length) {
      return treeFind(node[childrenKey], cb, childrenKey);
    }
  }
  return null;
}

// 找到匹配的第一个子节点
export function treeFindFirstChild(tree, cb, childrenKey = "children") {
  if (!tree || !tree.length) return null;
  if (!cb || typeof cb !== "function") return null;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (cb(node))
      return node?.[childrenKey]?.length ? treeFind(node[childrenKey], cb, childrenKey) : node;
  }
  return null;
}

/**
 * 返回 value 值对应 key 的集合
 * @param arr
 * @param key
 * @param value
 * @returns {[]}
 */
export const getItemByKeyValue = (arr, key, value) => {
  let result = [];
  let fn = arr => {
    arr.map(v => {
      if (v[key] === value) {
        result.push(v);
      }
      if (v.children && v.children.length) {
        fn(v.children);
      }
    });
  };
  fn(arr);
  return result;
};

/**
 * 过滤树
 * @param tree
 * @param func
 * @returns {*}
 */
export function treeFilter(tree, func) {
  // 使用map复制一下节点，避免修改到原树
  return tree.filter(node => {
    node.children = node.children && treeFilter(node.children, func);
    return func(node) || (node.children && node.children.length);
  });
}

/**
 * 请求参数格式化
 * @param url
 * @returns {{}}
 */
export function query2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach(v => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      obj[name] = v.substring(index + 1, v.length);
    }
  });
  return obj;
}

export function array2String(arr, symbol = ",", key = "id") {
  if (!Array.isArray(arr)) return arr;
  if (typeof arr[0] !== "object") {
    return arr.join(symbol);
  }
  return arr?.map(x => x[key])?.join(symbol);
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ["admin", "editor"];
  // return valid_map.indexOf(str.trim()) >= 0;
  return true;
}

export function calculateDuration(start, end) {
  const startTime = dayjs(start);
  const endTime = dayjs(end);

  if (!startTime.isValid() || !endTime.isValid()) {
    return `0时0分0秒`;
  }
  const diffSeconds = endTime.diff(startTime, "second");
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  return `${hours}时${minutes}分${seconds}秒`;
}

export const formatPrice = price => {
  return parseFloat(price).toLocaleString("zh", { style: "decimal" });
};
