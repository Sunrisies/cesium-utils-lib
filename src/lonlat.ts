import {
  Cartesian2,
  Cartesian3,
  Cartographic,
  defined,
  Math as CesiumMath,
  Viewer
} from "cesium"

/**
 * 经纬度坐标接口
 * @property Lon - 经度（度），范围 -180 ~ 180
 * @property Lat - 纬度（度），范围 -90 ~ 90
 * @property Height - 可选，海拔高度（米）
 */
export interface LonLat {
  /** 经度（度） */
  Lon: number
  /** 纬度（度） */
  Lat: number
  /** 海拔高度（米），部分场景可能不提供 */
  Height?: number
}

/**
 * 将 Cartographic 弧度坐标统一转换为 LonLat 度坐标
 *
 * Cesium 内部经纬度以弧度（radian）存储，日常使用以度（degree）更直观。
 * 此函数作为内部辅助，统一转换逻辑避免重复代码。
 *
 * @param cartographic - Cesium 弧度制经纬度对象
 * @returns 转换后的 LonLat 度坐标（含高度）
 */
const fromCartographic = (cartographic: Cartographic): LonLat => ({
  Lon: CesiumMath.toDegrees(cartographic.longitude),
  Lat: CesiumMath.toDegrees(cartographic.latitude),
  Height: cartographic.height
})

/**
 * 从屏幕像素坐标拾取三维位置并返回经纬度
 *
 * 内部调用 viewer.scene.pickPosition 进行三维拾取，
 * 适用于鼠标点击、触摸等交互事件将屏幕坐标转换为地理坐标。
 *
 * ⚠️ 拾取限制：
 * - 场景中必须有可拾取的 3D Tiles 或地形，否则返回 null
 * - 点击天空或空白区域会返回 null，调用方应做空值判断
 * - 性能敏感场景避免高频调用，pickPosition 需走 GPU 拾取
 *
 * @param viewer - Cesium Viewer 实例
 * @param position - 屏幕像素坐标（通常来自 ScreenSpaceEventHandler 回调）
 * @returns 经纬度 + 高度；拾取失败返回 null（而非 { Lon: 0, Lat: 0 }）
 *
 * @example
 * handler.setInputAction((event) => {
 *   const pos = getLonLat(viewer, event.position)
 *   if (pos) {
 *     console.log(`经度: ${pos.Lon}, 纬度: ${pos.Lat}`)
 *   }
 * }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
 */
export const getLonLat = (viewer: Viewer, position: Cartesian2): LonLat | null => {
  const cartesian = viewer.scene.pickPosition(position)
  if (defined(cartesian)) {
    const cartographic = Cartographic.fromCartesian(cartesian)
    return fromCartographic(cartographic)
  }
  return null
}

/**
 * 将 Cartesian3 笛卡尔坐标直接转换为 LonLat 经纬度
 *
 * 与 getLonLat 不同，此函数直接从已知的 Cartesian3 转换，
 * 不涉及场景拾取，适用于已有三维坐标的场景（如实体位置、模型位置等）。
 *
 * @param cartesian - Cesium 三维笛卡尔坐标（地心地固坐标系）
 * @returns 经纬度 + 高度，始终返回有效值
 *
 * @example
 * const entity = viewer.entities.add({ position: Cesium.Cartesian3.fromDegrees(116, 39) })
 * const pos = getLonLatByCartesian(entity.position.getValue(clock.currentTime))
 * console.log(`实体位置: ${pos.Lon}, ${pos.Lat}`)
 */
export const getLonLatByCartesian = (cartesian: Cartesian3): LonLat => {
  const cartographic = Cartographic.fromCartesian(cartesian)
  return fromCartographic(cartographic)
}
