import { noop } from "@/utils/index.js";

/**
 * 树遍历广度优先
 * @param tree
 * @param cb
 */
export function treeForEach(tree, cb) {
  if (!tree) return;
  const queue = [...tree];
  while (queue.length) {
    const node = queue.shift();
    cb && cb(node);
    node.children ??= [];
    node.children && queue.push(...node.children);
  }
}

/**
 * 树遍历深度优先
 * @param tree
 * @param cb
 */
export function treeForEachDfs(tree, cb = noop) {
  if (!tree) return;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    cb && cb(node);
    node.children && treeForEachDfs(node.children, cb);
  }
}

/**
 * 树过滤
 * @param tree
 * @param cb
 * @returns {*|boolean}
 */
export function treeFilter(tree, cb = x => true) {
  if (!tree) return null;
  return tree.filter(node => {
    node.children = treeFilter(node.children, cb);
    return cb(node) || (node.children && node.children.length);
  });
}

/**
 * 树查找
 * @param tree
 * @param cb
 * @returns {*|null}
 */

export function treeFind(tree, cb) {
  if (!Array.isArray(tree) || tree.length === 0) return null;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (cb(node)) return node;
    // 递归调用放在循环外，确保能继续递归查找子节点
    if (node.children) {
      const childNode = treeFind(node.children, cb);
      if (childNode) return childNode; // 如果子节点符合条件，直接返回
    }
  }
  return null;
}
