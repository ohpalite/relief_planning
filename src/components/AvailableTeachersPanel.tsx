'use client';

import React from 'react';
import { useRelief } from '../context/ReliefContext';
import { 
  UserCheck, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Award, 
  Clock, 
  MapPin,
  Eye,
  EyeOff,
  UserPlus
} from 'lucide-react';

export default function AvailableTeachersPanel() {
  const {
    selectedUncoveredClass,
    candidatesForSelectedClass,
    showAllCandidates,
    setShowAllCandidates,
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    assignRelief,
    settings
  } = useRelief();

  if (!selectedUncoveredClass) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center h-[750px]">
        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full mb-3">
          <Info className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-slate-800 text-base">No Class Selected</h3>
        <p className="text-xs text-slate-500 max-w-xs mt-1">
          Click on any uncovered class period from the left panel to evaluate available relief teachers.
        </p>
      </div>
    );
  }

  // Filter candidates based on search & department
  const filteredCandidates = candidatesForSelectedClass.filter((item) => {
    // Hide ineligible if showAllCandidates is false
    if (!showAllCandidates && !item.isEligible) return false;

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.teacher.name.toLowerCase().includes(q);
      const matchDept = item.teacher.department.toLowerCase().includes(q);
      if (!matchName && !matchDept) return false;
    }

    // Department filter
    if (departmentFilter !== 'All' && item.teacher.department !== departmentFilter) {
      return false;
    }

    return true;
  });

  const eligibleCount = candidatesForSelectedClass.filter((c) => c.isEligible).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[750px]">
      
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 rounded-t-xl">
        
        {/* Selected Class Context Banner */}
        <div className="bg-slate-900 text-white p-3.5 rounded-xl mb-3 shadow-sm">
          <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              Target Slot: Period {selectedUncoveredClass.period} ({selectedUncoveredClass.time})
            </span>
            <span className="bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 px-2 py-0.5 rounded font-mono">
              {selectedUncoveredClass.department}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <h3 className="font-bold text-base text-white">
              {selectedUncoveredClass.subject} ({selectedUncoveredClass.classGroup})
            </h3>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-300 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Report Venue: <strong className="text-white bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/40">{selectedUncoveredClass.venue}</strong></span>
            </div>
            <span className="text-slate-400 text-[11px]">
              Absent: {selectedUncoveredClass.absentTeacherName}
            </span>
          </div>
        </div>

        {/* Filter Controls & Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search teacher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
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

          {/* Toggle Ineligible */}
          <button
            onClick={() => setShowAllCandidates(!showAllCandidates)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              showAllCandidates
                ? 'bg-slate-800 text-white border-slate-700'
                : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
            }`}
          >
            {showAllCandidates ? <Eye className="w-3.5 h-3.5 text-indigo-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showAllCandidates ? 'Showing All' : 'Only Eligible'}</span>
          </button>
        </div>

        {/* Candidate Stats Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium mt-2 pt-2 border-t border-slate-200/60">
          <span>Matching Candidates</span>
          <span className="text-slate-700 font-bold">
            <strong className="text-emerald-600">{eligibleCount} Eligible</strong> / {candidatesForSelectedClass.length} Total
          </span>
        </div>

      </div>

      {/* Candidates List Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredCandidates.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <XCircle className="w-10 h-10 text-slate-300 mb-2" />
            <h4 className="font-bold text-slate-700 text-sm">No Matching Candidates Found</h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              Try enabling "Show All" toggle to view excluded teachers and their exclusion reasons.
            </p>
          </div>
        ) : (
          filteredCandidates.map((item) => {
            const { teacher, isEligible, isSoftWarning, isSameDept, exclusionReasons, warningMessages } = item;

            return (
              <div
                key={teacher.id}
                className={`p-3.5 rounded-xl border transition-all relative ${
                  isEligible
                    ? isSoftWarning
                      ? 'border-amber-300 bg-amber-50/20 hover:border-amber-400 hover:shadow-sm'
                      : 'border-emerald-200 bg-white hover:border-emerald-400 hover:shadow-md'
                    : 'border-slate-200 bg-slate-50/70 opacity-60 hover:opacity-90'
                }`}
              >
                {/* Header: Name & Department */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{teacher.name}</h4>
                      {isSameDept && (
                        <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                          <Award className="w-3 h-3 text-indigo-600" />
                          Same Dept ({teacher.department})
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">{teacher.department}</span>
                  </div>

                  {/* Eligibility Status Tag */}
                  <div>
                    {isEligible ? (
                      isSoftWarning ? (
                        <span className="bg-amber-100 text-amber-900 text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-amber-300 flex items-center gap-1 shadow-sm">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Near Limit
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-900 text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-emerald-300 flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Eligible
                        </span>
                      )
                    ) : (
                      <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-rose-200">
                        Ineligible
                      </span>
                    )}
                  </div>
                </div>

                {/* Workload Limits Bar */}
                <div className="my-2.5 grid grid-cols-2 gap-2 bg-slate-100/70 p-2 rounded-lg text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block">Daily Workload</span>
                    <span className={`font-extrabold ${item.newDailyLoad > settings.maxDailyPeriods ? 'text-rose-600' : 'text-slate-800'}`}>
                      {item.currentDailyLoad} &rarr; {item.newDailyLoad} / {settings.maxDailyPeriods} periods
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block">Consecutive Periods</span>
                    <span className={`font-extrabold ${item.newConsecutive > settings.maxConsecutivePeriods ? 'text-rose-600' : 'text-slate-800'}`}>
                      {item.currentConsecutive} &rarr; {item.newConsecutive} / {settings.maxConsecutivePeriods} max
                    </span>
                  </div>
                </div>

                {/* SOFT WARNING MESSAGES */}
                {isSoftWarning && warningMessages.length > 0 && (
                  <div className="mb-2.5 p-2 bg-amber-100/80 border border-amber-300 text-amber-900 rounded-lg text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <div className="leading-tight">
                      <span className="font-bold">Soft Warning: </span>
                      {warningMessages.join(' • ')}
                    </div>
                  </div>
                )}

                {/* EXCLUSION REASONS (IF INELIGIBLE) */}
                {!isEligible && exclusionReasons.length > 0 && (
                  <div className="mb-2.5 p-2 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs">
                    <span className="font-bold text-[11px] uppercase tracking-wider block text-rose-700 mb-1">
                      Reason for Exclusion:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-xs text-rose-900 font-medium">
                      {exclusionReasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/80">
                  <span className="text-[11px] text-slate-500">
                    P{selectedUncoveredClass.period} @ <strong className="text-slate-800">{selectedUncoveredClass.venue}</strong>
                  </span>

                  {isEligible ? (
                    <button
                      onClick={() => assignRelief(selectedUncoveredClass.id, teacher.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-sm flex items-center gap-1.5 ${
                        isSoftWarning
                          ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/20'
                          : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/20'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Assign Teacher</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 text-slate-400 cursor-not-allowed"
                    >
                      Unavailable
                    </button>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
