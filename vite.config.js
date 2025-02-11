import vue from "@vitejs/plugin-vue";
import { loadEnv, defineConfig } from "vite";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from "unocss/vite";
import { resolve } from "node:path";
import { name, version, engines, dependencies, devDependencies } from "./package.json";
import { viteBuildInfo } from "./vite-plugins/info.js";
import legacy from "vite-plugin-legacy-swc";
import { getManualChunks } from "./vite-plugins/utils.js";
import { analyzer } from "vite-bundle-analyzer";

// 平台的名称、版本、运行所需的 node 版本、依赖、构建时间的类型提示
const __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
  buildTimestamp: Date.now(),
};

const pathSrc = resolve(__dirname, "src");
// Vite配置  https://cn.vitejs.dev/config
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    // base: "/",
    resolve: {
      alias: { "@": pathSrc },
      extensions: [".js", ".vue", ".json", ".scss", ".mjs"],
      path: "path-browserify",
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: `
            @use "@/styles/variables.scss" as *;
          `,
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: +env.VITE_APP_PORT,
      open: true,
      proxy: {
        // 代理 /api 的请求
        // [env.VITE_APP_API_PATH]: {
        //   changeOrigin: true,
        //   target: env.VITE_APP_BASE_PATH,
        //   rewrite: path => path.replace(new RegExp("^" + env.VITE_APP_API_PATH), ""),
        // },
      },
    },
    plugins: [
      vue(),
      UnoCSS({ hmrTopLevelAwait: false }),
      // 自动导入配置 https://github.com/sxzz/element-plus-best-practices/blob/main/vite.config.ts
      AutoImport({
        // 导入 Vue 函数，如：ref, reactive, toRef 等
        imports: ["vue", "vue-router"],
        // "@vueuse/core", "pinia",
        // 导入 Element Plus函数，如：ElMessage, ElMessageBox 等
        resolvers: [ElementPlusResolver()],
        // eslintrc: {
        //   enabled: false,
        //   filepath: "./.eslintrc-auto-import.json",
        //   globalsPropValue: true,
        // },
        vueTemplate: true,
        // 导入函数类型声明文件路径 (false:关闭自动生成)
        dts: false,
        // dts: "src/types/auto-imports.d.ts",
      }),
      Components({
        // 导入 Element Plus 组件
        resolvers: [ElementPlusResolver()],
        // 指定自定义组件位置(默认:src/components)
        dirs: ["src/auto-components"],
        // 导入组件类型声明文件路径 (false:关闭自动生成)
        dts: false,
      }),
      createSvgIconsPlugin({
        // 缓存图标位置
        iconDirs: [resolve(pathSrc, "assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      legacy({
        modernPolyfills: ["esnext.promise.with-resolvers"],
        // 禁用为兼容传统浏览器生成的legacy chunks，仅将polyfill注入modern构建
        renderLegacyChunks: false,
      }),
      ElementPlus({}),
      viteBuildInfo(),
      env.VITE_ANALYZE === "true" && analyzer(),
    ],
    // 构建配置
    build: {
      // sourcemap: true,
      assetsInlineLimit: 10240, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      cssCodeSplit: true,
      minify: "terser", // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
        format: {
          comments: false, // 删除注释
        },
      },
      rollupOptions: {
        output: {
          manualChunks: getManualChunks,
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: "js/[name].[hash].js",
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: "js/[name].[hash].js",
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: assetInfo => {
            const info = assetInfo.name.split(".");
            let extType = info[info.length - 1];
            // console.log('文件信息', assetInfo.name)
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "media";
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = "img";
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "fonts";
            }
            return `${extType}/[name].[hash].[ext]`;
          },
        },
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
});
