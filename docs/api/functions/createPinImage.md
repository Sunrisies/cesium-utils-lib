# Function: createPinImage()

```ts
function createPinImage(options): string;
```

定义于： billboard.ts:40

生成 Cesium Pin 标记图片（base64 DataURL）

封装 PinBuilder.fromText，统一处理颜色转换和尺寸。
常用于为每个实体生成带序号的彩色标记图标。

## 参数

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`CreatePinImageOptions`](../interfaces/CreatePinImageOptions.md) | 标记参数 |

## 返回值

`string`

base64 DataURL，可直接赋给 billboard.image

## 示例

```ts
const image = createPinImage({ text: 1, color: '#FF4444' })
entity.billboard = { image }
```
