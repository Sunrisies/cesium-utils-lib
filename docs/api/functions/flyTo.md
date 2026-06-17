# Function: flyTo()

```ts
function flyTo(
   viewer, 
   position, 
   options?): void;
```

定义于： flyTo.ts:39

相机平滑飞至指定位置

封装 Cesium camera.flyTo，提供更友好的参数接口。
默认朝向为正北俯视（鸟瞰视角），可通过 options 自定义朝向和时长。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewer` | `Viewer` | Cesium Viewer 实例 |
| `position` | `Cartesian3` \| `Rectangle` | 目标位置，支持 Cartesian3（单个点）或 Rectangle（矩形范围） |
| `options?` | [`FlyToOptions`](../interfaces/FlyToOptions.md) | 可选，飞行参数配置 |

## 返回值

`void`

## 示例

```ts
// 简单飞至一个点
flyTo(viewer, Cesium.Cartesian3.fromDegrees(116.39, 39.91, 10000))
```

```ts
// 自定义朝向和时长
flyTo(viewer, position, { heading: 45, pitch: -30, duration: 3 })
```
