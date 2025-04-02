
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const NavBar = () => {
  const { toast } = useToast();

  const handleNotification = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread alerts that require attention",
    });
  };
  
  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "System settings panel will be available in the next update",
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
