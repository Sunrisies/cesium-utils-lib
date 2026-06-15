import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"], // 同时输出 ES Module 和 CommonJS
  dts: true, // 生成类型声明文件 .d.ts
  clean: true, // 构建前清空 dist 目录
  external: ["cesium"], // 关键！不打包 Cesium
  splitting: false,
  sourcemap: true
})
