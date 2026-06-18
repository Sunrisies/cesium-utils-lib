import {
  BillboardGraphics,
  Cartesian2,
  Cartesian3,
  Color,
  Entity,
  HeightReference,
  HorizontalOrigin,
  PinBuilder,
  VerticalOrigin,
} from "cesium"

const pinBuilder = new PinBuilder()

/**
 * Pin 标记图片参数
 * @property text - 标记上显示的文字
 * @property color - 颜色（CSS 颜色字符串或 Cesium.Color），默认 '#1296DB'
 * @property size - 图标尺寸，默认 38
 */
export interface CreatePinImageOptions {
  text: string | number
  color?: string | Color
  size?: number
}

/**
 * 生成 Cesium Pin 标记图片（base64 DataURL）
 *
 * 封装 PinBuilder.fromText，统一处理颜色转换和尺寸。
 * 常用于为每个实体生成带序号的彩色标记图标。
 *
 * @param options - 标记参数
 * @returns base64 DataURL，可直接赋给 billboard.image
 *
 * @example
 * const image = createPinImage({ text: 1, color: '#FF4444' })
 * entity.billboard = { image }
 */
export const createPinImage = ({
  text,
  color = "#1296DB",
  size = 38,
}: CreatePinImageOptions): string => {
  const cesiumColor = typeof color === "string" ? Color.fromCssColorString(color) : color
  return pinBuilder.fromText(text + "", cesiumColor!, size).toDataURL()
}

/**
 * Billboard Entity 创建参数
 * @property image - 图片 URL 或 base64 DataURL
 * @property pixelOffset - 像素偏移，默认 (0, -20)
 * @property scale - 缩放比例
 * @property heightReference - 高度参考系，默认 CLAMP_TO_GROUND
 * @property disableDepthTestDistance - 深度测试禁用距离，默认 Infinity
 * @property horizontalOrigin - 水平原点，默认 CENTER
 * @property verticalOrigin - 垂直原点
 * @property id - 实体 ID
 */
export interface CreateBillboardOptions {
  image: string
  pixelOffset?: Cartesian2
  scale?: number
  heightReference?: HeightReference
  disableDepthTestDistance?: number
  horizontalOrigin?: HorizontalOrigin
  verticalOrigin?: VerticalOrigin
  id?: string
}

/**
 * 创建一个 Billboard Entity
 *
 * 封装 Entity + billboard 的常用默认值，减少样板代码。
 * 常用于在地图上添加标记点、航点、兴趣点等。
 *
 * @param position - 三维位置（Cartesian3）
 * @param options - Billboard 参数
 * @param name - 实体名称（可选，用于标识）
 * @returns Cesium Entity
 *
 * @example
 * const entity = createBillboardEntity(
 *   Cartesian3.fromDegrees(116.39, 39.91),
 *   { image: createPinImage({ text: "A" }) }
 * )
 * viewer.entities.add(entity)
 */
export const createBillboardEntity = (
  position: Cartesian3,
  options: CreateBillboardOptions,
  name?: string
): Entity => {
  return new Entity({
    id: options.id,
    name,
    position,
    billboard: new BillboardGraphics({
      image: options.image,
      pixelOffset: options.pixelOffset ?? new Cartesian2(0, -20),
      scale: options.scale,
      heightReference: options.heightReference ?? HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance:
        options.disableDepthTestDistance ?? Number.POSITIVE_INFINITY,
      horizontalOrigin: options.horizontalOrigin ?? HorizontalOrigin.CENTER,
      verticalOrigin: options.verticalOrigin,
    }),
  })
}

/**
 * Label Entity 创建参数
 * @property font - 字体，默认 '20px sans-serif'
 * @property showBackground - 是否显示背景，默认 true
 * @property eyeOffset - 视差偏移
 * @property pixelOffset - 像素偏移
 * @property fillColor - 文字颜色
 * @property backgroundColor - 背景颜色
 */
export interface CreateLabelOptions {
  font?: string
  showBackground?: boolean
  eyeOffset?: Cartesian3
  pixelOffset?: Cartesian2
  fillColor?: Color
  backgroundColor?: Color
}

/**
 * 创建一个 Label Entity
 *
 * 封装 Entity + label 的常用默认值。
 * 常用于在地图上显示文字标注、距离数值等。
 *
 * @param position - 三维位置（Cartesian3）
 * @param text - 显示文本
 * @param options - Label 参数（可选）
 * @returns Cesium Entity
 *
 * @example
 * const label = createLabelEntity(
 *   Cartesian3.fromDegrees(116.39, 39.91),
 *   "北京",
 *   { font: "24px sans-serif", fillColor: Color.WHITE }
 * )
 * viewer.entities.add(label)
 */
export const createLabelEntity = (
  position: Cartesian3,
  text: string,
  options?: CreateLabelOptions
): Entity => {
  return new Entity({
    position,
    label: {
      text,
      font: options?.font ?? "20px sans-serif",
      showBackground: options?.showBackground ?? true,
      eyeOffset: options?.eyeOffset,
      pixelOffset: options?.pixelOffset,
      fillColor: options?.fillColor,
      backgroundColor: options?.backgroundColor,
    },
  })
}
