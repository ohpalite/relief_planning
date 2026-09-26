# relief_planning

# School Relief Planning & Substitute Teacher Scheduling System (`ReliefPlanner Pro`)

A modern, responsive, high-efficiency web application built for primary & secondary school administrators to manage teacher absences, view uncovered classes, and assign substitute relief teachers while strictly enforcing daily and consecutive workload limits.

## 🚀 Key Features

- **Smart Relief Assignment Engine**: Real-time candidate matching algorithm enforcing:
  - Absence status verification
  - Free period slot availability
  - `MAX_TOTAL_PERIODS_PER_DAY` limit (default: 7)
  - `MAX_CONSECUTIVE_PERIODS` limit (default: 6)
  - Soft warnings (`⚠️ Near Limit`) when assignments reach maximum workload thresholds
  - Ineligibility tags (`🔴 Teaching P3`, `🔴 Exceeds Daily Limit`) when viewing all candidates
  - Departmental matching priority (`🎯 Same Dept`)
- **Prominent Reporting Venues**: Highlights reporting locations (e.g. `📍 Science Lab 2`, `📍 Classroom 4A`) on all class cards and masterlists for covering teachers.
- **Dynamic Workload Parameters Modal**: Allows admins to adjust max consecutive and daily constraints on the fly.
- **One-Click Auto-Assign**: Intelligent auto-pairing for all unassigned class slots.
- **Daily Relief Masterlist & CSV Export**: Print-ready schedule sheet with CSV export capabilities.
- **Timetable Matrix**: 8-period interactive overview across all staff members.
- **Staff Absence Manager**: Roster toggle for live teacher attendance status.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State**: React Context (Zero external DB required)

## 🏃 Getting Started

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/ohpalite/relief_planning.git
cd relief_planning

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📄 Deployment

Ready for instant one-click static or serverless deployment on **Vercel**.
