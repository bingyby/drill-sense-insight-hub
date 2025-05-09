
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useState } from "react";

const NavBar = () => {
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);

  const handleNotification = () => {
    // 导航到警报页面（tabs=alerts）
    window.location.href = "/?tabs=alerts";
  };
  
  const handleSettings = () => {
    setShowSettings(true);
  };

  return (
    <>
      <nav className="bg-slate-950 border-b border-slate-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 mr-3"></div>
            <span className="font-bold text-xl">DrillSense</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleNotification}>
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSettings}>
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-slate-700 ml-2"></div>
          </div>
        </div>
      </nav>

      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <SheetContent className="bg-slate-900 border-l border-slate-800 text-white">
          <SheetHeader>
            <SheetTitle className="text-white">系统设置</SheetTitle>
            <SheetDescription className="text-slate-400">
              配置API和网络连接参数
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">API配置</h3>
              <div className="space-y-2">
                <div>
                  <label htmlFor="apiEndpoint" className="block text-sm font-medium text-slate-300">
                    API 接口地址
                  </label>
                  <input
                    id="apiEndpoint"
                    className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    defaultValue="https://api.drillsense.cn/v1/"
                  />
                </div>
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-slate-300">
                    API 密钥
                  </label>
                  <input
                    type="password"
                    id="apiKey"
                    className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    defaultValue="sk_live_******"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">网络配置</h3>
              <div className="space-y-2">
                <div>
                  <label htmlFor="socketUrl" className="block text-sm font-medium text-slate-300">
                    WebSocket 地址
                  </label>
                  <input
                    id="socketUrl"
                    className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    defaultValue="wss://realtime.drillsense.cn"
                  />
                </div>
                <div>
                  <label htmlFor="refreshRate" className="block text-sm font-medium text-slate-300">
                    数据刷新频率 (ms)
                  </label>
                  <input
                    type="number"
                    id="refreshRate"
                    className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    defaultValue="1000"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">连接测试</h3>
              <div className="space-y-4">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  测试 API 连接
                </Button>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  测试 WebSocket 连接
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">服务器状态</h3>
              <div className="px-4 py-3 bg-slate-800 rounded-md">
                <div className="flex justify-between items-center">
                  <span>API 服务器</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    在线
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>数据库服务器</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    在线
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>监控服务器</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    在线
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavBar;
