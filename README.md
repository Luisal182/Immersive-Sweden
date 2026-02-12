# Immersive Sweden 🗺️

An interactive web platform to discover and connect with Swedish companies working in immersive technologies (XR, AI, Games, Visualization, Culture, Technologies).

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Phase](https://img.shields.io/badge/Phase-2%20%2F%206-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Overview

**Immersive Sweden** is an interactive map platform built to showcase the ecosystem of Swedish companies working in immersive technologies. Users can search, filter, and discover companies by activity sector, location, and contact information.

### Key Features

- 🗺️ Interactive map of Sweden with company markers
- 📍 14 organizations with precise geolocation
- 🏷️ Filter by immersive tech sectors (XR, AI, Games, Visualization, Culture, Technologies)
- 📱 Fully responsive design (mobile-first)
- 🌍 Geolocation support
- 💬 Company contact information
- 🚀 Fast, modern tech stack

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
   # Create .env.local in root directory
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
- **State:** Zustand (planned)
- **Animations:** Framer Motion (planned)

### Backend

- **API:** Next.js API Routes
- **Data:** JSON (local, planned: Bolagsverket + Firebase)
- **External APIs:**
  - [Bolagsverket API](https://bolagsverket.se/) - Swedish company registry (future)
  - [OpenStreetMap Nominatim](https://nominatim.org/) - Free geocoding (future)

### DevOps

- **Version Control:** GitHub
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
│   │   │   ├── MapContainer.tsx
│   │   │   └── MapContainer.module.css
│   │   ├── Cards/
│   │   │   ├── OrganizationCard.tsx
│   │   │   └── OrganizationCard.module.css
│   │   └── ...                  # Other components (future)
│   │
│   ├── hooks/
│   │   ├── useMapLayers.ts      # Map layer management
│   │   ├── useOrganizations.ts  # Load organization data
│   │   ├── useMapMarkers.ts     # Marker management
│   │   └── ...                  # Other hooks (future)
│   │
│   ├── store/
│   │   └── mapStore.ts          # Zustand store (future)
│   │
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   │
│   ├── utils/
│   │   ├── mapLayerConfig.ts    # Mapbox layer config
│   │   └── ...                  # Other utilities (future)
│   │
│   └── data/
│       ├── swedenBorder.ts      # Sweden coordinates
│       └── organizations.json   # 14 company mock data
│
├── public/
│   └── data/
│       └── organizations.json   # Accessible JSON for fetch
├── .env.local                   # Environment variables (local)
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

#### View Organizations on Map

- Map displays **14 Swedish companies** in immersive tech
- Each company shows a **red pin marker (📍)**
- Markers positioned by precise geolocation coordinates

#### Organization Data

Each organization includes:

- **Name:** Company name
- **Type:** XR, AI, Games, Visualization, Culture, Technologies
- **Activity:** Business focus area
- **Location:** City and coordinates
- **Contact:** Email and phone number
- **Description:** Company overview

#### Interactive Map

- **Sweden Border:** Blue glow effect with inverted mask (world darkened)
- **Responsive Design:** Works on desktop, tablet, mobile
- **Mapbox GL:** Professional mapping library

---

## 📊 Current Development Status

### Phase 1: Foundation ✅ COMPLETE

- [x] Next.js 14 setup with TypeScript
- [x] Mapbox GL integration
- [x] Sweden border with glow effects
- [x] Search UI & filter buttons
- [x] Responsive design
- [x] GitHub & Vercel setup

### Phase 2: Organization Markers & Data 🔄 IN PROGRESS

- [x] Load organizations from JSON
- [x] Dynamic marker rendering (14 organizations)
- [x] Red pin markers on map
- [x] OrganizationCard component (created)
- [x] Mapbox layer management (utils + hooks)
- [ ] Click marker → Open modal with card
- [ ] Filter by activity (XR, AI, Games, etc)
- [ ] Search functionality
- [ ] Marker animations (hover, click)

### Phase 3: Modal & Interactions 📋 PLANNED

- [ ] Create Modal component
- [ ] Zustand store for global state
- [ ] Open modal on marker click
- [ ] Display organization card in modal
- [ ] Close button & escape key support
- [ ] Animation transitions

### Phase 4: Filtering & Search 📋 PLANNED

- [ ] Implement activity filters (working buttons)
- [ ] Implement search by name
- [ ] Filter markers dynamically
- [ ] Update card display

### Phase 5-6: Production Features 📋 PLANNED

See [MVP Work Plan](./MVP_PLAN.md) for full roadmap.

---

## 🔐 Environment Variables

Create `.env.local` in the root directory:

```bash
# Mapbox API Token (get from https://account.mapbox.com/tokens/)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_public_token_here

# Future: Bolagsverket API
# BOLAGSVERKET_API_KEY=your_key_here

# Future: Firebase
# NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
```

⚠️ **IMPORTANT:** Never commit `.env.local` - use `.env.example` for sharing.

---

## 📚 Documentation

- [MVP Work Plan](./MVP_PLAN.md) - Detailed project roadmap
- [Architecture](./docs/ARCHITECTURE.md) - System design (coming soon)
- [API Documentation](./docs/API.md) - API endpoints (coming soon)
- [Deployment Guide](./docs/DEPLOYMENT.md) - How to deploy (coming soon)

---

## 🐛 Troubleshooting

### Mapbox Not Loading

- Verify `NEXT_PUBLIC_MAPBOX_TOKEN` is set in `.env.local`
- Check token has `Maps:Read` scope
- Clear browser cache (Ctrl+Shift+Del)

### Organizations Not Showing

- Ensure `public/data/organizations.json` exists
- Check browser console for errors (F12)
- Verify geolocation coordinates are valid (lat between -90/90, lng between -180/180)

### GitHub/Vercel Out of Sync

- Pull latest from `main`: `git pull origin main`
- Merge `develop` into `main` via GitHub PR
- Vercel auto-deploys on push to `main`

For more help, open an [Issue](https://github.com/Luisal182/immersive-sweden/issues).

---

## 📞 Support

### Get Help

- 📧 Email: contact@immersivesweden.se (future)
- 💬 GitHub Issues: [Report a bug](https://github.com/Luisal182/immersive-sweden/issues)
- 📚 Documentation: [See docs/](./docs/)

### Report Security Issues

Please email security@immersivesweden.se with details (do not open public issue).

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Mapbox** - Interactive map technology
- **Bolagsverket** - Swedish company registry data (future integration)
- **OpenStreetMap** - Nominatim geocoding service (future)
- **Next.js** - React framework
- **Vercel** - Hosting & deployment
- **Sweden** - Inspiration for the project 🇸🇪

---

## 📈 Project Stats

- **Repository:** [immersive-sweden](https://github.com/Luisal182/immersive-sweden)
- **Live Demo:** [immersive-sweden.vercel.app](https://immersive-sweden.vercel.app)
- **Status:** Active Development
- **Current Release:** v0.2.0 (Beta - Phase 2 in progress)
- **Contributors:** 1 (Luis Alfonso Arranz García)
- **Last Updated:** February 11, 2026
- **Organizations:** 14 mock companies loaded
- **Markers:** All displaying on map with red pins

---

## 🗺️ Roadmap

- **Q1 2026:** MVP with mock data & markers ✅ In Progress
- **Q1 2026:** Modal interactions & filtering 🔄 Planned
- **Q1 2026:** Bolagsverket integration 📋 Planned
- **Q2 2026:** User authentication & profiles 📋 Planned
- **Q2 2026:** 3D visualization with Three.js 📋 Planned
- **Q3 2026:** Analytics dashboard 📋 Planned
- **Q4 2026:** Mobile app (React Native) 📋 Planned

---

## 💡 Ideas & Feedback

Have an idea? Found a bug? Let us know!

1. Check existing [Issues](https://github.com/Luisal182/immersive-sweden/issues)
2. [Create a new issue](https://github.com/Luisal182/immersive-sweden/issues/new)
3. Join discussions in [Discussions tab](https://github.com/Luisal182/immersive-sweden/discussions)

---

## 🔄 Recent Updates (February 11, 2026)

### ✅ Completed

- [x] Created 14 mock organizations with immersive tech focus
- [x] Implemented marker loading from JSON
- [x] Red pin markers (📍) displaying on map
- [x] OrganizationCard component with modern design
- [x] CSS Module styling with badge colors
- [x] GitHub synchronized (develop merged to main)
- [x] Vercel deployment updated

### 🔄 In Progress

- [ ] Modal component for card display
- [ ] Click handler for markers
- [ ] Global state with Zustand

### 📋 Next Steps

1. Create Modal component
2. Implement modal open/close on marker click
3. Display OrganizationCard inside modal
4. Add filter functionality

---

**Made with ❤️ for the Swedish immersive tech community**

---

**Questions?** Open an issue or reach out!  
**Want to contribute?** See [CONTRIBUTING.md](./CONTRIBUTING.md) (coming soon)
