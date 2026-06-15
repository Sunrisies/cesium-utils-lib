# 快速开始

## 安装

```bash
npm install cesium-utils-lib
# or
pnpm add cesium-utils-lib
# or
bun add cesium-utils-lib
```

::: warning peer dependency
项目中需自行安装 `cesium ^1.100.0`：
```bash
npm install cesium
```
:::

## 基本使用

### 鼠标点击获取经纬度

```ts
import { Viewer } from "cesium"
import { getLonLat } from "cesium-utils-lib"

const viewer = new Viewer("cesiumContainer")

viewer.screenSpaceEventHandler.setInputAction((event) => {
  const pos = getLonLat(viewer, event.position)
  if (pos) {
    console.log(`经度: ${pos.Lon}, 纬度: ${pos.Lat}, 高度: ${pos.Height}`)
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
```

### 飞至某个位置

```ts
import { flyTo } from "cesium-utils-lib"

// 简单飞行
flyTo(viewer, Cesium.Cartesian3.fromDegrees(116.39, 39.91, 10000))

// 自定义朝向和时长
flyTo(viewer, position, { heading: 45, pitch: -30, duration: 3 })
```

### 同时查看多个位置

```ts
import { flyToPositions } from "cesium-utils-lib"

// 自动计算最佳视野，查看北京、上海、广州
flyToPositions(viewer, [
  [116.39, 39.91],
  [121.47, 31.23],
  [113.26, 23.13]
])
```

### 放置 3D 模型

```ts
import { calculateLocationMatrix } from "cesium-utils-lib"

const matrix = calculateLocationMatrix({
  longitude: 116.39,
  latitude: 39.91,
  heading: 45,
  height: 50
})
model.modelMatrix = matrix
```

## 构建

```bash
bun run build     # 输出 ESM + CJS 到 dist/
bun run dev       # 监听模式
```

## API 速览

| 函数 | 说明 |
|------|------|
| `getLonLat` | 屏幕坐标拾取 → 经纬度 |
| `getLonLatByCartesian` | Cartesian3 → 经纬度 |
| `flyTo` | 平滑飞行动画 |
| `setView` | 即时跳转相机 |
| `flyToPositions` | 多点包围盒自动飞行 |
| `calculateLocationMatrix` | 经纬度+朝向 → Matrix4 |
