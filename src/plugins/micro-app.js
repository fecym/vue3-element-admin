import microApp from "@micro-zoe/micro-app";

export function setupMicroApp() {
  microApp.start({
    // "keep-alive": true,
    "router-mode": "native",
    "disable-memory-router": true,
    lifeCycles: {
      created() {
        console.log("created 全局监听");
      },
      beforemount(e, appName) {
        console.log("beforemount 全局监听");
      },
      mounted() {
        console.log("mounted 全局监听");
      },
      unmount() {
        console.log("unmount 全局监听");
      },
      error() {
        console.log("error 全局监听");
      },
    },
  });
}
