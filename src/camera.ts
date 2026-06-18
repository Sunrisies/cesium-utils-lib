import { Viewer } from "cesium"

/**
 * 获取相机当前高度（米）
 *
 * 返回相机距离地表（椭球表面）的高度，单位为米。
 * 常用于判断当前缩放级别、切换显示层级等场景。
 *
 * @param viewer - Cesium Viewer 实例
 * @returns 相机高度（米）
 *
 * @example
 * // 获取当前相机高度
 * const height = getCameraHeight(viewer)
 * console.log(`当前相机高度: ${height} 米`)
 *
 * @example
 * // 根据高度切换显示级别
 * const h = getCameraHeight(viewer)
 * if (h > 100000) {
 *   showLowResLayer()
 * } else {
 *   showHighResLayer()
 * }
 */
export const getCameraHeight = (viewer: Viewer): number => {
  return viewer.camera.positionCartographic.height
}
