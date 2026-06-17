---
title: 相机跳转
description: 相机即时跳转至指定位置，无过渡动画，适用于地图初始化和坐标复位
---

# 相机跳转

> 相机即时跳转至指定位置，无过渡动画，适用于地图初始化和坐标复位

定义于： setView.ts:9

相机跳转朝向参数

## 属性

### heading?

```ts
optional heading?: number;
```

定义于： setView.ts:11

偏航角（度），0 = 正北，默认 0

***

### pitch?

```ts
optional pitch?: number;
```

定义于： setView.ts:13

俯仰角（度），-90 = 垂直俯视，默认 -90

***

### roll?

```ts
optional roll?: number;
```

定义于： setView.ts:15

翻滚角（度），默认 0
```ts
function setView(
   viewer, 
   position, 
   options?): void;
```

定义于： setView.ts:32

相机即时跳转至指定位置（无动画）

与 flyTo 不同，setView 没有过渡动画，相机瞬间切换到目标位置。
适用于地图初始化、坐标复位等无需过渡的场景。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewer` | `Viewer` | Cesium Viewer 实例 |
| `position` | `Cartesian3` \| `Rectangle` | 目标位置，支持 Cartesian3（单个点）或 Rectangle（矩形范围） |
| `options?` | `SetViewOptions` | 可选，相机朝向参数，默认俯视 |

## 返回值

`void`

## 示例

```ts
// 页面加载时跳转到默认位置
setView(viewer, Cesium.Cartesian3.fromDegrees(116.39, 39.91, 500000), { pitch: -60 })
```
