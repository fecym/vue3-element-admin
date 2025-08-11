import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 图标目录路径
const iconsDir = path.join(__dirname, "../src/assets/icons");
// 输出文件路径
const outputFile = path.join(__dirname, "../src/utils/svg_icons.js");

/**
 * 递归扫描目录获取所有 SVG 文件名
 * @param {string} dir - 要扫描的目录路径
 * @param {string} baseDir - 基础目录路径
 * @returns {Array} 图标名称数组
 */
function getAllSvgNames(dir, baseDir = dir) {
  const iconNames = [];

  try {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // 递归扫描子目录
        iconNames.push(...getAllSvgNames(filePath, baseDir));
      } else if (file.endsWith(".svg")) {
        const relativePath = path.relative(baseDir, filePath);
        const fileName = path.basename(file, ".svg");
        const dirName = path.dirname(relativePath);

        // 子目录中的图标使用 "目录名-文件名" 格式，根目录直接使用文件名
        const iconName = dirName === "." ? fileName : `${dirName}-${fileName}`;
        iconNames.push(iconName);
      }
    }
  } catch (error) {
    console.error(`扫描目录 ${dir} 时出错:`, error.message);
  }

  return iconNames;
}

try {
  // 检查图标目录是否存在
  if (!fs.existsSync(iconsDir)) {
    throw new Error(`图标目录不存在: ${iconsDir}`);
  }

  // 获取所有图标名称并排序
  const iconNames = getAllSvgNames(iconsDir).sort();

  if (iconNames.length === 0) {
    console.warn("⚠️  未找到任何 .svg 文件");
    process.exit(0);
  }

  // 生成导出内容
  const content = `export default [${iconNames.map(name => `"${name}"`).join(",")}];`;

  // 写入文件
  fs.writeFileSync(outputFile, content, "utf8");
} catch (error) {
  console.error("❌ 生成图标名称文件时出错:", error.message);
  process.exit(1);
}
