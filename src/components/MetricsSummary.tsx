'use client';

import React from 'react';
import { useRelief } from '../context/ReliefContext';
import { UserX, AlertCircle, CheckCircle2, PieChart, Sparkles } from 'lucide-react';

export default function MetricsSummary() {
  const { teachers, uncoveredClasses, assignments, setActiveTab, autoAssignAll } = useRelief();

  const absentTeachersCount = teachers.filter((t) => t.isAbsent).length;
  const totalClassesNeedingCover = uncoveredClasses.length;
  const totalCovered = assignments.length;
  const totalUnassigned = totalClassesNeedingCover - totalCovered;
  
  const coveragePercentage = totalClassesNeedingCover > 0 
    ? Math.round((totalCovered / totalClassesNeedingCover) * 100) 
    : 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* CARD 1: Total Absent Today */}
      <div 
        onClick={() => setActiveTab('absences')}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Absent Today</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{absentTeachersCount}</span>
              <span className="text-xs font-medium text-slate-500">Teachers</span>
            </div>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600 group-hover:bg-rose-100 transition-colors">
            <UserX className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-rose-600 font-medium pt-2 border-t border-slate-100">
          <span>View absence roster &rarr;</span>
          <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
            {Math.round((absentTeachersCount / teachers.length) * 100)}% of Staff
          </span>
        </div>
      </div>

      {/* CARD 2: Classes Needing Cover */}
      <div 
        onClick={() => setActiveTab('matcher')}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Classes Needing Cover</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-rose-600">{totalUnassigned}</span>
              <span className="text-xs font-medium text-slate-500">/ {totalClassesNeedingCover} periods</span>
            </div>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:bg-amber-100 transition-colors">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-amber-700 font-medium pt-2 border-t border-slate-100">
          <span>{totalUnassigned === 0 ? 'All classes covered!' : 'Requires relief assignment'}</span>
          {totalUnassigned > 0 && (
            <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
              Action Required
            </span>
          )}
        </div>
      </div>

      {/* CARD 3: Classes Covered */}
      <div 
        onClick={() => setActiveTab('masterlist')}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Classes Covered</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-emerald-600">{totalCovered}</span>
              <span className="text-xs font-medium text-slate-500">periods assigned</span>
            </div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-100 transition-colors">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-emerald-700 font-medium pt-2 border-t border-slate-100">
          <span>View Masterlist schedule &rarr;</span>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
            Live Schedule
          </span>
        </div>
      </div>

      {/* CARD 4: Coverage Rate */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Relief Coverage Rate</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-indigo-600">{coveragePercentage}%</span>
              <span className="text-xs font-medium text-slate-500">Complete</span>
            </div>
          </div>
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
            <PieChart className="w-5 h-5" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 pt-2 border-t border-slate-100">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                coveragePercentage === 100 ? 'bg-emerald-500' : coveragePercentage > 50 ? 'bg-indigo-600' : 'bg-amber-500'
              }`}
              style={{ width: `${coveragePercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
            <span>{totalCovered} / {totalClassesNeedingCover} Covered</span>
            {totalUnassigned > 0 ? (
              <button 
                onClick={autoAssignAll}
                className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 hover:underline"
              >
                <Sparkles className="w-3 h-3" /> Auto-fill
              </button>
            ) : (
              <span className="text-emerald-600 font-semibold">100% Resolved</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
