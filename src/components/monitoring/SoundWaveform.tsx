
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { AudioWaveform } from "lucide-react";

interface SoundWaveformProps {
  data: number[];
  soundLevel: number;
}

export function SoundWaveform({ data, soundLevel }: SoundWaveformProps) {
  const [waveData, setWaveData] = useState<Array<{value: number}>>([]);
  
  // Transform the raw data array into the format expected by the chart
  useEffect(() => {
    const formattedData = data.map(value => ({ value }));
    setWaveData(formattedData);
  }, [data]);

  // Determine chart color based on sound level
  const getWaveformColor = (level: number) => {
    if (level < 80) return "#10b981"; // green-500
    if (level < 85) return "#eab308"; // yellow-500
    if (level < 90) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  // Configure gradient colors based on sound level
  const waveformColor = getWaveformColor(soundLevel);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 mb-1">
        <AudioWaveform className="h-5 w-5 text-slate-400" />
        <span className="font-medium">声音波形图 (Sound Waveform)</span>
      </div>
      
      <div className="h-[160px] bg-slate-800/50 rounded-md p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={waveData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="waveformGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={waveformColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={waveformColor} stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis hide={true} />
            <YAxis hide={true} domain={[0, 100]} />
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            波形值
                          </span>
                          <span className="font-bold text-foreground">
                            {payload[0].value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={waveformColor}
              fillOpacity={1}
              fill="url(#waveformGradient)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-slate-400 text-center">
        实时声音波形 - 振幅反映声音强度 (Real-time sound waveform - amplitude reflects sound intensity)
      </div>
    </div>
  );
}
