# Interface: CreateBillboardOptions

定义于： billboard.ts:60

Billboard Entity 创建参数

## 属性

### disableDepthTestDistance?

```ts
optional disableDepthTestDistance?: number;
```

定义于： billboard.ts:65

深度测试禁用距离，默认 Infinity

***

### heightReference?

```ts
optional heightReference?: HeightReference;
```

定义于： billboard.ts:64

高度参考系，默认 CLAMP_TO_GROUND

***

### horizontalOrigin?

```ts
optional horizontalOrigin?: HorizontalOrigin;
```

定义于： billboard.ts:66

水平原点，默认 CENTER

***

### id?

```ts
optional id?: string;
```

定义于： billboard.ts:68

实体 ID

***

### image

```ts
image: string;
```

定义于： billboard.ts:61

图片 URL 或 base64 DataURL

***

### pixelOffset?

```ts
optional pixelOffset?: Cartesian2;
```

定义于： billboard.ts:62

像素偏移，默认 (0, -20)

***

### scale?

```ts
optional scale?: number;
```

定义于： billboard.ts:63

缩放比例

***

### verticalOrigin?

```ts
optional verticalOrigin?: VerticalOrigin;
```

定义于： billboard.ts:67

垂直原点
