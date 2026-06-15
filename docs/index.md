---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "cesium-utils-lib"
  text: "Cesium 地理工具函数库"
  tagline: 轻量级 TypeScript 工具集，基于 CesiumJS 封装常用地理空间操作
  image:
    src: https://cesium.com/favicon.ico
    alt: Cesium
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: API 参考
      link: /api/

features:
  - icon: 🗺️
    title: 坐标转换
    details: 屏幕坐标拾取、Cartesian3 转换，轻松获取经纬度与高度
  - icon: 📷
    title: 相机控制
    details: 平滑飞行、即时跳转、多点包围盒视野，封装 Cesium 相机 API
  - icon: 🔄
    title: 变换矩阵
    details: 经纬度 + 朝向生成 ENU→ECEF 变换矩阵，快速定位 3D 模型
  - icon: 📦
    title: 零依赖打包
    details: ESM / CJS 双格式输出，Cesium 作为 peer dependency
---
