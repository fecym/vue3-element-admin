import { setupDirective } from "@/directive";
import { setupRouter } from "@/router/index.js";
import { setupStore } from "@/store/index.js";
import { setupElIcons } from "./icons";
import { setupPermission } from "./permission.js";
// import webSocketManager from "@/utils/websocket";
import "./element-plus.js";
import "./vee-validate.js";
export default {
  install(app) {
    // 自定义指令(directive)
    setupDirective(app);
    // 路由(router)
    setupRouter(app);
    // 状态管理(store)
    setupStore(app);
    // 国际化
    // setupI18n(app);
    // Element-plus图标
    setupElIcons(app);
    // 路由守卫
    setupPermission();
    // 初始化 WebSocket
    // webSocketManager.setupWebSocket();
  },
};
