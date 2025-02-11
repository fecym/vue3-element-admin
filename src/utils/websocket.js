import { Client } from "@stomp/stompjs";
import user from "@/utils/user";

/**
 * WebSocket 管理类
 * @class WebSocketManager
 */
class WebSocketManager {
  constructor() {
    /** @type {Client|null} STOMP 客户端 */
    this.client = null;
    /** @type {Map<string, Function[]>} 消息处理器映射 */
    this.messageHandlers = new Map();
    /** @type {number} 重连尝试次数 */
    this.reconnectAttempts = 0;
    /** @type {number} 最大重连尝试次数 */
    this.maxReconnectAttempts = 3;
    /** @type {number} 重连延迟时间(毫秒) */
    this.reconnectDelay = 5000;
  }

  /**
   * 初始化 WebSocket 客户端
   */
  setupWebSocket() {
    const endpoint = import.meta.env.VITE_APP_WS_ENDPOINT;

    // 如果没有配置 WebSocket 端点或显式关闭，直接返回
    if (!endpoint) {
      console.log("WebSocket 已被禁用，如需打开请在配置文件中配置 VITE_APP_WS_ENDPOINT");
      return;
    }

    if (this.client && this.client.connected) {
      console.log("客户端已存在并且连接正常");
      return this.client;
    }

    this.client = new Client({
      brokerURL: endpoint,
      connectHeaders: {
        Authorization: user.getToken(),
      },
      heartbeatIncoming: 30000,
      heartbeatOutgoing: 30000,
      reconnectDelay: 0, // 设置为 0 禁用重连
      onConnect: () => {
        console.log("WebSocket 连接成功");
        this.reconnectAttempts = 0;
      },
      onDisconnect: () => {
        console.log("WebSocket 连接断开");
        this.handleReconnect();
      },
      onStompError: frame => {
        console.error("WebSocket 错误:", frame);
        this.handleReconnect();
      },
    });

    this.client.activate();
  }

  /**
   * 处理重连
   */
  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`WebSocket 尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      setTimeout(() => {
        this.setupWebSocket();
      }, this.reconnectDelay);
    } else {
      console.log("WebSocket 重连次数超过最大限制，停止重连");
    }
  }

  /**
   * 订阅主题
   * @param {string} topic 主题
   * @param {Function} onMessage 消息处理函数
   */
  subscribeToTopic(topic, onMessage) {
    console.log(`正在订阅主题: ${topic}`);
    if (!this.client || !this.client.connected) {
      this.setupWebSocket();
    }

    if (this.messageHandlers.has(topic)) {
      this.messageHandlers.get(topic)?.push(onMessage);
    } else {
      this.messageHandlers.set(topic, [onMessage]);
    }

    if (this.client?.connected) {
      this.client.subscribe(topic, message => {
        const handlers = this.messageHandlers.get(topic);
        handlers?.forEach(handler => handler(message.body));
      });
    }
  }

  /**
   * 断开 WebSocket 连接
   */
  disconnect() {
    if (this.client) {
      console.log("断开 WebSocket 连接");
      this.client.deactivate();
      this.client = null;
    }
  }
}

export default new WebSocketManager();
