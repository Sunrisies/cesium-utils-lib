# Interface: FlyToOptions

定义于： flyTo.ts:10

相机飞行动画参数

## 属性

### duration?

```ts
optional duration?: number;
```

定义于： flyTo.ts:18

飞行时长（秒），不传则由 Cesium 自动计算

***

### heading?

```ts
optional heading?: number;
```

定义于： flyTo.ts:12

偏航角（度），相机朝向，0 = 正北，默认 0

***

### pitch?

```ts
optional pitch?: number;
```

定义于： flyTo.ts:14

俯仰角（度），-90 = 垂直俯视，默认 -90

***

### roll?

```ts
optional roll?: number;
```

定义于： flyTo.ts:16

翻滚角（度），默认 0
