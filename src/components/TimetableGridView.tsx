'use client';

import React, { useState } from 'react';
import { useRelief } from '../context/ReliefContext';
import { PeriodId } from '../types';
import { PERIOD_TIMES } from '../data/dummyData';
import { Search, MapPin, CheckCircle2, UserX, Clock, BookOpen, AlertCircle } from 'lucide-react';

export default function TimetableGridView() {
  const { teachers, assignments, setSelectedUncoveredClassId, setActiveTab } = useRelief();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const filteredTeachers = teachers.filter((t) => {
    if (deptFilter !== 'All' && t.department !== deptFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.department.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
      
      {/* Matrix Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3 rounded-t-xl">
        <div>
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Master Timetable Matrix</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full 8-period daily overview across all teachers and venues.
          </p>
        </div>

        {/* Filters & Legend */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Legend */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Free</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Teaching</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Relief Assigned</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Absent</span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          {/* Dept Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

      {/* Grid Table Container */}
      <div className="overflow-x-auto max-h-[680px] scrollbar-thin">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900 text-white sticky top-0 z-20 shadow-sm text-xs">
            <tr>
              <th className="p-3 font-bold sticky left-0 z-30 bg-slate-900 min-w-[200px] border-r border-slate-800">
                Teacher / Department
              </th>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
                <th key={p} className="p-3 text-center min-w-[140px] border-r border-slate-800">
                  <div className="font-extrabold text-white">Period {p}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{PERIOD_TIMES[p as PeriodId]}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-xs">
            {filteredTeachers.map((teacher) => {
              return (
                <tr key={teacher.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Teacher Column */}
                  <td className="p-3 font-medium text-slate-900 sticky left-0 z-10 bg-white border-r border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{teacher.name}</span>
                          {teacher.isAbsent && (
                            <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-rose-300">
                              Absent
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{teacher.department}</div>
                      </div>
                    </div>
                  </td>

                  {/* 8 Period Cells */}
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((pStr) => {
                    const p = pStr as PeriodId;
                    const slot = teacher.timetable[p];

                    if (teacher.isAbsent) {
                      if (slot.isFreePeriod) {
                        return (
                          <td key={p} className="p-2 border-r border-slate-200 text-center bg-rose-50/30 text-slate-400">
                            <span className="text-[11px]">Free (Absent)</span>
                          </td>
                        );
                      }
                      return (
                        <td key={p} className="p-2 border-r border-slate-200 bg-rose-100/70 border-rose-200 text-rose-950">
                          <div className="font-bold text-[11px] text-rose-900 flex items-center gap-1">
                            <UserX className="w-3 h-3 text-rose-600 shrink-0" />
                            <span>{slot.subject}</span>
                          </div>
                          <div className="text-[10px] font-semibold text-rose-800">{slot.classGroup}</div>
                          <div className="text-[10px] text-rose-900 font-extrabold flex items-center gap-0.5 mt-0.5">
                            <MapPin className="w-2.5 h-2.5 text-rose-600" />
                            <span>{slot.venue}</span>
                          </div>
                        </td>
                      );
                    }

                    // Check if teacher is assigned relief at this period
                    const relief = assignments.find((a) => a.reliefTeacherId === teacher.id && a.period === p);

                    if (relief) {
                      return (
                        <td key={p} className="p-2 border-r border-slate-200 bg-amber-100/90 border-amber-300 text-amber-950 shadow-inner">
                          <div className="font-bold text-[11px] text-amber-900 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-amber-700 shrink-0" />
                            <span>RELIEF: {relief.subject}</span>
                          </div>
                          <div className="text-[10px] font-semibold text-amber-800">{relief.classGroup}</div>
                          <div className="text-[10px] text-slate-900 font-black flex items-center gap-0.5 mt-0.5 bg-amber-200/80 px-1 py-0.5 rounded">
                            <MapPin className="w-2.5 h-2.5 text-amber-800" />
                            <span>{relief.venue}</span>
                          </div>
                        </td>
                      );
                    }

                    if (slot.isFreePeriod) {
                      return (
                        <td key={p} className="p-2 border-r border-slate-200 bg-emerald-50/50 hover:bg-emerald-100/60 transition-colors text-center">
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Free Slot
                          </span>
                        </td>
                      );
                    }

                    // Regular teaching slot
                    return (
                      <td key={p} className="p-2 border-r border-slate-200 bg-slate-50 text-slate-800">
                        <div className="font-bold text-[11px] text-slate-900">{slot.subject}</div>
                        <div className="text-[10px] text-indigo-700 font-semibold">{slot.classGroup}</div>
                        <div className="text-[10px] text-slate-600 flex items-center gap-0.5 mt-0.5">
                          <MapPin className="w-2.5 h-2.5 text-slate-400" />
                          <span className="font-medium text-slate-800">{slot.venue}</span>
                        </div>
                      </td>
                    );
                  })}

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
