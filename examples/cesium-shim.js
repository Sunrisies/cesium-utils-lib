/**
 * Cesium CDN 全局变量桥接文件
 *
 * 通过 CDN <script> 加载后，Cesium 作为 window.Cesium 全局变量存在。
 * 但库的 dist/index.js 使用 import { ... } from "cesium" 语句，
 * 此文件将全局 Cesium 对象映射为 ESM 具名导出，使 Vite 能正常解析。
 */
const Cesium = window.Cesium

export const {
  BillboardGraphics,
  CallbackProperty,
  Cartesian2,
  Cartesian3,
  Cartographic,
  Color,
  EllipseGraphics,
  EllipsoidGeodesic,
  Entity,
  HeadingPitchRoll,
  HeightReference,
  HorizontalOrigin,
  JulianDate,
  Matrix4,
  PinBuilder,
  Rectangle,
  Transforms,
  VerticalOrigin,
  Viewer,
  // 工具函数
  defined,
  Math,
  ScreenSpaceEventHandler,
  Terrain,
} = Cesium
