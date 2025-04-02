
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { generateMockAlerts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  message: string;
  component: string;
  timestamp: Date;
  acknowledged: boolean;
}

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    setAlerts(generateMockAlerts());
    
    // Simulate new alerts occasionally
    const interval = setInterval(() => {
      const shouldAddAlert = Math.random() > 0.7;
      if (shouldAddAlert) {
        const newAlerts = generateMockAlerts(1);
        setAlerts(prev => [...newAlerts, ...prev]);
        
        toast({
          title: "新警报",
          description: `${getSeverityText(newAlerts[0].severity)}: ${newAlerts[0].message}`,
          variant: newAlerts[0].severity === "critical" ? "destructive" : "default",
        });
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [toast]);
  
  const acknowledgeAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
    
    toast({
      title: "警报已确认",
      description: "该警报已被确认并添加到日志中。",
    });
  };

  // Helper function to convert severity to Chinese
  const getSeverityText = (severity: string): string => {
    switch (severity) {
      case "critical": return "危急";
      case "warning": return "警告";
      case "info": return "信息";
      default: return severity;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">危急警报</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {alerts.filter(a => a.severity === "critical" && !a.acknowledged).length}
            </div>
            <p className="text-sm text-muted-foreground">
              {alerts.filter(a => a.severity === "critical" && !a.acknowledged).length > 0 
                ? "需立即处理" 
                : "无危急警报"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">警告警报</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">
              {alerts.filter(a => a.severity === "warning" && !a.acknowledged).length}
            </div>
            <p className="text-sm text-muted-foreground">
              {alerts.filter(a => a.severity === "warning" && !a.acknowledged).length > 0 
                ? "需要关注" 
                : "无警告警报"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">信息警报</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">
              {alerts.filter(a => a.severity === "info" && !a.acknowledged).length}
            </div>
            <p className="text-sm text-muted-foreground">
              {alerts.filter(a => a.severity === "info" && !a.acknowledged).length > 0 
                ? "仅供参考" 
                : "无信息警报"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>活动警报</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.filter(alert => !alert.acknowledged).length === 0 ? (
              <p className="text-center py-6 text-muted-foreground">无活动警报</p>
            ) : (
              alerts
                .filter(alert => !alert.acknowledged)
                .map(alert => (
                  <div key={alert.id} className={`p-4 rounded-md border flex items-start justify-between ${
                    alert.severity === "critical" ? "border-red-500 bg-red-500/10" :
                    alert.severity === "warning" ? "border-yellow-500 bg-yellow-500/10" :
                    "border-blue-500 bg-blue-500/10"
                  }`}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={
                          alert.severity === "critical" ? "destructive" :
                          alert.severity === "warning" ? "default" :
                          "secondary"
                        }>
                          {getSeverityText(alert.severity)}
                        </Badge>
                        <span className="font-medium">{alert.component}</span>
                      </div>
                      <p className="text-sm mb-1">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      确认
                    </Button>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
