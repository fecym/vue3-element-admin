import { defineRule, configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import zhCN from "@vee-validate/i18n/dist/locale/zh_CN.json";
import * as rules from "@vee-validate/rules";

// 注册全部规则
Object.keys(rules).forEach(rule => {
  if (rule !== "all") {
    defineRule(rule, rules[rule]);
  }
});

// 自定义decimal验证器，用于验证小数
defineRule("decimal", value => {
  if (!value) {
    return true;
  }

  // 验证是否为有效的小数格式
  const decimalRegex = /^-?\d+(\.\d+)?$/;
  return decimalRegex.test(String(value)) || "请输入有效的数字（整数或小数）";
});

// 配置验证
configure({
  validateOnInput: true,
  validateOnChange: true,
  validateOnBlur: true,
  generateMessage: localize({
    zh_CN: {
      ...zhCN,
      messages: {
        ...zhCN.messages,
        required: "请输入{field}",
        email: "请输入正确的邮箱格式",
        min: "{field}不能少于{length}个字符",
        max: "{field}不能超过{length}个字符",
        numeric: "请输入数字",
        digits: "{field}必须是{length}位数字",
      },
    },
  }),
});

// 设置默认语言
setLocale("zh_CN");
