import React from 'react';
import { ShieldCheck, Lock, Eye, AlertOctagon, Key, FileCheck, RefreshCw } from 'lucide-react';

export const SecurityPanel: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        <header className="mb-6">
            <h2 className="text-2xl font-bold text-white">Security & Protection</h2>
            <p className="text-slate-400">Encryption status, access control, and vulnerability assessment</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-900/40 to-slate-800 p-6 rounded-xl border border-green-500/30">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                        <Lock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-green-300">Data At Rest</p>
                        <h3 className="text-xl font-bold text-white">AES-256 Enabled</h3>
                    </div>
                </div>
                <p className="text-xs text-slate-400">Key rotation scheduled in 14 days.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-blue-300">Access Control</p>
                        <h3 className="text-xl font-bold text-white">RBAC Active</h3>
                    </div>
                </div>
                 <p className="text-xs text-slate-400">MFA enforced for all Admin accounts.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                        <RefreshCw size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-purple-300">Disaster Recovery</p>
                        <h3 className="text-xl font-bold text-white">Sync Active</h3>
                    </div>
                </div>
                 <p className="text-xs text-slate-400">Last snapshot: 10 mins ago (RPO &lt; 15m).</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vulnerability Scan Simulation */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        <AlertOctagon size={18} className="text-yellow-500"/>
                        Vulnerability Assessment
                    </h3>
                    <span className="text-xs text-slate-500">Scan ID: #992-AZX</span>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span className="text-sm text-slate-200">Outdated Firmware (SAN-02)</span>
                            </div>
                            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">HIGH</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-900/10 border border-yellow-900/30 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                <span className="text-sm text-slate-200">Weak TLS Cipher Suite detected</span>
                            </div>
                            <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">MEDIUM</span>
                        </div>
                         <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-sm text-slate-200">User Permissions Audit</span>
                            </div>
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">PASS</span>
                        </div>
                    </div>
                    <button className="mt-4 w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm font-medium transition-colors">
                        Run New Scan
                    </button>
                </div>
            </div>

            {/* Compliance Checklist */}
            <div className="bg-slate-800 rounded-xl border border-slate-700">
                <div className="p-4 border-b border-slate-700 bg-slate-900/50">
                     <h3 className="font-semibold text-white flex items-center gap-2">
                        <FileCheck size={18} className="text-blue-500"/>
                        Compliance Status
                    </h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                             <div className="p-1.5 bg-green-500/20 rounded text-green-500"><Eye size={16}/></div>
                             <div>
                                <p className="text-sm text-white font-medium">SOC 2 Type II</p>
                                <p className="text-xs text-slate-400">Audit Period: 2023-2024</p>
                             </div>
                        </div>
                        <span className="text-green-400 font-mono text-sm">COMPLIANT</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                             <div className="p-1.5 bg-blue-500/20 rounded text-blue-500"><ShieldCheck size={16}/></div>
                             <div>
                                <p className="text-sm text-white font-medium">ISO/IEC 27001</p>
                                <p className="text-xs text-slate-400">ISMS Operational</p>
                             </div>
                        </div>
                         <span className="text-green-400 font-mono text-sm">CERTIFIED</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                             <div className="p-1.5 bg-purple-500/20 rounded text-purple-500"><Key size={16}/></div>
                             <div>
                                <p className="text-sm text-white font-medium">GDPR</p>
                                <p className="text-xs text-slate-400">Data Processor Agreement</p>
                             </div>
                        </div>
                         <span className="text-green-400 font-mono text-sm">COMPLIANT</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};