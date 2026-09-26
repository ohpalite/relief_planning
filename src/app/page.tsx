'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import MetricsSummary from '../components/MetricsSummary';
import UncoveredClassesList from '../components/UncoveredClassesList';
import AvailableTeachersPanel from '../components/AvailableTeachersPanel';
import TimetableGridView from '../components/TimetableGridView';
import ReliefMasterlist from '../components/ReliefMasterlist';
import AbsenceManager from '../components/AbsenceManager';
import { useRelief } from '../context/ReliefContext';

export default function Home() {
  const { activeTab } = useRelief();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* KPI Summary Cards */}
        <MetricsSummary />

        {/* Tab 1: Smart Matcher (Default) */}
        {activeTab === 'matcher' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel: Uncovered Classes */}
            <div className="lg:col-span-6">
              <UncoveredClassesList />
            </div>

            {/* Right Panel: Available Relief Teachers */}
            <div className="lg:col-span-6">
              <AvailableTeachersPanel />
            </div>
          </div>
        )}

        {/* Tab 2: Timetable Matrix */}
        {activeTab === 'grid' && (
          <div className="w-full">
            <TimetableGridView />
          </div>
        )}

        {/* Tab 3: Relief Masterlist & Export */}
        {activeTab === 'masterlist' && (
          <div className="w-full">
            <ReliefMasterlist />
          </div>
        )}

        {/* Tab 4: Absence Manager */}
        {activeTab === 'absences' && (
          <div className="w-full">
            <AbsenceManager />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-4 border-t border-slate-800 text-center print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>School Relief Planning & Substitute Scheduling System &copy; 2026</span>
          <span className="text-slate-500">Enforcing Daily Max & Consecutive Workload Limits</span>
        </div>
      </footer>

    </div>
  );
}
