
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { generateMockData } from "@/lib/mock-data";
import DrillModel3D from "./DrillModel3D";
import { Wrench, Gauge, Thermometer, Activity } from "lucide-react";

const DigitalTwin = () => {
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
      <div className="grid grid-cols-1 gap-6">
        <Card className="border border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="mr-2 h-5 w-5" />
              钻井设备数字孪生 (Top Drive Digital Twin)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <DrillModel3D data={{
                  motorStatus: data.systemStatus.motorStatus,
                  hydraulicPressure: data.hydraulicSystem.pressure,
                  mainBearingTemp: data.vibrationTemperature.mainBearingTemp,
                  vibrationLevel: typeof data.vibrationTemperature.vibrationLevel === 'string' 
                    ? parseFloat(data.vibrationTemperature.vibrationLevel) 
                    : data.vibrationTemperature.vibrationLevel
                }} />
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm flex items-center">
                        <Activity className="w-4 h-4 mr-1" />
                        电机状态 (Motor Status)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="text-xl font-bold">{data.systemStatus.motorStatus ? "运行中 (Online)" : "停机 (Offline)"}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm flex items-center">
                        <Gauge className="w-4 h-4 mr-1" />
                        液压压力 (Hydraulic)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="text-xl font-bold">{data.hydraulicSystem.pressure} PSI</div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center">
                      <Thermometer className="w-4 h-4 mr-1" />
                      轴承温度 (Bearing Temp)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="text-xl font-bold">{data.vibrationTemperature.mainBearingTemp}°C</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">组件健康状况 (Component Health)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>顶驱 (Top Drive)</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          data.componentHealth.motor > 80 ? "bg-green-500/20 text-green-500" : 
                          data.componentHealth.motor > 60 ? "bg-yellow-500/20 text-yellow-500" : 
                          "bg-red-500/20 text-red-500"
                        }`}>
                          {data.componentHealth.motor}%
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>井架 (Derrick)</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          data.componentHealth.gearbox > 80 ? "bg-green-500/20 text-green-500" : 
                          data.componentHealth.gearbox > 60 ? "bg-yellow-500/20 text-yellow-500" : 
                          "bg-red-500/20 text-red-500"
                        }`}>
                          {data.componentHealth.gearbox}%
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>泥浆泵 (Mud Pump)</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          data.componentHealth.hydraulic > 80 ? "bg-green-500/20 text-green-500" : 
                          data.componentHealth.hydraulic > 60 ? "bg-yellow-500/20 text-yellow-500" : 
                          "bg-red-500/20 text-red-500"
                        }`}>
                          {data.componentHealth.hydraulic}%
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>绞车 (Drawworks)</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          data.componentHealth.bearings > 80 ? "bg-green-500/20 text-green-500" : 
                          data.componentHealth.bearings > 60 ? "bg-yellow-500/20 text-yellow-500" : 
                          "bg-red-500/20 text-red-500"
                        }`}>
                          {data.componentHealth.bearings}%
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">操作参数 (Operating Parameters)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>扭矩 (Torque)</span>
                  <span>{data.operationalCommands.torque} kNm</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>转速 (RPM)</span>
                  <span>{data.operationalCommands.rpm}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>钻压 (Weight on Bit)</span>
                  <span>{data.operationalCommands.wob} ton</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>泥浆流量 (Flow Rate)</span>
                  <span>{data.hydraulicSystem.flowRate} gpm</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">振动数据 (Vibration Data)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.vibrationTemperature.vibrationData.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span className={item.value > item.threshold ? "text-red-500" : "text-green-500"}>
                      {item.value} mm/s
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">系统效率 (System Efficiency)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-full">
                <div className="w-32 h-32 rounded-full border-8 border-slate-700 flex items-center justify-center relative">
                  <div className="text-2xl font-bold">{data.systemEfficiency}%</div>
                  <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="46" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="8" 
                      strokeDasharray={`${data.systemEfficiency * 2.89} 289`}
                      strokeLinecap="round" 
                      transform="rotate(-90 50 50)" 
                      className="text-teal-500" 
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;
