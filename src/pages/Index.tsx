
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import DigitalTwin from "@/components/DigitalTwin";
import Alerts from "@/components/Alerts";
import HistoricalData from "@/components/HistoricalData";
import NavBar from "@/components/NavBar";
import { LayoutDashboard, Activity, Bell, LineChart, Disc3, Volume2, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { getSoundData, predictDefectsFromSound } from "@/lib/sound-data";
import { SoundMonitoring } from "@/components/monitoring/SoundMonitoring";
import { DefectPredictions } from "@/components/monitoring/DefectPredictions";
import EmailNotifications from "@/components/EmailNotifications";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  useEffect(() => {
    // 从URL中获取tabs参数，用于直接导航
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tabs');
    
    if (tabParam && ["dashboard", "digital-twin", "sound-monitoring", "alerts", 
                    "historical", "notifications"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // 更新URL，方便直接导航
    const url = new URL(window.location.href);
    url.searchParams.set("tabs", value);
    window.history.pushState({}, "", url);
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">北航钻井智能监控系统</h1>
          <p className="text-slate-400 mt-2">顶驱钻井故障监控系统</p>
        </header>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-4 gap-1' : 'grid-cols-6'} mb-8`}>
            <TabsTrigger value="dashboard" className="flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              <span>仪表盘</span>
            </TabsTrigger>
            <TabsTrigger value="digital-twin" className="flex items-center justify-center">
              <Disc3 className="h-4 w-4 mr-2" />
              <span>数字孪生</span>
            </TabsTrigger>
            <TabsTrigger value="sound-monitoring" className="flex items-center justify-center">
              <Volume2 className="h-4 w-4 mr-2" />
              <span>声音监测</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center justify-center">
              <Bell className="h-4 w-4 mr-2" />
              <span>警报</span>
            </TabsTrigger>
            <TabsTrigger value="historical" className="flex items-center justify-center">
              <LineChart className="h-4 w-4 mr-2" />
              <span>历史数据</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center justify-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>通知设置</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="digital-twin">
            <DigitalTwin />
          </TabsContent>
          
          <TabsContent value="sound-monitoring">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold">声音监测与分析</h2>
              <p className="text-slate-400">
                实时监测设备声音特征，提前发现异常，预防设备故障。
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SoundMonitoringDashboard />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts">
            <Alerts />
          </TabsContent>
          
          <TabsContent value="historical">
            <HistoricalData />
          </TabsContent>
          
          <TabsContent value="notifications">
            <EmailNotifications />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Sound monitoring dashboard component for the tab
const SoundMonitoringDashboard = () => {
  const [soundData, setSoundData] = useState(getSoundData());
  const [soundPredictions, setSoundPredictions] = useState(predictDefectsFromSound(soundData.soundLevel));
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newSoundData = getSoundData();
      setSoundData(newSoundData);
      setSoundPredictions(predictDefectsFromSound(newSoundData.soundLevel));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Volume2 className="h-5 w-5 mr-2" />
            声音监测
          </h3>
          <SoundMonitoring data={soundData} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            基于声音的故障预测
          </h3>
          <DefectPredictions predictions={soundPredictions} />
        </div>
      </div>
    </>
  );
};

export default Index;
