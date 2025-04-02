
export interface SoundData {
  soundLevel: number;
  soundStatus: string;
}

// Sample sound data for monitoring
export const getSoundData = (): SoundData => {
  return {
    soundLevel: 75,
    soundStatus: "正常 (Normal)"
  };
};

// Function to predict defects based on sound level
export const predictDefectsFromSound = (soundLevel: number) => {
  const defects = [];
  
  // 轴承故障预测 (Bearing fault prediction)
  if (soundLevel > 85) {
    defects.push({
      component: "主轴承 (Main Bearing)",
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
  
  return defects;
};
