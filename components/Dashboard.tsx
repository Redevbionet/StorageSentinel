import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { MetricPoint, StorageNode } from '../types';
import { Server, Database, TrendingUp, AlertTriangle, Activity, RefreshCw, Layers, HardDrive, Cpu, Thermometer, X } from 'lucide-react';

const generateInitialData = (): MetricPoint[] => Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  iops: Math.floor(Math.random() * 5000) + 12000,
  latency: Math.random() * 2 + 0.5,
  throughput: Math.floor(Math.random() * 400) + 800,
}));

const initialNodes: StorageNode[] = [
  { 
    id: 'SAN-01', 
    name: 'Primary SAN Cluster', 
    status: 'Healthy', 
    capacity: 500, 
    used: 342, 
    temp: 42, 
    raidStatus: 'RAID 10 (Optimal)', 
    firmware: 'v4.2.1',
    totalDisks: 24,
    onlineDisks: 24
  },
  { 
    id: 'NAS-01', 
    name: 'Archive NAS', 
    status: 'Healthy', 
    capacity: 1200, 
    used: 890, 
    temp: 38, 
    raidStatus: 'RAID 6 (Optimal)', 
    firmware: 'v4.1.9',
    totalDisks: 12,
    onlineDisks: 12
  },
  { 
    id: 'OBJ-01', 
    name: 'S3 Object Gateway', 
    status: 'Degraded', 
    capacity: 2000, 
    used: 1100, 
    temp: 55, 
    raidStatus: 'Erasure Coding (Rebuilding)', 
    firmware: 'v4.2.0',
    totalDisks: 36,
    onlineDisks: 35
  },
];

const generateNodeHistoricalData = (node: StorageNode): MetricPoint[] => {
  return Array.from({ length: 24 }, (_, i) => {
    let baseIops, baseLatency, baseThroughput;

    if (node.id.startsWith('SAN')) {
      baseIops = 8000;
      baseLatency = 0.5;
      baseThroughput = 600;
    } else if (node.id.startsWith('NAS')) {
      baseIops = 2000;
      baseLatency = 1.0;
      baseThroughput = 300;
    } else { // OBJ
      baseIops = 4000;
      baseLatency = 1.5;
      baseThroughput = 400;
    }

    let iops = baseIops + Math.random() * (baseIops * 0.5);
    let latency = baseLatency + Math.random() * (baseLatency * 0.8);
    let throughput = baseThroughput + Math.random() * (baseThroughput * 0.4);

    if (node.status === 'Degraded') {
      latency *= 2.5;
      iops *= 0.8;
      throughput *= 0.9;
    }

    return {
      time: `${i}:00`,
      iops: Math.floor(iops),
      latency: parseFloat(latency.toFixed(2)),
      throughput: Math.floor(throughput),
    };
  });
};

interface NodeDetailModalProps {
  node: StorageNode;
  onClose: () => void;
}

const NodeDetailModal: React.FC<NodeDetailModalProps> = ({ node, onClose }) => {
    const [historicalData, setHistoricalData] = useState<MetricPoint[]>([]);

    useEffect(() => {
        setHistoricalData(generateNodeHistoricalData(node));
    }, [node]);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl m-4 transform animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${node.status === 'Healthy' ? 'bg-blue-500/10 text-blue-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                            <Server size={24} />
                        </div>
                        <div>
                           <h2 className="text-xl font-bold text-white">{node.name}</h2>
                           <span className="text-sm text-slate-400 font-mono">{node.id}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            node.status === 'Healthy' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                            {node.status.toUpperCase()}
                        </span>
                        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-6">
                        {/* Key Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                <p className="text-xs text-slate-400 flex items-center gap-1"><Database size={12}/> Capacity</p>
                                <p className="text-lg font-bold text-white mt-1">{node.used} / {node.capacity} TB</p>
                            </div>
                             <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                <p className="text-xs text-slate-400 flex items-center gap-1"><Thermometer size={12}/> Temperature</p>
                                <p className={`text-lg font-bold mt-1 ${node.temp > 50 ? 'text-yellow-400' : 'text-white'}`}>{node.temp}°C</p>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                <p className="text-xs text-slate-400 flex items-center gap-1"><Layers size={12}/> RAID Status</p>
                                <p className="text-lg font-bold text-white mt-1 truncate">{node.raidStatus}</p>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                <p className="text-xs text-slate-400 flex items-center gap-1"><Cpu size={12}/> Firmware</p>
                                <p className="text-lg font-bold text-white mt-1">{node.firmware}</p>
                            </div>
                        </div>

                        {/* Historical Chart */}
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <h3 className="text-lg font-semibold text-white mb-4">Historical Performance (24h)</h3>
                             <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={historicalData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                        <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                                        <YAxis yAxisId="left" stroke="#3b82f6" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                                        <YAxis yAxisId="right" orientation="right" stroke="#10b981" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Line yAxisId="left" type="monotone" dataKey="iops" stroke="#3b82f6" dot={false} strokeWidth={2} name="IOPS" isAnimationActive={false} />
                                        <Line yAxisId="right" type="monotone" dataKey="throughput" stroke="#10b981" dot={false} strokeWidth={2} name="Throughput" isAnimationActive={false} />
                                        <Line yAxisId="left" type="monotone" dataKey="latency" stroke="#8b5cf6" dot={false} strokeWidth={2} name="Latency" isAnimationActive={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                             </div>
                        </div>
                        
                        {/* Active Alerts */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Active Alerts</h3>
                            {node.status === 'Degraded' ? (
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3">
                                    <AlertTriangle className="text-yellow-400 mt-1" size={20} />
                                    <div>
                                        <p className="font-bold text-yellow-300">Disk Rebuild in Progress</p>
                                        <p className="text-sm text-yellow-400/80 mt-1">
                                            Disk `sd17` is currently being rebuilt into the array. Performance may be temporarily impacted.
                                            RAID Status: <span className="font-mono">{node.raidStatus}</span>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                    <p className="text-sm text-green-300 font-medium">No active alerts on this node.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<MetricPoint[]>(generateInitialData());
  const [nodes, setNodes] = useState<StorageNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<StorageNode | null>(null);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const lastItem = prevData[prevData.length - 1];
        const lastTimeHour = parseInt(lastItem.time.split(':')[0]);
        const nextTimeHour = (lastTimeHour + 1) % 24;
        
        // Generate slightly randomized next point based on the last one to simulate trend
        const newPoint: MetricPoint = {
          time: `${nextTimeHour}:00`,
          iops: Math.max(8000, Math.min(25000, lastItem.iops + (Math.random() - 0.5) * 4000)),
          latency: Math.max(0.2, Math.min(5.0, lastItem.latency + (Math.random() - 0.5) * 0.5)),
          throughput: Math.max(500, Math.min(2000, lastItem.throughput + (Math.random() - 0.5) * 200)),
        };

        return [...prevData.slice(1), newPoint];
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const currentMetrics = data[data.length - 1];

  const handleNodeClick = (node: StorageNode) => {
    setSelectedNode(node);
  };

  const handleCloseModal = () => {
    setSelectedNode(null);
  };


  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">System Overview</h2>
            <p className="text-slate-400">Real-time performance metrics and node status</p>
          </div>
          <div className="flex flex-col items-end gap-2">
              <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-xs font-mono">SOC 2 COMPLIANT</span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs font-mono">ISO 27001</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <RefreshCw size={12} className="animate-spin" />
                  <span>LIVE UPDATES: ACTIVE</span>
              </div>
          </div>
        </header>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">Total IOPS</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {currentMetrics.iops.toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <TrendingUp size={20} />
              </div>
            </div>
            <p className="text-green-400 text-xs mt-2">↑ Dynamic Load</p>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">Avg Latency</p>
                <h3 className={`text-2xl font-bold mt-1 ${currentMetrics.latency > 3 ? 'text-yellow-400' : 'text-white'}`}>
                  {currentMetrics.latency.toFixed(2)}ms
                </h3>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Activity size={20} />
              </div>
            </div>
            <p className="text-green-400 text-xs mt-2">Optimal Range</p>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">Storage Used</p>
                <h3 className="text-2xl font-bold text-white mt-1">2.3 PB</h3>
              </div>
              <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                <Database size={20} />
              </div>
            </div>
            <div className="w-full bg-slate-700 h-1.5 mt-3 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full w-[65%]"></div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm">Active Alerts</p>
                <h3 className="text-2xl font-bold text-yellow-500 mt-1">1</h3>
              </div>
              <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
                <AlertTriangle size={20} />
              </div>
            </div>
            <p className="text-slate-400 text-xs mt-2">OBJ-01 Rebuilding</p>
          </div>
        </div>

        {/* Main Chart: IOPS vs Throughput Trend */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">IOPS vs Throughput Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIops" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="iops" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIops)" name="IOPS" isAnimationActive={false} />
                <Area type="monotone" dataKey="throughput" stroke="#10b981" fillOpacity={1} fill="url(#colorThroughput)" name="Throughput (MB/s)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-Metric Line Chart (Requested Section) */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Combined Performance Metrics</h3>
                <p className="text-xs text-slate-400">Correlated view of IOPS, Throughput, and Latency</p>
              </div>
              <div className="flex gap-4 text-xs font-mono">
                   <span className="flex items-center gap-1 text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-400"></span> IOPS</span>
                   <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Throughput</span>
                   <span className="flex items-center gap-1 text-purple-400"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Latency</span>
              </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                
                {/* Primary Y-Axis for IOPS */}
                <YAxis yAxisId="left" stroke="#3b82f6" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                
                {/* Secondary Y-Axis for Throughput */}
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                
                {/* Tertiary Y-Axis for Latency (Offset) */}
                <YAxis yAxisId="right2" orientation="right" stroke="#8b5cf6" tick={{fontSize: 12}} tickLine={false} axisLine={false} dx={40} />

                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                
                <Line yAxisId="left" type="monotone" dataKey="iops" stroke="#3b82f6" dot={false} strokeWidth={2} name="IOPS" isAnimationActive={false} />
                <Line yAxisId="right" type="monotone" dataKey="throughput" stroke="#10b981" dot={false} strokeWidth={2} name="Throughput" isAnimationActive={false} />
                <Line yAxisId="right2" type="monotone" dataKey="latency" stroke="#8b5cf6" dot={false} strokeWidth={2} name="Latency" isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Node Status Cards */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Detailed Node Status</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {nodes.map(node => (
              <div 
                  key={node.id} 
                  className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-blue-500 hover:shadow-blue-500/10 shadow-lg transition-all flex flex-col h-full cursor-pointer"
                  onClick={() => handleNodeClick(node)}
              >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${node.status === 'Healthy' ? 'bg-blue-500/10 text-blue-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                          <Server size={20} />
                      </div>
                      <div>
                      <h4 className="text-white font-medium">{node.name}</h4>
                      <span className="text-xs text-slate-400 font-mono">{node.id}</span>
                      </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                      node.status === 'Healthy' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                      {node.status.toUpperCase()}
                  </span>
                  </div>
                  
                  <div className="space-y-5 flex-1">
                  {/* Capacity */}
                  <div>
                      <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Capacity Usage</span>
                      <span className="text-white">{Math.round((node.used / node.capacity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div 
                          className={`h-full rounded-full ${node.status === 'Healthy' ? 'bg-blue-600' : 'bg-yellow-600'}`}
                          style={{ width: `${(node.used / node.capacity) * 100}%` }}
                      ></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                          <span>{node.used} TB Used</span>
                          <span>{node.capacity} TB Total</span>
                      </div>
                  </div>

                  {/* Disk Health Visual */}
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                              <HardDrive size={12} /> Disk Health
                          </span>
                          <span className={`text-xs font-mono ${node.onlineDisks === node.totalDisks ? 'text-green-400' : 'text-yellow-400'}`}>
                              {node.onlineDisks}/{node.totalDisks} Online
                          </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                          {Array.from({ length: node.totalDisks || 0 }).map((_, i) => (
                              <div 
                                  key={i} 
                                  className={`w-2 h-2 rounded-sm ${
                                      i < (node.onlineDisks || 0) 
                                      ? 'bg-green-500/60' 
                                      : 'bg-red-500/60 animate-pulse'
                                  }`}
                                  title={`Disk ${i+1}: ${i < (node.onlineDisks || 0) ? 'Healthy' : 'Error'}`}
                              />
                          ))}
                      </div>
                  </div>

                  {/* Technical Specs Grid */}
                  <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-900/30 p-2 rounded border border-slate-800/50">
                          <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">RAID Config</span>
                          <span className="text-xs text-slate-300 font-mono flex items-center gap-1 truncate" title={node.raidStatus}>
                              <Layers size={12} className="text-blue-400" /> {node.raidStatus || 'N/A'}
                          </span>
                      </div>
                      <div className="bg-slate-900/30 p-2 rounded border border-slate-800/50">
                          <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Firmware</span>
                          <span className="text-xs text-slate-300 font-mono flex items-center gap-1">
                              <Cpu size={12} className="text-purple-400" /> {node.firmware || 'Unknown'}
                          </span>
                      </div>
                  </div>
                  </div>
              </div>
              ))}
          </div>
        </div>
      </div>
      {selectedNode && <NodeDetailModal node={selectedNode} onClose={handleCloseModal} />}
    </>
  );
};