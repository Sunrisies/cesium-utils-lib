import { defineConfig } from "vite"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))

// Cesium 已通过 CDN <script> 加载为全局变量，
// 但 dist/index.js 中仍有 import { ... } from "cesium"，
// 此处将 "cesium" 模块映射为指向全局 Cesium 的桥接文件。
export default defineConfig({
  resolve: {
    alias: {
      cesium: resolve(__dirname, "cesium-shim.js"),
    },
  },
})
