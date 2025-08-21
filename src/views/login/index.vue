<template>
  <div class="login">
    <!-- 登录页头部 -->
    <div class="login-header">
      <div class="flex-y-center">
        <el-switch
          v-model="isDark"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
          @change="toggleTheme"
        />
      </div>
    </div>

    <!-- 登录页内容 -->
    <div class="login-form">
      <el-form ref="loginFormRef" :model="loginFormData" :rules="loginRules">
        <div class="form-title">
          <h2>{{ defaultSettings.title }}</h2>
          <el-dropdown style="position: absolute; right: 0">
            <div class="cursor-pointer">
              <el-icon>
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-tag>{{ defaultSettings.version }}</el-tag>
                </el-dropdown-item>
                <el-dropdown-item @click="setLoginCredentials('test01', '000000')">
                  测试账号：test01/123456
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- 用户名 -->
        <el-form-item prop="username">
          <div class="input-wrapper">
            <el-icon class="mx-2">
              <User />
            </el-icon>
            <el-input
              ref="username"
              v-model="loginFormData.username"
              placeholder="用户名"
              name="username"
              size="large"
              class="h-[48px] pr-2"
            />
          </div>
        </el-form-item>

        <!-- 密码 -->
        <el-tooltip :visible="isCapslock" content="大写锁定已打开" placement="right">
          <el-form-item prop="password">
            <div class="input-wrapper">
              <el-icon class="mx-2">
                <Lock />
              </el-icon>
              <el-input
                v-model="loginFormData.password"
                placeholder="密码"
                type="password"
                name="password"
                size="large"
                class="h-[48px] pr-2"
                show-password
                @keyup="checkCapslock"
                @keyup.enter="handleLoginSubmit"
              />
            </div>
          </el-form-item>
        </el-tooltip>

        <div class="flex-x-between w-full py-1">
          <el-checkbox>记住我</el-checkbox>
          <!--          href="/forget-password"-->
          <el-link type="primary">忘记密码</el-link>
        </div>

        <!-- 登录按钮 -->
        <el-button
          :loading="loading"
          type="primary"
          size="large"
          class="w-full"
          @click.prevent="handleLoginSubmit"
        >
          登 录
        </el-button>

        <!-- 第三方登录 -->
        <el-divider>
          <el-text size="small">其他登录方式</el-text>
        </el-divider>
        <div class="third-party-login">
          <svg-icon icon-class="wechat" class="icon" />
          <svg-icon icon-class="qq" class="icon" />
          <svg-icon icon-class="github" class="icon" />
          <svg-icon icon-class="gitee" class="icon" />
        </div>
      </el-form>
    </div>

    <!-- 登录页底部 -->
    <div class="login-footer">
      <el-text size="small">
        MIT Licensed | Copyright © 2019 - present
        <a href="http://beian.miit.gov.cn/" target="_blank">京ICP备19052475号</a>
      </el-text>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

import AuthAPI from "@/api/auth";
import router from "@/router";

import defaultSettings from "@/settings";
import { ThemeEnum } from "@/enums/ThemeEnum";

import { useSettingsStore, useUserStore, useDictStore, usePermissionStore } from "@/store";
import SvgIcon from "@/auto-components/SvgIcon.vue";
import { ArrowDown, Lock } from "@element-plus/icons-vue";

const userStore = useUserStore();
const settingsStore = useSettingsStore();
const dictStore = useDictStore();

const route = useRoute();
const loginFormRef = ref();

const isDark = ref(settingsStore.theme === ThemeEnum.DARK); // 是否暗黑模式
const loading = ref(false); // 按钮 loading 状态
const isCapslock = ref(false); // 是否大写锁定
const captchaBase64 = ref(); // 验证码图片Base64字符串

const loginFormData = ref({
  username: "",
  password: "",
  captchaKey: "",
  captchaCode: "",
});

const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: "请输入用户名",
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: "请输入密码",
      },
      {
        min: 6,
        message: "密码不能少于6位",
        trigger: "blur",
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: "blur",
        message: "请输入验证码",
      },
    ],
  };
});

// 获取验证码
function getCaptcha() {
  AuthAPI.getCaptcha().then(data => {
    loginFormData.value.captchaKey = data.captchaKey;
    captchaBase64.value = data.captchaBase64;
  });
}

// 登录
function handleLoginSubmit() {
  loginFormRef.value?.validate(valid => {
    if (valid) {
      loading.value = true;
      userStore
        .login(loginFormData.value)
        .then(async () => {
          await userStore.getUserInfo();
          // 需要在路由跳转前加载字典数据，否则会出现字典数据未加载完成导致页面渲染异常
          await dictStore.loadDictionaries();
          await usePermissionStore().generateRoutes();
          // 跳转到登录前的页面
          const { path, queryParams } = parseRedirect();
          console.log(path, "??");
          router.push({ path: path, query: queryParams });
        })
        .catch(err => {
          console.log(err, "???");
          getCaptcha();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}

/**
 * 解析 redirect 字符串 为 path 和  queryParams
 *
 * @returns { path, queryParams: Record<string, string> } 解析后的 path 和 queryParams
 */
function parseRedirect() {
  const query = route.query;
  const redirect = query.redirect ?? "/";

  const url = new URL(redirect, window.location.origin);
  const path = url.pathname;
  const queryParams = {};

  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return { path, queryParams };
}

// 主题切换
const toggleTheme = () => {
  const newTheme = settingsStore.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
  settingsStore.changeTheme(newTheme);
};

// 检查输入大小写
function checkCapslock(event) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState("CapsLock");
  }
}

// 设置登录凭证
const setLoginCredentials = (username, password) => {
  loginFormData.value.username = username;
  loginFormData.value.password = password;
};

onMounted(() => {
  getCaptcha();
});
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  background: url("@/assets/images/login-bg.jpg") no-repeat center right;

  .login-header {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: right;
    width: 100%;
    padding: 15px;

    .logo {
      width: 26px;
      height: 26px;
    }

    .title {
      margin: auto 5px;
      font-size: 24px;
      font-weight: bold;
      color: #3b82f6;
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 460px;
    padding: 40px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow-light);

    @media (width <= 460px) {
      width: 100%;
      padding: 20px;
    }

    .form-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0 20px;
      text-align: center;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .captcha-img {
      height: 48px;
      cursor: pointer;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    .third-party-login {
      display: flex;
      justify-content: center;
      width: 100%;
      color: var(--el-text-color-secondary);

      *:not(:first-child) {
        margin-left: 20px;
      }

      .icon {
        cursor: pointer;
      }
    }
  }

  .login-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    text-align: center;
  }
}

:deep(.el-form-item) {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}

html.dark {
  .login {
    background: url("@/assets/images/login-bg-dark.jpg") no-repeat center right;

    .login-form {
      background: transparent;
      box-shadow: var(--el-box-shadow);
    }
  }
}
</style>
