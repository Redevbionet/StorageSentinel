import React from 'react';
import { 
  Github, 
  Terminal, 
  Shield, 
  Search, 
  Server, 
  Database, 
  Cpu, 
  Cloud 
} from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header Profile */}
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-1">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <img 
                src="https://picsum.photos/200/200" 
                alt="Profile" 
                className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">Redevbionet</h1>
            <p className="text-blue-400 font-medium mb-4">Storage Systems Architect & Security Specialist</p>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Expert in designing, developing, protecting, and analyzing storage systems to ensure optimal performance, 
              security, and reliability. Specializing in high-performance storage, data encryption, and advanced 
              analytics for enterprise environments.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
              <a href="https://github.com/Redevbionet" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black rounded-lg text-white border border-slate-700 transition-colors">
                <Github size={18} />
                <span>GitHub</span>
              </a>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg border border-blue-800">
                <Shield size={18} />
                <span>SOC 2 & ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Development */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
            <Database size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-3">Storage Development</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>SAN, NAS, Object Storage</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Cloud Storage Architecture</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Software-Defined Storage (SDS)</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>High-Performance Tuning</li>
          </ul>
        </div>

        {/* Protection */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
          <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 text-purple-400">
            <Shield size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-3">System Protection</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Encryption (Rest & Transit)</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Disaster Recovery (DRP/BCP)</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>RAID & Replication (HA)</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Access Control Mgmt</li>
          </ul>
        </div>

        {/* Analysis */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-green-500/50 transition-colors">
          <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4 text-green-400">
            <Search size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-3">System Analysis</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Performance (IOPS, Latency)</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Vulnerability Assessment</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Capacity Planning</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Log Anomaly Detection</li>
          </ul>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="pt-6 border-t border-slate-800">
         <h3 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-4">Technologies & Tools</h3>
         <div className="flex flex-wrap gap-2">
            {['Docker', 'Python', 'Django', 'React', 'Vue', 'Playwright', 'Vite', 'PostgreSQL', 'MinIO', 'S3', 'Linux'].map((tech) => (
               <span key={tech} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300 text-sm font-mono hover:text-white cursor-default">
                  {tech}
               </span>
            ))}
         </div>
      </div>
    </div>
  );
};