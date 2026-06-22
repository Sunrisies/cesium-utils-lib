# Function: distance()

```ts
function distance(
   lng1, 
   lat1, 
   lng2, 
   lat2): number;
```

定义于： measure.ts:20

计算两点之间的球面距离（米）

使用 Cesium.EllipsoidGeodesic 计算大地线（测地线）表面距离，
比简单的 Haversine 公式更精确，基于 WGS84 椭球模型。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `lng1` | `number` | 起点经度（度） |
| `lat1` | `number` | 起点纬度（度） |
| `lng2` | `number` | 终点经度（度） |
| `lat2` | `number` | 终点纬度（度） |

## 返回值

`number`

球面距离（米）

## 示例

```ts
// 北京到上海的距离
const d = distance(116.39, 39.91, 121.47, 31.23)
console.log(`距离: ${(d / 1000).toFixed(1)} 公里`)
```
