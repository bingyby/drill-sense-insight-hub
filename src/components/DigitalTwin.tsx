
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { generateMockData } from "@/lib/mock-data";

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
            <CardTitle>Top Drive Digital Twin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-slate-800 rounded-md flex items-center justify-center">
              <div className="text-center p-8">
                <div className="flex flex-col items-center">
                  <div className="w-96 h-96 relative">
                    {/* Simplified Digital Twin Visualization */}
                    <div className="absolute inset-0 border-4 border-slate-700 rounded-lg"></div>
                    
                    {/* Top Section (Motor) */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-40 h-24 bg-slate-600 rounded-md flex items-center justify-center">
                      <span className="text-xs">Motor Assembly</span>
                      
                      {/* Status indicator */}
                      <div className={`absolute top-2 right-2 w-4 h-4 rounded-full ${
                        data.motorStatus === "running" ? "bg-green-500" : "bg-red-500"
                      }`}></div>
                    </div>
                    
                    {/* Central Shaft */}
                    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-8 h-56 bg-slate-500"></div>
                    
                    {/* Main Gear Box */}
                    <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-56 h-32 bg-slate-600 rounded-md flex items-center justify-center">
                      <span className="text-xs">Gearbox</span>
                      
                      {/* Status indicator */}
                      <div className={`absolute top-2 right-2 w-4 h-4 rounded-full ${
                        data.hydraulicSystem.pressureStatus === "normal" ? "bg-green-500" : "bg-yellow-500"
                      }`}></div>
                    </div>
                    
                    {/* Hydraulic System */}
                    <div className="absolute top-48 left-3/4 w-16 h-20 bg-slate-700 rounded-md flex items-center justify-center">
                      <span className="text-xs text-center">Hydraulic System</span>
                    </div>
                    
                    {/* Bottom Connection */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-slate-600 rounded-md flex items-center justify-center">
                      <span className="text-xs">Drill Connection</span>
                    </div>
                    
                    {/* Sensor Points */}
                    <div className="absolute top-20 left-1/4 w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-56 left-1/4 w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-36 right-1/4 w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="bg-slate-700 p-4 rounded-md">
                    <h3 className="text-sm font-medium mb-1">Motor Status</h3>
                    <p className="text-xl font-bold">{data.systemStatus.motorStatus ? "Online" : "Offline"}</p>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-md">
                    <h3 className="text-sm font-medium mb-1">Hydraulic Pressure</h3>
                    <p className="text-xl font-bold">{data.hydraulicSystem.pressure} PSI</p>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-md">
                    <h3 className="text-sm font-medium mb-1">Main Bearing Temp</h3>
                    <p className="text-xl font-bold">{data.vibrationTemperature.mainBearingTemp}°C</p>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-md">
                    <h3 className="text-sm font-medium mb-1">Vibration Level</h3>
                    <p className="text-xl font-bold">{data.vibrationTemperature.vibrationLevel} mm/s</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Component Health</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>Motor Assembly</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    data.componentHealth.motor > 80 ? "bg-green-500/20 text-green-500" : 
                    data.componentHealth.motor > 60 ? "bg-yellow-500/20 text-yellow-500" : 
                    "bg-red-500/20 text-red-500"
                  }`}>
                    {data.componentHealth.motor}%
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Gearbox</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    data.componentHealth.gearbox > 80 ? "bg-green-500/20 text-green-500" : 
                    data.componentHealth.gearbox > 60 ? "bg-yellow-500/20 text-yellow-500" : 
                    "bg-red-500/20 text-red-500"
                  }`}>
                    {data.componentHealth.gearbox}%
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Hydraulic System</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    data.componentHealth.hydraulic > 80 ? "bg-green-500/20 text-green-500" : 
                    data.componentHealth.hydraulic > 60 ? "bg-yellow-500/20 text-yellow-500" : 
                    "bg-red-500/20 text-red-500"
                  }`}>
                    {data.componentHealth.hydraulic}%
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Bearings</span>
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
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Operating Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>Torque</span>
                  <span>{data.operationalCommands.torque} kNm</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>RPM</span>
                  <span>{data.operationalCommands.rpm}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Weight on Bit</span>
                  <span>{data.operationalCommands.wob} ton</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Flow Rate</span>
                  <span>{data.hydraulicSystem.flowRate} gpm</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">System Efficiency</CardTitle>
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
