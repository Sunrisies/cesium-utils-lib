# Interface: FlyToOptions

Defined in: flyTo.ts:10

相机飞行动画参数

## Properties

### duration?

```ts
optional duration?: number;
```

Defined in: flyTo.ts:18

飞行时长（秒），不传则由 Cesium 自动计算

***

### heading?

```ts
optional heading?: number;
```

Defined in: flyTo.ts:12

偏航角（度），相机朝向，0 = 正北，默认 0

***

### pitch?

```ts
optional pitch?: number;
```

Defined in: flyTo.ts:14

俯仰角（度），-90 = 垂直俯视，默认 -90

***

### roll?

```ts
optional roll?: number;
```

Defined in: flyTo.ts:16

翻滚角（度），默认 0
