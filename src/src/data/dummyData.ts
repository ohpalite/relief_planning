import { Teacher, PeriodId, WorkloadSettings } from '../types';

export const PERIOD_TIMES: Record<PeriodId, string> = {
  1: '08:00 - 08:45',
  2: '08:45 - 09:30',
  3: '09:30 - 10:15',
  4: '10:15 - 11:00',
  5: '11:15 - 12:00',
  6: '12:00 - 12:45',
  7: '12:45 - 13:30',
  8: '13:30 - 14:15',
};

export const INITIAL_SETTINGS: WorkloadSettings = {
  maxConsecutivePeriods: 6,
  maxDailyPeriods: 7,
  prioritizeSameDept: true,
};

export const INITIAL_TEACHERS: Teacher[] = [
  // MATHEMATICS DEPARTMENT
  {
    id: 't-01',
    name: 'Marcus Chen',
    department: 'Mathematics',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Elem Math', classGroup: 'Primary 5A', venue: 'Classroom 5A', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Elem Math', classGroup: 'Primary 5A', venue: 'Classroom 5A', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Add Math', classGroup: 'Primary 6B', venue: 'Math Lab 1', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Add Math', classGroup: 'Primary 6B', venue: 'Math Lab 1', isFreePeriod: false },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Math Olympiad', classGroup: 'Remedial 4', venue: 'Math Room 2', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
    }
  },
  {
    id: 't-02',
    name: 'Sarah Jenkins',
    department: 'Mathematics',
    isAbsent: true,
    unavailablePeriods: [1, 2, 3, 4, 5, 6, 7, 8], // Full Day Absent
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Math Core', classGroup: 'Primary 4C', venue: 'Classroom 4C', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Math Core', classGroup: 'Primary 4C', venue: 'Classroom 4C', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Math Core', classGroup: 'Primary 3A', venue: 'Classroom 3A', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Math Core', classGroup: 'Primary 3A', venue: 'Classroom 3A', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Math Support', classGroup: 'Primary 5C', venue: 'Learning Support Center', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
    }
  },
  {
    id: 't-03',
    name: 'Rajesh Kumar',
    department: 'Mathematics',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Advanced Math', classGroup: 'Primary 6A', venue: 'Math Lab 2', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Math Foundation', classGroup: 'Primary 4B', venue: 'Classroom 4B', isFreePeriod: false },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Math Foundation', classGroup: 'Primary 4B', venue: 'Classroom 4B', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Math Consultation', classGroup: 'Primary 6A', venue: 'Math Room 1', isFreePeriod: false },
    }
  },
  {
    id: 't-04',
    name: 'Elena Rostova',
    department: 'Mathematics',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Math Standard', classGroup: 'Primary 3C', venue: 'Classroom 3C', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Math Standard', classGroup: 'Primary 3C', venue: 'Classroom 3C', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Math Standard', classGroup: 'Primary 5B', venue: 'Classroom 5B', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Math Standard', classGroup: 'Primary 5B', venue: 'Classroom 5B', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Math Standard', classGroup: 'Primary 4A', venue: 'Classroom 4A', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Math Standard', classGroup: 'Primary 4A', venue: 'Classroom 4A', isFreePeriod: false },
    }
  },

  // SCIENCE DEPARTMENT
  {
    id: 't-05',
    name: 'David Tan',
    department: 'Science',
    isAbsent: true,
    unavailablePeriods: [1, 2, 3, 4], // Morning Absent (P1-P4)
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'General Science', classGroup: 'Primary 4A', venue: 'Science Lab 1', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'General Science', classGroup: 'Primary 4A', venue: 'Science Lab 1', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Physics Intro', classGroup: 'Primary 6A', venue: 'Physics Lab', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Physics Intro', classGroup: 'Primary 6A', venue: 'Physics Lab', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Bio Inquiry', classGroup: 'Primary 5C', venue: 'Biology Lab', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
    }
  },
  {
    id: 't-06',
    name: 'Dr. Emily Watson',
    department: 'Science',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Chemistry Fundamentals', classGroup: 'Primary 6C', venue: 'Chemistry Lab', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Chemistry Fundamentals', classGroup: 'Primary 6C', venue: 'Chemistry Lab', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Science Tech', classGroup: 'Primary 5A', venue: 'Science Lab 2', isFreePeriod: false },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Science Tech', classGroup: 'Primary 5A', venue: 'Science Lab 2', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Eco Club', classGroup: 'Enrichment', venue: 'Eco Garden', isFreePeriod: false },
    }
  },
  {
    id: 't-07',
    name: 'Vikram Patel',
    department: 'Science',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Primary Science', classGroup: 'Primary 3B', venue: 'Classroom 3B', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Primary Science', classGroup: 'Primary 3B', venue: 'Classroom 3B', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Science Lab Practicum', classGroup: 'Primary 4B', venue: 'Science Lab 1', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Science Lab Practicum', classGroup: 'Primary 4B', venue: 'Science Lab 1', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
    }
  },
  {
    id: 't-08',
    name: 'Grace Hopper-Lee',
    department: 'Science',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'STEM Robotics', classGroup: 'Primary 5B', venue: 'Maker Lab', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'STEM Robotics', classGroup: 'Primary 5B', venue: 'Maker Lab', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Environmental Sci', classGroup: 'Primary 4C', venue: 'Science Lab 2', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'General Science', classGroup: 'Primary 3A', venue: 'Classroom 3A', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'General Science', classGroup: 'Primary 3A', venue: 'Classroom 3A', isFreePeriod: false },
    }
  },

  // ENGLISH DEPARTMENT
  {
    id: 't-09',
    name: 'Aisha Rahman',
    department: 'English',
    isAbsent: true,
    unavailablePeriods: [5, 6, 7, 8], // Afternoon Absent (P5-P8)
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'English Lit & Composition', classGroup: 'Primary 6A', venue: 'Classroom 6A', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'English Lit & Composition', classGroup: 'Primary 6A', venue: 'Classroom 6A', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Grammar & Vocab', classGroup: 'Primary 4A', venue: 'Classroom 4A', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Creative Writing', classGroup: 'Primary 5C', venue: 'Language Lab 1', isFreePeriod: false },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Guided Reading', classGroup: 'Primary 3B', venue: 'School Library', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Guided Reading', classGroup: 'Primary 3B', venue: 'School Library', isFreePeriod: false },
    }
  },
  {
    id: 't-10',
    name: 'Oliver Wright',
    department: 'English',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'English Lang', classGroup: 'Primary 5A', venue: 'Classroom 5A', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'English Lang', classGroup: 'Primary 5A', venue: 'Classroom 5A', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Public Speaking', classGroup: 'Primary 6B', venue: 'AV Theatre', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
    }
  },
  {
    id: 't-11',
    name: 'Chloe Bennett',
    department: 'English',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'English Core', classGroup: 'Primary 4B', venue: 'Classroom 4B', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'English Core', classGroup: 'Primary 4B', venue: 'Classroom 4B', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'English Phonics', classGroup: 'Primary 3C', venue: 'Classroom 3C', isFreePeriod: false },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'English Phonics', classGroup: 'Primary 3C', venue: 'Classroom 3C', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Drama & Speech', classGroup: 'Primary 5A', venue: 'Black Box Studio', isFreePeriod: false },
    }
  },
  {
    id: 't-12',
    name: 'Benjamin Taylor',
    department: 'English',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'English Skills', classGroup: 'Primary 3A', venue: 'Classroom 3A', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'English Skills', classGroup: 'Primary 3A', venue: 'Classroom 3A', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Literature Circle', classGroup: 'Primary 6C', venue: 'School Library', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Literature Circle', classGroup: 'Primary 6C', venue: 'School Library', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
    }
  },

  // MOTHER TONGUE DEPARTMENT
  {
    id: 't-13',
    name: 'Lin Wei Ling',
    department: 'Mother Tongue',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Chinese Language', classGroup: 'Primary 5A', venue: 'Language Lab 2', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Chinese Language', classGroup: 'Primary 5A', venue: 'Language Lab 2', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Chinese Higher', classGroup: 'Primary 6A', venue: 'Classroom 6A', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Chinese Higher', classGroup: 'Primary 6A', venue: 'Classroom 6A', isFreePeriod: false },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Chinese Culture', classGroup: 'Primary 4B', venue: 'Heritage Room', isFreePeriod: false },
    }
  },
  {
    id: 't-14',
    name: 'Nurul Huda',
    department: 'Mother Tongue',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Malay Language', classGroup: 'Primary 4A', venue: 'Classroom 4A', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Malay Language', classGroup: 'Primary 4A', venue: 'Classroom 4A', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Malay Literature', classGroup: 'Primary 6B', venue: 'Language Lab 1', isFreePeriod: false },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Malay Literature', classGroup: 'Primary 6B', venue: 'Language Lab 1', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
    }
  },
  {
    id: 't-15',
    name: 'K. Sundram',
    department: 'Mother Tongue',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Tamil Language', classGroup: 'Primary 3B', venue: 'Classroom 3B', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Tamil Language', classGroup: 'Primary 5C', venue: 'Classroom 5C', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Tamil Language', classGroup: 'Primary 5C', venue: 'Classroom 5C', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Tamil Higher', classGroup: 'Primary 6C', venue: 'Language Lab 2', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Tamil Higher', classGroup: 'Primary 6C', venue: 'Language Lab 2', isFreePeriod: false },
    }
  },

  // HUMANITIES DEPARTMENT
  {
    id: 't-16',
    name: 'Jonathan Miller',
    department: 'Humanities',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Social Studies', classGroup: 'Primary 4C', venue: 'Classroom 4C', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Social Studies', classGroup: 'Primary 4C', venue: 'Classroom 4C', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'World History', classGroup: 'Primary 6B', venue: 'Humanities Room', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'World History', classGroup: 'Primary 6B', venue: 'Humanities Room', isFreePeriod: false },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Geography Skills', classGroup: 'Primary 5A', venue: 'Geo Lab', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
    }
  },
  {
    id: 't-17',
    name: 'Sophia Martinez',
    department: 'Humanities',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Geography', classGroup: 'Primary 5B', venue: 'Geo Lab', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Geography', classGroup: 'Primary 5B', venue: 'Geo Lab', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Civic Education', classGroup: 'Primary 3C', venue: 'Classroom 3C', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Social Studies', classGroup: 'Primary 4B', venue: 'Classroom 4B', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Social Studies', classGroup: 'Primary 4B', venue: 'Classroom 4B', isFreePeriod: false },
    }
  },

  // PE & HEALTH DEPARTMENT
  {
    id: 't-18',
    name: 'Coach Michael Vance',
    department: 'PE & Health',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Physical Education', classGroup: 'Primary 6A', venue: 'Indoor Sports Hall', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Physical Education', classGroup: 'Primary 6A', venue: 'Indoor Sports Hall', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Free', classGroup: '-', venue: 'PE Office', isFreePeriod: true },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Health Education', classGroup: 'Primary 4A', venue: 'Classroom 4A', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Free', classGroup: '-', venue: 'PE Office', isFreePeriod: true },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Track & Field', classGroup: 'Primary 5B', venue: 'School Field', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Track & Field', classGroup: 'Primary 5B', venue: 'School Field', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Free', classGroup: '-', venue: 'PE Office', isFreePeriod: true },
    }
  },
  {
    id: 't-19',
    name: 'Amanda Brooks',
    department: 'PE & Health',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Free', classGroup: '-', venue: 'PE Office', isFreePeriod: true },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Physical Education', classGroup: 'Primary 3A', venue: 'Basketball Court', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Physical Education', classGroup: 'Primary 3A', venue: 'Basketball Court', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Free', classGroup: '-', venue: 'PE Office', isFreePeriod: true },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Swimming', classGroup: 'Primary 4C', venue: 'Swimming Pool', isFreePeriod: false },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Swimming', classGroup: 'Primary 4C', venue: 'Swimming Pool', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Free', classGroup: '-', venue: 'PE Office', isFreePeriod: true },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Fitness Club', classGroup: 'All Grades', venue: 'Gymnasium', isFreePeriod: false },
    }
  },

  // ARTS & DESIGN DEPARTMENT
  {
    id: 't-20',
    name: 'Hannah Zhang',
    department: 'Arts & Design',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Visual Arts', classGroup: 'Primary 4B', venue: 'Art Studio 1', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Visual Arts', classGroup: 'Primary 4B', venue: 'Art Studio 1', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Digital Art', classGroup: 'Primary 6C', venue: 'Computer Lab 1', isFreePeriod: false },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Digital Art', classGroup: 'Primary 6C', venue: 'Computer Lab 1', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
    }
  },
  {
    id: 't-21',
    name: 'Lucas Dupont',
    department: 'Arts & Design',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Music Appreciation', classGroup: 'Primary 3C', venue: 'Music Room 1', isFreePeriod: false },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Band Practice', classGroup: 'Primary 5A', venue: 'Music Room 2', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Band Practice', classGroup: 'Primary 5A', venue: 'Music Room 2', isFreePeriod: false },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Choir', classGroup: 'Enrichment', venue: 'School Auditorium', isFreePeriod: false },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Choir', classGroup: 'Enrichment', venue: 'School Auditorium', isFreePeriod: false },
    }
  },
  {
    id: 't-22',
    name: 'Isabella Ross',
    department: 'Arts & Design',
    isAbsent: false,
    unavailablePeriods: [],
    timetable: {
      1: { period: 1, time: PERIOD_TIMES[1], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      2: { period: 2, time: PERIOD_TIMES[2], subject: 'Design Tech', classGroup: 'Primary 6A', venue: 'Workshop 1', isFreePeriod: false },
      3: { period: 3, time: PERIOD_TIMES[3], subject: 'Design Tech', classGroup: 'Primary 6A', venue: 'Workshop 1', isFreePeriod: false },
      4: { period: 4, time: PERIOD_TIMES[4], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      5: { period: 5, time: PERIOD_TIMES[5], subject: 'Pottery & Craft', classGroup: 'Primary 4A', venue: 'Art Studio 2', isFreePeriod: false },
      6: { period: 6, time: PERIOD_TIMES[6], subject: 'Pottery & Craft', classGroup: 'Primary 4A', venue: 'Art Studio 2', isFreePeriod: false },
      7: { period: 7, time: PERIOD_TIMES[7], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
      8: { period: 8, time: PERIOD_TIMES[8], subject: 'Free', classGroup: '-', venue: 'Staff Room', isFreePeriod: true },
    }
  }
];
