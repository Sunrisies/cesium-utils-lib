import { Rectangle, Viewer } from "cesium"
import { flyTo, FlyToOptions } from "./flyTo"

/**
 * 飞至一组坐标点的最佳视野
 *
 * 计算所有坐标点的包围矩形（west, south, east, north），
 * 使用 Cesium.Rectangle 让 camera.flyTo 自动计算最佳相机位置。
 *
 * @param viewer - Cesium Viewer 实例
 * @param positions - 经纬度坐标数组，每项格式为 [lng, lat]
 * @param options - 可选，飞行动画参数
 *
 * @example
 * flyToPositions(viewer, [
 *   [116.39, 39.91],
 *   [121.47, 31.23],
 * ])
 */
export const flyToPositions = (
  viewer: Viewer,
  positions: number[][],
  options?: FlyToOptions
): void => {
  let west = 180
  let south = 90
  let east = -180
  let north = -90

  for (const pos of positions) {
    const [lng, lat] = pos
    if (lng < west) west = lng
    if (lng > east) east = lng
    if (lat < south) south = lat
    if (lat > north) north = lat
  }

  const rectangle = Rectangle.fromDegrees(west, south, east, north)
  flyTo(viewer, rectangle, options)
}
