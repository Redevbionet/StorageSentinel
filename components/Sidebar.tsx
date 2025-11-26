import React from 'react';
import { ViewState } from '../types';
import { 
  LayoutDashboard, 
  User, 
  BrainCircuit, 
  ShieldCheck, 
  HardDrive,
  Activity,
  Globe
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, label: 'System Overview', icon: LayoutDashboard },
    { id: ViewState.SECURITY, label: 'Security & Protection', icon: ShieldCheck },
    { id: ViewState.LOG_ANALYSIS, label: 'AI Log Analyst', icon: BrainCircuit },
    { id: ViewState.LFX_INSIGHTS, label: 'LFX Insights', icon: Globe },
    { id: ViewState.PROFILE, label: 'Engineer Profile', icon: User },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full text-slate-300">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="p-2 bg-blue-600 rounded-lg">
          <HardDrive size={24} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-wide">SENTINEL</h1>
          <p className="text-xs text-slate-500">Storage Monitor v2.4</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3 px-4 py-2 bg-slate-950 rounded-md border border-slate-800">
          <Activity size={16} className="text-green-500 animate-pulse" />
          <div className="text-xs">
            <p className="text-slate-400">System Status</p>
            <p className="text-green-500 font-bold">OPTIMAL</p>
          </div>
        </div>
      </div>
    </div>
  );
};