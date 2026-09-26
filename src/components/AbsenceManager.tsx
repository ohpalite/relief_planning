'use client';

import React, { useState } from 'react';
import { useRelief } from '../context/ReliefContext';
import { UserX, UserCheck, Search, Filter, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AbsenceManager() {
  const { teachers, toggleTeacherAbsence, uncoveredClasses } = useRelief();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Absent' | 'Present'>('All');

  const filteredTeachers = teachers.filter((t) => {
    if (statusFilter === 'Absent' && !t.isAbsent) return false;
    if (statusFilter === 'Present' && t.isAbsent) return false;
    if (deptFilter !== 'All' && t.department !== deptFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.department.toLowerCase().includes(q);
    }
    return true;
  });

  const absentTeachers = teachers.filter((t) => t.isAbsent);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3 rounded-t-xl">
        <div>
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <UserX className="w-4 h-4 text-rose-600" />
            <span>Staff Absence Manager</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mark staff as absent or present today. Changing status dynamically updates uncovered classes.
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
              Absent ({absentTeachers.length})
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
            <strong>{absentTeachers.length} Teachers Absent Today</strong> generating <strong>{uncoveredClasses.length} period slots</strong> needing relief coverage.
          </span>
        </div>
      </div>

      {/* Teachers Roster Table */}
      <div className="p-4 overflow-x-auto min-h-[500px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white text-xs">
              <th className="p-3 font-bold">Teacher Name</th>
              <th className="p-3 font-bold">Department</th>
              <th className="p-3 font-bold">Contact Email</th>
              <th className="p-3 font-bold text-center">Status Today</th>
              <th className="p-3 font-bold text-right">Toggle Absence Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {filteredTeachers.map((t) => {
              return (
                <tr key={t.id} className={`hover:bg-slate-50 transition-colors ${t.isAbsent ? 'bg-rose-50/40' : ''}`}>
                  <td className="p-3 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs ${
                        t.isAbsent ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {t.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div>{t.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">ID: {t.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 font-medium text-slate-700">{t.department}</td>
                  <td className="p-3 text-slate-500 font-mono text-[11px]">{t.email}</td>

                  <td className="p-3 text-center">
                    {t.isAbsent ? (
                      <span className="bg-rose-100 text-rose-800 font-extrabold px-3 py-1 rounded-full text-xs border border-rose-300 inline-flex items-center gap-1">
                        <UserX className="w-3.5 h-3.5 text-rose-600" />
                        ABSENT TODAY
                      </span>
                    ) : (
                      <span className="bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full text-xs border border-emerald-300 inline-flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Present
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => toggleTeacherAbsence(t.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                        t.isAbsent
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-rose-600 hover:bg-rose-500 text-white'
                      }`}
                    >
                      {t.isAbsent ? 'Mark as Present' : 'Mark as Absent'}
                    </button>
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
