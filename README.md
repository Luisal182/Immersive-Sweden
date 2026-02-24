# Immersive Sweden 🗺️

An interactive web platform to discover and connect with Swedish companies working in immersive technologies (XR, AI, Games, Visualization, Culture, Technologies).

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Phase](https://img.shields.io/badge/Phase-2%20%2F%206-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Overview

**Immersive Sweden** is an interactive map platform built to showcase the ecosystem of Swedish companies working in immersive technologies. Users can search, filter by technology/industry/model, and discover companies with advanced filtering capabilities.

### Key Features

- 🗺️ Interactive map of Sweden with company markers
- 📍 24 organizations with precise geolocation distributed across Swedish metropolitan areas
- 🏷️ **3 Dropdown filters: Technology (XR, AI, Visualization), Industry (Manufacturing, Healthcare, Culture, Games), Organization Model (Business, Nonprofit)**
- 🔍 **Advanced search functionality** (filters by name, description, type, technology, industry, organization model)
- 🎨 **Dark mode UI with modern design** (dropdowns, modal, cards)
- 📱 Fully responsive design (mobile-first)
- 💬 Company contact information & modal interactions
- 🚀 Fast, modern tech stack (Next.js, TypeScript, Zustand, Mapbox)

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
- **Animations:** Framer Motion (planned)
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
│   │   └── globals.css          # Global styles
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
│   │   └── _graveyard/               # Old/experimental components
│   │
│   ├── hooks/
│   │   ├── useMapLayers.ts       # Map layer management
│   │   ├── useOrganizations.ts   # Load organization data (require-based)
│   │   ├── useMapMarkers.ts      # Marker management with filters
│   │   └── useMapInteractions.ts # Click handlers & zoom
│   │
│   ├── store/
│   │   └── mapStore.ts           # Zustand store ✅ IMPLEMENTED
│   │       - filteredOrganizations
│   │       - currentTechnology, currentIndustry, currentOrganizationModel
│   │       - searchTerm
│   │       - Filter logic with AND combination
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript types & constants
│   │       - TECHNOLOGY_OPTIONS, INDUSTRY_OPTIONS, ORGANIZATION_MODEL_OPTIONS
│   │       - Organization interface with technology, industry, organizationModel
│   │       - activity field (required for card display)
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
- Each company shows a **red pin marker (📍)**
- Markers positioned with precise geolocation coordinates
- Distributed across Swedish metropolitan areas:
  - Stockholm region (Södermalm, Stockholm)
  - Gothenburg region (Mölndal, Gothenburg)
  - Malmö region (Lund)
  - Plus 21 other locations

#### Advanced Filtering System

**3 Dropdown Filters** (work independently with AND logic):

1. **Technology Filter:**

   - All Technologies (default)
   - XR
   - AI
   - Visualization

2. **Industry Filter:**

   - All Industries (default)
   - Manufacturing
   - Healthcare
   - Culture
   - Games

3. **Organization Model Filter:**
   - All Models (default)
   - Business
   - Nonprofit Organization

**Search Functionality:**

- Searches across: name, description, type, technology, industry, organization model
- Works seamlessly with dropdown filters
- Real-time filtering with Zustand state management

#### Organization Data

Each organization includes:

- **Name:** Company name
- **Type:** XR, AI, Games, Visualization, Culture, Technologies
- **Activity:** Business focus area
- **Technology:** XR, AI, or Visualization (optional, can be null)
- **Industry:** Manufacturing, Healthcare, Culture, Games (optional, can be null)
- **Organization Model:** Business or Nonprofit Organization (optional, can be null)
- **Location:** City and precise coordinates (latitude, longitude)
- **Contact:** Email and phone number
- **Description:** Company overview

#### Organization Card Modal

- Click any marker to open modal
- Displays:
  - Company badge (colored by type)
  - Title and description
  - Location, contact info
  - Technology/industry tags
  - "Get in Touch" button (blue gradient)
  - "View on Map" button (outline style)
- Dark mode design with glassmorphism effect
- Close button with hover effects
- Smooth slideUp animation on open

#### Interactive Map Features

- **Sweden Border:** Blue glow effect with inverted mask (world darkened)
- **Gotland & Öland Islands:** Visible on zoom
- **Back Button:** Returns to full Sweden view with gradient + pulse animation
- **Responsive Design:** Works on desktop, tablet, mobile
- **Mapbox GL:** Professional mapping library with dark styling

---

## 📊 Development Status - Phase 2

### ✅ COMPLETED This Session

**Filtering System:**

- [x] Created 3 dropdown filters (Technology, Industry, Organization Model)
- [x] Implemented Zustand store for filter state management
- [x] Built filter logic with AND combination (all filters must match)
- [x] Filter supports null values for flexible data distribution
- [x] Dropdown toggle logic (select = change value, works seamlessly)

**Data Expansion:**

- [x] Expanded from 14 to 24 organizations
- [x] Added technology, industry, organizationModel fields to all orgs
- [x] Distributed organizations across Swedish metropolitan areas
- [x] Updated organizations.json with precise geolocation data
- [x] Added missing `activity` field to TypeScript interface

**Search Integration:**

- [x] Implemented search by name, description, type, technology, industry, model
- [x] Search works independently and with dropdowns
- [x] Real-time filtering updates on search input
- [x] Search field styled to match dropdown aesthetics

**UI/UX Improvements:**

- [x] Dark mode design for dropdowns (rgba(44, 62, 80, 0.9) background)
- [x] Glassmorphism effect on filter group (backdrop-filter: blur)
- [x] Enhanced hover states (translateY animation + glow shadow)
- [x] Improved typography and contrast
- [x] Removed debug div from interface
- [x] Responsive dropdowns on mobile

**Modal/Card Enhancements:**

- [x] Dark mode card background (rgba(20, 30, 45, 0.8))
- [x] Improved button styling with gradient + shine effects
- [x] Better spacing and typography hierarchy
- [x] Close button with blue highlight
- [x] Activity tag styling with border
- [x] Section dividers with subtle blue borders

**Technical Fixes:**

- [x] Fixed JSON loading (moved from public/ to src/data/)
- [x] Changed fetch to require-based loading
- [x] Fixed TypeScript types for Organization interface
- [x] Removed toggle behavior from dropdowns (now simple select)
- [x] Fixed filter comparison logic with proper string matching
- [x] Unified Zustand subscription to prevent infinite re-renders
- [x] Used `filteredOrganizations` in useMapMarkers hook

### 📚 Learning & Documentation

**Key Discoveries:**

- Zustand best practices (single subscription per component)
- Filter logic with AND combination vs OR
- JSON loading in Next.js (public/ vs src/)
- TypeScript strict mode in production builds
- CSS Modules with dark mode design
- Responsive dropdown styling
- Glassmorphism effects with backdrop-filter

**Technical Challenges Resolved:**

1. JSON loading issues → Moved to src/data/ with require()
2. Filter not working → Fixed string comparison with normalize
3. Infinite re-renders → Unified Zustand subscription
4. Dropdown values not changing → Fixed onChange handlers
5. TypeScript errors in Vercel → Added missing interface fields

---

## 📈 Current Metrics

- **Organizations:** 24 (14 base + 10 new with full data)
- **Filters:** 3 (Technology, Industry, Organization Model)
- **Filter Options:** 10 total (XR, AI, Visualization + Manufacturing, Healthcare, Culture, Games + Business, Nonprofit)
- **Map Markers:** 24 active markers
- **Geographic Distribution:** Spread across Swedish metropolitan areas
- **Search Fields:** 6 (name, description, type, technology, industry, organizationModel)
- **Code Quality:** TypeScript strict mode ✅ Passing

---

## 🔐 Environment Variables

Create `.env.local` in root:

```bash
# Mapbox API Token (get from https://account.mapbox.com/tokens/)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_public_token_here
```

---

## 🐛 Troubleshooting

### Dropdowns Not Filtering

- Check browser console for errors
- Verify organization.json has technology, industry, organizationModel fields
- Ensure Zustand store is initialized
- Check that filter values match exactly (case-sensitive)

### Organizations Not Loading

- Verify src/data/organizations.json exists
- Check browser console for require() errors
- Ensure JSON is valid (use JSON validator)
- Verify geolocation coordinates are valid

### Build Fails on Vercel

- Run `npm run build` locally to catch TypeScript errors
- Ensure all TypeScript interfaces are complete
- Check .env variables are set in Vercel project settings
- Verify no console.error or warnings are breaking build

---

## 📞 Support

### Get Help

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
- **Next.js** - React framework
- **Vercel** - Hosting & deployment
- **Sweden** - Inspiration for the project 🇸🇪

---

## 🗺️ Roadmap

### Phase 2: ✅ COMPLETE (February 24, 2026)

**Completed:**

- ✅ Dropdown filters (Technology, Industry, Organization Model)
- ✅ Search functionality
- ✅ 24 organizations with full data
- ✅ Zustand state management
- ✅ Filter logic with AND combination
- ✅ Dark mode UI improvements
- ✅ Modal interactions
- ✅ Responsive design

### Phase 3: CSS & Animation 📋 NEXT

**Planned:**

- [ ] Framer Motion animations for dropdowns
- [ ] Hover effects on dropdown options
- [ ] Polish card animations
- [ ] Mobile responsive refinements
- [ ] Search field UI improvements

### Phase 4: 3D & Advanced Features 📋 FUTURE

**Planned:**

- [ ] React Three Fiber integration
- [ ] 3D GLB models with optimization
- [ ] Dynamic texture mapping
- [ ] Professional lighting system

### Phase 5-6: Backend Integration & Production 📋 FUTURE

**Planned:**

- [ ] Bolagsverket API integration
- [ ] Firebase/Supabase database
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Batch import tools

---

## 📋 Recent Session Notes (February 24, 2026)

### What We Built

1. **Dropdown Filter System** (3 dropdowns for Technology, Industry, Organization Model)

   - Independent filters with AND logic
   - Support for null values for flexible data
   - Clean, dark-themed UI with glassmorphism

2. **Expanded Organization Data** (14 → 24 organizations)

   - Added technology, industry, organizationModel fields
   - Distributed across Swedish metropolitan areas
   - Maintained data quality and consistency

3. **Advanced Search** (works with all filters)

   - Searches 6 fields simultaneously
   - Real-time filtering with Zustand
   - Seamless integration with dropdowns

4. **UI/UX Polish**
   - Dark mode design throughout
   - Improved spacing and typography
   - Enhanced hover/focus states
   - Responsive on mobile devices

### Key Learnings

- Zustand best practices for React state management
- CSS Modules for scoped styling
- TypeScript strict mode for production builds
- JSON loading strategies in Next.js
- Filter logic design patterns
- Glassmorphism design technique

### Technical Decisions

1. **Moved JSON from public/ to src/data/**

   - Reason: Better bundling and type safety
   - Method: Changed fetch to require()

2. **Dropped toggle behavior on dropdowns**

   - Reason: Simple select is more intuitive
   - Result: Cleaner UX

3. **Used AND combination for filters**

   - Reason: More precise results
   - Benefit: Users can narrow down more easily

4. **Kept null values in organization data**
   - Reason: Flexibility for incomplete data
   - Benefit: Organizations appear across all filters

---

**Made with ❤️ for the Swedish immersive tech community**

---

**Questions?** Open an issue or reach out!  
**Want to contribute?** See [CONTRIBUTING.md](./CONTRIBUTING.md) (coming soon)
