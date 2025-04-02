
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HydraulicSystem } from "@/components/monitoring/HydraulicSystem";
import { VibrationTemperature } from "@/components/monitoring/VibrationTemperature";
import { ElectricalParameters } from "@/components/monitoring/ElectricalParameters";
import { OperationalCommands } from "@/components/monitoring/OperationalCommands";
import { EnvironmentalData } from "@/components/monitoring/EnvironmentalData";
import { SystemStatus } from "@/components/monitoring/SystemStatus";
import { DefectPredictions } from "@/components/monitoring/DefectPredictions";
import { SoundMonitoring } from "@/components/monitoring/SoundMonitoring";
import { useEffect, useState } from "react";
import { generateMockData } from "@/lib/mock-data";
import { predictDefects } from "@/lib/defect-predictor";
import { getSoundData } from "@/lib/sound-data";
import { Activity, AlertTriangle, Gauge, ThermometerSnowflake, Volume2 } from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState(generateMockData());
  const [defectPredictions, setDefectPredictions] = useState(predictDefects(data));
  const [soundData, setSoundData] = useState(getSoundData());
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData();
      setData(newData);
      setDefectPredictions(predictDefects(newData));
      setSoundData(getSoundData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Ensure the status property is of the correct type
  const systemStatusData = {
    ...data.systemStatus,
    status: data.systemStatus.status as "operational" | "warning" | "critical"
  };

  // Create properly typed data for sound monitoring
  const soundMonitoringData = {
    soundLevel: soundData.soundLevel,
    soundStatus: soundData.soundStatus
  };

  // Ensure vibrationLevel is a number
  const vibrationTemperatureData = {
    ...data.vibrationTemperature,
    vibrationLevel: typeof data.vibrationTemperature.vibrationLevel === 'string' 
      ? parseFloat(data.vibrationTemperature.vibrationLevel) 
      : data.vibrationTemperature.vibrationLevel
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              系统状态 (System Status)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SystemStatus data={systemStatusData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Gauge className="w-4 h-4 mr-2" />
              液压压力 (Hydraulic Pressure)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.hydraulicSystem.pressure} PSI</div>
            <p className="text-xs text-muted-foreground">
              {data.hydraulicSystem.pressureStatus === "normal" 
                ? "运行正常 (Operating normally)" 
                : "警告: 压力异常 (Warning: Pressure irregular)"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ThermometerSnowflake className="w-4 h-4 mr-2" />
              主轴承温度 (Main Bearing Temp)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.vibrationTemperature.mainBearingTemp}°C</div>
            <p className="text-xs text-muted-foreground">
              {data.vibrationTemperature.mainBearingTempStatus === "normal" 
                ? "正常范围内 (Within normal range)" 
                : "警告: 温度升高 (Warning: Temperature elevated)"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              活动警报 (Active Alerts)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.alerts.total}</div>
            <p className="text-xs text-muted-foreground">
              {data.alerts.critical > 0 
                ? `${data.alerts.critical} 个严重警报 (critical alerts)` 
                : "无严重警报 (No critical alerts)"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Volume2 className="w-4 h-4 mr-2" />
            声音监控 (Sound Monitoring)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SoundMonitoring data={soundMonitoringData} />
        </CardContent>
      </Card>
      
      <Tabs defaultValue="hydraulic">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="hydraulic">液压 (Hydraulic)</TabsTrigger>
          <TabsTrigger value="vibration">振动/温度 (Vibration/Temp)</TabsTrigger>
          <TabsTrigger value="electrical">电气 (Electrical)</TabsTrigger>
          <TabsTrigger value="operational">操作 (Operations)</TabsTrigger>
          <TabsTrigger value="environmental">环境 (Environmental)</TabsTrigger>
          <TabsTrigger value="defects">故障预测 (Defect Predictions)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hydraulic" className="mt-4">
          <HydraulicSystem data={data.hydraulicSystem} />
        </TabsContent>
        
        <TabsContent value="vibration" className="mt-4">
          <VibrationTemperature data={vibrationTemperatureData} />
        </TabsContent>
        
        <TabsContent value="electrical" className="mt-4">
          <ElectricalParameters data={data.electricalParameters} />
        </TabsContent>
        
        <TabsContent value="operational" className="mt-4">
          <OperationalCommands data={data.operationalCommands} />
        </TabsContent>
        
        <TabsContent value="environmental" className="mt-4">
          <EnvironmentalData data={data.environmentalData} />
        </TabsContent>
        
        <TabsContent value="defects" className="mt-4">
          <DefectPredictions predictions={defectPredictions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
