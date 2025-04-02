
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import DigitalTwin from "@/components/DigitalTwin";
import Alerts from "@/components/Alerts";
import HistoricalData from "@/components/HistoricalData";
import NavBar from "@/components/NavBar";
import { LayoutDashboard, Activity, Bell, LineChart, Disc3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">DrillSense Insight Hub - 钻井智能监控系统</h1>
          <p className="text-slate-400 mt-2">顶驱钻井故障监控系统 (Top Drive Drilling Fault Monitoring System)</p>
        </header>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              <span>仪表盘 (Dashboard)</span>
            </TabsTrigger>
            <TabsTrigger value="digital-twin" className="flex items-center justify-center">
              <Disc3 className="h-4 w-4 mr-2" />
              <span>数字孪生 (Digital Twin)</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center justify-center">
              <Bell className="h-4 w-4 mr-2" />
              <span>警报 (Alerts)</span>
            </TabsTrigger>
            <TabsTrigger value="historical" className="flex items-center justify-center">
              <LineChart className="h-4 w-4 mr-2" />
              <span>历史数据 (Historical)</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="digital-twin">
            <DigitalTwin />
          </TabsContent>
          
          <TabsContent value="alerts">
            <Alerts />
          </TabsContent>
          
          <TabsContent value="historical">
            <HistoricalData />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
