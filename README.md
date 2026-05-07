# Immersive Sweden 🗺️

An interactive web platform to discover and connect with Swedish organizations working in immersive technologies (XR, AI, Games, Visualization, Culture, Technologies).

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Phase](https://img.shields.io/badge/Phase-4%20%2F%206-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Overview

**Immersive Sweden** is an interactive map platform with advanced animations and visual effects. Users can search, filter by technology/industry/model/subtype, and discover organizations with real-time filtering and smooth animations. The platform also includes a protected admin dashboard for managing the organization database.

### Key Features

- 🗺️ Interactive map of Sweden with animated custom SVG markers
- 📍 **391 organizations** loaded from Supabase with precise geolocation
- 🏷️ **4 Dropdown filters:** Technology (XR, AI, Visualization), Industry (Manufacturing, Healthcare, Culture, Games), Organization Model (Business, Nonprofit), Other Organizations (Civic Organization, University Lab, Research Institute)
- 🔍 **Advanced search functionality** (filters by name, city, technology, industry)
- ✨ **Framer Motion animations:** Breathing map effect, pulsating border glow, floating particles, marker animations
- 🎬 **Cinematic entry animation:** FlyTo animation on load, markers appear after movement completes
- 📌 **Jitter system:** Markers at same coordinates are spread in a golden-angle spiral pattern for visibility
- 🎨 **Dark mode UI with modern design** (dropdowns, modal, cards with glassmorphism)
- 📱 **Fully responsive design** (mobile-first, adaptive zoom and layout)
- 💬 Organization contact information & modal interactions
- 🔐 **Protected Admin Dashboard** for managing the organization database
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
NEXT_PUBLIC_ADMIN_USERNAME=your_admin_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

4. **Run development server**

```bash
npm run dev
```

5. **Open in browser**

```
http://localhost:3000
```

6. **Admin Dashboard**

```
http://localhost:3000/dashboard
```

7. **View on Vercel**

```
https://immersive-sweden-lhtbga6f8-luis-arranz-garcias-projects.vercel.app/
```

---

## 📦 Tech Stack

### Frontend

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI/Maps:** Mapbox GL JS
- **Styling:** CSS Modules
- **State Management:** Zustand ✅ IMPLEMENTED
- **Animations:** Framer Motion ✅ IMPLEMENTED

### Backend / Database

- **Database:** Supabase (PostgreSQL) ✅ IMPLEMENTED
- **Data:** 391 organizations with full metadata
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
│   ├── data/
│   │   └── marker.svg                    # Custom SVG map marker
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── page.tsx                  # Admin login page
│   │   │   ├── page.module.css
│   │   │   ├── main/
│   │   │   │   ├── page.tsx              # Dashboard main table view
│   │   │   │   └── page.module.css
│   │   │   └── EditDrawer/
│   │   │       ├── EditDrawer.tsx        # Edit/Create/Delete drawer
│   │   │       └── EditDrawer.module.css
│   │   ├── favicon.ico
│   │   ├── globals.css                   # Global styles + animations + marker CSS
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.module.css
│   │   └── page.tsx                      # Home page (map)
│   │
│   ├── components/
│   │   ├── 3D/
│   │   │   └── Animations/
│   │   │       ├── FloatingParticles.tsx # 15 staggered light particles
│   │   │       ├── MapAnimation.tsx      # Entry fade + breathing effect
│   │   │       ├── MarkerAnimations.tsx  # Marker pulse + hover
│   │   │       └── SwedenBorderGlow.tsx  # Pulsating border glow
│   │   ├── Cards/
│   │   │   ├── OrganizationCard.module.css
│   │   │   └── OrganizationCard.tsx      # Organization info card
│   │   ├── Map/
│   │   │   ├── MapContainer.module.css   # Map + search + filter styling
│   │   │   └── MapContainer.tsx          # Main map component
│   │   ├── Modal/
│   │   │   ├── Modal.module.css
│   │   │   └── Modal.tsx                 # Modal wrapper
│   │   └── _graveyard/                   # Old/experimental components
│   │       ├── CustomDropdown/
│   │       │   ├── CustomDropdown.module.css
│   │       │   └── CustomDropdown.tsx
│   │       └── organizations.json        # Old local data (replaced by Supabase)
│   │
│   ├── data/
│   │   └── swedenBorder.ts               # Sweden GeoJSON border coordinates
│   │
│   ├── hooks/
│   │   ├── useJitter.ts                  # Spiral distribution for overlapping markers
│   │   ├── useMapInteractions.ts         # Click handlers & flyTo zoom
│   │   ├── useMapLayers.ts               # Mapbox layer management (Sweden border)
│   │   ├── useMapMarkers.ts              # Marker creation + validation + click
│   │   └── useOrganizations.ts           # Fetch organizations from Supabase
│   │
│   ├── lib/
│   │   └── supabase.ts                   # Supabase client configuration
│   │
│   ├── store/
│   │   └── mapStore.ts                   # Zustand global store
│   │                                     # - organizations / filteredOrganizations
│   │                                     # - currentTechnologies / Industries / Models / Subtypes
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

## 🗺️ Public Map Features

### Interactive Map with 391 Organizations

- Map displays **391 Swedish organizations** in immersive tech sectors loaded from Supabase
- Each organization shows a **custom SVG marker** with pulse animation
- Markers with hover effects (scale 1.3) and click interactions
- **Jitter system** distributes overlapping markers in a golden-angle spiral pattern

### Cinematic Entry Animation

- Map loads with initial zoom out view of Sweden (zoom 3.0, pitch 48°)
- After 800ms delay, flyTo animation moves to final position (zoom 4.3, pitch 30°, duration 3s)
- Markers appear after the flyTo animation completes for a cinematic reveal
- Mobile-optimized zoom, center and pitch

### Advanced Filtering System

**4 Dropdown Filters** (work independently with AND logic):

1. **Technology Filter:** XR, AI, Visualization
2. **Industry Filter:** Manufacturing, Healthcare, Culture, Games
3. **Organization Model Filter:** Business, Nonprofit Organization
4. **Other Organizations Filter:** Civic Organization, University Lab, Research Institute

**Search Functionality:**

- Searches across: name, city, technology, industry
- Works seamlessly with dropdown filters
- Real-time filtering with Zustand state management

### Jitter System (useJitter.ts)

- Organizations sharing the same city coordinates are spread in a spiral
- Uses golden angle (137.5°) for optimal distribution
- Radius scales with `√count` for clean spacing
- Easily removable when precise per-organization coordinates are available

### Responsive Design

- **Desktop (769px+):** Full map with dropdowns on right, zoom 4.3
- **Mobile (max 768px):** Adjusted zoom, center and pitch — dropdown labels hidden, only icons shown, reduced sizes

---

## 🔐 Admin Dashboard (/dashboard)

The Admin Dashboard is a protected internal tool accessible only via the `/dashboard` route, secured with login credentials stored in environment variables. It is designed to allow non-technical team members to manage the organization database without accessing Supabase directly.

### Login

- Protected by username and password set in `.env.local`
- Session stored in `sessionStorage` — expires when browser is closed
- Designed to migrate to Supabase Auth when moving to production

### Dashboard Main View

- Full table of all 391 organizations ordered by ID
- Columns: ID, Name, Description, City, Type, Technology, Industry, Model, Subtype, Established, Email, Phone, Website
- Vertical and horizontal scrolling for full data visibility
- Real-time search by name or city
- Hover tooltip on every cell reveals full content
- Go to Map button for quick navigation back to the public map
- Logout button ends the session

### Edit Drawer

Clicking Edit on any row opens a side panel with all fields available for editing. Key fields (Type, Activity, Technology, Industry, Organization Model, Organization Subtype) include dropdown menus with predefined options for consistency, plus a free-text input for custom values. All fields can be left empty (null). Changes are saved directly to Supabase on confirmation.

### Add Organization

The Add Organization button opens the same Edit Drawer in create mode with all fields empty, allowing new organizations to be added directly from the dashboard.

### Delete Organization

A delete option inside the Edit Drawer permanently removes the organization from the database after a confirmation step to prevent accidental deletion.

---

## 🗄️ Database (Supabase)

### Organizations Table

| Field                | Type    | Description                                              |
| -------------------- | ------- | -------------------------------------------------------- |
| id                   | int     | Primary key                                              |
| name                 | text    | Organization name                                        |
| description          | text    | Organization description                                 |
| type                 | text    | Organization type                                        |
| activity             | text    | Main activity                                            |
| technology           | text    | XR / AI / Visualization                                  |
| industry             | text    | Manufacturing / Healthcare / Culture / Games             |
| organization_model   | text    | Business / Nonprofit Organization                        |
| organization_subtype | text    | Civic Organization / University Lab / Research Institute |
| email                | text    | Contact email                                            |
| phone                | text    | Contact phone                                            |
| website              | text    | Website URL                                              |
| established          | int     | Year established                                         |
| city                 | text    | Swedish city                                             |
| latitude             | decimal | GPS latitude                                             |
| longitude            | decimal | GPS longitude                                            |

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

### Phase 4: ✅ IN PROGRESS (April–May 2026)

- ✅ Supabase integration — 391 organizations loaded from database
- ✅ useOrganizations hook — fetches and maps Supabase data
- ✅ mapReady state — markers appear only after map is fully loaded
- ✅ Cinematic entry — markers reveal after flyTo animation completes
- ✅ useJitter hook — spiral distribution for overlapping city markers
- ✅ Search expanded — now searches name, city, technology, industry
- ✅ Coordinate validation — invalid/null coordinates skipped gracefully
- ✅ Organization Subtype filter added (4th dropdown)
- ✅ Custom SVG marker replacing emoji pin
- ✅ Mobile responsive map (adaptive zoom, center, pitch)
- ✅ Mobile responsive dropdowns (icon-only on small screens)
- ✅ Admin Dashboard at /dashboard with login protection
- ✅ Dashboard table with all 391 organizations ordered by ID
- ✅ Edit Drawer with dropdowns + free-text + null support
- ✅ Add Organization functionality
- ✅ Delete Organization with confirmation step
- ✅ Tooltip on hover for all table cells
- [ ] Suggest form for public organization submissions
- [ ] Pending tab in dashboard for reviewing submissions
- [ ] AI chat assistant (Claude API + Supabase)
- [ ] Logo animation (SVG with CSS)
- [ ] Final polish and refinements

### Phase 5-6: 📋 FUTURE

- [ ] Supabase Auth for admin login (replacing hardcoded credentials)
- [ ] React Three Fiber integration
- [ ] Bolagsverket API integration
- [ ] AI chatbot / RAG integration
- [ ] Multi-value organization model support

---

## 🔐 Environment Variables

Create `.env.local` in root:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_public_token_here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_ADMIN_USERNAME=your_admin_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

---

## 🐛 Troubleshooting

### Markers Not Appearing

- Check browser console for `useMapMarkers triggered` logs
- Verify `mapReady` state is `true` before markers are created
- Confirm Supabase is returning organizations
- Check coordinate validation warnings (`⚠️ Sin coordenadas`)

### SVG Marker Not Loading

- Verify `marker.svg` is inside `public/data/`
- Check DevTools → Network for 404 errors on `marker.svg`
- Confirm the path in `useMapMarkers.ts` matches the file location

### Supabase Connection Issues

- Verify `.env.local` has correct URL and anon key
- Check Supabase dashboard for RLS (Row Level Security) policies
- Confirm `organizations` table exists with correct column names

### Dashboard Login Not Working

- Verify `NEXT_PUBLIC_ADMIN_USERNAME` and `NEXT_PUBLIC_ADMIN_PASSWORD` are set in `.env.local`
- Clear browser sessionStorage and try again

### Animations Not Showing

- Verify framer-motion is installed: `npm list framer-motion`
- Check browser console for errors
- Clear .next cache: `rm -rf .next`

### Hydration Errors

- Use `useState(false)` + `useEffect` pattern for client-only values like `isMobile`
- Clear .next cache: `rm -rf .next`

### Markers Overlapping

- useJitter is applied in useMapMarkers before creating markers
- Adjust radius multiplier in useJitter.ts (`0.015`) if spacing too tight/loose
- Remove useJitter when per-organization precise coordinates are added to database

---

## 📞 Support

- 📧 Email: contact@immersivesweden.se (future)
- 💬 GitHub Issues: [Report a bug](https://github.com/Luisal182/immersive-sweden/issues)

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
