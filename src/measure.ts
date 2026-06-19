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

/**
 * 计算两点之间的中点坐标
 *
 * 沿 WGS84 椭球面的大地线取中点，比简单的经纬度平均更精确。
 *
 * @param lng1 - 起点经度（度）
 * @param lat1 - 起点纬度（度）
 * @param lng2 - 终点经度（度）
 * @param lat2 - 终点纬度（度）
 * @returns 中点经纬度 `{ lng, lat }`
 *
 * @example
 * // 北京到上海的中点
 * const mid = midpoint(116.39, 39.91, 121.47, 31.23)
 * console.log(`中点: ${mid.lng}, ${mid.lat}`)
 */
export const midpoint = (
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number
): { lng: number; lat: number } => {
  const start = Cartographic.fromDegrees(lng1, lat1)
  const end = Cartographic.fromDegrees(lng2, lat2)

  const geodesic = new EllipsoidGeodesic()
  geodesic.setEndPoints(start, end)

  const result = geodesic.interpolateUsingSurfaceDistance(
    geodesic.surfaceDistance / 2
  )

  return {
    lng: (result.longitude * 180) / Math.PI,
    lat: (result.latitude * 180) / Math.PI,
  }
}
