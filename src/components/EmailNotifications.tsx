import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Check, AlertTriangle, Volume2, AlertCircle, Thermometer, Droplets } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const EmailNotifications = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    soundAlerts: true,
    temperatureAlerts: true,
    vibrationAlerts: true,
    hydraulicAlerts: true,
    criticalOnly: false,
  });
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "邮箱格式错误",
        description: "请输入有效的电子邮箱地址",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to save email settings
    try {
      // In a real application, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "设置已保存",
        description: "故障通知将发送至您提供的电子邮箱",
        variant: "default"
      });
      
    } catch (error) {
      toast({
        title: "保存设置失败",
        description: "请稍后再试",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Toggle notification settings
  const toggleSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">故障通知设置</h2>
      <p className="text-slate-400">
        配置系统故障时的电子邮件通知，确保及时收到设备异常警报。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>邮件通知设置</CardTitle>
            <CardDescription>
              当系统检测到故障时将向此邮箱发送通知
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">电子邮箱</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="example@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700"
                />
              </div>
              
              <div className="pt-4">
                <Label className="text-base">通知过滤</Label>
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4 mt-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-slate-400" />
                      <Label htmlFor="critical-only" className="text-sm">仅接收危急警报</Label>
                    </div>
                    <Switch
                      id="critical-only"
                      checked={notificationSettings.criticalOnly}
                      onCheckedChange={() => toggleSetting('criticalOnly')}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "保存中..." : "保存设置"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>监控项目</CardTitle>
            <CardDescription>
              选择需要接收通知的设备故障类型
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-y-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-slate-400" />
                  <Label htmlFor="sound-alerts" className="text-sm">声音异常</Label>
                </div>
                <Switch 
                  id="sound-alerts"
                  checked={notificationSettings.soundAlerts}
                  onCheckedChange={() => toggleSetting('soundAlerts')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-slate-400" />
                  <Label htmlFor="temperature-alerts" className="text-sm">温度异常</Label>
                </div>
                <Switch 
                  id="temperature-alerts"
                  checked={notificationSettings.temperatureAlerts}
                  onCheckedChange={() => toggleSetting('temperatureAlerts')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-slate-400" />
                  <Label htmlFor="vibration-alerts" className="text-sm">振动异常</Label>
                </div>
                <Switch 
                  id="vibration-alerts"
                  checked={notificationSettings.vibrationAlerts}
                  onCheckedChange={() => toggleSetting('vibrationAlerts')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-slate-400" />
                  <Label htmlFor="hydraulic-alerts" className="text-sm">液压异常</Label>
                </div>
                <Switch 
                  id="hydraulic-alerts"
                  checked={notificationSettings.hydraulicAlerts}
                  onCheckedChange={() => toggleSetting('hydraulicAlerts')}
                />
              </div>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-md mt-4 border border-slate-700">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-slate-300">
                  设置完成后，当检测到异常时，系统将立即向您发送电子邮件通知，帮助您及时处理潜在故障。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>通知模拟测试</CardTitle>
          <CardDescription>
            发送测试通知以确认您的邮箱设置正确
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-800 p-4 rounded-md border border-slate-700">
            <p className="text-sm text-slate-300 mb-4">
              点击下方按钮发送测试邮件，确认您的邮箱能否正常接收通知。
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                  toast({
                    title: "邮箱未设置",
                    description: "请先输入有效的电子邮箱地址",
                    variant: "destructive"
                  });
                  return;
                }
                
                toast({
                  title: "测试邮件已发送",
                  description: `测试通知已发送至 ${email}`,
                });
              }}
            >
              发送测试通知
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailNotifications;
