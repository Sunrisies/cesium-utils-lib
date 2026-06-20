import { Cartesian3, Viewer } from "cesium"

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

/**
 * 将三维坐标转换为屏幕像素坐标
 *
 * 使用场景相机对 Cartesian3 进行投影变换，返回对应的屏幕像素位置。
 * 常用于在三维场景中的物体位置上叠加 HTML 弹窗、工具提示等 UI 元素。
 *
 * @param viewer - Cesium Viewer 实例
 * @param cartesian - 三维笛卡尔坐标
 * @returns 屏幕像素坐标 `{ x, y }`；若点在相机后方或不可见则返回 null
 *
 * @example
 * // 在实体位置上叠加自定义 DOM
 * const pos = cartesianToScreen(viewer, entity.position.getValue(time))
 * if (pos) {
 *   tooltip.style.left = pos.x + "px"
 *   tooltip.style.top  = pos.y + "px"
 * }
 */
export const cartesianToScreen = (
  viewer: Viewer,
  cartesian: Cartesian3
): { x: number; y: number } | null => {
  // cartesianToCanvasCoordinates 返回 Cartesian2 | undefined
  const result = viewer.scene.cartesianToCanvasCoordinates(cartesian)
  if (!result) return null
  return { x: result.x, y: result.y }
}
