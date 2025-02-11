import { computed } from "vue";

/**
 * 判断传入的 rules 是否包含 'required' 规则
 * @param {string | object | array} rules 校验规则
 // * @returns {ComputedRef<boolean>} 是否是必填字段
 */
export function useRequired(rules) {
  return computed(() => {
    if (typeof rules === "string") {
      return rules.split("|").includes("required");
    }
    if (Array.isArray(rules)) {
      return rules.includes("required");
    }
    if (rules && typeof rules === "object") {
      return Object.keys(rules).includes("required");
    }
    return false;
  });
}
