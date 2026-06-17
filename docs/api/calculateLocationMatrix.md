---
title: 位置矩阵
description: 根据经纬度与朝向计算局部坐标变换矩阵（Matrix4），用于将 3D 模型放置在地球表面
---

# 位置矩阵

> 根据经纬度与朝向计算局部坐标变换矩阵（Matrix4），用于将 3D 模型放置在地球表面

定义于： calculateLocationMatrix.ts:12

位置矩阵计算参数

## 属性

### heading?

```ts
optional heading?: number;
```

定义于： calculateLocationMatrix.ts:18

偏航角（度），模型朝向，默认 0

***

### height?

```ts
optional height?: number;
```

定义于： calculateLocationMatrix.ts:24

海拔高度（米），默认 0

***

### latitude

```ts
latitude: number;
```

定义于： calculateLocationMatrix.ts:16

纬度（度）

***

### longitude

```ts
longitude: number;
```

定义于： calculateLocationMatrix.ts:14

经度（度）

***

### pitch?

```ts
optional pitch?: number;
```

定义于： calculateLocationMatrix.ts:20

俯仰角（度），默认 0

***

### roll?

```ts
optional roll?: number;
```

定义于： calculateLocationMatrix.ts:22

翻滚角（度），默认 0
```ts
function calculateLocationMatrix(options): Matrix4;
```

定义于： calculateLocationMatrix.ts:55

根据经纬度与朝向计算局部坐标变换矩阵

使用 Cesium.Transforms.headingPitchRollToFixedFrame 生成 4x4 变换矩阵，
常用于将 glTF/glb 模型放置在地球表面的指定位置和方向。
矩阵以 East-North-Up（ENU，东-北-天）局部坐标系为基准。

计算步骤：
1. 根据经纬高确定地球表面的原点位置（Cartesian3）
2. 将偏航/俯仰/翻滚转换为 HeadingPitchRoll 对象
3. 生成从局部坐标系到全局（地心地固坐标系，ECEF）的变换矩阵

⚠️ 注意：此函数未进行地形采样，高度默认 0（地表）。
   如需贴合地形，可先调用 Cesium.sampleTerrain 获取地形高度后传入。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `CalculateLocationOptions` | 位置与朝向参数 |

## 返回值

`Matrix4`

4x4 变换矩阵（Matrix4），可直接赋给 model.modelMatrix

## 示例

```ts
// 将一个 3D 模型放在北京天安门位置，朝东 45 度
const matrix = calculateLocationMatrix({
  longitude: 116.39,
  latitude: 39.91,
  heading: 45,
  height: 50
})
model.modelMatrix = matrix
```
