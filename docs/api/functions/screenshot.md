# Function: screenshot()

```ts
function screenshot(viewer, options?): string;
```

定义于： screenshot.ts:31

截取当前 Cesium 场景为图片

支持高清截取（retina 缩放）和自动下载。
截取前会强制渲染一帧确保最新画面。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewer` | `Viewer` | Cesium Viewer 实例 |
| `options?` | \{ `download?`: `boolean`; `filename?`: `string`; `format?`: `"png"` \| `"jpeg"`; `quality?`: `number`; `scale?`: `number`; \} | 截取配置 |
| `options.download?` | `boolean` | 是否自动下载，默认 false |
| `options.filename?` | `string` | 下载文件名（不含扩展名），默认 "screenshot" |
| `options.format?` | `"png"` \| `"jpeg"` | 图片格式，默认 "png" |
| `options.quality?` | `number` | 图片质量（jpeg 时有效，0~1），默认 0.92 |
| `options.scale?` | `number` | 分辨率倍率，2 = 2x 高清，默认 1 |

## 返回值

`string`

图片 base64 DataURL

## 示例

```ts
// 截取当前视图并下载
screenshot(viewer, { download: true })
```

```ts
// 2x 高清截取
const dataUrl = screenshot(viewer, { scale: 2 })
// 自行处理 dataUrl...
```

```ts
// 自定义文件名和格式
screenshot(viewer, { download: true, filename: "map", format: "jpeg", quality: 0.95 })
```
