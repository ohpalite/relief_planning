import type { Metadata } from 'next';
import './globals.css';
import { ReliefProvider } from '../context/ReliefContext';

export const metadata: Metadata = {
  title: 'School Relief Planning & Substitute Scheduling System',
  description: 'Smart automated relief teacher scheduling system with workload limit enforcement and real-time candidate matching.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 min-h-screen text-slate-900">
        <ReliefProvider>
          {children}
        </ReliefProvider>
      </body>
    </html>
  );
}
