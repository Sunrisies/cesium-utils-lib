import {
  Cartesian3,
  CallbackProperty,
  Color,
  EllipseGraphics,
  Entity,
  JulianDate,
  Viewer,
} from "cesium"

export interface ScanCircleOptions {
  /** 圆环颜色，默认 '#00FFAA' */
  color?: string | Color
  /** 最大半径（米），默认 1000 */
  radius?: number
  /** 单次扩散周期（秒），默认 3 */
  duration?: number
  /** 多环间隔（秒），0 为单环，默认 1.5 */
  interval?: number
  /** 最大不透明度 0~1，默认 0.6 */
  maxOpacity?: number
  /** 离地高度（米），默认 0 */
  height?: number
  /** 描边宽度，默认 2 */
  lineWidth?: number
}

/**
 * 创建扩散扫描圆环动画
 *
 * 生成从中心向外扩散的半透明圆环动画。
 * 环从圆心逐渐扩大至指定半径，同时透明度递减，到达后重置。
 * 设置 interval > 0 可产生多环交替扩散的连续效果。
 *
 * @param viewer - Cesium Viewer 实例
 * @param lng - 中心经度（度）
 * @param lat - 中心纬度（度）
 * @param options - 可选参数
 * @returns 创建的 Entity 数组（可后续移除）
 *
 * @example
 * createScanCircle(viewer, 116.39, 39.91)
 *
 * @example
 * createScanCircle(viewer, 116.39, 39.91, {
 *   color: '#FF4444',
 *   radius: 2000,
 *   duration: 4,
 *   interval: 1.5,
 *   maxOpacity: 0.5
 * })
 */
export const createScanCircle = (
  viewer: Viewer,
  lng: number,
  lat: number,
  options?: ScanCircleOptions
): Entity[] => {
  const {
    color = "#00FFAA",
    radius = 1000,
    duration = 3,
    interval = 1.5,
    maxOpacity = 0.6,
    height = 0,
    lineWidth = 2,
  } = options ?? {}

  const baseColor = typeof color === "string" ? Color.fromCssColorString(color) : color.clone()
  const position = Cartesian3.fromDegrees(lng, lat, height)
  const ringCount = interval > 0 ? Math.max(1, Math.floor(duration / interval)) : 1
  const startTime = viewer.clock.currentTime

  const createRadius = (phase: number) =>
    new CallbackProperty(() => {
      const now = viewer.clock.currentTime
      const t = ((JulianDate.secondsDifference(now, startTime) + phase) % duration) / duration
      return t * radius
    }, false)

  const createColorProp = (phase: number) =>
    new CallbackProperty(() => {
      const now = viewer.clock.currentTime
      const t = ((JulianDate.secondsDifference(now, startTime) + phase) % duration) / duration
      return baseColor.withAlpha(baseColor.alpha * Math.max(0, maxOpacity * (1 - t * t)))
    }, false)

  const entities: Entity[] = []

  for (let i = 0; i < ringCount; i++) {
    const p = i * interval
    const ellipse = new EllipseGraphics() as any
    ellipse.semiMajorAxis = createRadius(p)
    ellipse.semiMinorAxis = createRadius(p)
    ellipse.color = createColorProp(p)
    ellipse.outline = true
    ellipse.outlineColor = createColorProp(p)
    ellipse.outlineWidth = lineWidth
    ellipse.height = height

    const entity = new Entity({ position, ellipse })
    viewer.entities.add(entity)
    entities.push(entity)
  }

  return entities
}
