# Function: cartesianToScreen()

```ts
function cartesianToScreen(viewer, cartesian): 
  | {
  x: number;
  y: number;
}
  | null;
```

定义于： camera.ts:48

将三维坐标转换为屏幕像素坐标

使用场景相机对 Cartesian3 进行投影变换，返回对应的屏幕像素位置。
常用于在三维场景中的物体位置上叠加 HTML 弹窗、工具提示等 UI 元素。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewer` | `Viewer` | Cesium Viewer 实例 |
| `cartesian` | `Cartesian3` | 三维笛卡尔坐标 |

## 返回值

  \| \{
  `x`: `number`;
  `y`: `number`;
\}
  \| `null`

屏幕像素坐标 `{ x, y }`；若点在相机后方或不可见则返回 null

## 示例

```ts
// 在实体位置上叠加自定义 DOM
const pos = cartesianToScreen(viewer, entity.position.getValue(time))
if (pos) {
  tooltip.style.left = pos.x + "px"
  tooltip.style.top  = pos.y + "px"
}
```
