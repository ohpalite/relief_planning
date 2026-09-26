'use client';

import React, { useState } from 'react';
import { useRelief } from '../context/ReliefContext';
import { MapPin, Clock, UserX, CheckCircle, AlertCircle, BookOpen, ChevronRight } from 'lucide-react';
import { PeriodId } from '../types';

export default function UncoveredClassesList() {
  const { 
    uncoveredClasses, 
    selectedUncoveredClassId, 
    setSelectedUncoveredClassId, 
    assignments,
    unassignRelief,
    teachers
  } = useRelief();

  const [periodFilter, setPeriodFilter] = useState<number | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Unassigned' | 'Assigned'>('All');

  // Filter logic
  const filteredList = uncoveredClasses.filter((item) => {
    if (periodFilter !== 'All' && item.period !== periodFilter) return false;
    const isAssigned = assignments.some((a) => a.uncoveredClassId === item.id);
    if (statusFilter === 'Unassigned' && isAssigned) return false;
    if (statusFilter === 'Assigned' && !isAssigned) return false;
    return true;
  });

  const unassignedCount = uncoveredClasses.filter(
    (uc) => !assignments.some((a) => a.uncoveredClassId === uc.id)
  ).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[750px]">
      
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 rounded-t-xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Classes Needing Coverage</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a class period below to find available relief teachers.
            </p>
          </div>

          <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-1 rounded-full border border-rose-200">
            {unassignedCount} Unassigned
          </span>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60">
          
          {/* Status Tabs */}
          <div className="flex bg-slate-200/70 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                statusFilter === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({uncoveredClasses.length})
            </button>
            <button
              onClick={() => setStatusFilter('Unassigned')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                statusFilter === 'Unassigned' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Needs Cover ({unassignedCount})
            </button>
            <button
              onClick={() => setStatusFilter('Assigned')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                statusFilter === 'Assigned' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Assigned ({assignments.length})
            </button>
          </div>

          {/* Period Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-thin">
            <button
              onClick={() => setPeriodFilter('All')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                periodFilter === 'All'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All P1-P8
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
              <button
                key={p}
                onClick={() => setPeriodFilter(p as PeriodId)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  periodFilter === p
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                P{p}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <CheckCircle className="w-12 h-12 text-emerald-500 mb-2" />
            <h3 className="font-bold text-slate-800 text-sm">No Uncovered Classes Found</h3>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              All classes matching your current filter are fully assigned or no teachers are absent.
            </p>
          </div>
        ) : (
          filteredList.map((item) => {
            const assignment = assignments.find((a) => a.uncoveredClassId === item.id);
            const isSelected = selectedUncoveredClassId === item.id;
            const absentTeacherObj = teachers.find((t) => t.id === item.absentTeacherId);
            const unavailableList = absentTeacherObj?.unavailablePeriods || [];
            const unavailabilityLabel = unavailableList.length === 8 ? 'Full Day' : `P${unavailableList.join(', P')}`;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedUncoveredClassId(item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-sm'
                    : assignment
                    ? 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                    : 'border-amber-200/90 bg-white hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                {/* Top Row: Period & Status */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-900 text-white font-extrabold text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      Period {item.period}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">{item.time}</span>
                  </div>

                  {assignment ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-300 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Covered
                    </span>
                  ) : (
                    <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-rose-300 flex items-center gap-1 animate-pulse">
                      <AlertCircle className="w-3 h-3 text-rose-600" />
                      Unassigned
                    </span>
                  )}
                </div>

                {/* Subject & Class Group */}
                <div className="mb-2">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>{item.subject}</span>
                    <span className="text-slate-400 font-normal">•</span>
                    <span className="text-indigo-700 font-semibold">{item.classGroup}</span>
                  </h3>
                </div>

                {/* VENUE PROMINENT DISPLAY */}
                <div className="my-2.5 p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-amber-500 text-slate-950 rounded font-bold">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block leading-none">
                        Reporting Venue
                      </span>
                      <span className="text-xs font-black text-slate-900 tracking-tight">
                        {item.venue}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded">
                    Report Here
                  </span>
                </div>

                {/* Absent Teacher & Assignment Details */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/70">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <UserX className="w-3.5 h-3.5 text-rose-500" />
                    <span>
                      Absent: <strong className="text-slate-800">{item.absentTeacherName}</strong>
                      <span className="text-amber-700 font-semibold text-[10px] ml-1 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-200">
                        {unavailabilityLabel}
                      </span>
                    </span>
                  </div>

                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? 'translate-x-1 text-indigo-600' : ''}`} />
                </div>

                {/* Covered Info Banner */}
                {assignment && (
                  <div className="mt-2.5 pt-2 border-t border-emerald-200 flex items-center justify-between bg-emerald-50/80 -mx-3.5 -mb-3.5 p-2.5 rounded-b-xl">
                    <div className="text-xs">
                      <span className="text-slate-600 font-medium">Relief Teacher: </span>
                      <strong className="text-emerald-900">{assignment.reliefTeacherName}</strong>
                      <span className="text-emerald-700 text-[10px] font-normal ml-1">({assignment.reliefTeacherDept})</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        unassignRelief(assignment.id);
                      }}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-800 hover:underline"
                    >
                      Change / Remove
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
