import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Globe, 
  ShieldCheck, 
  Users, 
  Building2, 
  Activity, 
  FileText, 
  TrendingUp,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const corporateData = [
  { name: 'Redevbionet Corp', value: 45 },
  { name: 'Partner Systems', value: 25 },
  { name: 'Independent', value: 20 },
  { name: 'Academic Labs', value: 10 },
];

const adoptionData = [
  { month: 'Jan', downloads: 4000, activeNodes: 120 },
  { month: 'Feb', downloads: 5500, activeNodes: 145 },
  { month: 'Mar', downloads: 7000, activeNodes: 180 },
  { month: 'Apr', downloads: 9000, activeNodes: 250 },
  { month: 'May', downloads: 12000, activeNodes: 310 },
  { month: 'Jun', downloads: 18000, activeNodes: 450 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export const LFXInsights: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header / Hero */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-slate-900 border border-indigo-800/30 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <Globe size={300} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
             <span className="px-2 py-0.5 bg-white/10 text-white rounded text-[10px] font-bold tracking-wider">LINUX FOUNDATION</span>
             <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[10px] font-bold tracking-wider border border-blue-500/30">ANALYTICS</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">LFX Insights</h1>
          <p className="text-slate-300 max-w-3xl text-lg leading-relaxed">
            Assess overall project health, understand corporate contribution dynamics, and verify security compliance. 
            Leverage high-quality data to mitigate risk and select open source projects that are not just functional, but trustworthy.
          </p>
        </div>
      </div>

      {/* Section 1: Project Health & Community Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Corporate Influence Chart */}
        <div className="lg:col-span-1 bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="text-blue-400" size={20} />
            <h3 className="font-bold text-white">Organizational Influence</h3>
          </div>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={corporateData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {corporateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-400">
               {corporateData.map((entry, index) => (
                 <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span>{entry.name} ({entry.value}%)</span>
                 </div>
               ))}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4 border-t border-slate-700 pt-3">
            Understand who is behind the project beyond anonymous GitHub usernames.
          </p>
        </div>

        {/* Health & Velocity Metrics */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700">
           <div className="flex items-center gap-2 mb-6">
            <Activity className="text-emerald-400" size={20} />
            <h3 className="font-bold text-white">Project Health & Velocity</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
             <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">Commits / Week</p>
                <p className="text-2xl font-bold text-white">142</p>
                <p className="text-xs text-emerald-400 mt-1">▲ 12% vs avg</p>
             </div>
             <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">Issue Close Rate</p>
                <p className="text-2xl font-bold text-white">94%</p>
                <p className="text-xs text-emerald-400 mt-1">Top Tier</p>
             </div>
             <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">Code Review Latency</p>
                <p className="text-2xl font-bold text-white">4h</p>
                <p className="text-xs text-blue-400 mt-1">Highly Active</p>
             </div>
             <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">Maintainers</p>
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-xs text-slate-500 mt-1">Across 3 Orgs</p>
             </div>
          </div>

          <div className="h-[200px] w-full">
            <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase">Adoption Momentum (Global)</h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adoptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="downloads" stroke="#3b82f6" strokeWidth={3} dot={false} name="Docker Pulls" />
                <Line type="monotone" dataKey="activeNodes" stroke="#8b5cf6" strokeWidth={3} dot={false} name="Active Nodes" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section 2: Security & Governance */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Security & Governance Compliance</h3>
                <p className="text-sm text-slate-400">OpenSSF Best Practices & Risk Assessment</p>
              </div>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <CheckCircle2 size={16} className="text-green-500" />
              <span className="text-sm font-bold text-green-400">OpenSSF Gold Badge</span>
           </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Checklist */}
            <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-300 mb-4">Core Governance Standards</h4>
                {[
                  { label: 'License Compliance (SPDX)', status: 'Pass', desc: 'Apache 2.0 fully compliant' },
                  { label: 'Vulnerability Reporting Process', status: 'Pass', desc: 'SECURITY.md present & active' },
                  { label: 'Artifact Signing', status: 'Warning', desc: 'Partial implementation in CI/CD' },
                  { label: 'Code of Conduct', status: 'Pass', desc: 'Enforced via community guidelines' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between p-3 bg-slate-900/30 rounded border border-slate-800">
                      <div>
                        <p className="text-sm font-medium text-slate-200">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        item.status === 'Pass' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                  </div>
                ))}
            </div>

            {/* Risk Radar / Info */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
                <div>
                   <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                     <AlertTriangle size={16} className="text-orange-400" />
                     Current Risk Factors
                   </h4>
                   <div className="space-y-4">
                      <div className="bg-slate-800 p-3 rounded">
                         <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Dependency Freshness</span>
                            <span className="text-orange-400">Needs Attention</span>
                         </div>
                         <div className="w-full bg-slate-700 h-1.5 rounded-full">
                            <div className="bg-orange-400 h-1.5 rounded-full w-[65%]"></div>
                         </div>
                      </div>
                      <div className="bg-slate-800 p-3 rounded">
                         <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Documentation Quality</span>
                            <span className="text-green-400">Excellent</span>
                         </div>
                         <div className="w-full bg-slate-700 h-1.5 rounded-full">
                            <div className="bg-green-400 h-1.5 rounded-full w-[92%]"></div>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-700">
                    <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium transition-colors flex items-center justify-center gap-2">
                        <FileText size={16} /> Download Full LFX Audit Report
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};