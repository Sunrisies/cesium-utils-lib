import { Viewer, Cartesian2, defined, Cartographic, Math as CesiumMath } from "cesium"

export interface LonLat {
  Lon: number
  Lat: number
}

export const getLonLat = (viewer: Viewer, position: Cartesian2): LonLat | null => {
  const cartesian = viewer.scene.pickPosition(position)
  if (defined(cartesian)) {
    const cartographic = Cartographic.fromCartesian(cartesian)
    const Lon = CesiumMath.toDegrees(cartographic.longitude)
    const Lat = CesiumMath.toDegrees(cartographic.latitude)
    return { Lon, Lat }
  }
  return null // 拾取失败返回 null，避免 0,0 误导
}
