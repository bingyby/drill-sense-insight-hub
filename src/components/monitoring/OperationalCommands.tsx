
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface OperationalCommandsProps {
  data: {
    torque: number;
    torqueStatus: string;
    rpm: number;
    rpmStatus: string;
    wob: number;
    wobStatus: string;
    commands: {
      id: string;
      type: string;
      value: string;
      timestamp: string;
      status: "success" | "warning" | "error";
    }[];
  };
}

export function OperationalCommands({ data }: OperationalCommandsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Operational Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Torque</span>
                <span className={`text-sm ${
                  data.torqueStatus === "normal" ? "text-green-500" : "text-red-500"
                }`}>
                  {data.torque} kNm
                </span>
              </div>
              <Progress 
                value={(data.torque / 100) * 100} 
                className="h-2" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">RPM</span>
                <span className={`text-sm ${
                  data.rpmStatus === "normal" ? "text-green-500" : "text-red-500"
                }`}>
                  {data.rpm}
                </span>
              </div>
              <Progress 
                value={(data.rpm / 2) * 100} 
                className="h-2" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Weight on Bit (WOB)</span>
                <span className={`text-sm ${
                  data.wobStatus === "normal" ? "text-green-500" : "text-red-500"
                }`}>
                  {data.wob} tons
                </span>
              </div>
              <Progress 
                value={(data.wob / 0.5) * 100} 
                className="h-2" 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Recent Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
            {data.commands.map((command) => (
              <div 
                key={command.id} 
                className="p-2 rounded bg-slate-800 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        command.status === "success" ? "default" : 
                        command.status === "warning" ? "secondary" : "destructive"
                      }
                    >
                      {command.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {command.timestamp}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{command.value}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  command.status === "success" ? "bg-green-500" :
                  command.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                }`}></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
