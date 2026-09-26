'use client';

import React, { useState } from 'react';
import { useRelief } from '../context/ReliefContext';
import { 
  FileSpreadsheet, 
  Printer, 
  Download, 
  Search, 
  MapPin, 
  CheckCircle2, 
  UserX, 
  Clock, 
  BookOpen, 
  Trash2,
  Sparkles
} from 'lucide-react';

export default function ReliefMasterlist() {
  const { assignments, uncoveredClasses, unassignRelief, autoAssignAll } = useRelief();
  const [search, setSearch] = useState('');
  const [periodFilter, setPeriodFilter] = useState<number | 'All'>('All');

  // Filter assignments
  const filteredAssignments = assignments.filter((item) => {
    if (periodFilter !== 'All' && item.period !== periodFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const matchRelief = item.reliefTeacherName.toLowerCase().includes(q);
      const matchAbsent = item.absentTeacherName.toLowerCase().includes(q);
      const matchVenue = item.venue.toLowerCase().includes(q);
      const matchSubject = item.subject.toLowerCase().includes(q);
      if (!matchRelief && !matchAbsent && !matchVenue && !matchSubject) return false;
    }
    return true;
  });

  // Export to CSV function
  const exportToCSV = () => {
    const headers = [
      'Period',
      'Time Slot',
      'Subject',
      'Class Group',
      'Reporting Venue',
      'Absent Teacher',
      'Relief Covering Teacher',
      'Department',
      'Assigned At'
    ];

    const rows = assignments.map((a) => [
      `Period ${a.period}`,
      `"${a.time}"`,
      `"${a.subject}"`,
      `"${a.classGroup}"`,
      `"${a.venue}"`,
      `"${a.absentTeacherName}"`,
      `"${a.reliefTeacherName}"`,
      `"${a.reliefTeacherDept}"`,
      `"${a.assignedAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daily_Relief_Masterlist_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Trigger Print dialog
  const handlePrint = () => {
    window.print();
  };

  const unassignedCount = uncoveredClasses.length - assignments.length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
      
      {/* Header Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3 rounded-t-xl print:hidden">
        <div>
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Daily Relief Masterlist</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Official summary of all assigned relief teachers for today's periods.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search masterlist..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>

          {/* Period Filter */}
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
          >
            <option value="All">All Periods</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
              <option key={p} value={p}>Period {p}</option>
            ))}
          </select>

          {/* Export CSV Button */}
          <button
            onClick={exportToCSV}
            disabled={assignments.length === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              assignments.length > 0
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 shadow-sm'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {/* Print PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span>Print Masterlist</span>
          </button>
        </div>
      </div>

      {/* Unassigned Warning Banner (Print Hidden) */}
      {unassignedCount > 0 && (
        <div className="p-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs text-amber-900 print:hidden">
          <div className="flex items-center gap-2">
            <span className="bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
              Attention
            </span>
            <span>There are still <strong>{unassignedCount} classes</strong> requiring relief coverage today.</span>
          </div>
          <button
            onClick={autoAssignAll}
            className="text-indigo-700 font-bold flex items-center gap-1 hover:underline"
          >
            <Sparkles className="w-3 h-3" /> Auto-assign remaining
          </button>
        </div>
      )}

      {/* Printable Masterlist Document View */}
      <div className="p-4 overflow-x-auto min-h-[500px]">
        
        {/* Printable Header (Visible only during printing) */}
        <div className="hidden print:block mb-6 text-center border-b pb-4">
          <h1 className="text-xl font-bold text-slate-900">DAILY RELIEF MASTERLIST SCHEDULE</h1>
          <p className="text-xs text-slate-600 mt-1">
            Official Administrative Relief Assignment Sheet • Date: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {filteredAssignments.length === 0 ? (
          <div className="text-center py-16">
            <FileSpreadsheet className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-700 text-sm">No Assignments to Display</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
              {assignments.length === 0
                ? 'Use the Smart Matcher or Auto-Assign button to create relief assignments.'
                : 'No assignments match your search filter.'}
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs border-b border-slate-800">
                <th className="p-3 font-bold">Slot</th>
                <th className="p-3 font-bold">Class & Subject</th>
                <th className="p-3 font-bold bg-amber-600 text-slate-950 text-center">REPORTING VENUE</th>
                <th className="p-3 font-bold">Absent Teacher</th>
                <th className="p-3 font-bold">COVERING RELIEF TEACHER</th>
                <th className="p-3 font-bold">Department</th>
                <th className="p-3 font-bold text-center print:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredAssignments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  
                  {/* Period Slot */}
                  <td className="p-3 font-medium">
                    <span className="font-extrabold text-slate-900 block">Period {a.period}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{a.time}</span>
                  </td>

                  {/* Class & Subject */}
                  <td className="p-3 font-medium">
                    <div className="font-bold text-slate-900">{a.subject}</div>
                    <div className="text-indigo-700 font-semibold text-[11px]">{a.classGroup}</div>
                  </td>

                  {/* VENUE PROMINENT HIGHLIGHT */}
                  <td className="p-3 text-center bg-amber-50/70 border-x border-amber-200">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-slate-950 font-black rounded-lg border border-amber-400 text-xs shadow-xs">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{a.venue}</span>
                    </div>
                  </td>

                  {/* Absent Teacher */}
                  <td className="p-3">
                    <div className="flex items-center gap-1 text-slate-700 font-semibold">
                      <UserX className="w-3.5 h-3.5 text-rose-500" />
                      <span>{a.absentTeacherName}</span>
                    </div>
                  </td>

                  {/* Relief Teacher */}
                  <td className="p-3 bg-emerald-50/50">
                    <div className="flex items-center gap-1.5 text-emerald-950 font-black">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-sm">{a.reliefTeacherName}</span>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="p-3 text-slate-600 font-medium">
                    {a.reliefTeacherDept}
                  </td>

                  {/* Action */}
                  <td className="p-3 text-center print:hidden">
                    <button
                      onClick={() => unassignRelief(a.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      title="Remove assignment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}
