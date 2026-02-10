# Immersive Sweden 🗺️

An interactive web platform to discover and connect with Swedish companies working in immersive technologies (UI/UX, Visualization, Games, XR, AR, and more).

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Phase](https://img.shields.io/badge/Phase-2%20%2F%206-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Overview

**Immersive Sweden** is an interactive 3D map platform built to showcase the ecosystem of Swedish companies working in immersive technologies. Users can search, filter, and discover companies by activity sector, location, and contact information.

### Key Features

- 🗺️ Interactive map of Sweden with company markers
- 🔍 Real-time search functionality
- 🏷️ Filter by activity (XR, UI, Visualization, Games)
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
   git clone https://github.com/yourusername/immersive-sweden.git
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

---

## 📦 Tech Stack

### Frontend

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI/Maps:** Mapbox GL JS
- **Styling:** CSS Modules
- **State:** Zustand
- **Animations:** Framer Motion

### Backend

- **API:** Next.js API Routes
- **External APIs:**
  - [Bolagsverket API](https://bolagsverket.se/) - Swedish company registry
  - [OpenStreetMap Nominatim](https://nominatim.org/) - Free geocoding
- **Caching:** Firebase (planned)

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
│   │   └── ...                  # Other components (future)
│   │
│   ├── hooks/
│   │   ├── useMapLayers.ts      # Map layer management
│   │   ├── useOrganizations.ts  # Load organization data
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
│       └── organizations.json   # Mock company data
│
├── public/                      # Static assets
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

#### Search Organizations

- Type company name in the search field (top-right)
- Results filter in real-time

#### Filter by Activity

- Click filter buttons (bottom-right):
  - 🥽 XR (Extended Reality)
  - 🎨 UI (User Interface)
  - 📊 Visualization
  - 🎮 Games

#### View Organization Details

- Click any marker on the map
- View company information card (future phase)
- Contact information & location

#### Geolocation

- Enable geolocation in browser
- See your current location on map (future phase)

---

## 📊 Current Development Status

### Phase 1: Foundation ✅

- [x] Next.js 14 setup with TypeScript
- [x] Mapbox GL integration
- [x] Sweden border with glow effects
- [x] Search UI & filter buttons
- [x] Responsive design
- [x] GitHub & Vercel setup

### Phase 2: Mock Data Rendering 🔄

- [ ] Load organizations from JSON
- [ ] Dynamic marker rendering
- [ ] Company information cards
- [ ] Click-to-view functionality
- [ ] Filter by activity
- [ ] Search functionality
- [ ] Marker animations

### Phase 3-6: Production Features 📋

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
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

⚠️ **IMPORTANT:** Never commit `.env.local` - use `.env.example` for sharing.

---

## 📚 API Integration (Future)

### Bolagsverket API

Search Swedish companies by keyword:

```typescript
GET /api/search-companies?keyword=XR
```

Returns companies matching the keyword in their activity description.

### Nominatim Geocoding

Convert address to coordinates:

```typescript
POST /api/geocode
{ "address": "Storgatan 1, Stockholm, Sweden" }
```

See [API Documentation](./docs/API.md) for details.

---

## 🎨 Customization

### Change Map Colors

Edit `src/utils/mapLayerConfig.ts`:

```typescript
paint: {
  'line-color': '#4fc3ff',      // Change border color
  'fill-opacity': 0.45,          // Adjust darkness
}
```

### Add New Activities

Edit `src/types/index.ts`:

```typescript
activity: "XR" | "UI" | "Visualization" | "Games" | "NewActivity";
```

### Customize Organizations Data

Edit `src/data/organizations.json`:

```json
{
  "name": "Company Name",
  "activity": "XR",
  "location": { "lat": 59.3293, "lng": 18.0686 }
}
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Automatic deployment on push to `main`

```bash
# Deploy from CLI
npm i -g vercel
vercel
```

### Deploy to Other Platforms

The project can be deployed to any Node.js hosting:

- Netlify
- AWS
- Google Cloud
- Azure
- Digital Ocean

See [Deployment Guide](./docs/DEPLOYMENT.md) for details.

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test locally

3. **Commit with conventional commits:**

   ```bash
   git commit -m "feat: add search functionality"
   ```

4. **Push and create Pull Request:**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Await review** and merge to `develop`

### Commit Message Convention

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code reorganization
- `test:` - Tests
- `chore:` - Maintenance

---

## 📝 Documentation

- [MVP Work Plan](./MVP_PLAN.md) - Detailed project roadmap
- [Architecture](./docs/ARCHITECTURE.md) - System design (coming soon)
- [API Documentation](./docs/API.md) - API endpoints (coming soon)
- [Deployment Guide](./docs/DEPLOYMENT.md) - How to deploy (coming soon)

---

## 🐛 Troubleshooting

### Mapbox Not Loading

- Verify `NEXT_PUBLIC_MAPBOX_TOKEN` is set
- Check token has `Maps:Read` scope
- Clear browser cache (Ctrl+Shift+Del)

### Organizations Not Showing

- Ensure `/src/data/organizations.json` exists
- Check browser console for errors (F12)
- Verify geolocation coordinates are valid

### Performance Issues

- Check network tab (F12) for slow requests
- Enable browser DevTools performance profiling
- See [Performance Guide](./docs/PERFORMANCE.md)

For more help, open an [Issue](https://github.com/yourusername/immersive-sweden/issues).

---

## 📞 Support

### Get Help

- 📧 Email: contact@immersivesweden.se (future)
- 💬 GitHub Issues: [Report a bug](https://github.com/yourusername/immersive-sweden/issues)
- 📚 Documentation: [See docs/](./docs/)

### Report Security Issues

Please email security@immersivesweden.se with details (do not open public issue).

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Mapbox** - Interactive map technology
- **Bolagsverket** - Swedish company registry data
- **OpenStreetMap** - Nominatim geocoding service
- **Next.js** - React framework
- **Vercel** - Hosting & deployment

---

## 📈 Project Stats

- **Repository:** [immersive-sweden](https://github.com/yourusername/immersive-sweden)
- **Live Demo:** [immersive-sweden.vercel.app](https://immersive-sweden.vercel.app)
- **Status:** Active Development
- **Latest Release:** v0.1.0 (Beta)
- **Contributors:** 1
- **Last Updated:** February 10, 2026

---

## 🗺️ Roadmap

- **Q1 2026:** MVP with mock data ✅ In Progress
- **Q1 2026:** Bolagsverket integration 🔄 Planned
- **Q2 2026:** User authentication & profiles 📋 Planned
- **Q2 2026:** 3D visualization with Three.js 📋 Planned
- **Q3 2026:** Analytics dashboard 📋 Planned
- **Q4 2026:** Mobile app (React Native) 📋 Planned

---

## 💡 Ideas & Feedback

Have an idea? Found a bug? Let us know!

1. Check existing [Issues](https://github.com/yourusername/immersive-sweden/issues)
2. [Create a new issue](https://github.com/yourusername/immersive-sweden/issues/new)
3. Join discussions in [Discussions tab](https://github.com/yourusername/immersive-sweden/discussions)

---

## 📱 Preview

### Desktop View

```
┌─────────────────────────────────────────────┐
│  Immersive Sweden - Interactive Map         │
├─────────────────────────────────────────────┤
│                                             │
│  [Search...] 🔍         [Map of Sweden]    │
│                         with markers        │
│                         🥽 XR              │
│                         🎨 UI              │
│                         📊 Visualization   │
│                         🎮 Games           │
│                                             │
└─────────────────────────────────────────────┘
```

### Mobile View

```
Fully responsive on all devices (320px+)
```

---

**Made with ❤️ for the Swedish immersive tech community**

---

**Questions?** Open an issue or reach out!  
**Want to contribute?** See [CONTRIBUTING.md](./CONTRIBUTING.md)
