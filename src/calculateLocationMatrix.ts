import { Cartesian3, HeadingPitchRoll, Matrix4, Transforms } from "cesium"

/**
 * 位置矩阵计算参数
 * @property longitude - 经度（度）
 * @property latitude - 纬度（度）
 * @property heading - 偏航角（度），模型朝向，默认 0
 * @property pitch - 俯仰角（度），默认 0
 * @property roll - 翻滚角（度），默认 0
 * @property height - 海拔高度（米），默认 0
 */
export interface CalculateLocationOptions {
  /** 经度（度） */
  longitude: number
  /** 纬度（度） */
  latitude: number
  /** 偏航角（度），模型朝向，默认 0 */
  heading?: number
  /** 俯仰角（度），默认 0 */
  pitch?: number
  /** 翻滚角（度），默认 0 */
  roll?: number
  /** 海拔高度（米），默认 0 */
  height?: number
}

/**
 * 根据经纬度与朝向计算局部坐标变换矩阵
 *
 * 使用 Cesium.Transforms.headingPitchRollToFixedFrame 生成 4x4 变换矩阵，
 * 常用于将 glTF/glb 模型放置在地球表面的指定位置和方向。
 * 矩阵以 East-North-Up（ENU，东-北-天）局部坐标系为基准。
 *
 * 计算步骤：
 * 1. 根据经纬高确定地球表面的原点位置（Cartesian3）
 * 2. 将偏航/俯仰/翻滚转换为 HeadingPitchRoll 对象
 * 3. 生成从局部坐标系到全局（地心地固坐标系，ECEF）的变换矩阵
 *
 * ⚠️ 注意：此函数未进行地形采样，高度默认 0（地表）。
 *    如需贴合地形，可先调用 Cesium.sampleTerrain 获取地形高度后传入。
 *
 * @param options - 位置与朝向参数
 * @returns 4x4 变换矩阵（Matrix4），可直接赋给 model.modelMatrix
 *
 * @example
 * // 将一个 3D 模型放在北京天安门位置，朝东 45 度
 * const matrix = calculateLocationMatrix({
 *   longitude: 116.39,
 *   latitude: 39.91,
 *   heading: 45,
 *   height: 50
 * })
 * model.modelMatrix = matrix
 */
export const calculateLocationMatrix = ({
  longitude,
  latitude,
  heading = 0,
  pitch = 0,
  roll = 0,
  height = 0
}: CalculateLocationOptions): Matrix4 => {
  const origin = Cartesian3.fromDegrees(longitude, latitude, height)
  const hpr = HeadingPitchRoll.fromDegrees(heading, pitch, roll)
  return Transforms.headingPitchRollToFixedFrame(origin, hpr)
}
