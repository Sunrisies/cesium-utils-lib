/**
 * cesium-utils-lib 入口
 *
 * 统一导出所有工具函数与类型，外部使用时：
 * ```ts
 * import { getLonLat, flyTo } from "cesium-utils-lib"
 * ```
 */

// ===== 经纬度转换 =====
export { getLonLat, getLonLatByCartesian } from "./lonlat"
export type { LonLat } from "./lonlat"

// ===== 相机控制 =====
export { flyTo } from "./flyTo"
export type { FlyToOptions } from "./flyTo"
export { setView } from "./setView"
export type { SetViewOptions } from "./setView"
export { flyToPositions } from "./flyToPositions"

// ===== 变换矩阵 =====
export { calculateLocationMatrix } from "./calculateLocationMatrix"
export type { CalculateLocationOptions } from "./calculateLocationMatrix"

// ===== Billboard / Label =====
export { createPinImage, createBillboardEntity, createLabelEntity } from "./billboard"
export type {
  CreatePinImageOptions,
  CreateBillboardOptions,
  CreateLabelOptions,
} from "./billboard"

// ===== 相机查询 =====
export { getCameraHeight, cartesianToScreen } from "./camera"

// ===== 距离测量 =====
export { distance, midpoint } from "./measure"

// ===== 场景交互 =====
export { screenshot } from "./screenshot"

