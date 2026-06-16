import { defineConfig } from "vitepress"

export default defineConfig({
  title: "cesium-utils-lib",
  description: "Cesium 地理工具函数库 — 轻量级 TypeScript 工具集",
  lang: "zh-CN",
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
            { text: "概述", link: "/api/" },
            {
              text: "函数",
              base: "/api/functions/",
              items: [
                { text: "getLonLat", link: "getLonLat" },
                { text: "getLonLatByCartesian", link: "getLonLatByCartesian" },
                { text: "flyTo", link: "flyTo" },
                { text: "setView", link: "setView" },
                { text: "flyToPositions", link: "flyToPositions" },
                { text: "calculateLocationMatrix", link: "calculateLocationMatrix" },
              ],
            },
            {
              text: "接口",
              base: "/api/interfaces/",
              items: [
                { text: "LonLat", link: "LonLat" },
                { text: "FlyToOptions", link: "FlyToOptions" },
                { text: "SetViewOptions", link: "SetViewOptions" },
                { text: "CalculateLocationOptions", link: "CalculateLocationOptions" },
              ],
            },
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

    editLink: {
      pattern: "https://github.com/your-org/cesium-utils-lib/edit/main/docs/:path",
    },
  },
})
