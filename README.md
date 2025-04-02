
# 钻井智能监控系统 (DrillSense Insight Hub)

顶驱钻井故障监控系统 (Top Drive Drilling Fault Monitoring System)

## 功能概述 (Features Overview)

该系统提供了钻井设备的实时监控和故障预测功能，包括：

- 仪表盘：显示系统状态、液压压力、主轴承温度和警报
- 数字孪生：3D可视化钻井设备状态，包括顶驱、井架、绞车、泥浆泵、防喷器和振动筛
- 声音监测：分析设备声音特征，预测潜在故障
- 警报管理：显示和管理所有系统警报
- 历史数据：查看和分析设备历史运行数据

## API 使用说明 (API Usage Instructions)

### 1. 实时数据API (Real-time Data API)

发送GET请求到以下端点获取实时数据：

```
GET /api/v1/drilling/real-time
```

响应示例：

```json
{
  "systemStatus": {
    "status": "operational",
    "motorStatus": true,
    "controllerStatus": true,
    "communicationStatus": "online"
  },
  "hydraulicSystem": {
    "pressure": 2850,
    "pressureStatus": "normal",
    "flowRate": 325,
    "flowRateStatus": "normal",
    "temperature": 58,
    "temperatureStatus": "normal"
  },
  "vibrationTemperature": {
    "mainBearingTemp": 72,
    "mainBearingTempStatus": "normal",
    "vibrationLevel": 3.2,
    "vibrationStatus": "normal"
  }
}
```

### 2. 声音监测API (Sound Monitoring API)

发送GET请求获取声音数据：

```
GET /api/v1/drilling/sound-monitoring
```

响应示例：

```json
{
  "soundLevel": 78,
  "soundStatus": "正常 (Normal)",
  "frequencyData": [
    {"frequency": "低频 (Low)", "value": 45, "status": "normal"},
    {"frequency": "中频 (Medium)", "value": 32, "status": "normal"},
    {"frequency": "高频 (High)", "value": 15, "status": "normal"}
  ]
}
```

### 3. 故障预测API (Defect Prediction API)

发送POST请求，并提供声音数据进行故障预测：

```
POST /api/v1/drilling/predict-defects
```

请求示例：

```json
{
  "soundLevel": 87,
  "vibrationLevel": 4.5,
  "mainBearingTemp": 75
}
```

响应示例：

```json
{
  "predictions": [
    {
      "component": "钻轴 (Drilling Shaft)",
      "defectType": "轴承磨损 (Bearing Wear)",
      "probability": 0.65,
      "timeToFailure": "7-14天 (7-14 days)",
      "recommendedAction": "更换轴承或加强润滑 (Replace bearings or enhance lubrication)"
    },
    {
      "component": "传动齿轮 (Transmission Gears)",
      "defectType": "齿轮咬合不良 (Poor Gear Meshing)",
      "probability": 0.42,
      "timeToFailure": "14-21天 (14-21 days)",
      "recommendedAction": "检查齿轮对准和磨损 (Check gear alignment and wear)"
    }
  ]
}
```

### 4. 历史数据API (Historical Data API)

获取指定时间范围的历史数据：

```
GET /api/v1/drilling/historical?start=2023-10-01T00:00:00Z&end=2023-10-31T23:59:59Z&parameter=vibration
```

参数说明：
- `start`: 开始时间 (ISO 8601格式)
- `end`: 结束时间 (ISO 8601格式)
- `parameter`: 要查询的参数 (可选值: vibration, temperature, pressure, sound)

响应示例：

```json
{
  "data": [
    {"timestamp": "2023-10-01T01:00:00Z", "value": 3.2},
    {"timestamp": "2023-10-01T02:00:00Z", "value": 3.4},
    {"timestamp": "2023-10-01T03:00:00Z", "value": 3.3}
  ],
  "statistics": {
    "average": 3.3,
    "max": 3.4,
    "min": 3.2
  }
}
```

## 3D模型说明 (3D Model Instructions)

数字孪生页面中的3D模型展示了钻井设备的实时状态。颜色变化表示组件状态：

- 绿色：组件正常运行
- 红色：组件处于警告或故障状态
- 黄色：组件处于注意状态

模型中包含的主要组件：
- 顶驱 (Top Drive)
- 井架 (Derrick)
- 绞车 (Drawworks)
- 泥浆泵 (Mud Pump)
- 防喷器 (BOP)
- 振动筛 (Shale Shaker)

可以通过旋转查看不同角度的3D模型，组件状态会根据实时数据自动更新。

