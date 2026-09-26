export type PeriodId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Department = 
  | 'Mathematics'
  | 'Science'
  | 'English'
  | 'Mother Tongue'
  | 'Humanities'
  | 'PE & Health'
  | 'Arts & Design';

export interface TimetableSlot {
  period: PeriodId;
  time: string;
  subject: string;
  classGroup: string;
  venue: string;
  isFreePeriod: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  department: Department;
  isAbsent: boolean; // Retained for backwards compatibility / full day flag
  unavailablePeriods: PeriodId[]; // Period-specific unavailability (e.g. [1, 2] or [1,2,3,4,5,6,7,8])
  timetable: Record<PeriodId, TimetableSlot>;
}

export interface UncoveredClass {
  id: string;
  period: PeriodId;
  time: string;
  subject: string;
  classGroup: string;
  venue: string;
  absentTeacherId: string;
  absentTeacherName: string;
  department: Department;
}

export interface ReliefAssignment {
  id: string;
  uncoveredClassId: string;
  period: PeriodId;
  time: string;
  subject: string;
  classGroup: string;
  venue: string;
  absentTeacherId: string;
  absentTeacherName: string;
  reliefTeacherId: string;
  reliefTeacherName: string;
  reliefTeacherDept: Department;
  assignedAt: string;
  isAutoAssigned?: boolean;
}

export interface WorkloadSettings {
  maxConsecutivePeriods: number;
  maxDailyPeriods: number;
  prioritizeSameDept: boolean;
}

export interface MatchingCandidate {
  teacher: Teacher;
  isEligible: boolean;
  currentDailyLoad: number;
  newDailyLoad: number;
  maxDaily: number;
  currentConsecutive: number;
  newConsecutive: number;
  maxConsecutive: number;
  isSoftWarning: boolean;
  warningMessages: string[];
  exclusionReasons: string[];
  isSameDept: boolean;
  currentPeriodStatus: 'Free' | 'Teaching' | 'Relief' | 'Absent' | 'Unavailable';
  currentPeriodVenue?: string;
  currentPeriodSubject?: string;
}
