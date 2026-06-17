---
title: 相机飞行
description: 相机平滑飞至指定位置，支持自定义朝向和飞行时长
---

# 相机飞行

> 相机平滑飞至指定位置，支持自定义朝向和飞行时长

定义于： flyTo.ts:10

相机飞行动画参数

## 属性

### duration?

```ts
optional duration?: number;
```

定义于： flyTo.ts:18

飞行时长（秒），不传则由 Cesium 自动计算

***

### heading?

```ts
optional heading?: number;
```

定义于： flyTo.ts:12

偏航角（度），相机朝向，0 = 正北，默认 0

***

### pitch?

```ts
optional pitch?: number;
```

定义于： flyTo.ts:14

俯仰角（度），-90 = 垂直俯视，默认 -90

***

### roll?

```ts
optional roll?: number;
```

定义于： flyTo.ts:16

翻滚角（度），默认 0
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
| `options?` | `FlyToOptions` | 可选，飞行参数配置 |

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
