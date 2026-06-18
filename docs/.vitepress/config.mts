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
            {
              text: "函数",
              base: "/api/functions/",
              collapsed: false,
              items: [
                { text: "calculateLocationMatrix", link: "calculateLocationMatrix" },
                { text: "createBillboardEntity", link: "createBillboardEntity" },
                { text: "createLabelEntity", link: "createLabelEntity" },
                { text: "createPinImage", link: "createPinImage" },
                { text: "flyTo", link: "flyTo" },
                { text: "flyToPositions", link: "flyToPositions" },
                { text: "getLonLat", link: "getLonLat" },
                { text: "getLonLatByCartesian", link: "getLonLatByCartesian" },
                { text: "setView", link: "setView" },
              ],
            },
            {
              text: "接口",
              base: "/api/interfaces/",
              collapsed: false,
              items: [
                { text: "CalculateLocationOptions", link: "CalculateLocationOptions" },
                { text: "CreateBillboardOptions", link: "CreateBillboardOptions" },
                { text: "CreateLabelOptions", link: "CreateLabelOptions" },
                { text: "CreatePinImageOptions", link: "CreatePinImageOptions" },
                { text: "FlyToOptions", link: "FlyToOptions" },
                { text: "LonLat", link: "LonLat" },
                { text: "SetViewOptions", link: "SetViewOptions" },
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
  },
})
