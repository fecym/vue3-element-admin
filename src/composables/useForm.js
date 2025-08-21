import { computed } from "vue";

/**
 * 判断传入的 rules 是否包含 'required' 规则
 * @param {string | object | array} rules 校验规则
 * @returns {import('vue').ComputedRef<boolean>} 是否是必填字段
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
      // 检查对象是否有 required 属性且值为 truthy
      return "required" in rules && rules.required;
    }
    return false;
  });
}

export function useLabel(props) {
  if (props.hideLabel) return "";
  return props.label + ":";
}
