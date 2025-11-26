import React, { useState } from 'react';
import { ShieldCheck, Scale, AlertTriangle, GitBranch, GitPullRequest, Package, KeyRound, Users, ShieldAlert, Lock, UserCheck, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

type Tab = 'vulnerabilities' | 'licenses' | 'dependencies' | 'governance';

const licenseData = [
  { name: 'MIT', count: 120, color: '#3b82f6' },
  { name: 'Apache 2.0', count: 85, color: '#10b981' },
  { name: 'GPL-3.0', count: 15, color: '#f59e0b' },
  { name: 'BSD-3-Clause', count: 40, color: '#8b5cf6' },
  { name: 'ISC', count: 60, color: '#ec4899' },
  { name: 'Other', count: 5, color: '#64748b' },
];

const vulnerabilitiesData = [
  { id: 1, project: 'StorageKernel-API', package: 'log4j-core', version: '2.14.1', severity: 'Critical', cve: 'CVE-2021-44228' },
  { id: 2, project: 'ObjectGateway-S3', package: 'node-fetch', version: '2.6.1', severity: 'High', cve: 'CVE-2022-0235' },
  { id: 3, project: 'ArchiveNAS-UI', package: 'react-scripts', version: '4.0.3', severity: 'Medium', cve: 'CVE-2021-23456' },
  { id: 4, project: 'SAN-Controller', package: 'openssl', version: '1.1.1g', severity: 'High', cve: 'CVE-2021-3712' },
  { id: 5, project: 'StorageKernel-API', package: 'jackson-databind', version: '2.9.8', severity: 'High', cve: 'CVE-2019-12384' },
];

const dependencyData = {
  project: 'ObjectGateway-S3',
  dependencies: [
    { name: 'express', version: '4.17.1', dependencies: [
      { name: 'body-parser', version: '1.19.0', dependencies: [] },
      { name: 'cookie-parser', version: '1.4.5', dependencies: [] },
    ]},
    { name: 'aws-sdk', version: '2.1048.0', dependencies: [
      { name: 'xml2js', version: '0.4.23', dependencies: [] },
      { name: 'uuid', version: '8.3.2', dependencies: [] },
    ]},
    { name: 'node-fetch', version: '2.6.1', dependencies: [] },
  ],
};

const encryptionStatusData = [
  { id: 'san', system: 'Primary SAN Cluster', atRest: 'AES-256', inTransit: 'TLS 1.3', status: 'Fully Encrypted' },
  { id: 'nas', system: 'Archive NAS', atRest: 'AES-256', inTransit: 'TLS 1.2', status: 'Fully Encrypted' },
  { id: 'obj', system: 'S3 Object Gateway', atRest: 'SSE-S3 (AES-256)', inTransit: 'TLS 1.3', status: 'Fully Encrypted' },
  { id: 'backup', system: 'Backup Vault', atRest: 'Unencrypted', inTransit: 'TLS 1.2', status: 'At-Rest Vulnerable' },
];

const accessControlData = {
  roles: { admins: 5, engineers: 25, readOnly: 10 },
  recentEvents: [
    { user: 'admin@redevbionet', action: 'Modified firewall rule on SAN-01', timestamp: '2 mins ago', level: 'High' },
    { user: 'svc_backup', action: 'Full system backup initiated', timestamp: '1 hour ago', level: 'Medium' },
    { user: 'jane.doe', action: 'Accessed vol_archive_financials', timestamp: '3 hours ago', level: 'Low' },
  ]
};

const riskAssessmentData = [
  { id: 1, risk: 'Unencrypted backup vault data-at-rest', severity: 'Critical', recommendation: 'Enable AES-256 encryption on the backup vault immediately.' },
  { id: 2, risk: 'Overly permissive IAM role for svc_monitoring', severity: 'High', recommendation: 'Review and apply principle of least privilege.' },
  { id: 3, risk: 'Firmware on SAN-Controller is outdated', severity: 'Medium', recommendation: 'Schedule firmware update to patch known vulnerabilities.' },
  { id: 4, risk: 'Lack of multi-factor authentication for CLI access', severity: 'Medium', recommendation: 'Enforce MFA for all interactive user sessions.' },
];


export const SecurityPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('vulnerabilities');

    const renderSeverityBadge = (severity: string) => {
        const styles: { [key: string]: string } = {
            'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
            'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
            'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        };
        return <span className={`px-2 py-1 text-xs font-bold rounded border ${styles[severity] || ''}`}>{severity}</span>
    }

    const renderDependencyTree = (deps: any[], level = 0): React.ReactNode => {
        return deps.map(dep => (
            <React.Fragment key={dep.name}>
                <div className={`flex items-center gap-2 text-sm ${level > 0 ? 'text-slate-400' : 'text-slate-200'}`} style={{ paddingLeft: `${level * 24}px` }}>
                    {level > 0 && <span className="text-slate-600">└─</span>}
                    <Package size={14} />
                    <span className="font-mono">{dep.name}</span>
                    <span className="text-xs text-slate-500">v{dep.version}</span>
                </div>
                {dep.dependencies && dep.dependencies.length > 0 && renderDependencyTree(dep.dependencies, level + 1)}
            </React.Fragment>
        ));
    };

    const TabContent = () => {
        switch(activeTab) {
            case 'vulnerabilities':
                return (
                  <div className="space-y-2">
                    {vulnerabilitiesData.map(vuln => (
                      <div key={vuln.id} className="grid grid-cols-10 items-center gap-4 p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700/50 transition-colors">
                        <div className="col-span-3">
                          <p className="text-sm font-medium text-white">{vuln.project}</p>
                          <p className="text-xs text-slate-400 font-mono">{vuln.cve}</p>
                        </div>
                        <div className="col-span-3 font-mono text-sm text-slate-300 flex items-center gap-2">
                           <Package size={14} className="text-blue-400" />
                           {vuln.package}@{vuln.version}
                        </div>
                        <div className="col-span-2">{renderSeverityBadge(vuln.severity)}</div>
                        <div className="col-span-2 text-right">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium transition-colors flex items-center gap-1.5">
                            <GitPullRequest size={14} />
                            Fix Suggestion
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
            case 'licenses':
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <h4 className="font-bold text-white mb-4">License Distribution</h4>
                        <div className="h-[250px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={licenseData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} width={80} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{fill: 'rgba(255, 255, 255, 0.05)'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}/>
                                <Bar dataKey="count" barSize={20} radius={[0, 4, 4, 0]}>
                                  {licenseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-red-900/20 border border-red-800 p-4 rounded-lg">
                            <h4 className="font-bold text-red-300 mb-2">Non-Compliant Licenses</h4>
                            <p className="text-sm text-slate-300 font-mono">GPL-3.0 (15 instances)</p>
                            <p className="text-xs text-slate-400 mt-1">In project <span className="font-medium text-slate-300">Auth-Service</span>, violates corporate policy.</p>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
                            <h4 className="font-bold text-slate-300 mb-2">Policy Summary</h4>
                            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                                <li>Permissive licenses (MIT, Apache 2.0, BSD) are approved.</li>
                                <li>Copyleft licenses (GPL, AGPL) require legal review.</li>
                                <li>Unlicensed code is prohibited.</li>
                            </ul>
                        </div>
                    </div>
                  </div>
                );
            case 'dependencies':
                return (
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-2">{dependencyData.project}</h4>
                    <p className="text-sm text-slate-400 mb-6">Detailed dependency tree analysis.</p>
                    <div className="space-y-2 p-4 bg-slate-900/50 rounded-lg">
                        {renderDependencyTree(dependencyData.dependencies)}
                    </div>
                  </div>
                );
            case 'governance':
                return (
                  <div className="space-y-6">
                    {/* Encryption Status */}
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2"><KeyRound size={18} className="text-cyan-400" /> Encryption Status</h4>
                      <div className="space-y-2">
                        {encryptionStatusData.map(item => (
                          <div key={item.id} className="grid grid-cols-4 items-center gap-4 p-3 bg-slate-800 hover:bg-slate-800/50 rounded-lg">
                            <div className="font-medium text-slate-200">{item.system}</div>
                            <div className="text-sm text-slate-400 font-mono">At-Rest: <span className="text-slate-300">{item.atRest}</span></div>
                            <div className="text-sm text-slate-400 font-mono">In-Transit: <span className="text-slate-300">{item.inTransit}</span></div>
                            <div>
                               {item.status === 'Fully Encrypted' ? (
                                 <span className="flex items-center gap-1.5 text-xs font-bold text-green-400"><Lock size={12}/> {item.status}</span>
                               ) : (
                                 <span className="flex items-center gap-1.5 text-xs font-bold text-red-400"><AlertTriangle size={12}/> {item.status}</span>
                               )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Access Control */}
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <h4 className="font-bold text-white mb-4 flex items-center gap-2"><Users size={18} className="text-purple-400" /> Access Control</h4>
                            <div className="grid grid-cols-3 gap-4 text-center mb-4">
                                <div><p className="text-2xl font-bold text-white">{accessControlData.roles.admins}</p><p className="text-xs text-slate-400">Admins</p></div>
                                <div><p className="text-2xl font-bold text-white">{accessControlData.roles.engineers}</p><p className="text-xs text-slate-400">Engineers</p></div>
                                <div><p className="text-2xl font-bold text-white">{accessControlData.roles.readOnly}</p><p className="text-xs text-slate-400">Read-Only</p></div>
                            </div>
                            <h5 className="text-sm font-semibold text-slate-300 mt-6 mb-2">Recent Privileged Access</h5>
                            <div className="space-y-2 text-xs">
                                {accessControlData.recentEvents.map((event, i) => (
                                    <div key={i} className="flex justify-between items-center bg-slate-900/40 p-2 rounded">
                                        <div>
                                            <p className="font-mono text-slate-300">{event.user}</p>
                                            <p className="text-slate-500">{event.action}</p>
                                        </div>
                                        <p className="text-slate-500">{event.timestamp}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Risk Assessment */}
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <h4 className="font-bold text-white mb-4 flex items-center gap-2"><ShieldAlert size={18} className="text-orange-400" /> Risk Assessment</h4>
                            <div className="space-y-2">
                               {riskAssessmentData.map(risk => (
                                 <div key={risk.id} className="p-3 bg-slate-900/40 rounded border-l-2 border-slate-700">
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm text-slate-200">{risk.risk}</p>
                                      {renderSeverityBadge(risk.severity)}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1"><b>Recommendation:</b> {risk.recommendation}</p>
                                 </div>
                               ))}
                            </div>
                        </div>
                    </div>
                  </div>
                );
        }
        return null;
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <header className="mb-6">
                <h2 className="text-2xl font-bold text-white">Centralized Security Dashboard</h2>
                <p className="text-slate-400">Vulnerability scanning, license compliance, and dependency analysis across all projects.</p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm">Vulnerabilities</p>
                            <h3 className="text-2xl font-bold text-orange-400 mt-1">4 High</h3>
                        </div>
                        <AlertTriangle size={24} className="text-orange-400" />
                    </div>
                    <p className="text-red-400 text-xs mt-2">1 Critical requires immediate action</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm">License Compliance</p>
                            <h3 className="text-2xl font-bold text-green-400 mt-1">98%</h3>
                        </div>
                        <Scale size={24} className="text-green-400" />
                    </div>
                    <p className="text-red-400 text-xs mt-2">1 Non-compliant license found</p>
                </div>
                 <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm">Projects Monitored</p>
                            <h3 className="text-2xl font-bold text-white mt-1">42</h3>
                        </div>
                        <ShieldCheck size={24} className="text-blue-400" />
                    </div>
                    <p className="text-slate-400 text-xs mt-2">All repositories reporting</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm">Risks Identified</p>
                            <h3 className="text-2xl font-bold text-red-500 mt-1">1 Critical</h3>
                        </div>
                        <ShieldAlert size={24} className="text-red-500" />
                    </div>
                    <p className="text-orange-400 text-xs mt-2">1 High, 2 Medium risks</p>
                </div>
            </div>
            
            <div>
              <div className="border-b border-slate-700 mb-6">
                <nav className="flex space-x-4 -mb-px" aria-label="Tabs">
                  <button onClick={() => setActiveTab('vulnerabilities')} className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'vulnerabilities' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white hover:border-slate-500'}`}>
                    Vulnerabilities
                  </button>
                  <button onClick={() => setActiveTab('licenses')} className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'licenses' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white hover:border-slate-500'}`}>
                    License Compliance
                  </button>
                  <button onClick={() => setActiveTab('dependencies')} className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'dependencies' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white hover:border-slate-500'}`}>
                    Dependency Tree
                  </button>
                  <button onClick={() => setActiveTab('governance')} className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'governance' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white hover:border-slate-500'}`}>
                    Governance & Risk
                  </button>
                </nav>
              </div>

              <div>
                <TabContent />
              </div>
            </div>
        </div>
    );
};