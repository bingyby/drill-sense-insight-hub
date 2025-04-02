
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Check, Clock, Tool, BarChart2 } from "lucide-react";

interface DefectPrediction {
  component: string;
  defectType: string;
  probability: number;
  timeToFailure: string;
  recommendedAction: string;
}

interface DefectPredictionsProps {
  predictions: DefectPrediction[];
}

export function DefectPredictions({ predictions }: DefectPredictionsProps) {
  // 获取概率对应的颜色 (Get color based on probability)
  const getProbabilityColor = (probability: number) => {
    if (probability < 0.2) return "bg-green-500";
    if (probability < 0.4) return "bg-yellow-500";
    if (probability < 0.7) return "bg-orange-500";
    return "bg-red-500";
  };

  // 获取概率对应的文本 (Get text based on probability)
  const getProbabilityText = (probability: number) => {
    if (probability < 0.2) return "低 (Low)";
    if (probability < 0.4) return "中低 (Medium-Low)";
    if (probability < 0.7) return "中高 (Medium-High)";
    return "高 (High)";
  };

  return (
    <div>
      <div className="flex items-center mb-4 space-x-2">
        <BarChart2 className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-bold">故障预测分析 (Defect Prediction Analysis)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {predictions.map((prediction, index) => (
          <Card key={index} className="border-l-4" style={{ borderLeftColor: `var(--${getProbabilityColor(prediction.probability).replace('bg-', '')})` }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex justify-between">
                <span>{prediction.component}</span>
                <span className="text-sm px-2 py-1 rounded-full" style={{ backgroundColor: `var(--${getProbabilityColor(prediction.probability).replace('bg-', '')})` }}>
                  {(prediction.probability * 100).toFixed(0)}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">故障类型 (Defect Type)</div>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>{prediction.defectType}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>故障概率 (Defect Probability)</span>
                  <span>{getProbabilityText(prediction.probability)}</span>
                </div>
                <Progress 
                  value={prediction.probability * 100} 
                  className={`h-2 ${getProbabilityColor(prediction.probability)}`} 
                />
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">预计故障时间 (Estimated Time to Failure)</div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{prediction.timeToFailure}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">建议措施 (Recommended Action)</div>
                <div className="flex items-center">
                  <Tool className="h-4 w-4 mr-2 text-purple-500" />
                  <span>{prediction.recommendedAction}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {predictions.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Check className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-medium">一切正常 (All Systems Normal)</h3>
          <p className="text-muted-foreground mt-2">
            当前未检测到潜在故障。系统运行良好。
            <br />
            No potential failures detected at this time. Systems are running well.
          </p>
        </div>
      )}
    </div>
  );
}
