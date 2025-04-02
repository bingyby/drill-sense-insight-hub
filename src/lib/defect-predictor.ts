
// 故障预测模型 (Fault Prediction Model)

interface DefectPrediction {
  component: string;
  defectType: string;
  probability: number;
  timeToFailure: string;
  recommendedAction: string;
}

/**
 * 基于传感器数据预测可能的设备故障
 * Predicts possible equipment defects based on sensor data
 */
export function predictDefects(sensorData: any): DefectPrediction[] {
  const predictions: DefectPrediction[] = [];
  
  // 基于振动分析的故障预测 (Vibration-based fault prediction)
  if (sensorData.vibrationTemperature) {
    const { vibrationLevel, mainBearingTemp, crossheadTemp } = sensorData.vibrationTemperature;
    
    // 主轴承过热预测 (Main bearing overheating prediction)
    if (mainBearingTemp > 55) {
      const probability = calculateProbability(mainBearingTemp, 55, 95);
      predictions.push({
        component: "主轴承",
        defectType: "过热",
        probability: Number(probability.toFixed(2)),
        timeToFailure: estimateTimeToFailure(probability, 60) + " 天",
        recommendedAction: probability > 0.3 ? "立即检查冷却系统" : "计划维护检查"
      });
    }
    
    // 齿轮箱磨损预测 (Gearbox wear prediction)
    if (vibrationLevel > 2.5) {
      const probability = calculateProbability(vibrationLevel, 2.5, 8.0);
      predictions.push({
        component: "齿轮箱",
        defectType: "异常磨损",
        probability: Number(probability.toFixed(2)),
        timeToFailure: estimateTimeToFailure(probability, 45) + " 天",
        recommendedAction: probability > 0.4 ? "检查润滑系统" : "常规监控"
      });
    }
  }
  
  // 基于液压系统数据的故障预测 (Hydraulic system-based fault prediction)
  if (sensorData.hydraulicSystem) {
    const { pressure, flowRate, temperature } = sensorData.hydraulicSystem;
    
    // 液压泄漏预测 (Hydraulic leak prediction)
    if (pressure < 2300 || flowRate < 80) {
      const pressureFactor = pressure < 2300 ? calculateProbability(pressure, 2300, 1800) : 0;
      const flowFactor = flowRate < 80 ? calculateProbability(flowRate, 80, 60) : 0;
      const probability = Math.max(pressureFactor, flowFactor);
      
      if (probability > 0.05) {
        predictions.push({
          component: "液压系统",
          defectType: "泄漏",
          probability: Number(probability.toFixed(2)),
          timeToFailure: estimateTimeToFailure(probability, 90) + " 天",
          recommendedAction: probability > 0.3 ? "检查管路和密封" : "常规监控"
        });
      }
    }
  }
  
  // 基于声音数据的故障预测 (Sound-based fault prediction)
  if (sensorData.vibrationTemperature && sensorData.vibrationTemperature.soundLevel) {
    const { soundLevel } = sensorData.vibrationTemperature;
    
    // 电机异常声音预测 (Motor abnormal sound prediction)
    if (soundLevel > 85) {
      const probability = calculateProbability(soundLevel, 85, 110);
      predictions.push({
        component: "主电机",
        defectType: "轴承损坏",
        probability: Number(probability.toFixed(2)),
        timeToFailure: estimateTimeToFailure(probability, 30) + " 天",
        recommendedAction: probability > 0.25 ? "安排电机检查" : "加强监控"
      });
    }
  }
  
  // 如果没有预测到故障，添加一个通用的低概率预测 (If no defects predicted, add a generic low-probability prediction)
  if (predictions.length === 0) {
    predictions.push({
      component: "设备整体",
      defectType: "常规磨损",
      probability: 0.05,
      timeToFailure: "90+ 天",
      recommendedAction: "按计划维护"
    });
  }
  
  return predictions;
}

/**
 * 计算故障概率 (Calculate defect probability)
 * 基于当前值与正常和危险阈值的关系计算概率
 */
function calculateProbability(currentValue: number, normalThreshold: number, dangerThreshold: number): number {
  // 确保正常阈值小于危险阈值 (Ensure normal threshold is less than danger threshold)
  if (normalThreshold > dangerThreshold) {
    [normalThreshold, dangerThreshold] = [dangerThreshold, normalThreshold];
    if (currentValue <= normalThreshold) return 0;
    if (currentValue >= dangerThreshold) return 1;
  } else {
    if (currentValue >= normalThreshold) return 0;
    if (currentValue <= dangerThreshold) return 1;
  }
  
  // 线性插值计算概率 (Linear interpolation to calculate probability)
  const range = Math.abs(dangerThreshold - normalThreshold);
  const deviation = Math.abs(currentValue - normalThreshold);
  return deviation / range;
}

/**
 * 估计故障发生时间 (Estimate time to failure)
 * 基于概率和基准时间估计故障发生时间
 */
function estimateTimeToFailure(probability: number, baselineDays: number): number {
  // 概率越高，预计故障时间越短 (Higher probability means shorter time to failure)
  const timeMultiplier = 1 - Math.pow(probability, 0.5);
  return Math.round(baselineDays * timeMultiplier);
}
