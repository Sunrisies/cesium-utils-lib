# cesium-utils-lib

Cesium 地理工具函数库 — 轻量级 TypeScript 工具集，基于 [CesiumJS](https://cesium.com/platform/cesiumjs/) 封装常用地理空间操作。

## 安装

```bash
npm install cesium-utils-lib
# or
pnpm add cesium-utils-lib
```

> **peer dependency:** `cesium ^1.100.0`，项目需自行安装 Cesium。

## 使用

```ts
import { Viewer } from "cesium"
import { getLonLat, flyTo } from "cesium-utils-lib"

const viewer = new Viewer("cesiumContainer")

// 鼠标点击获取经纬度
viewer.screenSpaceEventHandler.setInputAction((event) => {
  const pos = getLonLat(viewer, event.position)
  if (pos) {
    console.log(`经度: ${pos.Lon}, 纬度: ${pos.Lat}, 高度: ${pos.Height}`)
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)

// 飞至某位置
flyTo(viewer, Cesium.Cartesian3.fromDegrees(116.39, 39.91, 10000))
```

## API

### 坐标转换

#### `getLonLat(viewer, position)`

将屏幕像素坐标拾取到三维点并转换为经纬度（带高度）。

| 参数 | 类型 | 说明 |
|------|------|------|
| `viewer` | `Cesium.Viewer` | Cesium 3D 场景实例 |
| `position` | `Cesium.Cartesian2` | 屏幕像素坐标 |

**返回:** `LonLat | null` — 拾取失败时返回 `null`，避免 `(0,0)` 误导。

#### `getLonLatByCartesian(cartesian)`

将 `Cartesian3` 三维坐标直接转换为经纬度。

| 参数 | 类型 | 说明 |
|------|------|------|
| `cartesian` | `Cesium.Cartesian3` | 三维笛卡尔坐标 |

**返回:** `LonLat`

```ts
interface LonLat {
  Lon: number     // 经度（度）
  Lat: number     // 纬度（度）
  Height?: number // 高度（米）
}
```

### 相机控制

#### `flyTo(viewer, position, options?)`

相机平滑飞至指定位置（返回 Promise，可 await）。

| 参数 | 类型 | 说明 |
|------|------|------|
| `viewer` | `Cesium.Viewer` | |
| `position` | `Cartesian3 \| Rectangle` | 目标位置 |
| `options` | `FlyToOptions?` | 可选：heading / pitch / roll / duration |

```ts
interface FlyToOptions {
  heading?: number  // 默认 0
  pitch?: number    // 默认 -90（俯视）
  roll?: number     // 默认 0
  duration?: number // 飞行时长（秒）
}
```

#### `setView(viewer, position, options?)`

相机即时跳转至指定位置（无动画）。

#### `flyToPositions(viewer, positions, options?)`

自动计算一组坐标点的包围盒中心与最佳高度，然后飞至该视野。

| 参数 | 类型 | 说明 |
|------|------|------|
| `positions` | `number[][]` | 坐标数组，每项 `[lng, lat, height?]` |

### 变换矩阵

#### `calculateLocationMatrix(options)`

根据经纬度与朝向计算 `Matrix4` 局部坐标变换矩阵，常用于将模型放置在地球表面。

```ts
interface CalculateLocationOptions {
  longitude: number
  latitude: number
  heading?: number  // 默认 0
  pitch?: number    // 默认 0
  roll?: number     // 默认 0
  height?: number   // 默认 0
}
```

**注意:** 你的示例中此函数声明为 `async` 但内部无 `await`，重构后去掉了多余的 `async`。若后续需要地形采样获取高度，再改回 `async` 即可。

## 构建

```bash
pnpm build     # 输出 ESM + CJS 双格式到 dist/
pnpm dev       # 监听模式构建
```

输出产物：

- `dist/index.js` — ES Module
- `dist/index.cjs` — CommonJS
- `dist/index.d.ts` — 类型声明

## 技术栈

- **TypeScript** 5 — 完全类型化
- **tsup** — 基于 esbuild 的高速打包
- **Cesium** ^1.100.0 — peer dependency

## 结构

```
src/
  index.ts                      # 统一导出入口
  lonlat.ts                     # 经纬度转换（getLonLat / getLonLatByCartesian）
  flyTo.ts                      # 平滑飞行动画
  setView.ts                    # 即时跳转相机
  calculateLocationMatrix.ts    # 变换矩阵计算
  flyToPositions.ts             # 多点包围盒飞行
```

## License

MIT
