
export interface SoundData {
  soundLevel: number;
  soundStatus: string;
  waveform: number[]; // Array of values representing the sound waveform
}

// Sample sound data for monitoring
export const getSoundData = (): SoundData => {
  // Generate a random sound level between 70-95 dB with occasional spikes
  const randomSound = Math.random() > 0.8 
    ? Math.floor(Math.random() * 15) + 85 // Higher sound (85-100 dB)
    : Math.floor(Math.random() * 15) + 70; // Normal sound (70-85 dB)
  
  // Determine status based on sound level
  const status = randomSound > 85 
    ? "异常 (Abnormal)" 
    : "正常 (Normal)";
  
  // Generate waveform data - 50 points of values between 0-100
  // Higher sound levels will have more variation in the waveform
  const variation = randomSound > 85 ? 60 : 30;
  const baseValue = randomSound > 85 ? 40 : 20;
  const waveform = Array.from({ length: 50 }, () => 
    Math.max(5, Math.min(100, baseValue + Math.random() * variation))
  );
  
  return {
    soundLevel: randomSound,
    soundStatus: status,
    waveform
  };
};

// Interface for defect prediction
export interface DefectPrediction {
  component: string;
  defectType: string;
  probability: number;
  timeToFailure: string;
  recommendedAction: string;
}

// Function to predict defects based on sound level
export const predictDefectsFromSound = (soundLevel: number): DefectPrediction[] => {
  const defects: DefectPrediction[] = [];
  
  // 钻轴故障预测 (Drilling Shaft fault prediction)
  if (soundLevel > 85) {
    defects.push({
      component: "钻轴 (Drilling Shaft)",
      defectType: "轴承磨损 (Bearing Wear)",
      probability: Math.min((soundLevel - 85) / 30, 0.95),
      timeToFailure: soundLevel > 100 ? "24-48小时 (24-48 hours)" : "7-14天 (7-14 days)",
      recommendedAction: "更换轴承或加强润滑 (Replace bearings or enhance lubrication)"
    });
  }
  
  // 齿轮故障预测 (Gear fault prediction)
  if (soundLevel > 80) {
    defects.push({
      component: "传动齿轮 (Transmission Gears)",
      defectType: "齿轮咬合不良 (Poor Gear Meshing)",
      probability: Math.min((soundLevel - 80) / 35, 0.9),
      timeToFailure: soundLevel > 95 ? "3-5天 (3-5 days)" : "14-21天 (14-21 days)",
      recommendedAction: "检查齿轮对准和磨损 (Check gear alignment and wear)"
    });
  }
  
  // 电机故障预测 (Motor fault prediction)
  if (soundLevel > 90) {
    defects.push({
      component: "电动机 (Electric Motor)",
      defectType: "电机轴不平衡 (Motor Shaft Imbalance)",
      probability: Math.min((soundLevel - 90) / 25, 0.85),
      timeToFailure: soundLevel > 105 ? "48-72小时 (48-72 hours)" : "10-15天 (10-15 days)",
      recommendedAction: "平衡电机轴或更换电机 (Balance motor shaft or replace motor)"
    });
  }
  
  // 泥浆泵故障预测 (Mud Pump fault prediction)
  if (soundLevel > 82) {
    defects.push({
      component: "泥浆泵 (Mud Pump)",
      defectType: "泵阀磨损 (Pump Valve Wear)",
      probability: Math.min((soundLevel - 82) / 28, 0.88),
      timeToFailure: soundLevel > 98 ? "2-4天 (2-4 days)" : "12-18天 (12-18 days)",
      recommendedAction: "更换泵阀或检查密封性 (Replace pump valves or check seals)"
    });
  }
  
  // 绞车故障预测 (Drawworks fault prediction)
  if (soundLevel > 87) {
    defects.push({
      component: "绞车 (Drawworks)",
      defectType: "制动系统异常 (Brake System Anomaly)",
      probability: Math.min((soundLevel - 87) / 30, 0.92),
      timeToFailure: soundLevel > 102 ? "36-60小时 (36-60 hours)" : "8-12天 (8-12 days)",
      recommendedAction: "检修制动系统 (Overhaul brake system)"
    });
  }
  
  // 振动筛故障预测 (Shale Shaker fault prediction)
  if (soundLevel > 84) {
    defects.push({
      component: "振动筛 (Shale Shaker)",
      defectType: "筛网损坏 (Screen Damage)",
      probability: Math.min((soundLevel - 84) / 32, 0.87),
      timeToFailure: soundLevel > 96 ? "4-7天 (4-7 days)" : "15-24天 (15-24 days)",
      recommendedAction: "更换筛网或调整振动参数 (Replace screens or adjust vibration parameters)"
    });
  }
  
  return defects;
};
