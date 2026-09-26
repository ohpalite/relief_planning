'use client';

import React from 'react';
import { useRelief } from '../context/ReliefContext';
import { Settings, X, ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react';
import { INITIAL_SETTINGS } from '../data/dummyData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSettings } = useRelief();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Workload Parameters</h3>
              <p className="text-xs text-slate-500">Configure relief scheduling algorithm constraints</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Form */}
        <div className="py-5 space-y-5">
          
          {/* MAX_CONSECUTIVE_PERIODS */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>MAX_CONSECUTIVE_PERIODS</span>
              </label>
              <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300">
                {settings.maxConsecutivePeriods} Periods
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">
              Maximum consecutive periods a teacher can teach without a break.
            </p>
            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={settings.maxConsecutivePeriods}
              onChange={(e) => updateSettings({ maxConsecutivePeriods: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>2 Periods</span>
              <span>4 Periods</span>
              <span>6 (Default)</span>
              <span>8 Periods</span>
            </div>
          </div>

          {/* MAX_TOTAL_PERIODS_PER_DAY */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>MAX_TOTAL_PERIODS_PER_DAY</span>
              </label>
              <span className="bg-rose-100 text-rose-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-rose-300">
                {settings.maxDailyPeriods} Periods
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">
              Maximum total periods a teacher can be assigned in a single 8-period day.
            </p>
            <input
              type="range"
              min="4"
              max="8"
              step="1"
              value={settings.maxDailyPeriods}
              onChange={(e) => updateSettings({ maxDailyPeriods: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>4 Periods</span>
              <span>6 Periods</span>
              <span>7 (Default)</span>
              <span>8 Max</span>
            </div>
          </div>

          {/* PRIORITIZE SAME DEPARTMENT */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-800 block">
                Prioritize Same Department
              </label>
              <p className="text-[11px] text-slate-500">
                Place teachers from the same subject department at the top of candidate list.
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.prioritizeSameDept}
              onChange={(e) => updateSettings({ prioritizeSameDept: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => updateSettings(INITIAL_SETTINGS)}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
}
