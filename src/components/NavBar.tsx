
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const NavBar = () => {
  const { toast } = useToast();

  const handleNotification = () => {
    // 导航到警报页面（tabs=alerts）
    window.location.href = "/?tabs=alerts";
  };
  
  const handleSettings = () => {
    toast({
      title: "设置",
      description: "系统设置面板将在下一个版本中提供",
    });
  };

  return (
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
  );
};

export default NavBar;
