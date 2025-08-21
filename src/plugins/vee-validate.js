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

// 自定义chineseEnglishNumber验证器，用于验证中英文和数字
defineRule("chineseEnglishNumber", value => {
  if (!value) {
    return true;
  }
  return /^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(String(value)) || `${value}必须为中英文或数字`;
});

// 自定义phone验证器，用于验证手机号
defineRule("phone", value => {
  if (!value) {
    return true; // 不做校验，交给 required 规则处理
  }
  return /^(1[3-9])\d{9}$/.test(String(value)) || `${value}不合法`;
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
        // min: "{field}不能少于{length}个字符",
        // max: "{field}不能超过{length}个字符",
        // digits: "{field}必须是{length}位数字",
      },
    },
  }),
});

// 设置默认语言
setLocale("zh_CN");
