
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ChevronDown, ChevronRight, AlertTriangle, Info } from "lucide-react";

const FaultTree = () => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'root': true
  });

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">故障树分析 (Fault Tree Analysis)</h2>
        <p className="text-slate-400 mb-6">
          通过系统化的方法识别潜在故障源，推导故障路径，提前预防设备故障。
          (Systematically identify potential fault sources, derive fault paths, and prevent equipment failures in advance.)
        </p>
      </div>

      <Tabs defaultValue="tree" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="tree">故障树 (Fault Tree)</TabsTrigger>
          <TabsTrigger value="analysis">风险评估 (Risk Assessment)</TabsTrigger>
          <TabsTrigger value="prevention">预防措施 (Prevention)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tree">
          <Card>
            <CardHeader>
              <CardTitle>顶驱故障分析树 (Top Drive Fault Analysis Tree)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-sm">
                <TreeNode 
                  id="root"
                  label="顶驱系统故障 (Top Drive System Failure)"
                  expanded={expandedNodes.root}
                  toggle={() => toggleNode('root')}
                  level={0}
                  type="event"
                >
                  <TreeNode 
                    id="mechanical"
                    label="机械系统故障 (Mechanical System Failure)"
                    expanded={expandedNodes.mechanical}
                    toggle={() => toggleNode('mechanical')}
                    level={1}
                    type="gate"
                  >
                    <TreeNode 
                      id="bearing"
                      label="轴承故障 (Bearing Failure)"
                      expanded={expandedNodes.bearing}
                      toggle={() => toggleNode('bearing')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="bearing-wear"
                        label="轴承磨损 (Bearing Wear)"
                        expanded={expandedNodes['bearing-wear']}
                        toggle={() => toggleNode('bearing-wear')}
                        level={3}
                        type="basic"
                        probability="0.15"
                      />
                      <TreeNode 
                        id="bearing-lubrication"
                        label="润滑不良 (Poor Lubrication)"
                        expanded={expandedNodes['bearing-lubrication']}
                        toggle={() => toggleNode('bearing-lubrication')}
                        level={3}
                        type="basic"
                        probability="0.12"
                      />
                      <TreeNode 
                        id="bearing-overheating"
                        label="过热 (Overheating)"
                        expanded={expandedNodes['bearing-overheating']}
                        toggle={() => toggleNode('bearing-overheating')}
                        level={3}
                        type="basic"
                        probability="0.09"
                      />
                    </TreeNode>
                    <TreeNode 
                      id="gear"
                      label="齿轮系统故障 (Gear System Failure)"
                      expanded={expandedNodes.gear}
                      toggle={() => toggleNode('gear')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="gear-wear"
                        label="齿轮磨损 (Gear Wear)"
                        expanded={expandedNodes['gear-wear']}
                        toggle={() => toggleNode('gear-wear')}
                        level={3}
                        type="basic"
                        probability="0.11"
                      />
                      <TreeNode 
                        id="gear-misalignment"
                        label="齿轮不对中 (Gear Misalignment)"
                        expanded={expandedNodes['gear-misalignment']}
                        toggle={() => toggleNode('gear-misalignment')}
                        level={3}
                        type="basic"
                        probability="0.07"
                      />
                    </TreeNode>
                    <TreeNode 
                      id="shaft"
                      label="主轴损坏 (Main Shaft Damage)"
                      expanded={expandedNodes.shaft}
                      toggle={() => toggleNode('shaft')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="shaft-fatigue"
                        label="疲劳断裂 (Fatigue Fracture)"
                        expanded={expandedNodes['shaft-fatigue']}
                        toggle={() => toggleNode('shaft-fatigue')}
                        level={3}
                        type="basic"
                        probability="0.05"
                      />
                      <TreeNode 
                        id="shaft-overload"
                        label="过载 (Overload)"
                        expanded={expandedNodes['shaft-overload']}
                        toggle={() => toggleNode('shaft-overload')}
                        level={3}
                        type="basic"
                        probability="0.08"
                      />
                    </TreeNode>
                  </TreeNode>
                  
                  <TreeNode 
                    id="hydraulic"
                    label="液压系统故障 (Hydraulic System Failure)"
                    expanded={expandedNodes.hydraulic}
                    toggle={() => toggleNode('hydraulic')}
                    level={1}
                    type="gate"
                  >
                    <TreeNode 
                      id="pump"
                      label="泵故障 (Pump Failure)"
                      expanded={expandedNodes.pump}
                      toggle={() => toggleNode('pump')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="pump-cavitation"
                        label="气穴现象 (Cavitation)"
                        expanded={expandedNodes['pump-cavitation']}
                        toggle={() => toggleNode('pump-cavitation')}
                        level={3}
                        type="basic"
                        probability="0.14"
                      />
                      <TreeNode 
                        id="pump-seal"
                        label="密封失效 (Seal Failure)"
                        expanded={expandedNodes['pump-seal']}
                        toggle={() => toggleNode('pump-seal')}
                        level={3}
                        type="basic"
                        probability="0.13"
                      />
                    </TreeNode>
                    <TreeNode 
                      id="valve"
                      label="阀门故障 (Valve Failure)"
                      expanded={expandedNodes.valve}
                      toggle={() => toggleNode('valve')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="valve-clogging"
                        label="阀门堵塞 (Valve Clogging)"
                        expanded={expandedNodes['valve-clogging']}
                        toggle={() => toggleNode('valve-clogging')}
                        level={3}
                        type="basic"
                        probability="0.09"
                      />
                      <TreeNode 
                        id="valve-leakage"
                        label="阀门泄漏 (Valve Leakage)"
                        expanded={expandedNodes['valve-leakage']}
                        toggle={() => toggleNode('valve-leakage')}
                        level={3}
                        type="basic"
                        probability="0.10"
                      />
                    </TreeNode>
                    <TreeNode 
                      id="pipe"
                      label="管道系统故障 (Pipe System Failure)"
                      expanded={expandedNodes.pipe}
                      toggle={() => toggleNode('pipe')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="pipe-leak"
                        label="管道泄漏 (Pipe Leakage)"
                        expanded={expandedNodes['pipe-leak']}
                        toggle={() => toggleNode('pipe-leak')}
                        level={3}
                        type="basic"
                        probability="0.12"
                      />
                      <TreeNode 
                        id="pipe-blockage"
                        label="管道堵塞 (Pipe Blockage)"
                        expanded={expandedNodes['pipe-blockage']}
                        toggle={() => toggleNode('pipe-blockage')}
                        level={3}
                        type="basic"
                        probability="0.07"
                      />
                    </TreeNode>
                  </TreeNode>
                  
                  <TreeNode 
                    id="electrical"
                    label="电气系统故障 (Electrical System Failure)"
                    expanded={expandedNodes.electrical}
                    toggle={() => toggleNode('electrical')}
                    level={1}
                    type="gate"
                  >
                    <TreeNode 
                      id="motor"
                      label="电机故障 (Motor Failure)"
                      expanded={expandedNodes.motor}
                      toggle={() => toggleNode('motor')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="motor-overheat"
                        label="电机过热 (Motor Overheating)"
                        expanded={expandedNodes['motor-overheat']}
                        toggle={() => toggleNode('motor-overheat')}
                        level={3}
                        type="basic"
                        probability="0.15"
                      />
                      <TreeNode 
                        id="motor-winding"
                        label="绕组故障 (Winding Failure)"
                        expanded={expandedNodes['motor-winding']}
                        toggle={() => toggleNode('motor-winding')}
                        level={3}
                        type="basic"
                        probability="0.09"
                      />
                    </TreeNode>
                    <TreeNode 
                      id="control"
                      label="控制系统故障 (Control System Failure)"
                      expanded={expandedNodes.control}
                      toggle={() => toggleNode('control')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="control-sensor"
                        label="传感器故障 (Sensor Failure)"
                        expanded={expandedNodes['control-sensor']}
                        toggle={() => toggleNode('control-sensor')}
                        level={3}
                        type="basic"
                        probability="0.11"
                      />
                      <TreeNode 
                        id="control-software"
                        label="软件故障 (Software Failure)"
                        expanded={expandedNodes['control-software']}
                        toggle={() => toggleNode('control-software')}
                        level={3}
                        type="basic"
                        probability="0.08"
                      />
                      <TreeNode 
                        id="control-comm"
                        label="通信故障 (Communication Failure)"
                        expanded={expandedNodes['control-comm']}
                        toggle={() => toggleNode('control-comm')}
                        level={3}
                        type="basic"
                        probability="0.06"
                      />
                    </TreeNode>
                  </TreeNode>
                </TreeNode>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">故障符号说明 (Legend)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">▢</div>
                  <span>顶层事件 (Top Event)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-amber-600 flex items-center justify-center">∩</div>
                  <span>逻辑门 (Logic Gate)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center">○</div>
                  <span>中间事件 (Intermediate Event)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-red-600 flex items-center justify-center">●</div>
                  <span>基本事件 (Basic Event)</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-2 bg-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">故障树分析说明 (Fault Tree Analysis Description)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  故障树是一种自上而下的演绎分析方法，用于确定系统故障的可能原因。
                  通过点击节点可以展开或折叠相应的故障分支，查看故障路径和可能性。
                  概率值代表在正常运行条件下该故障发生的可能性。
                </p>
                <p className="mt-2">
                  (Fault tree is a top-down deductive analysis method used to determine possible causes of system failure.
                  Click on nodes to expand or collapse corresponding fault branches, view fault paths and probabilities.
                  Probability values represent the likelihood of the fault occurring under normal operating conditions.)
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>高风险故障模式 (High Risk Failure Modes)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    { name: "轴承过热 (Bearing Overheating)", risk: "高", impact: "可能导致顶驱停机" },
                    { name: "液压泄漏 (Hydraulic Leakage)", risk: "高", impact: "液压系统失效" },
                    { name: "电机过热 (Motor Overheating)", risk: "高", impact: "驱动系统损坏" },
                    { name: "气穴现象 (Pump Cavitation)", risk: "高", impact: "泵效率降低" },
                    { name: "控制系统通信失效 (Control Comm Failure)", risk: "中高", impact: "远程控制失效" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start border border-slate-700 rounded-md p-3">
                      <AlertTriangle className="h-5 w-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-slate-400 mt-1">
                          <span className="inline-block px-2 py-1 bg-red-800/30 text-red-400 rounded-md mr-2">
                            风险: {item.risk}
                          </span>
                          <span>{item.impact}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>故障概率矩阵 (Failure Probability Matrix)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] grid grid-cols-5 grid-rows-5 gap-1">
                  {/* Probability x Impact Matrix */}
                  {/* Headers */}
                  <div className="col-start-2 col-span-4 grid grid-cols-4 gap-1">
                    {["低", "中低", "中高", "高"].map((impact, i) => (
                      <div key={i} className="bg-slate-700 text-center py-1 text-xs">
                        影响程度<br/>{impact}
                      </div>
                    ))}
                  </div>
                  
                  {/* Row headers */}
                  <div className="row-start-2 row-span-4 grid grid-rows-4 gap-1">
                    {["高", "中高", "中低", "低"].map((prob, i) => (
                      <div key={i} className="bg-slate-700 flex items-center justify-center p-1 text-xs writing-mode-vertical">
                        <div className="transform -rotate-90 whitespace-nowrap">
                          概率 {prob}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Matrix cells */}
                  <div className="col-start-2 row-start-2 bg-red-900/70 text-white text-center flex items-center justify-center text-xs p-1">
                    <div>轴承过热</div>
                  </div>
                  <div className="col-start-3 row-start-2 bg-red-800/70 text-white text-center flex items-center justify-center text-xs p-1">
                    <div>电机过热</div>
                  </div>
                  <div className="col-start-4 row-start-2 bg-red-700/70 text-white text-center flex items-center justify-center text-xs p-1">
                    <div>液压泄漏</div>
                  </div>
                  <div className="col-start-5 row-start-2 bg-red-900/70 text-white text-center flex items-center justify-center text-xs p-1">
                    <div>气穴现象</div>
                  </div>
                  
                  <div className="col-start-2 row-start-3 bg-orange-700/70 text-white text-center flex items-center justify-center text-xs p-1">
                    <div>密封失效</div>
                  </div>
                  <div className="col-start-4 row-start-3 bg-orange-700/70 text-white text-center flex items-center justify-center text-xs p-1">
                    <div>传感器故障</div>
                  </div>
                  <div className="col-start-5 row-start-3 bg-orange-800/70 text-white text-center flex items-center justify-center text-xs p-1">
                    <div>通信故障</div>
                  </div>
                  
                  <div className="col-start-3 row-start-4 bg-yellow-700/70 text-white text-center flex items-center justify-center text-xs p-1">
                    <div>齿轮磨损</div>
                  </div>
                  <div className="col-start-2 row-start-5 bg-green-700/70 text-white text-center flex items-center justify-center text-xs p-1">
                    <div>软件故障</div>
                  </div>
                  <div className="col-start-4 row-start-5 bg-green-700/70 text-white text-center flex items-center justify-center text-xs p-1">
                    <div>管道堵塞</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Alert className="mt-4 border-amber-800 bg-amber-950/30">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle>风险提示 (Risk Alert)</AlertTitle>
            <AlertDescription>
              根据当前故障树分析，轴承过热与液压系统故障是最高风险项，建议优先关注这些区域的预防性维护。
              (Based on the current fault tree analysis, bearing overheating and hydraulic system failure are the highest risk items. It is recommended to prioritize preventive maintenance in these areas.)
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        <TabsContent value="prevention">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  机械系统预防措施 (Mechanical Prevention)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    定期检查轴承温度和振动水平
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    按计划更换轴承润滑油
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    检查齿轮对准和磨损状况
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    监测主轴扭矩和振动异常
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    检查冷却系统效率和温控装置
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  液压系统预防措施 (Hydraulic Prevention)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    定期检查液压油液位和质量
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    监测液压压力异常波动
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    检查泵密封和阀门泄漏情况
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    定期更换液压系统滤芯
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    检查管道接头和连接处是否泄漏
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  电气系统预防措施 (Electrical Prevention)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    检查电机温度和电流负载
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    定期测试传感器校准状态
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    检查控制系统通信稳定性
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    定期备份控制系统软件和配置
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    检查电气连接和接地系统完好性
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>预防性维护计划 (Preventive Maintenance Schedule)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border border-blue-800 rounded-md bg-blue-950/30">
                  <h3 className="font-medium mb-2">每日检查 (Daily)</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 液压油位和压力</li>
                    <li>• 轴承温度</li>
                    <li>• 电机电流和温度</li>
                    <li>• 系统警报状态</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-green-800 rounded-md bg-green-950/30">
                  <h3 className="font-medium mb-2">每周检查 (Weekly)</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 液压油质量</li>
                    <li>• 泵和阀门检查</li>
                    <li>• 管道泄漏检测</li>
                    <li>• 传感器校准检查</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-amber-800 rounded-md bg-amber-950/30">
                  <h3 className="font-medium mb-2">月度检查 (Monthly)</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 轴承润滑</li>
                    <li>• 齿轮系统检查</li>
                    <li>• 控制系统通信测试</li>
                    <li>• 滤芯更换</li>
                    <li>• 软件更新</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-purple-800 rounded-md bg-purple-950/30">
                  <h3 className="font-medium mb-2">季度/年度 (Quarterly/Annual)</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 全系统液压油更换</li>
                    <li>• 轴承检查与更换</li>
                    <li>• 电气系统全面测试</li>
                    <li>• 齿轮箱检修</li>
                    <li>• 系统效率评估</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 flex flex-col gap-4">
            <h3 className="text-lg font-medium">建议操作 (Recommended Actions)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <span className="mr-2">📋</span> 生成维护报告
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <span className="mr-2">📅</span> 安排维护计划
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <span className="mr-2">🔍</span> 详细风险分析
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <span className="mr-2">📊</span> 查看历史趋势
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TreeNodeProps {
  id: string;
  label: string;
  expanded: boolean;
  toggle: () => void;
  level: number;
  children?: React.ReactNode;
  type: 'event' | 'gate' | 'basic';
  probability?: string;
}

const TreeNode: React.FC<TreeNodeProps> = ({ 
  id, 
  label, 
  expanded, 
  toggle, 
  level, 
  children,
  type,
  probability
}) => {
  // Get the appropriate node type indicator
  const getNodeIndicator = () => {
    switch(type) {
      case 'event':
        return <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-xs mr-2">▢</div>;
      case 'gate':
        return <div className="w-5 h-5 rounded-md bg-amber-600 flex items-center justify-center text-xs mr-2">∩</div>;
      case 'basic':
        return <div className="w-5 h-5 rounded-md bg-red-600 flex items-center justify-center text-xs mr-2">●</div>;
      default:
        return <div className="w-5 h-5 rounded-md bg-emerald-600 flex items-center justify-center text-xs mr-2">○</div>;
    }
  };
  
  return (
    <div className="relative">
      <div 
        className="flex items-center py-1 cursor-pointer hover:bg-slate-800 rounded-md"
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={toggle}
      >
        {children ? (
          expanded ? <ChevronDown size={16} className="mr-1" /> : <ChevronRight size={16} className="mr-1" />
        ) : (
          <span className="w-4 mr-1"></span>
        )}
        
        {getNodeIndicator()}
        
        <span>{label}</span>
        
        {probability && (
          <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-slate-700">P={probability}</span>
        )}
      </div>
      
      {expanded && children && (
        <div className="relative">
          {/* Vertical line for connecting children */}
          <div 
            className="absolute left-0 top-0 bottom-0 border-l border-slate-600"
            style={{ left: `${level * 20 + 8}px` }}
          ></div>
          {children}
        </div>
      )}
    </div>
  );
};

export default FaultTree;
