
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  ChevronDown, 
  ChevronRight, 
  AlertTriangle, 
  Info, 
  Settings 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline">
          <h2 className="text-2xl font-bold mb-4">故障树分析</h2>
          <span className="text-sm text-cyan-500 ml-3 bg-cyan-950/50 px-2 py-0.5 rounded-md">试运行</span>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1 border-slate-700 bg-slate-800 hover:bg-slate-700">
              <Settings className="h-4 w-4" />
              系统配置
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-slate-100">
            <DialogHeader>
              <DialogTitle>系统配置与调试</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-200">API 配置</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1 text-xs text-slate-400">API 密钥</div>
                  <div className="col-span-2">
                    <input 
                      type="text" 
                      value="sk-********************" 
                      className="w-full text-xs px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700"
                    />
                  </div>
                  
                  <div className="col-span-1 text-xs text-slate-400">API 地址</div>
                  <div className="col-span-2">
                    <input 
                      type="text" 
                      value="https://api.drillsense.com/v1" 
                      className="w-full text-xs px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700"
                    />
                  </div>
                  
                  <div className="col-span-1 text-xs text-slate-400">API 版本</div>
                  <div className="col-span-2">
                    <input 
                      type="text" 
                      value="1.0.45" 
                      className="w-full text-xs px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-200">网络连接配置</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1 text-xs text-slate-400">连接类型</div>
                  <div className="col-span-2">
                    <select className="w-full text-xs px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700">
                      <option>TCP/IP</option>
                      <option>UDP</option>
                      <option>WebSocket</option>
                    </select>
                  </div>
                  
                  <div className="col-span-1 text-xs text-slate-400">主机地址</div>
                  <div className="col-span-2">
                    <input 
                      type="text" 
                      value="192.168.1.100" 
                      className="w-full text-xs px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700"
                    />
                  </div>
                  
                  <div className="col-span-1 text-xs text-slate-400">端口</div>
                  <div className="col-span-2">
                    <input 
                      type="text" 
                      value="8080" 
                      className="w-full text-xs px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-200">连接测试</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">API 服务器</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-400">已连接</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">数据库服务器</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-400">已连接</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">实时数据流</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-amber-400">不稳定</span>
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" size="sm" className="bg-slate-800 hover:bg-slate-700">
                重置
              </Button>
              <Button variant="default" size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                保存配置
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <p className="text-slate-400 mb-6">
        通过系统化的方法识别潜在故障源，推导故障路径，提前预防设备故障。
      </p>

      <Tabs defaultValue="tree" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4 bg-slate-800/80">
          <TabsTrigger value="tree" className="data-[state=active]:bg-cyan-900/50 data-[state=active]:text-cyan-100">故障树</TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-cyan-900/50 data-[state=active]:text-cyan-100">风险评估</TabsTrigger>
          <TabsTrigger value="prevention" className="data-[state=active]:bg-cyan-900/50 data-[state=active]:text-cyan-100">预防措施</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tree">
          <Card className="border-slate-700 bg-slate-800/30 shadow-lg">
            <CardHeader className="border-b border-slate-700/50">
              <CardTitle className="text-cyan-100">顶驱故障分析树</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2 font-mono text-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-cyan-500/5 to-slate-900/0 pointer-events-none"></div>
                <TreeNode 
                  id="root"
                  label="顶驱系统故障"
                  expanded={expandedNodes.root}
                  toggle={() => toggleNode('root')}
                  level={0}
                  type="event"
                >
                  <TreeNode 
                    id="mechanical"
                    label="机械系统故障"
                    expanded={expandedNodes.mechanical}
                    toggle={() => toggleNode('mechanical')}
                    level={1}
                    type="gate"
                  >
                    <TreeNode 
                      id="bearing"
                      label="轴承故障"
                      expanded={expandedNodes.bearing}
                      toggle={() => toggleNode('bearing')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="bearing-wear"
                        label="轴承磨损"
                        expanded={expandedNodes['bearing-wear']}
                        toggle={() => toggleNode('bearing-wear')}
                        level={3}
                        type="basic"
                        probability="0.15"
                      />
                      <TreeNode 
                        id="bearing-lubrication"
                        label="润滑不良"
                        expanded={expandedNodes['bearing-lubrication']}
                        toggle={() => toggleNode('bearing-lubrication')}
                        level={3}
                        type="basic"
                        probability="0.12"
                      />
                      <TreeNode 
                        id="bearing-overheating"
                        label="过热"
                        expanded={expandedNodes['bearing-overheating']}
                        toggle={() => toggleNode('bearing-overheating')}
                        level={3}
                        type="basic"
                        probability="0.09"
                      />
                    </TreeNode>
                    <TreeNode 
                      id="gear"
                      label="齿轮系统故障"
                      expanded={expandedNodes.gear}
                      toggle={() => toggleNode('gear')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="gear-wear"
                        label="齿轮磨损"
                        expanded={expandedNodes['gear-wear']}
                        toggle={() => toggleNode('gear-wear')}
                        level={3}
                        type="basic"
                        probability="0.11"
                      />
                      <TreeNode 
                        id="gear-misalignment"
                        label="齿轮不对中"
                        expanded={expandedNodes['gear-misalignment']}
                        toggle={() => toggleNode('gear-misalignment')}
                        level={3}
                        type="basic"
                        probability="0.07"
                      />
                    </TreeNode>
                    <TreeNode 
                      id="shaft"
                      label="主轴损坏"
                      expanded={expandedNodes.shaft}
                      toggle={() => toggleNode('shaft')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="shaft-fatigue"
                        label="疲劳断裂"
                        expanded={expandedNodes['shaft-fatigue']}
                        toggle={() => toggleNode('shaft-fatigue')}
                        level={3}
                        type="basic"
                        probability="0.05"
                      />
                      <TreeNode 
                        id="shaft-overload"
                        label="过载"
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
                    label="液压系统故障"
                    expanded={expandedNodes.hydraulic}
                    toggle={() => toggleNode('hydraulic')}
                    level={1}
                    type="gate"
                  >
                    <TreeNode 
                      id="pump"
                      label="泵故障"
                      expanded={expandedNodes.pump}
                      toggle={() => toggleNode('pump')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="pump-cavitation"
                        label="气穴现象"
                        expanded={expandedNodes['pump-cavitation']}
                        toggle={() => toggleNode('pump-cavitation')}
                        level={3}
                        type="basic"
                        probability="0.14"
                      />
                      <TreeNode 
                        id="pump-seal"
                        label="密封失效"
                        expanded={expandedNodes['pump-seal']}
                        toggle={() => toggleNode('pump-seal')}
                        level={3}
                        type="basic"
                        probability="0.13"
                      />
                    </TreeNode>
                    <TreeNode 
                      id="valve"
                      label="阀门故障"
                      expanded={expandedNodes.valve}
                      toggle={() => toggleNode('valve')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="valve-clogging"
                        label="阀门堵塞"
                        expanded={expandedNodes['valve-clogging']}
                        toggle={() => toggleNode('valve-clogging')}
                        level={3}
                        type="basic"
                        probability="0.09"
                      />
                      <TreeNode 
                        id="valve-leakage"
                        label="阀门泄漏"
                        expanded={expandedNodes['valve-leakage']}
                        toggle={() => toggleNode('valve-leakage')}
                        level={3}
                        type="basic"
                        probability="0.10"
                      />
                    </TreeNode>
                    <TreeNode 
                      id="pipe"
                      label="管道系统故障"
                      expanded={expandedNodes.pipe}
                      toggle={() => toggleNode('pipe')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="pipe-leak"
                        label="管道泄漏"
                        expanded={expandedNodes['pipe-leak']}
                        toggle={() => toggleNode('pipe-leak')}
                        level={3}
                        type="basic"
                        probability="0.12"
                      />
                      <TreeNode 
                        id="pipe-blockage"
                        label="管道堵塞"
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
                    label="电气系统故障"
                    expanded={expandedNodes.electrical}
                    toggle={() => toggleNode('electrical')}
                    level={1}
                    type="gate"
                  >
                    <TreeNode 
                      id="motor"
                      label="电机故障"
                      expanded={expandedNodes.motor}
                      toggle={() => toggleNode('motor')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="motor-overheat"
                        label="电机过热"
                        expanded={expandedNodes['motor-overheat']}
                        toggle={() => toggleNode('motor-overheat')}
                        level={3}
                        type="basic"
                        probability="0.15"
                      />
                      <TreeNode 
                        id="motor-winding"
                        label="绕组故障"
                        expanded={expandedNodes['motor-winding']}
                        toggle={() => toggleNode('motor-winding')}
                        level={3}
                        type="basic"
                        probability="0.09"
                      />
                    </TreeNode>
                    <TreeNode 
                      id="control"
                      label="控制系统故障"
                      expanded={expandedNodes.control}
                      toggle={() => toggleNode('control')}
                      level={2}
                      type="event"
                    >
                      <TreeNode 
                        id="control-sensor"
                        label="传感器故障"
                        expanded={expandedNodes['control-sensor']}
                        toggle={() => toggleNode('control-sensor')}
                        level={3}
                        type="basic"
                        probability="0.11"
                      />
                      <TreeNode 
                        id="control-software"
                        label="软件故障"
                        expanded={expandedNodes['control-software']}
                        toggle={() => toggleNode('control-software')}
                        level={3}
                        type="basic"
                        probability="0.08"
                      />
                      <TreeNode 
                        id="control-comm"
                        label="通信故障"
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
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">故障符号说明</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 flex items-center justify-center">▢</div>
                  <span>顶层事件</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center">∩</div>
                  <span>逻辑门</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-center">○</div>
                  <span>中间事件</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center">●</div>
                  <span>基本事件</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-2 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">故障树分析说明</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  故障树是一种自上而下的演绎分析方法，用于确定系统故障的可能原因。
                  通过点击节点可以展开或折叠相应的故障分支，查看故障路径和可能性。
                  概率值代表在正常运行条件下该故障发生的可能性。
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-slate-700 bg-slate-800/30 shadow-lg">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-cyan-100">高风险故障模式</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    { name: "轴承过热", risk: "高", impact: "可能导致顶驱停机" },
                    { name: "液压泄漏", risk: "高", impact: "液压系统失效" },
                    { name: "电机过热", risk: "高", impact: "驱动系统损坏" },
                    { name: "气穴现象", risk: "高", impact: "泵效率降低" },
                    { name: "控制系统通信失效", risk: "中高", impact: "远程控制失效" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start border border-slate-700/50 rounded-md p-3 bg-slate-800/50 hover:bg-slate-800/90 transition-colors backdrop-blur-sm">
                      <AlertTriangle className="h-5 w-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-cyan-50">{item.name}</div>
                        <div className="text-sm text-slate-400 mt-1">
                          <span className="inline-block px-2 py-1 bg-gradient-to-r from-red-800/30 to-red-700/20 text-red-400 rounded-md mr-2">
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
            
            <Card className="border-slate-700 bg-slate-800/30 shadow-lg">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-cyan-100">故障概率矩阵</CardTitle>
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
                  <div className="col-start-2 row-start-2 bg-gradient-to-br from-red-900/70 to-red-800/50 text-white text-center flex items-center justify-center text-xs p-1 rounded-sm">
                    <div>轴承过热</div>
                  </div>
                  <div className="col-start-3 row-start-2 bg-gradient-to-br from-red-800/70 to-red-700/50 text-white text-center flex items-center justify-center text-xs p-1 rounded-sm">
                    <div>电机过热</div>
                  </div>
                  <div className="col-start-4 row-start-2 bg-gradient-to-br from-red-700/70 to-red-600/50 text-white text-center flex items-center justify-center text-xs p-1 rounded-sm">
                    <div>液压泄漏</div>
                  </div>
                  <div className="col-start-5 row-start-2 bg-gradient-to-br from-red-900/70 to-red-800/50 text-white text-center flex items-center justify-center text-xs p-1 rounded-sm">
                    <div>气穴现象</div>
                  </div>
                  
                  <div className="col-start-2 row-start-3 bg-gradient-to-br from-orange-700/70 to-orange-600/50 text-white text-center flex items-center justify-center text-xs p-1 rounded-sm">
                    <div>密封失效</div>
                  </div>
                  <div className="col-start-4 row-start-3 bg-gradient-to-br from-orange-700/70 to-orange-600/50 text-white text-center flex items-center justify-center text-xs p-1 rounded-sm">
                    <div>传感器故障</div>
                  </div>
                  <div className="col-start-5 row-start-3 bg-gradient-to-br from-orange-800/70 to-orange-700/50 text-white text-center flex items-center justify-center text-xs p-1 rounded-sm">
                    <div>通信故障</div>
                  </div>
                  
                  <div className="col-start-3 row-start-4 bg-gradient-to-br from-yellow-700/70 to-yellow-600/50 text-white text-center flex items-center justify-center text-xs p-1 rounded-sm">
                    <div>齿轮磨损</div>
                  </div>
                  <div className="col-start-2 row-start-5 bg-gradient-to-br from-green-700/70 to-green-600/50 text-white text-center flex items-center justify-center text-xs p-1 rounded-sm">
                    <div>软件故障</div>
                  </div>
                  <div className="col-start-4 row-start-5 bg-gradient-to-br from-green-700/70 to-green-600/50 text-white text-center flex items-center justify-center text-xs p-1 rounded-sm">
                    <div>管道堵塞</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Alert className="mt-4 border-amber-800 bg-gradient-to-r from-amber-950/30 to-amber-900/20">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle>风险提示</AlertTitle>
            <AlertDescription>
              根据当前故障树分析，轴承过热与液压系统故障是最高风险项，建议优先关注这些区域的预防性维护。
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        <TabsContent value="prevention">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-slate-700 bg-slate-800/30 shadow-lg">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="flex items-center text-cyan-100">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  机械系统预防措施
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    定期检查轴承温度和振动水平
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    按计划更换轴承润滑油
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    检查齿轮对准和磨损状况
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    监测主轴扭矩和振动异常
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    检查冷却系统效率和温控装置
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-slate-700 bg-slate-800/30 shadow-lg">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="flex items-center text-cyan-100">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  液压系统预防措施
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    定期检查液压油液位和质量
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    监测液压压力异常波动
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    检查泵密封和阀门泄漏情况
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    定期更换液压系统滤芯
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    检查管道接头和连接处是否泄漏
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-slate-700 bg-slate-800/30 shadow-lg">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="flex items-center text-cyan-100">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  电气系统预防措施
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    检查电机温度和电流负载
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    定期测试传感器校准状态
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    检查控制系统通信稳定性
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    定期备份控制系统软件和配置
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    检查电气连接和接地系统完好性
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6 border-slate-700 bg-slate-800/30 shadow-lg">
            <CardHeader className="border-b border-slate-700/50">
              <CardTitle className="text-cyan-100">预防性维护计划</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border border-blue-800 rounded-md bg-gradient-to-br from-blue-950/30 to-blue-900/10">
                  <h3 className="font-medium mb-2 text-blue-100">每日检查</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 液压油位和压力</li>
                    <li>• 轴承温度</li>
                    <li>• 电机电流和温度</li>
                    <li>• 系统警报状态</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-green-800 rounded-md bg-gradient-to-br from-green-950/30 to-green-900/10">
                  <h3 className="font-medium mb-2 text-green-100">每周检查</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 液压油质量</li>
                    <li>• 泵和阀门检查</li>
                    <li>• 管道泄漏检测</li>
                    <li>• 传感器校准检查</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-amber-800 rounded-md bg-gradient-to-br from-amber-950/30 to-amber-900/10">
                  <h3 className="font-medium mb-2 text-amber-100">月度检查</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 轴承润滑</li>
                    <li>• 齿轮系统检查</li>
                    <li>• 控制系统通信测试</li>
                    <li>• 滤芯更换</li>
                    <li>• 软件更新</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-purple-800 rounded-md bg-gradient-to-br from-purple-950/30 to-purple-900/10">
                  <h3 className="font-medium mb-2 text-purple-100">季度/年度</h3>
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
            <h3 className="text-lg font-medium">建议操作</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-none">
                <span className="mr-2">📋</span> 生成维护报告
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-none">
                <span className="mr-2">📅</span> 安排维护计划
              </Button>
              <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 border-none">
                <span className="mr-2">🔍</span> 详细风险分析
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-none">
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
  // 获取节点类型指示器
  const getNodeIndicator = () => {
    switch(type) {
      case 'event':
        return <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center text-xs mr-2 shadow-md">▢</div>;
      case 'gate':
        return <div className="w-5 h-5 rounded-md bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center text-xs mr-2 shadow-md">∩</div>;
      case 'basic':
        return <div className="w-5 h-5 rounded-md bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center text-xs mr-2 shadow-md">●</div>;
      default:
        return <div className="w-5 h-5 rounded-md bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center text-xs mr-2 shadow-md">○</div>;
    }
  };
  
  return (
    <div className="relative">
      <div 
        className="flex items-center py-1 cursor-pointer hover:bg-slate-700/50 rounded-md transition-colors"
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={toggle}
      >
        {children ? (
          expanded ? <ChevronDown size={16} className="mr-1 text-cyan-400" /> : <ChevronRight size={16} className="mr-1 text-cyan-400" />
        ) : (
          <span className="w-4 mr-1"></span>
        )}
        
        {getNodeIndicator()}
        
        <span>{label}</span>
        
        {probability && (
          <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-slate-700/80 text-cyan-300">P={probability}</span>
        )}
      </div>
      
      {expanded && children && (
        <div className="relative">
          <div 
            className="absolute left-0 top-0 bottom-0 border-l border-slate-600/70"
            style={{ left: `${level * 20 + 8}px` }}
          ></div>
          {children}
        </div>
      )}
    </div>
  );
};

export default FaultTree;
