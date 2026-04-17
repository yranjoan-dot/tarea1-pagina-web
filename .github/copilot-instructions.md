# HoopsScore AI - Project Setup

## Project Overview
NBA Team Analyzer web application built with Vite, React, TypeScript, and TailwindCSS. Allows users to upload team photos, automatically identifies the NBA team using TensorFlow.js, and displays detailed team information (roster, stats, championship history).

## Tech Stack
- Frontend: React 18 + TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS
- ML: TensorFlow.js (client-side, no backend required)
- Data: Static JSON (30 NBA teams)

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm installed
- No database or external API required (fully static)

### Getting Started
```bash
cd c:\Users\Usuario\Documents\IA103
npm install
npm run dev
```

Application will be available at http://localhost:5173

## Project Structure
```
src/
├── components/
│   ├── ImageUploader.tsx
│   ├── TeamCard.tsx
│   ├── TeamAnalyzer.tsx
│   └── Navbar.tsx
├── data/
│   └── teamsData.ts
├── services/
│   └── mlService.ts
├── types.ts
├── App.tsx
└── main.tsx

public/
└── models/          (TensorFlow.js models)
```

## Build & Deploy
```bash
npm run build       # Production build
npm run preview     # Preview production build locally
```

## Features Implemented
- Photo upload with drag-and-drop support
- Automatic NBA team detection using ML
- Display detailed team information:
  - Roster (player names, positions, numbers)
  - Statistics (PPG, RPG, APG, FG%, 3P%, FT%)
  - Championship history and Finals appearances
- Responsive design (mobile, tablet, desktop)
- Fallback: manual team selection if detection confidence < 60%

## Next Steps After Installation
1. Run `npm install` to install all dependencies
2. Run `npm run dev` to start development server
3. Upload test images of NBA teams
4. System will identify team and display analysis
