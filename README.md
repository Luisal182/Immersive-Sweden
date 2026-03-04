# Immersive Sweden 🗺️

An interactive web platform to discover and connect with Swedish companies working in immersive technologies (XR, AI, Games, Visualization, Culture, Technologies).

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Phase](https://img.shields.io/badge/Phase-3%20%2F%206-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Overview

**Immersive Sweden** is an interactive map platform with advanced animations and visual effects. Users can search, filter by technology/industry/model, and discover companies with real-time filtering and smooth animations.

### Key Features

- 🗺️ Interactive map of Sweden with animated company markers
- 📍 24 organizations with precise geolocation distributed across Swedish metropolitan areas
- 🏷️ **3 Dropdown filters: Technology (XR, AI, Visualization), Industry (Manufacturing, Healthcare, Culture, Games), Organization Model (Business, Nonprofit)**
- 🔍 **Advanced search functionality** (filters by name, description, type, technology, industry, organization model)
- ✨ **Framer Motion animations:** Breathing map effect, pulsating border glow, floating particles, marker animations
- 🎨 **Dark mode UI with modern design** (dropdowns, modal, cards with glassmorphism)
- 📱 Fully responsive design (mobile-first, adaptive zoom)
- 💬 Company contact information & modal interactions
- 🚀 Fast, modern tech stack (Next.js, TypeScript, Zustand, Mapbox, Framer Motion)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Mapbox API token (free tier available)

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
```

3. **Setup environment variables**

```bash
cp .env.example .env.local
```

Add your Mapbox token:

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
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

### Backend

- **API:** Next.js API Routes
- **Data:** JSON (local at src/data/organizations.json)
- **External APIs:**
  - [Bolagsverket API](https://bolagsverket.se/) - Swedish company registry (future)
  - [OpenStreetMap Nominatim](https://nominatim.org/) - Free geocoding (future)

### DevOps

- **Version Control:** GitHub (dev/main branches)
- **Hosting:** Vercel (CI/CD)
- **Environment:** Node.js 18+

---

## 📁 Project Structure

```
immersive-sweden/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes (future)
│   │   ├── page.tsx             # Home page
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles + animations
│   │
│   ├── components/
│   │   ├── Map/
│   │   │   ├── MapContainer.tsx      # Main map component
│   │   │   └── MapContainer.module.css # Map + dropdown styling
│   │   ├── Cards/
│   │   │   ├── OrganizationCard.tsx  # Organization card component
│   │   │   └── OrganizationCard.module.css
│   │   ├── Modal/
│   │   │   └── Modal.tsx             # Modal wrapper
│   │   ├── 3D/Animations/
│   │   │   ├── MapAnimation.tsx      # Map entry + breathing effect
│   │   │   ├── SwedenBorderGlow.tsx  # Pulsating border
│   │   │   ├── FloatingParticles.tsx # Light particles
│   │   │   └── MarkerAnimations.tsx  # Marker pulse + hover
│   │   └── _graveyard/               # Old/experimental components
│   │
│   ├── hooks/
│   │   ├── useMapLayers.ts       # Map layer management
│   │   ├── useOrganizations.ts   # Load organization data
│   │   ├── useMapMarkers.ts      # Marker management with animations
│   │   └── useMapInteractions.ts # Click handlers & zoom
│   │
│   ├── store/
│   │   └── mapStore.ts           # Zustand store
│   │       - filteredOrganizations
│   │       - currentTechnology, currentIndustry, currentOrganizationModel
│   │       - searchTerm
│   │       - Filter logic with AND combination
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript types & constants
│   │
│   ├── utils/
│   │   └── mapLayerConfig.ts     # Mapbox layer configuration
│   │
│   └── data/
│       └── organizations.json    # 24 organizations with all fields
│
├── public/
│   └── (assets, static files)
├── .env.local                    # Environment variables (local)
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
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

#### Interactive Map with 24 Organizations

- Map displays **24 Swedish companies** in immersive tech sectors
- Each company shows a **red pin marker (📍)** with pulse animation
- Markers with hover effects (scale 1.2) and click interactions
- Distributed across Swedish metropolitan areas

#### Advanced Filtering System

**3 Dropdown Filters** (work independently with AND logic):

1. **Technology Filter:** All Technologies, XR, AI, Visualization
2. **Industry Filter:** All Industries, Manufacturing, Healthcare, Culture, Games
3. **Organization Model Filter:** All Models, Business, Nonprofit Organization

**Search Functionality:**

- Searches across: name, description, type, technology, industry, organization model
- Works seamlessly with dropdown filters
- Real-time filtering with Zustand state management

#### Animated Visual Effects

**Map Animations:**

- **Entry Animation:** Fade in with zoom effect (scale 0.8 → 1.0, 1.5s)
- **Breathing Effect:** Continuous subtle scale animation (1.0 → 1.01 → 1.0, 4s cycle)
- **Border Glow:** Pulsating Sweden border with inner/outer glow (3s cycle)
- **Floating Particles:** 15 animated light particles with staggered animations

**Marker Animations:**

- **Pulse Effect:** Continuous scale animation (1.0 → 1.1 → 1.0, 2s cycle)
- **Hover State:** Scale 1.3 on mouse enter with smooth transition
- **Click Feedback:** Opens organization modal

#### Organization Card Modal

- Click any marker to open modal with company details
- Dark mode design with glassmorphism effect
- Smooth slideUp animation on open
- Close button with hover effects
- "Get in Touch" & "View on Map" buttons with enhanced styling

#### Responsive Design

- **Desktop (769px+):** Full map with dropdowns on right, zoom 4.2
- **Tablet (481px-768px):** Adjusted layout, dropdowns repositioned
- **Mobile (320px-480px):** Optimized view, dropdowns smaller, zoom 3.5

---

## 📊 Development Status

### Phase 2: ✅ COMPLETE

**Completed:**

- ✅ Dropdown filters (Technology, Industry, Organization Model)
- ✅ Search functionality
- ✅ 24 organizations with full data
- ✅ Zustand state management
- ✅ Filter logic with AND combination
- ✅ Dark mode UI improvements
- ✅ Modal interactions
- ✅ Responsive design

### Phase 3: ✅ COMPLETE

**Completed:**

- ✅ Framer Motion installed & configured
- ✅ MapAnimation component (fade + zoom entry, breathing effect)
- ✅ SwedenBorderGlow component (pulsating border with glow)
- ✅ FloatingParticles component (15 animated light particles)
- ✅ MarkerAnimations component (pulse + hover scale effects)
- ✅ Responsive map zoom adjustment (3.5 on mobile, 4.2 on desktop)
- ✅ CSS animations for marker pulse effect (@keyframes markerPulse)
- ✅ Fixed React hydration errors (Math.random in useEffect)
- ✅ Integrated all animations into MapContainer

### Phase 4: 📋 PLANNED

**Planned:**

- [ ] Parallax effects with depth perception
- [ ] Shadow dynamics (light movement)
- [ ] Dropdown open/close animations
- [ ] Search field focus animations
- [ ] Final polish and refinements

---

## 🎨 Animation Details

### MapAnimation

- **Entry:** Scale 0.8 → 1.0, opacity 0 → 1 (1.5s easeOut)
- **Breathing:** Scale 1.0 → 1.01 → 1.0 (infinite 4s easeInOut)
- **Usage:** Wraps entire MapContainer, creates immersive entry effect

### SwedenBorderGlow

- **Inner Glow:** Inset box-shadow with pulsation (3s cycle)
- **Edge Glow:** Border with outer box-shadow pulsation
- **Opacity:** Fades from 0.5 → 1.0 → 0.5
- **Color:** rgba(79, 195, 255, ...) - cyan blue accent

### FloatingParticles

- **Count:** 15 particles with random position
- **Size:** 4-12px (scalable)
- **Animation:** Y-axis movement up 150px with opacity fade
- **Duration:** 4-7 seconds per particle, staggered
- **Rendering:** Fixed position overlay with z-index 5

### MarkerAnimations

- **Pulse:** Scale 1.0 → 1.1 → 1.0 (2s infinite)
- **Hover:** Scale 1.3 with smooth 0.3s transition
- **Active:** Scale feedback on click
- **CSS:** @keyframes markerPulse in globals.css

---

## 📈 Current Metrics

- **Organizations:** 24 with full metadata
- **Filters:** 3 dropdown filters with AND logic
- **Animations:** 5 components (MapAnimation, BorderGlow, FloatingParticles, MarkerAnimations, CSS pulse)
- **Map Markers:** 24 active markers with animations
- **Responsive Breakpoints:** 3 (mobile 320-480, tablet 481-768, desktop 769+)
- **Floating Particles:** 15 staggered animations
- **Code Quality:** TypeScript strict mode ✅ Passing

---

## 🔐 Environment Variables

Create `.env.local` in root:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_public_token_here
```

---

## 🐛 Troubleshooting

### Animations Not Showing

- Verify framer-motion is installed: `npm list framer-motion`
- Check browser console for errors
- Ensure 3D/Animations components are imported in MapContainer
- Check z-index values (FloatingParticles: 5, Border: 5, Map: 10)

### Hydration Errors

- Caused by Math.random() - verify useEffect wraps random generation
- Check that isClient state is used before rendering particles
- Clear .next cache: `rm -rf .next`

### Markers Not Animating

- Verify CSS animation keyframes are in globals.css
- Check that useMapMarkers hook adds animation styles
- Ensure marker elements have 'marker' className

### Dropdowns Not Filtering

- Check browser console for errors
- Verify organization.json has all required fields
- Ensure Zustand store is initialized
- Check that filter values match exactly

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
- **Zustand** - State management library
- **Framer Motion** - Animation library
- **Next.js** - React framework
- **Vercel** - Hosting & deployment
- **Sweden** - Inspiration for the project 🇸🇪

---

## 🗺️ Roadmap

### Phase 2: ✅ COMPLETE (February 24, 2026)

- ✅ Dropdown filters with AND logic
- ✅ Search functionality (6 fields)
- ✅ 24 organizations with metadata
- ✅ Zustand state management
- ✅ Dark mode UI
- ✅ Responsive design

### Phase 3: ✅ COMPLETE (February 26, 2026)

- ✅ Framer Motion animations
- ✅ Map entry & breathing effects
- ✅ Border glow & pulsation
- ✅ Floating particles system
- ✅ Marker pulse & hover animations
- ✅ CSS animation keyframes
- ✅ Responsive animations

### Phase 4: 📋 NEXT

- [ ] Parallax effects
- [ ] Shadow dynamics
- [ ] Dropdown animations
- [ ] Search focus animations
- [ ] Final polish

### Phase 5-6: 📋 FUTURE

- [ ] React Three Fiber integration
- [ ] 3D GLB models
- [ ] Bolagsverket API
- [ ] Firebase/Supabase database
- [ ] User authentication

---

## 📋 Session Notes (February 26, 2026)

### What We Built

1. **Framer Motion Animation System**

   - MapAnimation: Entry fade + breathing effect
   - SwedenBorderGlow: Pulsating border with dual glow
   - FloatingParticles: 15 staggered light particles
   - MarkerAnimations: Pulse + hover effects

2. **Visual Enhancements**

   - Map entry animation (0.8 → 1.0 scale)
   - Continuous breathing effect (4s cycle)
   - Border glow pulsation (3s cycle)
   - Marker pulse animation (2s cycle)
   - Floating particles with opacity fade

3. **Responsive Improvements**
   - Dynamic zoom based on screen size
   - Dropdown repositioning on mobile
   - Particle animation scaling
   - Touch-friendly interactions

### Key Learnings

- Framer Motion motion.div component integration
- React hydration error resolution (Math.random in useEffect)
- CSS animation keyframes for continuous effects
- Staggered animation techniques
- Z-index layering for overlays

### Technical Stack

- **Animation Library:** Framer Motion
- **State:** Zustand + React hooks
- **Styling:** CSS Modules + CSS animations
- **Maps:** Mapbox GL
- **Types:** TypeScript strict mode

---

**Made with ❤️ for the Swedish immersive tech community**

**Questions?** Open an issue or reach out!
