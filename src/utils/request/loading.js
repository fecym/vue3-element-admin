import { ElLoading } from "element-plus";

let loadingInstance;

export function createLoading() {
  loadingInstance ??= ElLoading.service({
    text: "Loading...",
    fullscreen: true,
  });
}

export function closeLoading() {
  loadingInstance?.close();
}

export { loadingInstance };
