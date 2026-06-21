# 开发计划

## 当前版本（15 函数）

```
坐标转换      getLonLat / getLonLatByCartesian
相机控制      flyTo / setView / flyToPositions
相机查询      getCameraHeight / cartesianToScreen
距离测量      distance / midpoint
场景交互      screenshot
可视化特效     createScanCircle
变换矩阵      calculateLocationMatrix
标记/标签     createPinImage / createBillboardEntity / createLabelEntity
```

---

## 待实现

### 交互与场景

| 函数 | 说明 | 难度 |
|------|------|------|
| `screenshot(viewer)` | 截取当前场景为图片（含高清倍率、自动下载） | ✅ 已实现 |
| `getEntitiesUnderMouse(viewer, position)` | 鼠标位置拾取所有 Entity | ⭐⭐⭐ |
| `screenToCartesian(viewer, screenPos, depth?)` | 屏幕坐标 → 三维坐标（可指定深度） | ⭐⭐⭐ |
| `cartesianToScreen(viewer, cartesian)` | 三维坐标 → 屏幕像素坐标 | ✅ 已实现 |

### 几何计算

| 函数 | 说明 | 难度 |
|------|------|------|
| `offsetPosition(lng, lat, bearing, distance)` | 根据方位角 + 距离计算新坐标（测地线正算） | ⭐⭐⭐ |
| `circlePositions(center, radius, segments?)` | 生成圆形轨迹的经纬度坐标数组 | ⭐⭐ |
| `arcPositions(start, end, segments?)` | 生成弧线路径坐标数组 | ⭐⭐⭐ |
| `interpolatePoints(points, count)` | 点集平滑插值（Catmull-Rom） | ⭐⭐⭐ |

### 可视化特效

| 函数 | 说明 | 难度 |
|------|------|------|
| `createRadarScan(viewer, center, radius)` | 雷达扫描圈效果（动态纹理旋转） | ⭐⭐⭐⭐ |
| `createFlowLine(positions, color?)` | 流动线效果（动态纹理偏移） | ⭐⭐⭐⭐ |
| `createFence(positions, height, color?)` | 围栏/拉伸体可视化 | ⭐⭐⭐ |
| `createScanCircle(viewer, center, radius, options?)` | 扩散扫描圆环动画 | ✅ 已实现 |

### 3D Tiles

| 函数 | 说明 | 难度 |
|------|------|------|
| `getTilesetBounds(tileset)` | 获取 3D Tileset 的包围盒 `{ west, south, east, north }` | ⭐⭐⭐ |
| `zoomToTileset(viewer, tileset, offset?)` | 飞至 Tileset 最佳视野（含朝向偏移） | ⭐⭐⭐ |

### 地形

| 函数 | 说明 | 难度 |
|------|------|------|
| `getTerrainHeight(viewer, lng, lat)` | 获取指定位置的地形高度 | ⭐⭐⭐ |
| `getTerrainProfile(viewer, positions)` | 沿路径获取地形剖面数据（高度数组） | ⭐⭐⭐⭐ |

---

## 难度说明

| 级别 | 含义 |
|------|------|
| ⭐⭐⭐⭐ | 有挑战 — 涉及动态纹理、自定义 Primitive、多状态管理 |
| ⭐⭐⭐ | 中等 — 涉及 Cesium 场景交互、坐标变换链、几何算法 |
| ⭐⭐ | 中等偏简单 — 少量算法或 Cesium API 封装 |
