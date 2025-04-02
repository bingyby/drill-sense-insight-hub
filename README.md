
# DrillSense Insight Hub - 钻井监控系统

## 系统简介 (System Introduction)

DrillSense Insight Hub 是一个顶驱钻井故障监控系统，提供实时数据监控、数字孪生技术和故障预测分析。

DrillSense Insight Hub is a top drive drilling fault monitoring system that provides real-time data monitoring, digital twin technology, and fault prediction analysis.

## API 使用指南 (API Usage Guide)

### 发送数据到系统 (Sending Data to the System)

您可以通过 RESTful API 发送数据到监控系统。以下是 API 接口说明：

You can send data to the monitoring system through a RESTful API. Here's the API specification:

#### 端点 (Endpoint)

```
POST /api/sensor-data
```

#### 请求体格式 (Request Body Format)

```json
{
  "timestamp": "2023-09-15T08:30:00Z",
  "systemStatus": {
    "status": "operational", // "operational", "warning", or "critical"
    "motorStatus": true,
    "hydraulicStatus": true,
    "controlSystemStatus": true,
    "sensorNetworkStatus": true
  },
  "hydraulicSystem": {
    "pressure": 2500, // PSI
    "pressureStatus": "normal", // "normal" or "warning"
    "flowRate": 85, // Gallons per minute
    "flowRateStatus": "normal", // "normal" or "warning"
    "temperature": 65, // Celsius
    "oilLevel": 95 // Percentage
  },
  "vibrationTemperature": {
    "mainBearingTemp": 65, // Celsius
    "mainBearingTempStatus": "normal", // "normal" or "warning"
    "crossheadTemp": 58, // Celsius
    "crossheadTempStatus": "normal", // "normal" or "warning"
    "vibrationLevel": 3.2, // mm/s
    "vibrationStatus": "normal", // "normal" or "warning"
    "soundLevel": 82, // dB (Sound decibel level)
    "soundStatus": "normal", // "normal" or "warning"
    "vibrationData": [
      {
        "name": "主电机",
        "value": 2.8,
        "threshold": 5.0
      },
      {
        "name": "齿轮箱",
        "value": 3.2,
        "threshold": 6.0
      },
      {
        "name": "轴承",
        "value": 1.9,
        "threshold": 4.0
      },
      {
        "name": "电动滑块",
        "value": 2.4,
        "threshold": 5.5
      }
    ]
  },
  "electricalParameters": {
    "mainMotorVoltage": 480, // Volts
    "mainMotorCurrent": 125, // Amps
    "mainMotorPower": 85, // kW
    "auxiliaryVoltage": 240, // Volts
    "auxiliaryCurrent": 45, // Amps
    "groundFaultStatus": "normal" // "normal" or "fault"
  },
  "operationalCommands": {
    "drillSpeed": 120, // RPM
    "torqueLimit": 80, // Percentage
    "weightOnBit": 25, // Tons
    "mode": "automatic", // "automatic" or "manual"
    "direction": "forward" // "forward", "reverse", or "locked"
  },
  "environmentalData": {
    "ambientTemperature": 32, // Celsius
    "humidity": 65, // Percentage
    "windSpeed": 15, // km/h
    "precipitation": "none" // "none", "light", "moderate", "heavy"
  },
  "alerts": {
    "total": 2,
    "critical": 0,
    "warning": 2,
    "info": 0,
    "recentAlerts": [
      {
        "id": "ALT-2023-092",
        "type": "warning",
        "component": "Hydraulic System",
        "message": "Pressure fluctuation detected",
        "timestamp": "2023-09-15T07:45:00Z"
      },
      {
        "id": "ALT-2023-091",
        "type": "warning",
        "component": "Vibration",
        "message": "Increased vibration in gearbox",
        "timestamp": "2023-09-15T07:30:00Z"
      }
    ]
  },
  "defectPredictions": {
    "predictions": [
      {
        "component": "主轴承",
        "defectType": "过热",
        "probability": 0.15,
        "timeToFailure": "45 天",
        "recommendedAction": "计划维护检查"
      },
      {
        "component": "液压系统",
        "defectType": "泄漏",
        "probability": 0.08,
        "timeToFailure": "60 天",
        "recommendedAction": "常规监控"
      },
      {
        "component": "齿轮箱",
        "defectType": "异常磨损",
        "probability": 0.25,
        "timeToFailure": "30 天",
        "recommendedAction": "检查润滑状态"
      }
    ]
  }
}
```

#### 响应 (Response)

```json
{
  "status": "success",
  "message": "数据接收成功 (Data received successfully)",
  "timestamp": "2023-09-15T08:30:05Z"
}
```

### 错误代码 (Error Codes)

| 代码 (Code) | 描述 (Description)                         |
|------------|------------------------------------------|
| 400        | 请求格式错误 (Bad request format)            |
| 401        | 未授权 (Unauthorized)                     |
| 500        | 服务器内部错误 (Internal server error)       |

### 认证 (Authentication)

所有 API 请求需要在 Header 中包含 API 密钥：

All API requests must include an API key in the header:

```
Authorization: Bearer YOUR_API_KEY
```

## 数据周期 (Data Frequency)

建议按照以下频率发送数据：

The recommended frequency for sending data is:

- 关键参数 (Critical parameters): 每 5 秒 (Every 5 seconds)
- 标准参数 (Standard parameters): 每 30 秒 (Every 30 seconds)
- 环境参数 (Environmental parameters): 每 5 分钟 (Every 5 minutes)

## 故障预测算法 (Fault Prediction Algorithm)

系统使用多种模型来预测可能的设备故障：

The system uses various models to predict possible equipment failures:

1. 基于规则的阈值监测 (Rule-based threshold monitoring)
2. 统计异常检测 (Statistical anomaly detection)
3. 机器学习模型 (Machine learning models)
4. 基于声音分析的故障预测 (Sound-based fault prediction)

每个预测都包含故障类型、发生概率和预计发生时间，以便及时采取预防措施。

Each prediction includes the fault type, probability of occurrence, and estimated time of occurrence to allow timely preventive measures.

## 联系支持 (Contact Support)

如果您有任何问题或需要支持，请联系：

If you have any questions or need support, please contact:

📧 support@drillsense.com  
📞 +86-10-12345678

---

© 2023 DrillSense Technology Co., Ltd. 保留所有权利 (All rights reserved)
