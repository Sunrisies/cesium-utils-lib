# Function: createScanCircle()

```ts
function createScanCircle(
   viewer, 
   lng, 
   lat, 
   options?): Entity[];
```

定义于： effects.ts:53

创建扩散扫描圆环动画

生成从中心向外扩散的半透明圆环动画。
环从圆心逐渐扩大至指定半径，同时透明度递减，到达后重置。
设置 interval > 0 可产生多环交替扩散的连续效果。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewer` | `Viewer` | Cesium Viewer 实例 |
| `lng` | `number` | 中心经度（度） |
| `lat` | `number` | 中心纬度（度） |
| `options?` | [`ScanCircleOptions`](../interfaces/ScanCircleOptions.md) | 可选参数 |

## 返回值

`Entity`[]

创建的 Entity 数组（可后续移除）

## 示例

```ts
createScanCircle(viewer, 116.39, 39.91)
```

```ts
createScanCircle(viewer, 116.39, 39.91, {
  color: '#FF4444',
  radius: 2000,
  duration: 4,
  interval: 1.5,
  maxOpacity: 0.5
})
```
