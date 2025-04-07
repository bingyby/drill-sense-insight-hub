
# 钻井智能监控系统 (DrillSense Insight Hub)

顶驱钻井故障监控系统 (Top Drive Drilling Fault Monitoring System)

## 系统概述 (System Overview)

本系统提供了钻井设备的实时监控和故障预测功能，通过多种传感器数据分析和AI诊断，提前发现设备潜在问题，降低设备故障风险。

## 功能模块 (Function Modules)

### 1. 仪表盘 (Dashboard)
- 系统状态 (System Status)
- 液压压力 (Hydraulic Pressure)
- 主轴承温度 (Main Bearing Temperature)
- 活动警报 (Active Alerts)
- 声音监控 (Sound Monitoring)

### 2. 数字孪生 (Digital Twin)
- 3D可视化钻井设备状态，包括：
  - 顶驱 (Top Drive)
  - 井架 (Derrick)
  - 绞车 (Drawworks)
  - 泥浆泵 (Mud Pump)
  - 防喷器 (BOP)
  - 振动筛 (Shale Shaker)

### 3. 声音监测 (Sound Monitoring)
- 分析设备声音特征
- 声音波形可视化 (Sound Waveform Visualization)
- 基于声音的故障预测 (Sound-based Fault Prediction)

### 4. 警报管理 (Alerts)
- 实时警报显示
- 警报分级管理
- 历史警报查询

### 5. 历史数据 (Historical Data)
- 设备参数历史趋势
- 数据导出功能
- 时间序列分析

### 6. 通知设置 (Notification Settings)
- 邮件通知配置
- 警报阈值设置
- 通知类型管理

## 系统组件 (System Components)

### 1. 监控模块 (Monitoring Modules)

| 组件名称 (Component) | 文件路径 (File Path) | 功能描述 (Description) |
|-------------------|-------------------|-------------------|
| 系统状态 | src/components/monitoring/SystemStatus.tsx | 显示系统整体状态，包括电机、液压、控制系统和传感器网络 |
| 液压系统 | src/components/monitoring/HydraulicSystem.tsx | 监控液压系统压力、流量、温度和液压缸位置 |
| 振动温度 | src/components/monitoring/VibrationTemperature.tsx | 监控设备振动和温度参数 |
| 电气参数 | src/components/monitoring/ElectricalParameters.tsx | 监控电压、电流、功率消耗和负载因数 |
| 操作命令 | src/components/monitoring/OperationalCommands.tsx | 显示扭矩、转速、钻压等操作参数和近期命令 |
| 环境数据 | src/components/monitoring/EnvironmentalData.tsx | 监控环境温度、湿度和气压 |
| 故障预测 | src/components/monitoring/DefectPredictions.tsx | 显示设备故障预测结果 |
| 声音监控 | src/components/monitoring/SoundMonitoring.tsx | 监控设备声音级别和特征 |
| 声音波形图 | src/components/monitoring/SoundWaveform.tsx | 可视化声音波形数据 |

### 2. 传感器列表 (Sensor List)

| 传感器类型 (Sensor Type) | 监测参数 (Parameters) | 应用位置 (Location) |
|----------------------|---------------------|-------------------|
| 温度传感器 | 主轴承温度、十字头温度、液压油温度 | 轴承座、十字头、液压系统 |
| 振动传感器 | 设备振动水平、振动频率 | 主轴、电机、传动系统 |
| 压力传感器 | 液压系统压力、泥浆泵压力 | 液压系统、泥浆泵 |
| 流量传感器 | 液压油流量、冷却液流量 | 液压系统、冷却系统 |
| 音频传感器 | 声音级别、声音频率特征 | 主电机、传动系统、轴承 |
| 电气传感器 | 电压、电流、功率消耗 | 电气控制柜、主电机 |
| 位置传感器 | 液压缸位置、升降角度 | 液压缸、升降系统 |
| 扭矩传感器 | 钻柱扭矩 | 传动轴、钻柱 |
| 转速传感器 | 电机转速、钻柱转速 | 主电机、传动系统 |

### 3. 诊断方法 (Diagnostic Methods)

| 诊断方法 (Method) | 实现文件 (Implementation) | 原理描述 (Description) |
|------------------|------------------------|-------------------|
| 声音特征分析 | src/lib/sound-data.ts | 分析设备声音频率特征，识别异常模式 |
| 振动分析 | src/lib/mock-data.ts | 基于振动频谱和振幅分析设备状态 |
| 温度趋势分析 | src/lib/mock-data.ts | 监测温度变化趋势，发现过热问题 |
| 压力异常检测 | src/lib/mock-data.ts | 检测液压系统压力异常 |
| 统计模式识别 | src/lib/defect-predictor.ts | 使用统计方法识别异常数据模式 |
| 阈值报警 | src/lib/defect-predictor.ts | 基于参数阈值发出预警 |
| 多参数相关分析 | src/lib/defect-predictor.ts | 分析多个参数之间的相关性 |
| 故障预测模型 | src/lib/defect-predictor.ts | 基于历史数据预测潜在故障 |

### 4. 故障类型 (Defect Types)

| 故障类型 (Defect Type) | 监测方法 (Detection Method) | 危险等级 (Risk Level) |
|-------------------|-------------------------|-------------------|
| 轴承磨损 | 声音分析、温度监测、振动分析 | 高 |
| 齿轮咬合不良 | 声音分析、振动分析 | 中 |
| 电机轴不平衡 | 声音分析、振动分析 | 中 |
| 泵阀磨损 | 声音分析、压力监测、流量检测 | 中 |
| 制动系统异常 | 声音分析、温度监测 | 高 |
| 筛网损坏 | 声音分析、振动分析 | 低 |
| 液压泄漏 | 压力监测、流量检测、温度监测 | 高 |
| 电机过热 | 温度监测、电流监测 | 高 |

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
  "waveform": [32, 45, 38, 29, 35, 42, 38, 31, ...],
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

### 5. 通知配置API (Notification Settings API)

更新用户通知设置：

```
POST /api/v1/user/notification-settings
```

请求示例：

```json
{
  "email": "engineer@example.com",
  "soundAlerts": true,
  "temperatureAlerts": true,
  "vibrationAlerts": false,
  "hydraulicAlerts": true,
  "criticalOnly": false
}
```

响应示例：

```json
{
  "success": true,
  "message": "通知设置已更新 (Notification settings updated)"
}
```

### 6. 发送测试通知API (Test Notification API)

发送测试通知到指定邮箱：

```
POST /api/v1/notifications/send-test
```

请求示例：

```json
{
  "email": "engineer@example.com"
}
```

响应示例：

```json
{
  "success": true,
  "message": "测试通知已发送 (Test notification sent)"
}
```

## 3D模型说明 (3D Model Instructions)

数字孪生页面中的3D模型展示了钻井设备的实时状态。颜色变化表示组件状态：

- 绿色：组件正常运行
- 黄色：组件处于注意状态
- 红色：组件处于警告或故障状态

模型中包含的主要组件：
- 顶驱 (Top Drive)
- 井架 (Derrick)
- 绞车 (Drawworks)
- 泥浆泵 (Mud Pump)
- 防喷器 (BOP)
- 振动筛 (Shale Shaker)

可以通过旋转查看不同角度的3D模型，组件状态会根据实时数据自动更新。

## 系统技术架构 (System Technical Architecture)

- 前端框架：React + TypeScript
- UI组件：Tailwind CSS + Shadcn UI
- 数据可视化：Recharts
- 3D可视化：Three.js
- 状态管理：React Context API
- 数据模拟：Mock数据接口
- 实时更新：定时轮询API

## 开发团队 (Development Team)

- 杨秉怡
- 王宇堃
- 王怡钧

© 2025 北航钻井智能监控系统团队
