import { readdir, stat } from "node:fs";
import path from "node:path";
import { sum } from "lodash-es";

/**
 * 获取 src 相对文件夹
 * @param filePath
 * @returns {null}
 */
export function getSrcDir(filePath) {
  let currentDir = path.resolve(filePath); // 确保是绝对路径
  let srcDir = null;

  while (currentDir !== path.dirname(currentDir)) {
    // 防止到根目录死循环
    if (path.basename(currentDir) === "src") {
      srcDir = currentDir;
      break;
    }
    currentDir = path.dirname(currentDir);
  }
  return srcDir;
}

/**
 * 格式化字节为可读的格式
 * @param {number} bytes 字节数
 * @param {number} [decimals=2] 小数点位数
 * @returns {string} 格式化后的字节数，如 "1 KB", "2.3 MB"
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const fileListTotal = [];

/**
 * 获取指定文件夹中所有文件的总大小
 * @param options
 * @returns void
 */
export function getPackageSize(options) {
  const { folder = "dist", callback = () => {}, format = true } = options;
  readdir(folder, (err, files) => {
    if (err) throw err;
    let count = 0;
    const checkEnd = () => {
      ++count === files.length &&
        callback(format ? formatBytes(sum(fileListTotal)) : sum(fileListTotal));
    };
    files.forEach(item => {
      stat(`${folder}/${item}`, async (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
          fileListTotal.push(stats.size);
          checkEnd();
        } else if (stats.isDirectory()) {
          getPackageSize({
            folder: `${folder}/${item}/`,
            callback: checkEnd,
          });
        }
      });
    });
    files.length === 0 && callback(0);
  });
}

export function getManualChunks(id) {
  const chunkSet = new Set([
    "lodash-es",
    "axios",
    "echarts",
    // "zrender",
    "pinia",
    "exceljs",
    "@wangeditor-next",
    "element-plus",
  ]);

  for (const key of chunkSet) {
    if (id.includes(`node_modules/${key}`)) {
      return key;
    }
  }

  // 如果没有找到匹配的模块，返回 undefined
  return undefined;
}
