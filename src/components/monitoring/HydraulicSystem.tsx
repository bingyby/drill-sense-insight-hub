
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface HydraulicSystemProps {
  data: {
    pressure: number;
    pressureStatus: string;
    flowRate: number;
    flowRateStatus: string;
    temperature: number;
    temperatureStatus: string;
    elevatorAngle: number;
    cylinderPositions: {
      cylinder1: number;
      cylinder2: number;
      cylinder3: number;
      cylinder4: number;
    };
  };
}

export function HydraulicSystem({ data }: HydraulicSystemProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">System Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Pressure</span>
                <span className={`text-sm ${
                  data.pressureStatus === "normal" ? "text-green-500" : "text-red-500"
                }`}>
                  {data.pressure} PSI
                </span>
              </div>
              <Progress value={data.pressure / 50} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Flow Rate</span>
                <span className={`text-sm ${
                  data.flowRateStatus === "normal" ? "text-green-500" : "text-red-500"
                }`}>
                  {data.flowRate} GPM
                </span>
              </div>
              <Progress value={data.flowRate / 2} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Temperature</span>
                <span className={`text-sm ${
                  data.temperatureStatus === "normal" ? "text-green-500" : "text-red-500"
                }`}>
                  {data.temperature}°C
                </span>
              </div>
              <Progress value={data.temperature / 1.5} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Elevator Angle</span>
                <span className="text-sm">{data.elevatorAngle}°</span>
              </div>
              <Progress value={(data.elevatorAngle + 45) / 0.9} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Cylinder Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Cylinder 1</span>
                <span className="text-sm">{data.cylinderPositions.cylinder1}%</span>
              </div>
              <Progress value={data.cylinderPositions.cylinder1} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Cylinder 2</span>
                <span className="text-sm">{data.cylinderPositions.cylinder2}%</span>
              </div>
              <Progress value={data.cylinderPositions.cylinder2} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Cylinder 3</span>
                <span className="text-sm">{data.cylinderPositions.cylinder3}%</span>
              </div>
              <Progress value={data.cylinderPositions.cylinder3} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Cylinder 4</span>
                <span className="text-sm">{data.cylinderPositions.cylinder4}%</span>
              </div>
              <Progress value={data.cylinderPositions.cylinder4} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
