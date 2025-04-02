
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer 
} from "recharts";

interface VibrationTemperatureProps {
  data: {
    mainBearingTemp: number;
    mainBearingTempStatus: string;
    crossheadTemp: number;
    crossheadTempStatus: string;
    vibrationLevel: number;
    vibrationStatus: string;
    vibrationData: {
      name: string;
      value: number;
      threshold: number;
    }[];
  };
}

export function VibrationTemperature({ data }: VibrationTemperatureProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Temperature Readings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Main Bearing Temperature</span>
                <span className={`text-sm ${
                  data.mainBearingTempStatus === "normal" ? "text-green-500" : "text-red-500"
                }`}>
                  {data.mainBearingTemp}°C
                </span>
              </div>
              <Progress 
                value={(data.mainBearingTemp / 100) * 100} 
                className={`h-2 ${
                  data.mainBearingTemp > 80 ? "bg-red-500" : 
                  data.mainBearingTemp > 60 ? "bg-yellow-500" : "bg-green-500"
                }`} 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Crosshead Guide Plate Temperature</span>
                <span className={`text-sm ${
                  data.crossheadTempStatus === "normal" ? "text-green-500" : "text-red-500"
                }`}>
                  {data.crossheadTemp}°C
                </span>
              </div>
              <Progress 
                value={(data.crossheadTemp / 100) * 100} 
                className={`h-2 ${
                  data.crossheadTemp > 80 ? "bg-red-500" : 
                  data.crossheadTemp > 60 ? "bg-yellow-500" : "bg-green-500"
                }`} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Vibration Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.vibrationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  tick={{ fill: '#9ca3af' }}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  tick={{ fill: '#9ca3af' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    borderColor: '#374151',
                    color: '#e5e7eb'
                  }} 
                />
                <Legend />
                <Bar dataKey="value" name="Current" fill="#38bdf8" />
                <Bar dataKey="threshold" name="Threshold" fill="#fb7185" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
