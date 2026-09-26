'use client';

import React, { useState } from 'react';
import { useRelief } from '../context/ReliefContext';
import { 
  School, 
  Settings, 
  Sparkles, 
  RotateCcw, 
  Calendar, 
  CheckCircle2, 
  ShieldAlert,
  SlidersHorizontal,
  Table,
  FileSpreadsheet,
  UserX
} from 'lucide-react';
import SettingsModal from './SettingsModal';

export default function Navbar() {
  const { 
    settings, 
    autoAssignAll, 
    resetAllData, 
    activeTab, 
    setActiveTab,
    uncoveredClasses,
    assignments
  } = useRelief();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [autoAssignToast, setAutoAssignToast] = useState<{ count: number; remaining: number } | null>(null);

  const handleAutoAssign = () => {
    const res = autoAssignAll();
    setAutoAssignToast({ count: res.assignedCount, remaining: res.remainingCount });
    setTimeout(() => setAutoAssignToast(null), 4000);
  };

  const unassignedCount = uncoveredClasses.length - assignments.length;

  return (
    <>
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30">
                <School className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-lg tracking-tight text-white">ReliefPlanner Pro</h1>
                  <span className="text-[10px] font-semibold tracking-wider uppercase bg-indigo-950 text-indigo-300 border border-indigo-700/50 px-2 py-0.5 rounded-full">
                    v2.4 Live
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Today's Relief Schedule</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-300 font-medium">8-Period Day</span>
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
              <button
                onClick={() => setActiveTab('matcher')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'matcher'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Smart Matcher</span>
                {unassignedCount > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 font-bold rounded-full animate-pulse">
                    {unassignedCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('grid')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'grid'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Timetable Matrix</span>
              </button>

              <button
                onClick={() => setActiveTab('masterlist')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'masterlist'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Masterlist & Export</span>
              </button>

              <button
                onClick={() => setActiveTab('absences')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'absences'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <UserX className="w-3.5 h-3.5" />
                <span>Absence Manager</span>
              </button>
            </nav>

            {/* Quick Actions & Settings */}
            <div className="flex items-center gap-2">
              {/* Constraints Pill */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                title="Click to adjust Workload Parameters"
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg text-xs text-slate-300 transition-all hover:border-slate-600"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <div className="text-left leading-none">
                  <span className="text-[10px] text-slate-400 block font-normal">Constraints</span>
                  <span className="font-semibold text-slate-200">
                    Max {settings.maxConsecutivePeriods} Consec | {settings.maxDailyPeriods} Daily
                  </span>
                </div>
              </button>

              {/* Auto Assign Button */}
              <button
                onClick={handleAutoAssign}
                disabled={unassignedCount === 0}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                  unassignedCount > 0
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Assign</span>
              </button>

              {/* Settings Button */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-700 transition-all"
                title="Workload Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Reset Button */}
              <button
                onClick={() => {
                  if (confirm('Reset schedule state back to initial dummy data?')) {
                    resetAllData();
                  }
                }}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-700 transition-all"
                title="Reset Application State"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Bar */}
          <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('matcher')}
              className={`flex items-center gap-1 py-1 px-2.5 rounded-md ${activeTab === 'matcher' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300'}`}
            >
              Matcher
              {unassignedCount > 0 && <span className="bg-rose-500 text-white text-[9px] px-1 py-0.2 rounded-full">{unassignedCount}</span>}
            </button>
            <button
              onClick={() => setActiveTab('grid')}
              className={`py-1 px-2.5 rounded-md ${activeTab === 'grid' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300'}`}
            >
              Matrix
            </button>
            <button
              onClick={() => setActiveTab('masterlist')}
              className={`py-1 px-2.5 rounded-md ${activeTab === 'masterlist' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300'}`}
            >
              Masterlist
            </button>
            <button
              onClick={() => setActiveTab('absences')}
              className={`py-1 px-2.5 rounded-md ${activeTab === 'absences' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300'}`}
            >
              Absences
            </button>
          </div>
        </div>
      </header>

      {/* Auto Assign Toast Notification */}
      {autoAssignToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-emerald-500/40 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-emerald-300">Smart Relief Auto-Assigned!</h4>
            <p className="text-xs text-slate-300">
              Successfully matched <span className="font-bold text-white">{autoAssignToast.count}</span> classes adhering to daily & consecutive limits.
              {autoAssignToast.remaining > 0 && (
                <span className="block text-amber-300 font-medium mt-0.5">
                  {autoAssignToast.remaining} classes remaining (no eligible free teachers).
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
