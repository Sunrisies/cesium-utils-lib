# 开发计划

## 当前版本

```
坐标转换    getLonLat / getLonLatByCartesian
相机控制    flyTo / setView / flyToPositions
变换矩阵    calculateLocationMatrix
标记/标签   createPinImage / createBillboardEntity / createLabelEntity
```

---

## 待实现

### ① 坐标计算

| 函数 | 说明 | 优先级 |
|------|------|--------|
| `distance(lng1, lat1, lng2, lat2)` | 两经纬度点之间的球面距离（米） | ✅ 已实现 |
| `bearing(lng1, lat1, lng2, lat2)` | 两点间方位角（度） | ⭐⭐ |
| `midpoint(lng1, lat1, lng2, lat2)` | 两点中点坐标 | ⭐⭐ |
| `boundingBox(positions)` | 多点包围盒 `{ west, south, east, north }` | ⭐⭐ |

### ② 相机查询

| 函数 | 说明 | 优先级 |
|------|------|--------|
| `getCameraRectangle(viewer)` | 获取当前相机视野矩形范围 | ⭐⭐ |
| `getCameraHeight(viewer)` | 获取相机当前高度 | ✅ 已实现 |
| `getCameraTargetDistance(viewer, position)` | 相机到某点的地面距离 | ⭐ |

### ③ Entity 创建

| 函数 | 说明 | 优先级 |
|------|------|--------|
| `createPointEntity(pos, color?, size?)` | 创建点标记（PointGraphics） | ⭐⭐⭐ |
| `createPolylineEntity(positions, color?)` | 创建线 | ⭐⭐⭐ |
| `createPolygonEntity(positions, color?)` | 创建面 | ⭐⭐ |
| `clearDataSource(dataSource)` | 清空 DataSource 所有实体 | ⭐⭐ |

### ④ 工具函数

| 函数 | 说明 | 优先级 |
|------|------|--------|
| `lonLatToArray(lonlat)` | `{Lon, Lat}` → `[lng, lat]` | ⭐ |
| `arrayToLonLat(arr)` | `[lng, lat]` → `{Lon, Lat}` | ⭐ |
| `colorToCss(color)` | `Cesium.Color` → CSS 字符串 | ⭐⭐ |
| `cssToColor(css)` | CSS 字符串 → `Cesium.Color` | ⭐⭐ |

### ⑤ 地形

| 函数 | 说明 | 优先级 |
|------|------|--------|
| `sampleHeight(viewer, positions)` | 地形高度采样 | ⭐⭐ |

---

## 优先级说明

- ⭐⭐⭐ 常用，项目里直接出现过
- ⭐⭐ 常见需求，但使用频率稍低
- ⭐ 简单工具，需要时再实现也不迟
