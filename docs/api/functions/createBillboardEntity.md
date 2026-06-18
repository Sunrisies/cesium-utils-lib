# Function: createBillboardEntity()

```ts
function createBillboardEntity(
   position, 
   options, 
   name?): Entity;
```

定义于： billboard.ts:89

创建一个 Billboard Entity

封装 Entity + billboard 的常用默认值，减少样板代码。
常用于在地图上添加标记点、航点、兴趣点等。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `position` | `Cartesian3` | 三维位置（Cartesian3） |
| `options` | [`CreateBillboardOptions`](../interfaces/CreateBillboardOptions.md) | Billboard 参数 |
| `name?` | `string` | 实体名称（可选，用于标识） |

## 返回值

`Entity`

Cesium Entity

## 示例

```ts
const entity = createBillboardEntity(
  Cartesian3.fromDegrees(116.39, 39.91),
  { image: createPinImage({ text: "A" }) }
)
viewer.entities.add(entity)
```
