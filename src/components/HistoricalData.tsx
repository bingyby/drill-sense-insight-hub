
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { useEffect, useState } from "react";
import { generateHistoricalData, generateFaultDistribution } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HistoricalData = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [pressureData, setPressureData] = useState([]);
  const [vibrationData, setVibrationData] = useState([]);
  const [faultDistribution, setFaultDistribution] = useState([]);
  const [timeRange, setTimeRange] = useState("24h");
  
  useEffect(() => {
    setTemperatureData(generateHistoricalData("temperature", timeRange));
    setPressureData(generateHistoricalData("pressure", timeRange));
    setVibrationData(generateHistoricalData("vibration", timeRange));
    setFaultDistribution(generateFaultDistribution());
  }, [timeRange]);
  
  const COLORS = ['#ff6b6b', '#feca57', '#1dd1a1', '#5f27cd', '#54a0ff'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Historical Performance</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Time Range:</span>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6h">6 Hours</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Temperature Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af' }}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af' }}
                    domain={['auto', 'auto']}
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
                    dataKey="bearingTemp" 
                    name="Main Bearing Temp" 
                    stroke="#ff6b6b" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="motorTemp" 
                    name="Motor Temp" 
                    stroke="#54a0ff" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Hydraulic Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pressureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af' }}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af' }}
                    domain={['auto', 'auto']}
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
                    dataKey="pressure" 
                    name="System Pressure" 
                    stroke="#1dd1a1" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="flowRate" 
                    name="Flow Rate" 
                    stroke="#feca57" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vibration Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vibrationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="component" 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af' }}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af' }}
                    domain={[0, 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderColor: '#374151',
                      color: '#e5e7eb'
                    }} 
                  />
                  <Legend />
                  <Bar 
                    dataKey="current" 
                    name="Current Level" 
                    fill="#54a0ff" 
                  />
                  <Bar 
                    dataKey="threshold" 
                    name="Warning Threshold" 
                    fill="#ff6b6b" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Fault Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={faultDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {faultDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderColor: '#374151',
                      color: '#e5e7eb'
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Component</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Technician</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="px-6 py-4">2023-05-15</td>
                  <td className="px-6 py-4">Hydraulic Pump</td>
                  <td className="px-6 py-4">Preventive</td>
                  <td className="px-6 py-4">J. Smith</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="px-6 py-4">2023-06-02</td>
                  <td className="px-6 py-4">Main Bearings</td>
                  <td className="px-6 py-4">Inspection</td>
                  <td className="px-6 py-4">A. Johnson</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="px-6 py-4">2023-07-18</td>
                  <td className="px-6 py-4">Electric Motor</td>
                  <td className="px-6 py-4">Repair</td>
                  <td className="px-6 py-4">R. Martinez</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="px-6 py-4">2023-09-10</td>
                  <td className="px-6 py-4">Cooling System</td>
                  <td className="px-6 py-4">Preventive</td>
                  <td className="px-6 py-4">K. Lewis</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">2023-11-05</td>
                  <td className="px-6 py-4">Gearbox</td>
                  <td className="px-6 py-4">Scheduled</td>
                  <td className="px-6 py-4">M. Wilson</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricalData;
