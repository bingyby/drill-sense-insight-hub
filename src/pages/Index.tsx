
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import DigitalTwin from "@/components/DigitalTwin";
import Alerts from "@/components/Alerts";
import HistoricalData from "@/components/HistoricalData";
import NavBar from "@/components/NavBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">DrillSense Insight Hub</h1>
          <p className="text-slate-400 mt-2">Top Drive Drilling Fault Monitoring System</p>
        </header>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="digital-twin">Digital Twin</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="historical">Historical Data</TabsTrigger>
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
