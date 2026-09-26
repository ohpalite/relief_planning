'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  Teacher,
  UncoveredClass,
  ReliefAssignment,
  WorkloadSettings,
  MatchingCandidate,
  PeriodId,
  Department
} from '../types';
import { INITIAL_TEACHERS, INITIAL_SETTINGS, PERIOD_TIMES } from '../data/dummyData';

interface ReliefContextType {
  teachers: Teacher[];
  settings: WorkloadSettings;
  assignments: ReliefAssignment[];
  selectedUncoveredClassId: string | null;
  showAllCandidates: boolean;
  activeTab: 'matcher' | 'grid' | 'masterlist' | 'absences';
  searchQuery: string;
  departmentFilter: string;
  
  // Actions
  updateSettings: (newSettings: Partial<WorkloadSettings>) => void;
  toggleTeacherAbsence: (teacherId: string) => void;
  setSelectedUncoveredClassId: (id: string | null) => void;
  setShowAllCandidates: (show: boolean) => void;
  setActiveTab: (tab: 'matcher' | 'grid' | 'masterlist' | 'absences') => void;
  setSearchQuery: (query: string) => void;
  setDepartmentFilter: (dept: string) => void;
  
  assignRelief: (uncoveredClassId: string, reliefTeacherId: string) => void;
  unassignRelief: (assignmentId: string) => void;
  autoAssignAll: () => { assignedCount: number; remainingCount: number };
  resetAllData: () => void;
  
  // Computed Data
  uncoveredClasses: UncoveredClass[];
  coveredAssignmentsCount: number;
  candidatesForSelectedClass: MatchingCandidate[];
  selectedUncoveredClass: UncoveredClass | null;
  getTeacherDailyLoad: (teacherId: string) => { totalTaught: number; maxConsecutive: number };
}

const ReliefContext = createContext<ReliefContextType | undefined>(undefined);

export const ReliefProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [settings, setSettings] = useState<WorkloadSettings>(INITIAL_SETTINGS);
  const [assignments, setAssignments] = useState<ReliefAssignment[]>([]);
  const [selectedUncoveredClassId, setSelectedUncoveredClassId] = useState<string | null>(null);
  const [showAllCandidates, setShowAllCandidates] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'matcher' | 'grid' | 'masterlist' | 'absences'>('matcher');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');

  // Compute uncovered classes from currently absent teachers
  const uncoveredClasses = useMemo<UncoveredClass[]>(() => {
    const list: UncoveredClass[] = [];
    teachers.forEach((teacher) => {
      if (teacher.isAbsent) {
        // Find non-free slots in teacher's timetable
        (Object.keys(teacher.timetable) as unknown as PeriodId[]).forEach((pStr) => {
          const p = Number(pStr) as PeriodId;
          const slot = teacher.timetable[p];
          if (!slot.isFreePeriod) {
            const id = `uncovered-${teacher.id}-P${p}`;
            list.push({
              id,
              period: p,
              time: slot.time,
              subject: slot.subject,
              classGroup: slot.classGroup,
              venue: slot.venue,
              absentTeacherId: teacher.id,
              absentTeacherName: teacher.name,
              department: teacher.department,
            });
          }
        });
      }
    });

    // Sort by period ascending
    return list.sort((a, b) => a.period - b.period);
  }, [teachers]);

  // Auto-select first unassigned class if current selection is invalid
  useEffect(() => {
    const unassignedClasses = uncoveredClasses.filter(
      (uc) => !assignments.some((a) => a.uncoveredClassId === uc.id)
    );

    if (unassignedClasses.length > 0) {
      if (!selectedUncoveredClassId || !uncoveredClasses.some((uc) => uc.id === selectedUncoveredClassId)) {
        setSelectedUncoveredClassId(unassignedClasses[0].id);
      }
    } else {
      setSelectedUncoveredClassId(null);
    }
  }, [uncoveredClasses, assignments, selectedUncoveredClassId]);

  // Selected Uncovered Class object
  const selectedUncoveredClass = useMemo(() => {
    if (!selectedUncoveredClassId) return null;
    return uncoveredClasses.find((uc) => uc.id === selectedUncoveredClassId) || null;
  }, [uncoveredClasses, selectedUncoveredClassId]);

  // Helper to calculate teacher's total taught periods and max consecutive periods today
  const calculateTeacherScheduleStatus = (teacherId: string, extraAssignedPeriod?: PeriodId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    if (!teacher) return { totalTaught: 0, maxConsecutive: 0 };

    // Construct 8-period boolean map (1 = active teaching/relief, 0 = free)
    const activeMap: Record<PeriodId, boolean> = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false };

    // 1. Regular timetable slots
    (Object.keys(teacher.timetable) as unknown as PeriodId[]).forEach((pStr) => {
      const p = Number(pStr) as PeriodId;
      if (!teacher.timetable[p].isFreePeriod) {
        activeMap[p] = true;
      }
    });

    // 2. Existing relief assignments
    assignments.forEach((assign) => {
      if (assign.reliefTeacherId === teacherId) {
        activeMap[assign.period] = true;
      }
    });

    // 3. Extra hypothetical assignment if evaluating matching
    if (extraAssignedPeriod) {
      activeMap[extraAssignedPeriod] = true;
    }

    // Calculate total taught
    let totalTaught = 0;
    (Object.values(activeMap) as boolean[]).forEach((val) => {
      if (val) totalTaught += 1;
    });

    // Calculate max consecutive periods
    let maxConsecutive = 0;
    let currentConsecutive = 0;
    for (let p = 1; p <= 8; p++) {
      if (activeMap[p as PeriodId]) {
        currentConsecutive += 1;
        if (currentConsecutive > maxConsecutive) {
          maxConsecutive = currentConsecutive;
        }
      } else {
        currentConsecutive = 0;
      }
    }

    return { totalTaught, maxConsecutive };
  };

  const getTeacherDailyLoad = (teacherId: string) => {
    return calculateTeacherScheduleStatus(teacherId);
  };

  // Evaluate candidate matching for the selected uncovered class
  const candidatesForSelectedClass = useMemo<MatchingCandidate[]>(() => {
    if (!selectedUncoveredClass) return [];

    const targetPeriod = selectedUncoveredClass.period;

    return teachers.map((teacher) => {
      const exclusionReasons: string[] = [];
      const warningMessages: string[] = [];

      // Current workload
      const currentStats = calculateTeacherScheduleStatus(teacher.id);
      // Hypothetical workload if assigned this class
      const hypotheticalStats = calculateTeacherScheduleStatus(teacher.id, targetPeriod);

      // Current slot info
      const slot = teacher.timetable[targetPeriod];
      const existingRelief = assignments.find((a) => a.reliefTeacherId === teacher.id && a.period === targetPeriod);

      let currentPeriodStatus: 'Free' | 'Teaching' | 'Relief' | 'Absent' = 'Free';
      let currentPeriodVenue: string | undefined = undefined;
      let currentPeriodSubject: string | undefined = undefined;

      // RULE 1: Absent Rule
      if (teacher.isAbsent) {
        currentPeriodStatus = 'Absent';
        exclusionReasons.push('Absent Today');
      }

      // RULE 2: Free Period Rule
      if (existingRelief) {
        currentPeriodStatus = 'Relief';
        currentPeriodVenue = existingRelief.venue;
        currentPeriodSubject = existingRelief.subject;
        exclusionReasons.push(`Already covering relief P${targetPeriod} @ ${existingRelief.venue}`);
      } else if (!slot.isFreePeriod) {
        currentPeriodStatus = 'Teaching';
        currentPeriodVenue = slot.venue;
        currentPeriodSubject = slot.subject;
        exclusionReasons.push(`Teaching ${slot.subject} (${slot.classGroup}) @ ${slot.venue}`);
      }

      // RULE 3: Max Daily Periods Limit
      if (hypotheticalStats.totalTaught > settings.maxDailyPeriods) {
        exclusionReasons.push(
          `Exceeds Daily Max Limit (${hypotheticalStats.totalTaught}/${settings.maxDailyPeriods} periods)`
        );
      }

      // RULE 4: Max Consecutive Periods Limit
      if (hypotheticalStats.maxConsecutive > settings.maxConsecutivePeriods) {
        exclusionReasons.push(
          `Exceeds Consecutive Limit (${hypotheticalStats.maxConsecutive}/${settings.maxConsecutivePeriods} in a row)`
        );
      }

      const isEligible = exclusionReasons.length === 0;

      // SOFT WARNING LOGIC
      let isSoftWarning = false;
      if (isEligible) {
        if (hypotheticalStats.totalTaught === settings.maxDailyPeriods) {
          isSoftWarning = true;
          warningMessages.push(`Reaches Daily Max (${settings.maxDailyPeriods}/${settings.maxDailyPeriods})`);
        }
        if (hypotheticalStats.maxConsecutive === settings.maxConsecutivePeriods) {
          isSoftWarning = true;
          warningMessages.push(`Reaches Consecutive Max (${settings.maxConsecutivePeriods}/${settings.maxConsecutivePeriods} in a row)`);
        }
      }

      const isSameDept = teacher.department === selectedUncoveredClass.department;

      return {
        teacher,
        isEligible,
        currentDailyLoad: currentStats.totalTaught,
        newDailyLoad: hypotheticalStats.totalTaught,
        maxDaily: settings.maxDailyPeriods,
        currentConsecutive: currentStats.maxConsecutive,
        newConsecutive: hypotheticalStats.maxConsecutive,
        maxConsecutive: settings.maxConsecutivePeriods,
        isSoftWarning,
        warningMessages,
        exclusionReasons,
        isSameDept,
        currentPeriodStatus,
        currentPeriodVenue,
        currentPeriodSubject,
      };
    }).sort((a, b) => {
      // Prioritize eligible candidates first
      if (a.isEligible !== b.isEligible) return a.isEligible ? -1 : 1;
      // If prioritizeSameDept is enabled, prioritize same department
      if (settings.prioritizeSameDept && a.isSameDept !== b.isSameDept) {
        return a.isSameDept ? -1 : 1;
      }
      // Prioritize lower daily load
      if (a.currentDailyLoad !== b.currentDailyLoad) {
        return a.currentDailyLoad - b.currentDailyLoad;
      }
      return a.teacher.name.localeCompare(b.teacher.name);
    });
  }, [teachers, selectedUncoveredClass, assignments, settings]);

  // Actions
  const updateSettings = (newSettings: Partial<WorkloadSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const toggleTeacherAbsence = (teacherId: string) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id === teacherId) {
          const nextAbsent = !t.isAbsent;
          // If marking teacher as present, remove any relief assignments for their classes
          if (!nextAbsent) {
            setAssignments((existing) => existing.filter((a) => a.absentTeacherId !== teacherId));
          }
          return { ...t, isAbsent: nextAbsent };
        }
        return t;
      })
    );
  };

  const assignRelief = (uncoveredClassId: string, reliefTeacherId: string) => {
    const uc = uncoveredClasses.find((item) => item.id === uncoveredClassId);
    const reliefTeacher = teachers.find((t) => t.id === reliefTeacherId);

    if (!uc || !reliefTeacher) return;

    const newAssignment: ReliefAssignment = {
      id: `assign-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      uncoveredClassId,
      period: uc.period,
      time: uc.time,
      subject: uc.subject,
      classGroup: uc.classGroup,
      venue: uc.venue,
      absentTeacherId: uc.absentTeacherId,
      absentTeacherName: uc.absentTeacherName,
      reliefTeacherId: reliefTeacher.id,
      reliefTeacherName: reliefTeacher.name,
      reliefTeacherDept: reliefTeacher.department,
      assignedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAssignments((prev) => [...prev.filter((a) => a.uncoveredClassId !== uncoveredClassId), newAssignment]);
  };

  const unassignRelief = (assignmentId: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
  };

  // Smart Auto-Assign Algorithm for all uncovered classes
  const autoAssignAll = () => {
    let newAssignmentsList = [...assignments];
    let assignedCount = 0;

    // Process each unassigned uncovered class
    uncoveredClasses.forEach((uc) => {
      const isAlreadyAssigned = newAssignmentsList.some((a) => a.uncoveredClassId === uc.id);
      if (isAlreadyAssigned) return;

      // Find best candidate for this uc
      const targetPeriod = uc.period;

      const candidates = teachers.map((teacher) => {
        // calculate status using updated newAssignmentsList
        const activeMap: Record<PeriodId, boolean> = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false };
        (Object.keys(teacher.timetable) as unknown as PeriodId[]).forEach((pStr) => {
          const p = Number(pStr) as PeriodId;
          if (!teacher.timetable[p].isFreePeriod) activeMap[p] = true;
        });
        newAssignmentsList.forEach((assign) => {
          if (assign.reliefTeacherId === teacher.id) activeMap[assign.period] = true;
        });

        // check if absent
        if (teacher.isAbsent) return { teacher, eligible: false, sameDept: false, daily: 99 };
        // check if busy at targetPeriod
        if (activeMap[targetPeriod]) return { teacher, eligible: false, sameDept: false, daily: 99 };

        // hypothetical with this period
        activeMap[targetPeriod] = true;

        let totalTaught = 0;
        (Object.values(activeMap) as boolean[]).forEach((v) => { if (v) totalTaught += 1; });

        let maxConsec = 0;
        let curConsec = 0;
        for (let p = 1; p <= 8; p++) {
          if (activeMap[p as PeriodId]) {
            curConsec += 1;
            if (curConsec > maxConsec) maxConsec = curConsec;
          } else {
            curConsec = 0;
          }
        }

        const eligible = totalTaught <= settings.maxDailyPeriods && maxConsec <= settings.maxConsecutivePeriods;
        const sameDept = teacher.department === uc.department;

        return { teacher, eligible, sameDept, daily: totalTaught };
      })
      .filter((c) => c.eligible)
      .sort((a, b) => {
        if (settings.prioritizeSameDept && a.sameDept !== b.sameDept) return a.sameDept ? -1 : 1;
        return a.daily - b.daily;
      });

      if (candidates.length > 0) {
        const bestTeacher = candidates[0].teacher;
        newAssignmentsList.push({
          id: `auto-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          uncoveredClassId: uc.id,
          period: uc.period,
          time: uc.time,
          subject: uc.subject,
          classGroup: uc.classGroup,
          venue: uc.venue,
          absentTeacherId: uc.absentTeacherId,
          absentTeacherName: uc.absentTeacherName,
          reliefTeacherId: bestTeacher.id,
          reliefTeacherName: bestTeacher.name,
          reliefTeacherDept: bestTeacher.department,
          assignedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAutoAssigned: true,
        });
        assignedCount++;
      }
    });

    setAssignments(newAssignmentsList);
    const remainingCount = uncoveredClasses.length - newAssignmentsList.length;
    return { assignedCount, remainingCount };
  };

  const resetAllData = () => {
    setTeachers(INITIAL_TEACHERS);
    setSettings(INITIAL_SETTINGS);
    setAssignments([]);
    setSelectedUncoveredClassId(null);
  };

  const coveredAssignmentsCount = assignments.length;

  return (
    <ReliefContext.Provider
      value={{
        teachers,
        settings,
        assignments,
        selectedUncoveredClassId,
        showAllCandidates,
        activeTab,
        searchQuery,
        departmentFilter,
        updateSettings,
        toggleTeacherAbsence,
        setSelectedUncoveredClassId,
        setShowAllCandidates,
        setActiveTab,
        setSearchQuery,
        setDepartmentFilter,
        assignRelief,
        unassignRelief,
        autoAssignAll,
        resetAllData,
        uncoveredClasses,
        coveredAssignmentsCount,
        candidatesForSelectedClass,
        selectedUncoveredClass,
        getTeacherDailyLoad,
      }}
    >
      {children}
    </ReliefContext.Provider>
  );
};

export const useRelief = () => {
  const context = useContext(ReliefContext);
  if (!context) {
    throw new Error('useRelief must be used within a ReliefProvider');
  }
  return context;
};
