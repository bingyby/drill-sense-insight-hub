
export function generateMockData() {
  // Generate dynamic mock data
  return {
    systemStatus: {
      status: getRandomItem(["operational", "warning", "critical"], [0.7, 0.2, 0.1]),
      motorStatus: Math.random() > 0.1,
      hydraulicStatus: Math.random() > 0.1,
      controlSystemStatus: Math.random() > 0.15,
      sensorNetworkStatus: Math.random() > 0.05
    },
    hydraulicSystem: {
      pressure: Math.floor(Math.random() * (4000 - 3500) + 3500),
      pressureStatus: Math.random() > 0.1 ? "normal" : "warning",
      flowRate: Math.floor(Math.random() * (150 - 120) + 120),
      flowRateStatus: Math.random() > 0.1 ? "normal" : "warning",
      temperature: Math.floor(Math.random() * (65 - 50) + 50),
      temperatureStatus: Math.random() > 0.1 ? "normal" : "warning",
      elevatorAngle: Math.floor(Math.random() * (30 - 10) + 10),
      cylinderPositions: {
        cylinder1: Math.floor(Math.random() * 100),
        cylinder2: Math.floor(Math.random() * 100),
        cylinder3: Math.floor(Math.random() * 100),
        cylinder4: Math.floor(Math.random() * 100)
      }
    },
    vibrationTemperature: {
      mainBearingTemp: Math.floor(Math.random() * (75 - 50) + 50),
      mainBearingTempStatus: Math.random() > 0.1 ? "normal" : "warning",
      crossheadTemp: Math.floor(Math.random() * (65 - 45) + 45),
      crossheadTempStatus: Math.random() > 0.1 ? "normal" : "warning",
      vibrationLevel: (Math.random() * (5.5 - 2.5) + 2.5).toFixed(2),
      vibrationStatus: Math.random() > 0.1 ? "normal" : "warning",
      vibrationData: [
        { 
          name: "Motor", 
          value: Math.floor(Math.random() * (5 - 2) + 2), 
          threshold: 4.5 
        },
        { 
          name: "Gearbox", 
          value: Math.floor(Math.random() * (4 - 1) + 1), 
          threshold: 3.5 
        },
        { 
          name: "Main Bearing", 
          value: Math.floor(Math.random() * (6 - 3) + 3), 
          threshold: 5 
        },
        { 
          name: "Shaft", 
          value: Math.floor(Math.random() * (3 - 1) + 1), 
          threshold: 2.5 
        }
      ]
    },
    electricalParameters: {
      voltage: Math.floor(Math.random() * (440 - 420) + 420),
      voltageStatus: Math.random() > 0.1 ? "normal" : "warning",
      current: Math.floor(Math.random() * (85 - 70) + 70),
      currentStatus: Math.random() > 0.1 ? "normal" : "warning",
      powerConsumption: Math.floor(Math.random() * (45 - 35) + 35),
      powerConsumptionStatus: Math.random() > 0.1 ? "normal" : "warning",
      loadFactor: Math.floor(Math.random() * (85 - 65) + 65),
      voltageHistory: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        value: Math.floor(Math.random() * (440 - 420) + 420)
      }))
    },
    operationalCommands: {
      torque: Math.floor(Math.random() * (85 - 70) + 70),
      torqueStatus: Math.random() > 0.1 ? "normal" : "warning",
      rpm: Math.floor(Math.random() * (180 - 150) + 150),
      rpmStatus: Math.random() > 0.1 ? "normal" : "warning",
      wob: Math.floor(Math.random() * (35 - 25) + 25),
      wobStatus: Math.random() > 0.1 ? "normal" : "warning",
      commands: [
        {
          id: "cmd-1",
          type: "Set RPM",
          value: "180 RPM",
          timestamp: "10:45:12",
          status: getRandomItem(["success", "warning", "error"], [0.8, 0.15, 0.05]) as "success" | "warning" | "error"
        },
        {
          id: "cmd-2",
          type: "Set WOB",
          value: "30 tons",
          timestamp: "10:43:05",
          status: getRandomItem(["success", "warning", "error"], [0.8, 0.15, 0.05]) as "success" | "warning" | "error"
        },
        {
          id: "cmd-3",
          type: "Increase Torque",
          value: "75 kNm",
          timestamp: "10:41:30",
          status: getRandomItem(["success", "warning", "error"], [0.8, 0.15, 0.05]) as "success" | "warning" | "error"
        },
        {
          id: "cmd-4",
          type: "Adjust Flow",
          value: "140 GPM",
          timestamp: "10:39:22",
          status: getRandomItem(["success", "warning", "error"], [0.8, 0.15, 0.05]) as "success" | "warning" | "error"
        }
      ]
    },
    environmentalData: {
      temperature: Math.floor(Math.random() * (40 - 20) + 20),
      humidity: Math.floor(Math.random() * (75 - 40) + 40),
      pressure: Math.floor(Math.random() * (1020 - 980) + 980),
      environmentHistory: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        temperature: Math.floor(Math.random() * (40 - 20) + 20),
        humidity: Math.floor(Math.random() * (75 - 40) + 40)
      }))
    },
    alerts: {
      total: Math.floor(Math.random() * 6),
      critical: Math.floor(Math.random() * 2)
    },
    motorStatus: Math.random() > 0.1 ? "running" : "stopped",
    componentHealth: {
      motor: Math.floor(Math.random() * (100 - 70) + 70),
      gearbox: Math.floor(Math.random() * (100 - 70) + 70),
      hydraulic: Math.floor(Math.random() * (100 - 70) + 70),
      bearings: Math.floor(Math.random() * (100 - 70) + 70)
    },
    systemEfficiency: Math.floor(Math.random() * (95 - 75) + 75)
  };
}

export function generateMockAlerts(count = 8) {
  const alertTypes = [
    {
      severity: "critical",
      components: ["Hydraulic System", "Motor Assembly", "Main Bearing", "Gearbox"],
      messages: [
        "Pressure exceeding critical threshold",
        "Temperature exceeding safe operating limits",
        "Vibration levels critical - immediate inspection required",
        "System failure detected - emergency shutdown recommended"
      ]
    },
    {
      severity: "warning",
      components: ["Hydraulic System", "Control System", "Cooling System", "Sensor Network"],
      messages: [
        "Pressure trending upward - monitor closely",
        "Temperature approaching warning threshold",
        "Minor vibration detected - schedule maintenance",
        "Flow rate inconsistency detected"
      ]
    },
    {
      severity: "info",
      components: ["System", "Maintenance", "Operations", "Environment"],
      messages: [
        "Scheduled maintenance due in 48 hours",
        "System update available",
        "Operating parameters within normal range",
        "Environmental conditions optimal"
      ]
    }
  ];

  return Array.from({ length: count }, (_, i) => {
    const severityType = getRandomItem(["critical", "warning", "info"], [0.2, 0.3, 0.5]);
    const alertType = alertTypes.find(t => t.severity === severityType)!;
    
    return {
      id: `alert-${Date.now()}-${i}`,
      severity: severityType as "critical" | "warning" | "info",
      component: getRandomItem(alertType.components),
      message: getRandomItem(alertType.messages),
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)),
      acknowledged: Math.random() > 0.7
    };
  });
}

export function generateHistoricalData(type: string, timeRange: string) {
  const dataPoints = getDataPointsForRange(timeRange);
  
  switch (type) {
    case "temperature":
      return Array.from({ length: dataPoints }, (_, i) => ({
        time: getTimeLabel(i, dataPoints, timeRange),
        bearingTemp: Math.floor(Math.random() * (80 - 40) + 40),
        motorTemp: Math.floor(Math.random() * (75 - 45) + 45)
      }));
    case "pressure":
      return Array.from({ length: dataPoints }, (_, i) => ({
        time: getTimeLabel(i, dataPoints, timeRange),
        pressure: Math.floor(Math.random() * (4000 - 3500) + 3500),
        flowRate: Math.floor(Math.random() * (150 - 120) + 120)
      }));
    case "vibration":
      return [
        { 
          component: "Motor", 
          current: Math.floor(Math.random() * (5 - 2) + 2), 
          threshold: 4.5 
        },
        { 
          component: "Gearbox", 
          current: Math.floor(Math.random() * (4 - 1) + 1), 
          threshold: 3.5 
        },
        { 
          component: "Main Bearing", 
          current: Math.floor(Math.random() * (6 - 3) + 3), 
          threshold: 5 
        },
        { 
          component: "Shaft", 
          current: Math.floor(Math.random() * (3 - 1) + 1), 
          threshold: 2.5 
        },
        { 
          component: "Crosshead", 
          current: Math.floor(Math.random() * (4 - 2) + 2), 
          threshold: 3.8 
        }
      ];
    default:
      return [];
  }
}

export function generateFaultDistribution() {
  return [
    { name: "Hydraulic System", value: Math.floor(Math.random() * (35 - 20) + 20) },
    { name: "Motor", value: Math.floor(Math.random() * (25 - 15) + 15) },
    { name: "Bearings", value: Math.floor(Math.random() * (20 - 10) + 10) },
    { name: "Control System", value: Math.floor(Math.random() * (15 - 5) + 5) },
    { name: "Other", value: Math.floor(Math.random() * (10 - 5) + 5) }
  ];
}

// Helper functions
function getRandomItem<T>(items: T[], weights?: number[]): T {
  if (weights && weights.length === items.length) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const randomValue = Math.random() * totalWeight;
    let weightSum = 0;
    
    for (let i = 0; i < items.length; i++) {
      weightSum += weights[i];
      if (randomValue <= weightSum) {
        return items[i];
      }
    }
  }
  
  return items[Math.floor(Math.random() * items.length)];
}

function getDataPointsForRange(timeRange: string): number {
  switch (timeRange) {
    case "6h": return 6;
    case "24h": return 24;
    case "7d": return 7;
    case "30d": return 30;
    default: return 24;
  }
}

function getTimeLabel(index: number, totalPoints: number, timeRange: string): string {
  switch (timeRange) {
    case "6h":
      return `${index}:00`;
    case "24h":
      return `${index}:00`;
    case "7d":
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return days[index % 7];
    case "30d":
      return `Day ${index + 1}`;
    default:
      return `${index}:00`;
  }
}
