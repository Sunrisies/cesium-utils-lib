import { defineConfig } from "vitepress"

export default defineConfig({
  title: "cesium-utils-lib",
  description: "Cesium 地理工具函数库 — 轻量级 TypeScript 工具集",
  lang: "zh-CN",
  ignoreDeadLinks: true,
  themeConfig: {
    logo: "https://cesium.com/favicon.ico",

    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/getting-started" },
      { text: "API 参考", link: "/api/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "快速开始", link: "/guide/getting-started" },
          ],
        },
      ],
      "/api/": [
        {
          text: "API 参考",
          items: [
            { text: "概览", link: "/api/" },
            { text: "坐标转换", link: "/api/lonlat" },
            { text: "相机飞行", link: "/api/flyTo" },
            { text: "相机跳转", link: "/api/setView" },
            { text: "多点视野飞行", link: "/api/flyToPositions" },
            { text: "位置矩阵", link: "/api/calculateLocationMatrix" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/your-org/cesium-utils-lib" },
    ],

    footer: {
      message: "MIT License",
      copyright: "Copyright © 2025",
    },
  },
})
