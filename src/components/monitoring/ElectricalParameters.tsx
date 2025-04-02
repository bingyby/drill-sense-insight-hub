
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

interface ElectricalParametersProps {
  data: {
    voltage: number;
    voltageStatus: string;
    current: number;
    currentStatus: string;
    powerConsumption: number;
    powerConsumptionStatus: string;
    loadFactor: number;
    voltageHistory: {
      time: string;
      value: number;
    }[];
  };
}

export function ElectricalParameters({ data }: ElectricalParametersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Electrical Readings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Voltage</span>
                <span className={`text-sm ${
                  data.voltageStatus === "normal" ? "text-green-500" : "text-red-500"
                }`}>
                  {data.voltage} V
                </span>
              </div>
              <Progress 
                value={(data.voltage / 500) * 100} 
                className="h-2" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Current</span>
                <span className={`text-sm ${
                  data.currentStatus === "normal" ? "text-green-500" : "text-red-500"
                }`}>
                  {data.current} A
                </span>
              </div>
              <Progress 
                value={(data.current / 100) * 100} 
                className="h-2" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Power Consumption</span>
                <span className={`text-sm ${
                  data.powerConsumptionStatus === "normal" ? "text-green-500" : "text-red-500"
                }`}>
                  {data.powerConsumption} kW
                </span>
              </div>
              <Progress 
                value={(data.powerConsumption / 50) * 100} 
                className="h-2" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Load Factor</span>
                <span className="text-sm">
                  {data.loadFactor}%
                </span>
              </div>
              <Progress 
                value={data.loadFactor} 
                className={`h-2 ${
                  data.loadFactor > 80 ? "bg-red-500" : 
                  data.loadFactor > 60 ? "bg-yellow-500" : "bg-green-500"
                }`} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Voltage History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.voltageHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
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
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Voltage" 
                  stroke="#38bdf8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
