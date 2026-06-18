# Function: getCameraHeight()

```ts
function getCameraHeight(viewer): number;
```

定义于： camera.ts:26

获取相机当前高度（米）

返回相机距离地表（椭球表面）的高度，单位为米。
常用于判断当前缩放级别、切换显示层级等场景。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewer` | `Viewer` | Cesium Viewer 实例 |

## 返回值

`number`

相机高度（米）

## 示例

```ts
// 获取当前相机高度
const height = getCameraHeight(viewer)
console.log(`当前相机高度: ${height} 米`)
```

```ts
// 根据高度切换显示级别
const h = getCameraHeight(viewer)
if (h > 100000) {
  showLowResLayer()
} else {
  showHighResLayer()
}
```
