import { Viewer } from "cesium"

/**
 * 截取当前 Cesium 场景为图片
 *
 * 支持高清截取（retina 缩放）和自动下载。
 * 截取前会强制渲染一帧确保最新画面。
 *
 * @param viewer - Cesium Viewer 实例
 * @param options - 截取配置
 * @param options.download - 是否自动下载，默认 false
 * @param options.filename - 下载文件名（不含扩展名），默认 "screenshot"
 * @param options.scale - 分辨率倍率，2 = 2x 高清，默认 1
 * @param options.format - 图片格式，默认 "png"
 * @param options.quality - 图片质量（jpeg 时有效，0~1），默认 0.92
 * @returns 图片 base64 DataURL
 *
 * @example
 * // 截取当前视图并下载
 * screenshot(viewer, { download: true })
 *
 * @example
 * // 2x 高清截取
 * const dataUrl = screenshot(viewer, { scale: 2 })
 * // 自行处理 dataUrl...
 *
 * @example
 * // 自定义文件名和格式
 * screenshot(viewer, { download: true, filename: "map", format: "jpeg", quality: 0.95 })
 */
export const screenshot = (
  viewer: Viewer,
  options?: {
    download?: boolean
    filename?: string
    scale?: number
    format?: "png" | "jpeg"
    quality?: number
  }
): string => {
  const { download: shouldDownload = false, filename = "screenshot", scale = 1, format = "png", quality = 0.92 } =
    options ?? {}

  const canvas = viewer.canvas
  const width = canvas.width
  const height = canvas.height

  // 高清截取：临时放大 canvas，渲染后恢复
  if (scale !== 1) {
    canvas.width = width * scale
    canvas.height = height * scale
    viewer.resize()
  }

  // 强制渲染一帧，确保画面完整
  viewer.render()

  // 生成图片
  const mimeType = format === "jpeg" ? "image/jpeg" : "image/png"
  const dataUrl = canvas.toDataURL(mimeType, quality)

  // 恢复原始尺寸
  if (scale !== 1) {
    canvas.width = width
    canvas.height = height
    viewer.resize()
  }

  // 自动下载
  if (shouldDownload) {
    const link = document.createElement("a")
    link.download = `${filename}.${format === "jpeg" ? "jpg" : "png"}`
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return dataUrl
}
