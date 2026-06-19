import { Cartographic, EllipsoidGeodesic } from "cesium"

/**
 * 计算两点之间的球面距离（米）
 *
 * 使用 Cesium.EllipsoidGeodesic 计算大地线（测地线）表面距离，
 * 比简单的 Haversine 公式更精确，基于 WGS84 椭球模型。
 *
 * @param lng1 - 起点经度（度）
 * @param lat1 - 起点纬度（度）
 * @param lng2 - 终点经度（度）
 * @param lat2 - 终点纬度（度）
 * @returns 球面距离（米）
 *
 * @example
 * // 北京到上海的距离
 * const d = distance(116.39, 39.91, 121.47, 31.23)
 * console.log(`距离: ${(d / 1000).toFixed(1)} 公里`)
 */
export const distance = (
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number
): number => {
  const start = Cartographic.fromDegrees(lng1, lat1)
  const end = Cartographic.fromDegrees(lng2, lat2)

  const geodesic = new EllipsoidGeodesic()
  geodesic.setEndPoints(start, end)
  return geodesic.surfaceDistance
}
