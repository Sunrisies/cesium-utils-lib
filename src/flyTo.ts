import { Cartesian3, Rectangle, Viewer, Math as CesiumMath } from "cesium"

/**
 * 相机飞行动画参数
 * @property heading - 偏航角（度），相机朝向，0 = 正北，默认 0
 * @property pitch - 俯仰角（度），-90 = 垂直俯视，默认 -90
 * @property roll - 翻滚角（度），默认 0
 * @property duration - 飞行时长（秒），不传则由 Cesium 自动计算
 */
export interface FlyToOptions {
  /** 偏航角（度），相机朝向，0 = 正北，默认 0 */
  heading?: number
  /** 俯仰角（度），-90 = 垂直俯视，默认 -90 */
  pitch?: number
  /** 翻滚角（度），默认 0 */
  roll?: number
  /** 飞行时长（秒），不传则由 Cesium 根据距离自动计算 */
  duration?: number
}

/**
 * 相机平滑飞至指定位置
 *
 * 封装 Cesium camera.flyTo，提供更友好的参数接口。
 * 默认朝向为正北俯视（鸟瞰视角），可通过 options 自定义朝向和时长。
 *
 * @param viewer - Cesium Viewer 实例
 * @param position - 目标位置，支持 Cartesian3（单个点）或 Rectangle（矩形范围）
 * @param options - 可选，飞行参数配置
 *
 * @example
 * // 简单飞至一个点
 * flyTo(viewer, Cesium.Cartesian3.fromDegrees(116.39, 39.91, 10000))
 *
 * @example
 * // 自定义朝向和时长
 * flyTo(viewer, position, { heading: 45, pitch: -30, duration: 3 })
 */
export const flyTo = (
  viewer: Viewer,
  position: Cartesian3 | Rectangle,
  options?: FlyToOptions
): void => {
  const { heading = 0, pitch = -90, roll = 0, duration } = options ?? {}
  viewer.camera.flyTo({
    destination: position,
    duration,
    orientation: {
      heading: CesiumMath.toRadians(heading),
      pitch: CesiumMath.toRadians(pitch),
      roll
    }
  })
}
