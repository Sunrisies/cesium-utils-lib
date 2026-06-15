import { Cartesian3, Rectangle, Viewer, Math as CesiumMath } from "cesium"

/**
 * 相机跳转朝向参数
 * @property heading - 偏航角（度），0 = 正北，默认 0
 * @property pitch - 俯仰角（度），-90 = 垂直俯视，默认 -90
 * @property roll - 翻滚角（度），默认 0
 */
export interface SetViewOptions {
  /** 偏航角（度），0 = 正北，默认 0 */
  heading?: number
  /** 俯仰角（度），-90 = 垂直俯视，默认 -90 */
  pitch?: number
  /** 翻滚角（度），默认 0 */
  roll?: number
}

/**
 * 相机即时跳转至指定位置（无动画）
 *
 * 与 flyTo 不同，setView 没有过渡动画，相机瞬间切换到目标位置。
 * 适用于地图初始化、坐标复位等无需过渡的场景。
 *
 * @param viewer - Cesium Viewer 实例
 * @param position - 目标位置，支持 Cartesian3（单个点）或 Rectangle（矩形范围）
 * @param options - 可选，相机朝向参数，默认俯视
 *
 * @example
 * // 页面加载时跳转到默认位置
 * setView(viewer, Cesium.Cartesian3.fromDegrees(116.39, 39.91, 500000), { pitch: -60 })
 */
export const setView = (
  viewer: Viewer,
  position: Cartesian3 | Rectangle,
  options?: SetViewOptions
): void => {
  const { heading = 0, pitch = -90, roll = 0 } = options ?? {}
  viewer.camera.setView({
    destination: position,
    orientation: {
      heading: CesiumMath.toRadians(heading),
      pitch: CesiumMath.toRadians(pitch),
      roll
    }
  })
}
