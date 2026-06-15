import {
  Cartesian3,
  Cartographic,
  EllipsoidGeodesic,
  Math as CesiumMath,
  Viewer
} from "cesium"
import { flyTo, FlyToOptions } from "./flyTo"

/**
 * 飞至一组坐标点的最佳视野
 *
 * 自动计算多个坐标点的包围盒中心和跨度的球面距离，
 * 以包围盒中心为目标点，以跨度 ×5 为相机高度，
 * 确保所有坐标点都在视野范围内。
 *
 * 算法步骤：
 * 1. 提取所有坐标的经度/纬度并排序
 * 2. 取经度平均值 + 纬度平均值 = 包围盒中心
 * 3. 用 EllipsoidGeodesic 计算包围盒对角线的球面距离
 * 4. 设置相机高度 = 球面距离 × 5，确保全部可见
 * 5. 调用 flyTo 飞至该位置
 *
 * @param viewer - Cesium Viewer 实例
 * @param positions - 经纬度坐标数组，每项格式为 [lng, lat] 或 [lng, lat, height]
 *                     height 参数在此函数中忽略（高度自动计算）
 * @param options - 可选，飞行动画参数
 *
 * @example
 * // 同时查看北京、上海、广州三个城市
 * flyToPositions(viewer, [
 *   [116.39, 39.91],
 *   [121.47, 31.23],
 *   [113.26, 23.13]
 * ])
 *
 * @example
 * // 3 秒内飞至所有标记点视野
 * flyToPositions(viewer, points, { duration: 3, pitch: -45 })
 */
export const flyToPositions = (
  viewer: Viewer,
  positions: number[][],
  options?: FlyToOptions
): void => {
  // --- 步骤 1：提取所有经度/纬度 ---
  const lats: number[] = []
  const lngs: number[] = []

  for (const pos of positions) {
    const [lng, lat] = pos
    lats.push(lat)
    lngs.push(lng)
  }

  // --- 步骤 2：排序并计算包围盒中心 ---
  lats.sort((a, b) => a - b)
  lngs.sort((a, b) => a - b)

  const centerLat = (lats[0] + lats[lats.length - 1]) / 2
  const centerLng = (lngs[0] + lngs[lngs.length - 1]) / 2

  // --- 步骤 3：计算对角线球面距离 ---
  const start = Cartographic.fromDegrees(centerLng, centerLat)
  const end = Cartographic.fromDegrees(lngs[0], lats[0])

  const geodesic = new EllipsoidGeodesic()
  geodesic.setEndPoints(start, end)
  const groundDistance = geodesic.surfaceDistance

  // 高度 = 球面距离 × 5，保证所有点完整可见
  const cameraHeight = groundDistance * 5

  // --- 步骤 4：飞至目标位置 ---
  const position = Cartesian3.fromDegrees(centerLng, centerLat, cameraHeight)
  flyTo(viewer, position, options)
}
