# Function: getLonLat()

```ts
function getLonLat(viewer, position): LonLat | null;
```

Defined in: lonlat.ts:63

从屏幕像素坐标拾取三维位置并返回经纬度

内部调用 viewer.scene.pickPosition 进行三维拾取，
适用于鼠标点击、触摸等交互事件将屏幕坐标转换为地理坐标。

⚠️ 拾取限制：
- 场景中必须有可拾取的 3D Tiles 或地形，否则返回 null
- 点击天空或空白区域会返回 null，调用方应做空值判断
- 性能敏感场景避免高频调用，pickPosition 需走 GPU 拾取

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewer` | `Viewer` | Cesium Viewer 实例 |
| `position` | `Cartesian2` | 屏幕像素坐标（通常来自 ScreenSpaceEventHandler 回调） |

## Returns

[`LonLat`](../interfaces/LonLat.md) \| `null`

经纬度 + 高度；拾取失败返回 null（而非 { Lon: 0, Lat: 0 }）

## Example

```ts
handler.setInputAction((event) => {
  const pos = getLonLat(viewer, event.position)
  if (pos) {
    console.log(`经度: ${pos.Lon}, 纬度: ${pos.Lat}`)
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
```
