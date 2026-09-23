# TreeMint Frontend Application

> **Digital Tree Sponsorship, Plantation Verification & Growth Tracking Platform**  
> Modern Environmental SaaS Web Application built with React, TypeScript, and Tailwind CSS.

---

## 🌲 Features

- **Public Web Portal**:
  - Landing page with live impact counter, 5-step lifecycle pipeline, and video-style proof breakdown.
  - Active campaigns directory with regional filtering (Karachi, Thatta, Lahore, Islamabad) and native species selection.
  - Public immutable Tree Passport Ledger (`/tree/TREE-KHI-2026-00125`) with interactive growth timeline, GPS coordinates, and proof photos.
  - Public Certificate Verification with QR validation hash.
  - Interactive Tree Cost & Impact Calculator.
  - Transparency & FAQ section.

- **Donor Dashboard**:
  - Personal tree portfolio with survival status indicators.
  - Environmental Impact meters (CO2 sequestered, oxygen generated, canopy area).
  - Gamification with Green Points ledger and unlockable achievement badges.
  - Official downloadable digital certificates.
  - Interactive multi-step Tree Sponsorship modal.

- **Field Plantation Team Dashboard**:
  - Assigned tree planting squads.
  - Mobile-responsive plantation proof submission (geotagged photos, GPS coordinates, planting notes).
  - Periodic survival and growth update logger (height in cm, health status).

- **Forestry Admin & Auditor Dashboard**:
  - Platform-wide statistics and campaign progress metrics.
  - Dedicated Plantation Proof Verification Queue with one-click approval/rejection and certificate issuance.
  - Tree ledger management and donor retention analytics.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (SPA / Next.js architecture ready)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Visualizations**: Recharts
- **Animations**: Motion, Canvas Confetti
- **HTTP Client**: Modular Fetch API Client (`src/services/api.ts`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```
Default backend API endpoint:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
```bash
npm run build
```
The optimized production build will be output to the `dist/` directory.
