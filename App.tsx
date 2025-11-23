import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { LogAnalyzer } from './components/LogAnalyzer';
import { SecurityPanel } from './components/SecurityPanel';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.PROFILE:
        return <Profile />;
      case ViewState.LOG_ANALYSIS:
        return <LogAnalyzer />;
      case ViewState.SECURITY:
        return <SecurityPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar currentView={currentView} setView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-8 backdrop-blur">
          <div className="text-sm breadcrumbs text-slate-500">
             <span className="text-slate-400">Console</span> / <span className="text-white font-medium">{currentView.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>System Online</span>
             </div>
             <div className="h-8 w-8 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold text-blue-400">
                RB
             </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-auto p-8">
           {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;