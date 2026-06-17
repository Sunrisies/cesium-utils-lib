---
title: 多点视野飞行
description: 根据一组坐标点自动计算包围盒中心与最佳高度，飞至所有点可见的视野
---

# 多点视野飞行

> 根据一组坐标点自动计算包围盒中心与最佳高度，飞至所有点可见的视野

```ts
function flyToPositions(
   viewer, 
   positions, 
   options?): void;
```

定义于： flyToPositions.ts:41

飞至一组坐标点的最佳视野

自动计算多个坐标点的包围盒中心和跨度的球面距离，
以包围盒中心为目标点，以跨度 ×5 为相机高度，
确保所有坐标点都在视野范围内。

算法步骤：
1. 提取所有坐标的经度/纬度并排序
2. 取经度平均值 + 纬度平均值 = 包围盒中心
3. 用 EllipsoidGeodesic 计算包围盒对角线的球面距离
4. 设置相机高度 = 球面距离 × 5，确保全部可见
5. 调用 flyTo 飞至该位置

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewer` | `Viewer` | Cesium Viewer 实例 |
| `positions` | `number`[][] | 经纬度坐标数组，每项格式为 [lng, lat] 或 [lng, lat, height] height 参数在此函数中忽略（高度自动计算） |
| `options?` | `FlyToOptions` | 可选，飞行动画参数 |

## 返回值

`void`

## 示例

```ts
// 同时查看北京、上海、广州三个城市
flyToPositions(viewer, [
  [116.39, 39.91],
  [121.47, 31.23],
  [113.26, 23.13]
])
```

```ts
// 3 秒内飞至所有标记点视野
flyToPositions(viewer, points, { duration: 3, pitch: -45 })
```
