# cesium-utils-lib

## Interfaces

| Interface | Description |
| ------ | ------ |
| [CalculateLocationOptions](interfaces/CalculateLocationOptions.md) | 位置矩阵计算参数 |
| [FlyToOptions](interfaces/FlyToOptions.md) | 相机飞行动画参数 |
| [LonLat](interfaces/LonLat.md) | 经纬度坐标接口 |
| [SetViewOptions](interfaces/SetViewOptions.md) | 相机跳转朝向参数 |

## Functions

| Function | Description |
| ------ | ------ |
| [calculateLocationMatrix](functions/calculateLocationMatrix.md) | 根据经纬度与朝向计算局部坐标变换矩阵 |
| [flyTo](functions/flyTo.md) | 相机平滑飞至指定位置 |
| [flyToPositions](functions/flyToPositions.md) | 飞至一组坐标点的最佳视野 |
| [getLonLat](functions/getLonLat.md) | 从屏幕像素坐标拾取三维位置并返回经纬度 |
| [getLonLatByCartesian](functions/getLonLatByCartesian.md) | 将 Cartesian3 笛卡尔坐标直接转换为 LonLat 经纬度 |
| [setView](functions/setView.md) | 相机即时跳转至指定位置（无动画） |
