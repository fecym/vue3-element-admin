# Vue3 Element Admin

## 项目简介

`vue3-element-admin` 是一个基于 Vue 3、Element Plus 和 Vite 构建的后台管理系统，支持 Pinia、Vue Router、ECharts、Axios 等。

## 目录结构

```
vue3-element-admin/
│── public/               # 静态资源
│── src/                  # 源码目录
│   ├── assets/           # 资源文件（图片、样式等）
│   ├── components/       # 组件
│   ├── auto-components/  # 会被自动注册的组件
│   ├── router/           # 路由配置
│   ├── store/            # Pinia 状态管理
│   ├── views/            # 视图页面
│   ├── utils/            # 工具函数
│   ├── main.js           # 入口文件
│── .eslintrc.js          # ESLint 配置
│── vite.config.js        # Vite 配置
│── package.json          # 项目依赖管理
│── README.md             # 项目文档
```

## 安装依赖

```sh
pnpm install
```

## 启动项目

```sh
pnpm dev
```

## 生产环境构建

```sh
pnpm build
```

## 代码格式化 & Lint 校验

```sh
pnpm lint
```

## Git 分支管理

- ` master`：主分支，存放稳定可发布的代码。
- `develop`：开发分支，集成各功能分支的最新代码。
- `feature/xxx`：新功能分支，从 `develop` 分支拉取。
- `release/uat`：UAT 分支，从 `develop` 分支拉取。
- `fix/xxx`：修复分支，修复缺陷，从 `develop` 或 ` master` 分支拉取。
- `hotfix/xxx`：紧急修复分支，修复生产环境重大 Bug，从 ` master` 分支拉取。

## Git 提交规范

本项目使用 [commitlint](https://commitlint.js.org/) 进行提交信息校验，遵循 Angular 规范：

**提交格式：**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**提交类型（type）：**

- `feat`：✨ 新增功能
- `fix`：🐛 修复缺陷
- `docs`：📝 文档变更（更新 README、注释等）
- `style`：🌈 代码格式（空格、格式化、分号等）
- `refactor`：🔄 代码重构（不影响功能）
- `perf`：🚀 性能优化
- `test`：🧪 添加或修改测试
- `build`：📦️ 构建流程、依赖变更
- `ci`：⚙️ CI 配置、脚本修改
- `revert`：↩️ 代码回滚
- `chore`：🛠️ 构建工具或辅助库的改动（不影响代码逻辑）
- `wip`：🚧 开发中提交

示例：

```
feat(user): 添加用户管理功能
fix(login): 修复登录页面 Bug
```

## 贡献指南

1. Fork 本仓库
2. 创建一个新的分支 (`git checkout -b feature-xxx`)
3. 提交更改 (`git commit -m 'feat: Add new feature'`)
4. 推送到分支 (`git push origin feature-xxx`)
5. 提交 Pull Request


