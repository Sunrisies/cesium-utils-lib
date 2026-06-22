# Function: midpoint()

```ts
function midpoint(
   lng1, 
   lat1, 
   lng2, 
   lat2): object;
```

定义于： measure.ts:50

计算两点之间的中点坐标

沿 WGS84 椭球面的大地线取中点，比简单的经纬度平均更精确。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `lng1` | `number` | 起点经度（度） |
| `lat1` | `number` | 起点纬度（度） |
| `lng2` | `number` | 终点经度（度） |
| `lat2` | `number` | 终点纬度（度） |

## 返回值

`object`

中点经纬度 `{ lng, lat }`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `lat` | `number` | measure.ts:55 |
| `lng` | `number` | measure.ts:55 |

## 示例

```ts
// 北京到上海的中点
const mid = midpoint(116.39, 39.91, 121.47, 31.23)
console.log(`中点: ${mid.lng}, ${mid.lat}`)
```
