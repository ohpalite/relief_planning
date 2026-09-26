'use client';

import React, { useState } from 'react';
import { useRelief } from '../context/ReliefContext';
import { PeriodId } from '../types';
import { UserX, UserCheck, Search, AlertCircle, Clock, CheckCircle2, RotateCcw } from 'lucide-react';

export default function AbsenceManager() {
  const { teachers, setTeacherUnavailablePeriods, toggleTeacherPeriodUnavailability, uncoveredClasses } = useRelief();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Absent' | 'Present'>('All');

  const filteredTeachers = teachers.filter((t) => {
    const isAbsent = (t.unavailablePeriods || []).length > 0;
    if (statusFilter === 'Absent' && !isAbsent) return false;
    if (statusFilter === 'Present' && isAbsent) return false;
    if (deptFilter !== 'All' && t.department !== deptFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.department.toLowerCase().includes(q);
    }
    return true;
  });

  const absentTeachers = teachers.filter((t) => (t.unavailablePeriods || []).length > 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3 rounded-t-xl">
        <div>
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <UserX className="w-4 h-4 text-rose-600" />
            <span>Staff Absence & Period Unavailability Manager</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Indicate specific periods teachers are unavailable. Uncovered classes auto-generate for affected periods.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Status Tabs */}
          <div className="flex bg-slate-200/70 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                statusFilter === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              All ({teachers.length})
            </button>
            <button
              onClick={() => setStatusFilter('Absent')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                statusFilter === 'Absent' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              Unavailable ({absentTeachers.length})
            </button>
            <button
              onClick={() => setStatusFilter('Present')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                statusFilter === 'Present' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              Present ({teachers.length - absentTeachers.length})
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
            />
          </div>

          {/* Dept Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
          >
            <option value="All">All Departments</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Mother Tongue">Mother Tongue</option>
            <option value="Humanities">Humanities</option>
            <option value="PE & Health">PE & Health</option>
            <option value="Arts & Design">Arts & Design</option>
          </select>
        </div>
      </div>

      {/* Absence Summary Banner */}
      <div className="p-3 bg-rose-50 border-b border-rose-100 flex items-center justify-between text-xs text-rose-950">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>
            <strong>{absentTeachers.length} Staff Members</strong> have partial or full-day unavailability today generating <strong>{uncoveredClasses.length} period slots</strong> needing relief coverage.
          </span>
        </div>
      </div>

      {/* Teachers Roster Table */}
      <div className="p-4 overflow-x-auto min-h-[500px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white text-xs">
              <th className="p-3 font-bold min-w-[200px]">Teacher Name</th>
              <th className="p-3 font-bold min-w-[130px]">Department</th>
              <th className="p-3 font-bold min-w-[150px]">Current Status</th>
              <th className="p-3 font-bold min-w-[240px]">Specific Period Unavailability (P1 to P8)</th>
              <th className="p-3 font-bold text-right min-w-[220px]">Quick Presets</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {filteredTeachers.map((t) => {
              const unavailable = t.unavailablePeriods || [];
              const isFullDay = unavailable.length === 8;
              const isPartial = unavailable.length > 0 && unavailable.length < 8;

              return (
                <tr key={t.id} className={`hover:bg-slate-50 transition-colors ${unavailable.length > 0 ? 'bg-rose-50/40' : ''}`}>
                  
                  {/* Name */}
                  <td className="p-3 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs ${
                        unavailable.length > 0 ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {t.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div>{t.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">ID: {t.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="p-3 font-medium text-slate-700">{t.department}</td>

                  {/* Status Badge */}
                  <td className="p-3">
                    {isFullDay ? (
                      <span className="bg-rose-100 text-rose-900 font-extrabold px-2.5 py-1 rounded-md text-[11px] border border-rose-300 inline-flex items-center gap-1">
                        <UserX className="w-3.5 h-3.5 text-rose-600" />
                        Full Day Absent
                      </span>
                    ) : isPartial ? (
                      <span className="bg-amber-100 text-amber-900 font-extrabold px-2.5 py-1 rounded-md text-[11px] border border-amber-300 inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        Absent P{unavailable.join(', P')}
                      </span>
                    ) : (
                      <span className="bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-md text-[11px] border border-emerald-300 inline-flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Present All Day
                      </span>
                    )}
                  </td>

                  {/* Period Pills Selection */}
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((pStr) => {
                        const p = pStr as PeriodId;
                        const isSelected = unavailable.includes(p);
                        return (
                          <button
                            key={p}
                            onClick={() => toggleTeacherPeriodUnavailability(t.id, p)}
                            title={isSelected ? `Period ${p} marked unavailable. Click to mark available.` : `Click to mark Period ${p} unavailable`}
                            className={`w-7 h-7 rounded-md font-extrabold text-xs transition-all flex items-center justify-center ${
                              isSelected
                                ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400/50'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                            }`}
                          >
                            P{p}
                          </button>
                        );
                      })}
                    </div>
                  </td>

                  {/* Quick Action Presets */}
                  <td className="p-3 text-right">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-[11px] font-bold">
                      <button
                        onClick={() => setTeacherUnavailablePeriods(t.id, [1, 2, 3, 4, 5, 6, 7, 8])}
                        className={`px-2 py-0.5 rounded transition-all ${
                          isFullDay ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Full Day
                      </button>
                      <button
                        onClick={() => setTeacherUnavailablePeriods(t.id, [1, 2, 3, 4])}
                        className={`px-2 py-0.5 rounded transition-all ${
                          unavailable.length === 4 && unavailable.every((p) => [1, 2, 3, 4].includes(p))
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        AM (P1-P4)
                      </button>
                      <button
                        onClick={() => setTeacherUnavailablePeriods(t.id, [5, 6, 7, 8])}
                        className={`px-2 py-0.5 rounded transition-all ${
                          unavailable.length === 4 && unavailable.every((p) => [5, 6, 7, 8].includes(p))
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        PM (P5-P8)
                      </button>
                      <button
                        onClick={() => setTeacherUnavailablePeriods(t.id, [])}
                        className={`px-2 py-0.5 rounded transition-all ${
                          unavailable.length === 0 ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        Clear
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
