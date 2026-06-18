# Function: createLabelEntity()

```ts
function createLabelEntity(
   position, 
   text, 
   options?): Entity;
```

定义于： billboard.ts:148

创建一个 Label Entity

封装 Entity + label 的常用默认值。
常用于在地图上显示文字标注、距离数值等。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `position` | `Cartesian3` | 三维位置（Cartesian3） |
| `text` | `string` | 显示文本 |
| `options?` | [`CreateLabelOptions`](../interfaces/CreateLabelOptions.md) | Label 参数（可选） |

## 返回值

`Entity`

Cesium Entity

## 示例

```ts
const label = createLabelEntity(
  Cartesian3.fromDegrees(116.39, 39.91),
  "北京",
  { font: "24px sans-serif", fillColor: Color.WHITE }
)
viewer.entities.add(label)
```
