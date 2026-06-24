import {
  Cartesian3,
  CallbackProperty,
  Color,
  ColorMaterialProperty,
  ConstantProperty,
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
  /** 最大不透明度 0~1，默认 0.8 */
  maxOpacity?: number
  /** 离地高度（米），默认 0 */
  height?: number
  /** 是否显示描边线，默认 false */
  showOutline?: boolean
}

/**
 * 创建扩散扫描圆环动画
 *
 * 以填充面从中心向外扩散的雷达波效果。
 * 圆面从圆心逐渐扩大至指定半径，同时透明度递减，到达后重置。
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
    maxOpacity = 0.8,
    height = 0,
    showOutline = false,
  } = options ?? {}

  const baseColor = typeof color === "string" ? Color.fromCssColorString(color) : color.clone()
  const position = Cartesian3.fromDegrees(lng, lat, 0)
  const ringCount = interval > 0 ? Math.max(1, Math.floor(duration / interval)) : 1
  const startTime = viewer.clock.currentTime
  viewer.clock.shouldAnimate = true

  const entities: Entity[] = []

  for (let i = 0; i < ringCount; i++) {
    const phase = i * interval

    const ellipse = new EllipseGraphics() as any
    // 填充面：面积极小→极大，透明度 maxOpacity→0
    ellipse.semiMajorAxis = new CallbackProperty(() => {
      const t = getProgress(viewer, startTime, phase, duration)
      return t * radius + 0.1 // 最小 0.1m 避免零值
    }, false)
    ellipse.semiMinorAxis = new CallbackProperty(() => {
      const t = getProgress(viewer, startTime, phase, duration)
      return t * radius + 0.1
    }, false)
    ellipse.material = new ColorMaterialProperty(
      new CallbackProperty(() => {
        const t = getProgress(viewer, startTime, phase, duration)
        const opacity = Math.max(0, maxOpacity * (1 - t * t))
        return baseColor.withAlpha(baseColor.alpha * opacity)
      }, false)
    )

    // 可选描边（默认关闭）
    if (showOutline) {
      ellipse.outline = new ConstantProperty(true)
      ellipse.outlineColor = new CallbackProperty(() => {
        const t = getProgress(viewer, startTime, phase, duration)
        return baseColor.withAlpha(baseColor.alpha * Math.max(0, maxOpacity * (1 - t)))
      }, false)
      ellipse.outlineWidth = new ConstantProperty(2)
    }

    ellipse.height = new ConstantProperty(height)

    const entity = new Entity({ position, ellipse })
    viewer.entities.add(entity)
    entities.push(entity)
  }

  return entities
}

function getProgress(
  viewer: Viewer,
  startTime: JulianDate,
  phase: number,
  duration: number
): number {
  const now = viewer.clock.currentTime
  return ((JulianDate.secondsDifference(now, startTime) + phase) % duration) / duration
}
