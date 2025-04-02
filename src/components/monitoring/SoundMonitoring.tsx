
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Volume2, VolumeX } from "lucide-react";
import { SoundWaveform } from "./SoundWaveform";

interface SoundMonitoringProps {
  data: {
    soundLevel: number;
    soundStatus: string;
    waveform: number[];
  };
}

export function SoundMonitoring({ data }: SoundMonitoringProps) {
  // 声音级别评估 (Sound level assessment)
  const getSoundLevelStatus = (level: number) => {
    if (level < 70) return "安静 (Quiet)";
    if (level < 80) return "正常 (Normal)";
    if (level < 90) return "较高 (Elevated)";
    if (level < 100) return "警告 (Warning)";
    return "危险 (Dangerous)";
  };

  // 声音级别对应的颜色 (Color for sound level)
  const getSoundLevelColor = (level: number) => {
    if (level < 80) return "bg-green-500";
    if (level < 85) return "bg-yellow-500";
    if (level < 90) return "bg-orange-500";
    return "bg-red-500";
  };

  // 声音级别对应的图标 (Icon for sound level)
  const SoundIcon = data.soundLevel > 85 ? Volume2 : (data.soundLevel > 70 ? Volume2 : VolumeX);

  // 计算声音条的百分比 (Calculate sound bar percentage)
  const soundPercentage = Math.min((data.soundLevel / 120) * 100, 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <SoundIcon className={`h-5 w-5 ${data.soundLevel > 85 ? "text-red-500" : "text-green-500"}`} />
          <span className="font-medium">声级值 (Sound Level):</span>
        </div>
        <span className="font-bold text-xl">{data.soundLevel} dB</span>
      </div>

      <Progress 
        value={soundPercentage} 
        className={`h-3 ${getSoundLevelColor(data.soundLevel)}`} 
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>60 dB (安静/Quiet)</span>
        <span>85 dB (警戒线/Threshold)</span>
        <span>120 dB (危险/Danger)</span>
      </div>

      {/* Sound waveform visualization */}
      <SoundWaveform data={data.waveform} soundLevel={data.soundLevel} />

      {data.soundLevel > 85 && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>声音警告 (Sound Warning)</AlertTitle>
          <AlertDescription>
            设备声音级别已超过85分贝安全阈值。长期暴露可能导致听力损伤和设备故障。
            <br />
            Equipment sound level has exceeded the 85 dB safety threshold. Prolonged exposure may cause hearing damage and equipment failure.
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-slate-800 p-3 rounded-md mt-2">
        <div className="font-medium mb-1">当前状态评估 (Current Status Assessment):</div>
        <div className="text-sm">
          <span className="font-bold">{getSoundLevelStatus(data.soundLevel)}</span> - 
          {data.soundLevel < 85 
            ? " 设备运行声音在可接受范围内。 (Equipment operating sounds are within acceptable range.)" 
            : " 声音异常，建议检查设备是否有松动、摩擦或轴承问题。 (Sound anomaly detected, check for loose parts, friction, or bearing issues.)"}
        </div>
      </div>
    </div>
  );
}
