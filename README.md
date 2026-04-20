# Immersive Sweden 🗺️

An interactive web platform to discover and connect with Swedish companies working in immersive technologies (XR, AI, Games, Visualization, Culture, Technologies).

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Phase](https://img.shields.io/badge/Phase-4%20%2F%206-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Overview

**Immersive Sweden** is an interactive map platform with advanced animations and visual effects. Users can search, filter by technology/industry/model, and discover companies with real-time filtering and smooth animations.

### Key Features

- 🗺️ Interactive map of Sweden with animated company markers
- 📍 **352 organizations** loaded from Supabase with precise geolocation
- 🏷️ **3 Dropdown filters: Technology (XR, AI, Visualization), Industry (Manufacturing, Healthcare, Culture, Games), Organization Model (Business, Nonprofit)**
- 🔍 **Advanced search functionality** (filters by name, city, technology, industry)
- ✨ **Framer Motion animations:** Breathing map effect, pulsating border glow, floating particles, marker animations
- 🎬 **Cinematic entry animation:** FlyTo animation on load, markers appear after movement completes
- 📌 **Jitter system:** Markers at same coordinates are spread in a spiral pattern for visibility
- 🎨 **Dark mode UI with modern design** (dropdowns, modal, cards with glassmorphism)
- 📱 Fully responsive design (mobile-first, adaptive zoom)
- 💬 Company contact information & modal interactions
- 🚀 Fast, modern tech stack (Next.js, TypeScript, Zustand, Mapbox, Framer Motion, Supabase)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Mapbox API token (free tier available)
- Supabase project with organizations table

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Luisal182/immersive-sweden.git
cd immersive-sweden
```

2. **Install dependencies**

```bash
npm install
npm install framer-motion
npm install @supabase/supabase-js
```

3. **Setup environment variables**

```bash
cp .env.example .env.local
```

Add your tokens:

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

4. **Run development server**

```bash
npm run dev
```

5. **Open in browser**

```
http://localhost:3000
```

6. **View on Vercel**

```
https://immersive-sweden.vercel.app
```

---

## 📦 Tech Stack

### Frontend

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI/Maps:** Mapbox GL JS
- **Styling:** CSS Modules
- **State Management:** Zustand ✅ IMPLEMENTED
- **Animations:** Framer Motion ✅ IMPLEMENTED
- **3D Assets:** React Three Fiber (planned)

### Backend / Database

- **Database:** Supabase (PostgreSQL) ✅ IMPLEMENTED
- **Data:** 352 organizations with full metadata
- **API:** Supabase auto-generated REST API
- **External APIs (future):**
  - [Bolagsverket API](https://bolagsverket.se/) - Swedish company registry
  - [OpenStreetMap Nominatim](https://nominatim.org/) - Free geocoding

### DevOps

- **Version Control:** GitHub (dev/main branches)
- **Hosting:** Vercel (CI/CD)
- **Environment:** Node.js 18+

---

## 📁 Project Structure

```
immersive-sweden/
├── public/
│   ├── data/                         # Static data files
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css               # Global styles + animations + marker CSS
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.module.css
│   │   └── page.tsx                  # Home page
│   │
│   ├── components/
│   │   ├── 3D/
│   │   │   └── Animations/
│   │   │       ├── FloatingParticles.tsx  # 15 staggered light particles
│   │   │       ├── MapAnimation.tsx       # Entry fade + breathing effect
│   │   │       ├── MarkerAnimations.tsx   # Marker pulse + hover
│   │   │       └── SwedenBorderGlow.tsx   # Pulsating border glow
│   │   ├── Cards/
│   │   │   ├── OrganizationCard.module.css
│   │   │   └── OrganizationCard.tsx       # Organization info card
│   │   ├── Map/
│   │   │   ├── MapContainer.module.css    # Map + search + filter styling
│   │   │   └── MapContainer.tsx           # Main map component
│   │   ├── Modal/
│   │   │   ├── Modal.module.css
│   │   │   └── Modal.tsx                  # Modal wrapper
│   │   └── _graveyard/                    # Old/experimental components
│   │       ├── CustomDropdown/
│   │       │   ├── CustomDropdown.module.css
│   │       │   └── CustomDropdown.tsx
│   │       └── organizations.json         # Old local data (replaced by Supabase)
│   │
│   ├── data/
│   │   └── swedenBorder.ts               # Sweden GeoJSON border coordinates
│   │
│   ├── hooks/
│   │   ├── useJitter.ts                  # Spiral distribution for overlapping markers
│   │   ├── useMapInteractions.ts         # Click handlers & flyTo zoom
│   │   ├── useMapLayers.ts               # Mapbox layer management (Sweden border)
│   │   ├── useMapMarkers.ts              # Marker creation + validation + click
│   │   └── useOrganizations.ts           # Fetch 352 organizations from Supabase
│   │
│   ├── lib/
│   │   └── supabase.ts                   # Supabase client configuration
│   │
│   ├── store/
│   │   └── mapStore.ts                   # Zustand global store
│   │                                     # - organizations / filteredOrganizations
│   │                                     # - currentTechnologies / Industries / Models
│   │                                     # - searchTerm (name, city, tech, industry)
│   │                                     # - selectedOrgId / isModalOpen / isMapCentered
│   │
│   ├── types/
│   │   └── index.ts                      # TypeScript interfaces & constants
│   │
│   └── utils/
│       └── mapLayerConfig.ts             # Mapbox layer config helpers
│
├── .env.local                            # Environment variables (not in git)
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎮 Usage

### Running Locally

**Development mode:**

```bash
npm run dev
```

**Production build:**

```bash
npm run build
npm start
```

**Linting:**

```bash
npm run lint
```

### Features

#### Interactive Map with 352 Organizations

- Map displays **352 Swedish companies** in immersive tech sectors loaded from Supabase
- Each company shows a **📍 marker** with pulse animation
- Markers with hover effects (scale 1.3) and click interactions
- **Jitter system** distributes overlapping markers in a golden-angle spiral pattern

#### Cinematic Entry Animation

- Map loads with initial zoom out view of Sweden (zoom 3.0, pitch 48°)
- After 800ms delay, flyTo animation moves to final position (zoom 4.3, pitch 30°, duration 3s)
- Markers appear after the flyTo animation completes for a cinematic reveal

#### Advanced Filtering System

**3 Dropdown Filters** (work independently with AND logic):

1. **Technology Filter:** XR, AI, Visualization
2. **Industry Filter:** Manufacturing, Healthcare, Culture, Games
3. **Organization Model Filter:** Business, Nonprofit Organization

**Search Functionality:**

- Searches across: name, city, technology, industry
- Works seamlessly with dropdown filters
- Real-time filtering with Zustand state management

#### Jitter System (useJitter.ts)

- Organizations sharing the same city coordinates are spread in a spiral
- Uses golden angle (137.5°) for optimal distribution
- Radius scales with `√count` for clean spacing
- Easily removable when precise per-company coordinates are available

#### Animated Visual Effects

**Map Animations:**

- **Entry Animation:** Fade in with zoom effect (scale 0.8 → 1.0, 1.5s)
- **Breathing Effect:** Continuous subtle scale animation (1.0 → 1.01 → 1.0, 4s cycle)
- **Border Glow:** Pulsating Sweden border with inner/outer glow (3s cycle)
- **Floating Particles:** 15 animated light particles with staggered animations

**Marker Animations:**

- **Pulse Effect:** Continuous scale animation (1.0 → 1.1 → 1.0, 2s cycle)
- **Hover State:** Scale 1.3 on mouse enter with smooth transition
- **Appear Animation:** Fade in with scale pop when markers are revealed (0.3s)
- **Click Feedback:** Opens organization modal

#### Organization Card Modal

- Click any marker to open modal with company details
- Dark mode design with glassmorphism effect
- Smooth slideUp animation on open
- Close button with hover effects

#### Responsive Design

- **Desktop (769px+):** Full map with dropdowns on right, zoom 4.2
- **Tablet (481px-768px):** Adjusted layout, dropdowns repositioned
- **Mobile (320px-480px):** Optimized view, dropdowns smaller, zoom 3.5

---

## 🗄️ Database (Supabase)

### Organizations Table

| Field              | Type    | Description                                  |
| ------------------ | ------- | -------------------------------------------- |
| id                 | int     | Primary key                                  |
| name               | text    | Company name                                 |
| description        | text    | Company description                          |
| type               | text    | Organization type                            |
| technology         | text    | XR / AI / Visualization                      |
| industry           | text    | Manufacturing / Healthcare / Culture / Games |
| organization_model | text    | Business / Nonprofit Organization            |
| email              | text    | Contact email                                |
| phone              | text    | Contact phone                                |
| city               | text    | Swedish city                                 |
| latitude           | decimal | GPS latitude                                 |
| longitude          | decimal | GPS longitude                                |

### Supabase Setup

```typescript
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## 📊 Development Status

### Phase 2: ✅ COMPLETE (February 24, 2026)

- ✅ Dropdown filters (Technology, Industry, Organization Model)
- ✅ Search functionality
- ✅ Zustand state management
- ✅ Filter logic with AND combination
- ✅ Dark mode UI improvements
- ✅ Modal interactions
- ✅ Responsive design

### Phase 3: ✅ COMPLETE (February 26, 2026)

- ✅ Framer Motion installed & configured
- ✅ MapAnimation component (fade + zoom entry, breathing effect)
- ✅ SwedenBorderGlow component (pulsating border with glow)
- ✅ FloatingParticles component (15 animated light particles)
- ✅ MarkerAnimations component (pulse + hover scale effects)
- ✅ CSS animations for marker pulse effect (@keyframes markerPulse)
- ✅ Fixed React hydration errors (Math.random in useEffect)
- ✅ Integrated all animations into MapContainer

### Phase 4: ✅ IN PROGRESS (April 2026)

- ✅ Supabase integration — 352 organizations loaded from database
- ✅ useOrganizations hook — fetches and maps Supabase data
- ✅ mapReady state — markers appear only after map is fully loaded
- ✅ Cinematic entry — markers reveal after flyTo animation completes
- ✅ useJitter hook — spiral distribution for overlapping city markers
- ✅ Search expanded — now searches name, city, technology, industry
- ✅ Coordinate validation — invalid/null coordinates skipped gracefully
- ✅ Immersive Sweden logo placeholder (top-left corner)
- [ ] Parallax effects with depth perception
- [ ] Dropdown open/close animations
- [ ] Search field focus animations
- [ ] Logo animation (SVG/PNG with CSS animation)
- [ ] Final polish and refinements

### Phase 5-6: 📋 FUTURE

- [ ] React Three Fiber integration
- [ ] 3D GLB models
- [ ] Bolagsverket API
- [ ] User authentication
- [ ] Research/Academic organizations (universities, labs, centers)
- [ ] Multi-value organization model (Business + Academic + Research)
- [ ] AI chatbot / RAG integration (Docker + FastAPI + LangChain)

---

## 🔐 Environment Variables

Create `.env.local` in root:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_public_token_here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## 🐛 Troubleshooting

### Markers Not Appearing

- Check browser console for `useMapMarkers triggered` logs
- Verify `mapReady` state is `true` before markers are created
- Confirm Supabase is returning organizations (`Loaded 352 organizations`)
- Check coordinate validation warnings (`⚠️ Sin coordenadas`)

### Supabase Connection Issues

- Verify `.env.local` has correct URL and anon key
- Check Supabase dashboard for RLS (Row Level Security) policies
- Confirm `organizations` table exists with correct column names

### Animations Not Showing

- Verify framer-motion is installed: `npm list framer-motion`
- Check browser console for errors
- Ensure 3D/Animations components are imported in MapContainer
- Check z-index values (FloatingParticles: 5, Border: 5, Map: 10)

### Hydration Errors

- Caused by Math.random() - verify useEffect wraps random generation
- Check that isClient state is used before rendering particles
- Clear .next cache: `rm -rf .next`

### Markers Overlapping

- useJitter is applied in useMapMarkers before creating markers
- Adjust radius multiplier in useJitter.ts (`0.015`) if spacing too tight/loose
- Remove useJitter when per-company precise coordinates are added to database

### Dropdowns Not Filtering

- Check browser console for errors
- Verify Supabase data has correct field values
- Ensure Zustand store is initialized
- Check that filter values match exactly (case sensitive)

---

## 📞 Support

- 📧 Email: contact@immersivesweden.se (future)
- 💬 GitHub Issues: [Report a bug](https://github.com/Luisal182/immersive-sweden/issues)
- 📚 Documentation: [See docs/](./docs/)

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Mapbox** - Interactive map technology
- **Supabase** - Database and backend
- **Zustand** - State management library
- **Framer Motion** - Animation library
- **Next.js** - React framework
- **Vercel** - Hosting & deployment
- **Sweden** - Inspiration for the project 🇸🇪

---

**Made with ❤️ for the Swedish immersive tech community**
