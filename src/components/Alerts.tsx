
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { generateMockAlerts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
          title: "New Alert Detected",
          description: `${newAlerts[0].severity.toUpperCase()}: ${newAlerts[0].message}`,
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
      title: "Alert Acknowledged",
      description: "The alert has been acknowledged and added to the log.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {alerts.filter(a => a.severity === "critical" && !a.acknowledged).length}
            </div>
            <p className="text-sm text-muted-foreground">
              {alerts.filter(a => a.severity === "critical" && !a.acknowledged).length > 0 
                ? "Immediate attention required" 
                : "No critical alerts"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Warning Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">
              {alerts.filter(a => a.severity === "warning" && !a.acknowledged).length}
            </div>
            <p className="text-sm text-muted-foreground">
              {alerts.filter(a => a.severity === "warning" && !a.acknowledged).length > 0 
                ? "Attention needed soon" 
                : "No warning alerts"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Information Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">
              {alerts.filter(a => a.severity === "info" && !a.acknowledged).length}
            </div>
            <p className="text-sm text-muted-foreground">
              {alerts.filter(a => a.severity === "info" && !a.acknowledged).length > 0 
                ? "For your information" 
                : "No information alerts"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.filter(alert => !alert.acknowledged).length === 0 ? (
              <p className="text-center py-6 text-muted-foreground">No active alerts</p>
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
                          {alert.severity.toUpperCase()}
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
                      Acknowledge
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
