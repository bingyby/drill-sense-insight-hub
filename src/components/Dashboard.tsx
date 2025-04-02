
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HydraulicSystem } from "@/components/monitoring/HydraulicSystem";
import { VibrationTemperature } from "@/components/monitoring/VibrationTemperature";
import { ElectricalParameters } from "@/components/monitoring/ElectricalParameters";
import { OperationalCommands } from "@/components/monitoring/OperationalCommands";
import { EnvironmentalData } from "@/components/monitoring/EnvironmentalData";
import { SystemStatus } from "@/components/monitoring/SystemStatus";
import { useEffect, useState } from "react";
import { generateMockData } from "@/lib/mock-data";

const Dashboard = () => {
  const [data, setData] = useState(generateMockData());
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <SystemStatus data={data.systemStatus} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hydraulic Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.hydraulicSystem.pressure} PSI</div>
            <p className="text-xs text-muted-foreground">
              {data.hydraulicSystem.pressureStatus === "normal" 
                ? "Operating normally" 
                : "Warning: Pressure irregular"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Main Bearing Temp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.vibrationTemperature.mainBearingTemp}°C</div>
            <p className="text-xs text-muted-foreground">
              {data.vibrationTemperature.mainBearingTempStatus === "normal" 
                ? "Within normal range" 
                : "Warning: Temperature elevated"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.alerts.total}</div>
            <p className="text-xs text-muted-foreground">
              {data.alerts.critical > 0 
                ? `${data.alerts.critical} critical alerts` 
                : "No critical alerts"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="hydraulic">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="hydraulic">Hydraulic</TabsTrigger>
          <TabsTrigger value="vibration">Vibration/Temp</TabsTrigger>
          <TabsTrigger value="electrical">Electrical</TabsTrigger>
          <TabsTrigger value="operational">Operations</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hydraulic" className="mt-4">
          <HydraulicSystem data={data.hydraulicSystem} />
        </TabsContent>
        
        <TabsContent value="vibration" className="mt-4">
          <VibrationTemperature data={data.vibrationTemperature} />
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
      </Tabs>
    </div>
  );
};

export default Dashboard;
