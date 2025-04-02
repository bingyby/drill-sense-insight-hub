
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle 
} from "lucide-react";

interface SystemStatusProps {
  data: {
    status: "operational" | "warning" | "critical";
    motorStatus: boolean;
    hydraulicStatus: boolean;
    controlSystemStatus: boolean;
    sensorNetworkStatus: boolean;
  };
}

export function SystemStatus({ data }: SystemStatusProps) {
  const getStatusIcon = (status: boolean) => {
    if (status) {
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getSystemStatusIndicator = () => {
    switch (data.status) {
      case "operational":
        return (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle2 className="w-5 h-5" />
            <span>Operational</span>
          </div>
        );
      case "warning":
        return (
          <div className="flex items-center gap-2 text-yellow-500">
            <AlertTriangle className="w-5 h-5" />
            <span>Warning</span>
          </div>
        );
      case "critical":
        return (
          <div className="flex items-center gap-2 text-red-500">
            <XCircle className="w-5 h-5" />
            <span>Critical</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-4 text-lg font-medium">
        {getSystemStatusIndicator()}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Motor</span>
          {getStatusIcon(data.motorStatus)}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Hydraulic System</span>
          {getStatusIcon(data.hydraulicStatus)}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Control System</span>
          {getStatusIcon(data.controlSystemStatus)}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Sensor Network</span>
          {getStatusIcon(data.sensorNetworkStatus)}
        </div>
      </div>
    </div>
  );
}
