
# DrillSense Insight Hub - 钻井智能监控系统

## 系统概述 (System Overview)

DrillSense Insight Hub 是一个用于顶驱钻井设备监控的智能系统，提供实时数据监测、数字孪生、声音分析、故障预测和历史数据分析等功能。

DrillSense Insight Hub is an intelligent monitoring system for top drive drilling equipment, providing real-time data monitoring, digital twin visualization, sound analysis, fault prediction, and historical data analysis.

## API 使用指南 (API Usage Guide)

### 数据接口 (Data Interfaces)

系统通过以下API接口获取数据：

1. **系统状态数据 (System Status Data)**
   - 端点 (Endpoint): `/api/system-status`
   - 方法 (Method): GET
   - 返回格式 (Response Format):
   ```json
   {
     "systemStatus": "正常 (Normal)",
     "operationalHours": 2547,
     "lastMaintenance": "2023-04-15",
     "nextScheduledMaintenance": "2023-07-15",
     "currentLoad": 75,
     "alerts": []
   }
   ```

2. **振动和温度数据 (Vibration and Temperature Data)**
   - 端点 (Endpoint): `/api/vibration-temperature`
   - 方法 (Method): GET
   - 返回格式 (Response Format):
   ```json
   {
     "mainBearingTemp": 68.5,
     "mainBearingTempStatus": "正常 (Normal)",
     "crossheadTemp": 72.3,
     "crossheadTempStatus": "正常 (Normal)",
     "vibrationLevel": "0.45",
     "vibrationStatus": "正常 (Normal)",
     "vibrationData": [
       { "name": "主轴承 (Main Bearing)", "value": 0.45, "threshold": 0.8 },
       { "name": "齿轮箱 (Gearbox)", "value": 0.32, "threshold": 0.7 },
       { "name": "电机 (Motor)", "value": 0.28, "threshold": 0.75 },
       { "name": "转盘 (Rotary Table)", "value": 0.22, "threshold": 0.65 }
     ]
   }
   ```

3. **声音监测数据 (Sound Monitoring Data)**
   - 端点 (Endpoint): `/api/sound-data`
   - 方法 (Method): GET
   - 返回格式 (Response Format):
   ```json
   {
     "soundLevel": 75,
     "soundStatus": "正常 (Normal)",
     "frequencySpectrum": [
       { "frequency": "低频 (Low)", "value": 68 },
       { "frequency": "中频 (Medium)", "value": 72 },
       { "frequency": "高频 (High)", "value": 65 }
     ]
   }
   ```

4. **故障预测 (Defect Prediction)**
   - 端点 (Endpoint): `/api/defect-predictions`
   - 方法 (Method): POST
   - 请求体 (Request Body):
   ```json
   {
     "soundLevel": 87,
     "vibrationLevel": 0.65,
     "temperature": 78,
     "operationalHours": 2547
   }
   ```
   - 返回格式 (Response Format):
   ```json
   {
     "predictions": [
       {
         "component": "主轴承 (Main Bearing)",
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

### 发送消息到系统 (Sending Messages to the System)

要发送控制命令或警报确认消息到系统：

1. **设备控制命令 (Equipment Control Commands)**
   - 端点 (Endpoint): `/api/control-command`
   - 方法 (Method): POST
   - 请求体 (Request Body):
   ```json
   {
     "command": "停止旋转 (Stop Rotation)",
     "parameters": {
       "speed": 0,
       "torque": 0
     },
     "priority": "高 (High)",
     "source": "操作员 (Operator)",
     "timestamp": "2023-06-15T08:45:22Z"
   }
   ```
   - 返回格式 (Response Format):
   ```json
   {
     "status": "已接收 (Received)",
     "commandId": "cmd-12345",
     "estimatedExecutionTime": "2023-06-15T08:45:25Z"
   }
   ```

2. **警报确认 (Alert Acknowledgment)**
   - 端点 (Endpoint): `/api/acknowledge-alert`
   - 方法 (Method): POST
   - 请求体 (Request Body):
   ```json
   {
     "alertId": "alt-7890",
     "acknowledgedBy": "张工程师 (Engineer Zhang)",
     "timestamp": "2023-06-15T09:12:45Z",
     "notes": "已检查并解决问题 (Checked and resolved the issue)"
   }
   ```
   - 返回格式 (Response Format):
   ```json
   {
     "status": "已确认 (Acknowledged)",
     "alertStatus": "已关闭 (Closed)"
   }
   ```

## 故障预测算法 (Defect Prediction Algorithm)

系统使用多种数据源进行故障预测，包括：

1. 声音分析 (Sound Analysis)
2. 振动监测 (Vibration Monitoring)
3. 温度监测 (Temperature Monitoring)
4. 运行时间 (Operational Hours)

系统将这些数据输入到预测模型中，计算出各组件可能出现故障的概率和预计故障时间，并提供相应的维护建议。

## 系统要求 (System Requirements)

- 现代网络浏览器 (Modern Web Browser): Chrome, Firefox, Safari, Edge
- 最低分辨率 (Minimum Resolution): 1280x720
- 网络连接 (Network Connection): 稳定的互联网连接 (Stable Internet Connection)

## 联系方式 (Contact Information)

如有任何问题或建议，请联系系统管理员：

For any questions or suggestions, please contact the system administrator:

- 邮箱 (Email): support@drillsense.com
- 电话 (Phone): +86 10 12345678
