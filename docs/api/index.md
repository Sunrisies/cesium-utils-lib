# API 参考

## 坐标转换

### `LonLat`

经纬度坐标接口。

```ts
interface LonLat {
  /** 经度（度），范围 -180 ~ 180 */
  Lon: number
  /** 纬度（度），范围 -90 ~ 90 */
  Lat: number
  /** 海拔高度（米），部分场景可能不提供 */
  Height?: number
}
```

---

### `getLonLat(viewer, position)`

从屏幕像素坐标拾取三维位置并返回经纬度。

内部调用 `viewer.scene.pickPosition` 进行三维拾取，
适用于鼠标点击、触摸等交互事件将屏幕坐标转换为地理坐标。

**参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `viewer` | `Cesium.Viewer` | Cesium Viewer 实例 |
| `position` | `Cesium.Cartesian2` | 屏幕像素坐标 |

**返回：** `LonLat | null`

::: warning 拾取限制
- 场景中必须有可拾取的 3D Tiles 或地形，否则返回 `null`
- 点击天空或空白区域会返回 `null`，调用方应做空值判断
- 性能敏感场景避免高频调用，`pickPosition` 需走 GPU 拾取
:::

**示例：**

```ts
handler.setInputAction((event) => {
  const pos = getLonLat(viewer, event.position)
  if (pos) {
    console.log(`经度: ${pos.Lon}, 纬度: ${pos.Lat}`)
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
```

---

### `getLonLatByCartesian(cartesian)`

将 `Cartesian3` 笛卡尔坐标直接转换为 `LonLat` 经纬度。

与 `getLonLat` 不同，此函数直接从已知的 `Cartesian3` 转换，
不涉及场景拾取，适用于已有三维坐标的场景。

**参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `cartesian` | `Cesium.Cartesian3` | 三维笛卡尔坐标（地心地固坐标系） |

**返回：** `LonLat`

**示例：**

```ts
const entity = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(116, 39)
})
const pos = getLonLatByCartesian(
  entity.position.getValue(clock.currentTime)
)
console.log(`实体位置: ${pos.Lon}, ${pos.Lat}`)
```

---

## 相机控制

### `FlyToOptions`

相机飞行动画参数。

```ts
interface FlyToOptions {
  /** 偏航角（度），0 = 正北，默认 0 */
  heading?: number
  /** 俯仰角（度），-90 = 垂直俯视，默认 -90 */
  pitch?: number
  /** 翻滚角（度），默认 0 */
  roll?: number
  /** 飞行时长（秒），不传则由 Cesium 根据距离自动计算 */
  duration?: number
}
```

### `SetViewOptions`

```ts
interface SetViewOptions {
  /** 偏航角（度），0 = 正北，默认 0 */
  heading?: number
  /** 俯仰角（度），-90 = 垂直俯视，默认 -90 */
  pitch?: number
  /** 翻滚角（度），默认 0 */
  roll?: number
}
```

---

### `flyTo(viewer, position, options?)`

相机平滑飞至指定位置。

封装 Cesium `camera.flyTo`，提供更友好的参数接口。
默认朝向为正北俯视（鸟瞰视角）。

**参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `viewer` | `Cesium.Viewer` | Cesium Viewer 实例 |
| `position` | `Cartesian3 \| Rectangle` | 目标位置 |
| `options` | `FlyToOptions?` | 可选，飞行参数配置 |

**示例：**

```ts
// 简单飞至一个点
flyTo(viewer, Cesium.Cartesian3.fromDegrees(116.39, 39.91, 10000))

// 自定义朝向和时长
flyTo(viewer, position, { heading: 45, pitch: -30, duration: 3 })
```

---

### `setView(viewer, position, options?)`

相机即时跳转至指定位置（无动画）。

与 `flyTo` 不同，`setView` 没有过渡动画，相机瞬间切换到目标位置。
适用于地图初始化、坐标复位等无需过渡的场景。

**参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `viewer` | `Cesium.Viewer` | Cesium Viewer 实例 |
| `position` | `Cartesian3 \| Rectangle` | 目标位置 |
| `options` | `SetViewOptions?` | 可选，相机朝向参数 |

**示例：**

```ts
// 页面加载时跳转到默认位置
setView(
  viewer,
  Cesium.Cartesian3.fromDegrees(116.39, 39.91, 500000),
  { pitch: -60 }
)
```

---

### `flyToPositions(viewer, positions, options?)`

飞至一组坐标点的最佳视野。

自动计算多个坐标点的包围盒中心和跨度的球面距离，
以包围盒中心为目标点，以跨度 ×5 为相机高度，
确保所有坐标点都在视野范围内。

**算法步骤：**

1. 提取所有坐标的经度/纬度并排序
2. 取经度平均值 + 纬度平均值 = 包围盒中心
3. 用 `EllipsoidGeodesic` 计算包围盒对角线的球面距离
4. 设置相机高度 = 球面距离 × 5，确保全部可见
5. 调用 `flyTo` 飞至该位置

**参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `viewer` | `Cesium.Viewer` | Cesium Viewer 实例 |
| `positions` | `number[][]` | 经纬度坐标数组，每项 `[lng, lat]` 或 `[lng, lat, height]`<br>height 参数在此忽略（高度自动计算） |
| `options` | `FlyToOptions?` | 可选，飞行动画参数 |

**示例：**

```ts
// 同时查看北京、上海、广州
flyToPositions(viewer, [
  [116.39, 39.91],
  [121.47, 31.23],
  [113.26, 23.13]
])

// 3 秒内飞至所有标记点视野
flyToPositions(viewer, points, { duration: 3, pitch: -45 })
```

---

## 变换矩阵

### `CalculateLocationOptions`

```ts
interface CalculateLocationOptions {
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
```

---

### `calculateLocationMatrix(options)`

根据经纬度与朝向计算局部坐标变换矩阵。

使用 `Cesium.Transforms.headingPitchRollToFixedFrame` 生成 4×4 变换矩阵，
常用于将 glTF/glb 模型放置在地球表面的指定位置和方向。
矩阵以 **East-North-Up（ENU，东-北-天）** 局部坐标系为基准。

**参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `options` | `CalculateLocationOptions` | 位置与朝向参数 |

**返回：** `Matrix4` — 可直接赋给 `model.modelMatrix`

::: warning 地形贴合
此函数未进行地形采样，高度默认 0（地表）。
如需贴合地形，可先调用 `Cesium.sampleTerrain` 获取地形高度后传入。
:::

**示例：**

```ts
// 将 3D 模型放在北京天安门位置，朝东 45 度
const matrix = calculateLocationMatrix({
  longitude: 116.39,
  latitude: 39.91,
  heading: 45,
  height: 50
})
model.modelMatrix = matrix
```
