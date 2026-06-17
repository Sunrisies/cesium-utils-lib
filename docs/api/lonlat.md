---
title: 坐标转换
description: 屏幕坐标拾取与 Cartesian3 转换，获取经纬度与海拔高度
---

# 坐标转换

> 屏幕坐标拾取与 Cartesian3 转换，获取经纬度与海拔高度

定义于： lonlat.ts:16

经纬度坐标接口

## 属性

### Height?

```ts
optional Height?: number;
```

定义于： lonlat.ts:22

可选，海拔高度（米）

***

### Lat

```ts
Lat: number;
```

定义于： lonlat.ts:20

纬度（度），范围 -90 ~ 90

***

### Lon

```ts
Lon: number;
```

定义于： lonlat.ts:18

经度（度），范围 -180 ~ 180
```ts
function getLonLat(viewer, position): LonLat | null;
```

定义于： lonlat.ts:63

从屏幕像素坐标拾取三维位置并返回经纬度

内部调用 viewer.scene.pickPosition 进行三维拾取，
适用于鼠标点击、触摸等交互事件将屏幕坐标转换为地理坐标。

⚠️ 拾取限制：
- 场景中必须有可拾取的 3D Tiles 或地形，否则返回 null
- 点击天空或空白区域会返回 null，调用方应做空值判断
- 性能敏感场景避免高频调用，pickPosition 需走 GPU 拾取

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewer` | `Viewer` | Cesium Viewer 实例 |
| `position` | `Cartesian2` | 屏幕像素坐标（通常来自 ScreenSpaceEventHandler 回调） |

## 返回值

`LonLat` \| `null`

经纬度 + 高度；拾取失败返回 null（而非 { Lon: 0, Lat: 0 }）

## 示例

```ts
handler.setInputAction((event) => {
  const pos = getLonLat(viewer, event.position)
  if (pos) {
    console.log(`经度: ${pos.Lon}, 纬度: ${pos.Lat}`)
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
```

```ts
function getLonLatByCartesian(cartesian): LonLat;
```

定义于： lonlat.ts:86

将 Cartesian3 笛卡尔坐标直接转换为 LonLat 经纬度

与 getLonLat 不同，此函数直接从已知的 Cartesian3 转换，
不涉及场景拾取，适用于已有三维坐标的场景（如实体位置、模型位置等）。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cartesian` | `Cartesian3` | Cesium 三维笛卡尔坐标（地心地固坐标系） |

## 返回值

`LonLat`

经纬度 + 高度，始终返回有效值

## 示例

```ts
const entity = viewer.entities.add({ position: Cesium.Cartesian3.fromDegrees(116, 39) })
const pos = getLonLatByCartesian(entity.position.getValue(clock.currentTime))
console.log(`实体位置: ${pos.Lon}, ${pos.Lat}`)
```
