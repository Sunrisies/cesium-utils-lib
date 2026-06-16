# Function: getLonLatByCartesian()

```ts
function getLonLatByCartesian(cartesian): LonLat;
```

Defined in: lonlat.ts:86

将 Cartesian3 笛卡尔坐标直接转换为 LonLat 经纬度

与 getLonLat 不同，此函数直接从已知的 Cartesian3 转换，
不涉及场景拾取，适用于已有三维坐标的场景（如实体位置、模型位置等）。

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cartesian` | `Cartesian3` | Cesium 三维笛卡尔坐标（地心地固坐标系） |

## Returns

[`LonLat`](../interfaces/LonLat.md)

经纬度 + 高度，始终返回有效值

## Example

```ts
const entity = viewer.entities.add({ position: Cesium.Cartesian3.fromDegrees(116, 39) })
const pos = getLonLatByCartesian(entity.position.getValue(clock.currentTime))
console.log(`实体位置: ${pos.Lon}, ${pos.Lat}`)
```
