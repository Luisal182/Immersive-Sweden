# Handover Document — Immersive Sweden

### For the next developer taking over this project

---

## Overview

This document is written by Luis Alfonso Arranz y Garcia, the developer who built the Immersive Sweden interactive map platform during an internship (Januari–May 2026). It is intended to give the next developer a clear picture of the current state of the project, what decisions were made and why, what is pending, and what to watch out for.

If you have questions about anything in this document, you can reach out via GitHub issues or the contact details left with the Immersive Sweden team.

---

## Tech Stack

| Technology              | Purpose                 |
| ----------------------- | ----------------------- |
| Next.js 16 (App Router) | Frontend framework      |
| TypeScript              | Language                |
| Mapbox GL JS            | Interactive map         |
| Zustand                 | Global state management |
| Framer Motion           | Animations              |
| Supabase (PostgreSQL)   | Database and backend    |
| CSS Modules             | Styling                 |
| Vercel                  | Hosting and deployment  |

---

## Project Structure

The project follows a standard Next.js App Router structure. The most important folders are:

- `src/app/` — pages and routes. The map is at `/` and the admin dashboard is at `/dashboard`
- `src/components/` — React components including the map, modal, cards and animations
- `src/hooks/` — custom hooks for map markers, organizations, jitter, layers and interactions
- `src/store/` — Zustand global store with filtering logic
- `src/types/` — TypeScript interfaces
- `src/lib/` — Supabase client configuration
- `public/data/` — static assets including the SVG marker

---

## Environment Variables

The project requires these variables in `.env.local` (and in Vercel environment settings for production):

```
NEXT_PUBLIC_MAPBOX_TOKEN=       # Mapbox GL JS access token
NEXT_PUBLIC_SUPABASE_URL=       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase anonymous key
NEXT_PUBLIC_ADMIN_USERNAME=     # Admin dashboard username
NEXT_PUBLIC_ADMIN_PASSWORD=     # Admin dashboard password
```

---

## Key Technical Decisions

### Why Zustand?

The map has multiple filters, a search field, a selected organization state, and a modal state — all of which need to be shared across components. Zustand was chosen for its simplicity over Redux or Context.

### Why CSS Modules?

To keep styles scoped to their components and avoid global conflicts. All component styles are in `.module.css` files next to the component.

### Why the jitter system?

Many organizations share the same city coordinates in the database (e.g. 50+ companies in Stockholm all have the same lat/lng). Without jitter they would all stack on top of each other and only one would be visible. The jitter spreads them in a golden-angle spiral. **When precise per-organization coordinates are added to the database, remove the jitter** — just delete the `applyJitter` call in `useMapMarkers.ts`.

### Why mapReady state?

The map has a cinematic flyTo animation on load. Markers are deliberately delayed until after the animation completes. The `mapReady` state in `MapContainer.tsx` controls this. If you want markers to appear immediately on load, set `setMapReady(true)` directly in the `map.current.on('load')` callback.

### Why hardcoded admin credentials?

The admin dashboard was built as a prototype with hardcoded credentials in `.env.local` to avoid the complexity of Supabase Auth during the internship. **This should be migrated to Supabase Auth before the platform goes to production with real users.**

---

## Admin Dashboard

The dashboard is at `/dashboard`. It is protected by a simple username/password login stored in environment variables. The session is stored in `sessionStorage` and expires when the browser is closed.

### Key files

- `src/app/dashboard/page.tsx` — login page
- `src/app/dashboard/main/page.tsx` — main table view
- `src/app/dashboard/EditDrawer/EditDrawer.tsx` — edit/create/delete drawer

### Add/Drop Column feature

The dashboard has buttons to add and drop columns directly from the UI. These use two PostgreSQL functions (`add_column` and `drop_column`) created in Supabase via RPC. After adding a new column via the dashboard, you need to manually update the `OrgRow` interface in `EditDrawer.tsx` and add the field to the drawer to make it editable. This could be made dynamic in the future — see Pending Work below.

---

## Database

See `docs/DATABASE_SCHEMA.md` for the full column reference.

The database is hosted on Supabase. The `organizations` table has 60+ columns. All fields except `id` are nullable. The `id` is auto-generated.

**Two SQL functions exist in Supabase:**

- `add_column(column_name text)` — adds a text column to the organizations table
- `drop_column(column_name text)` — drops a column from the organizations table

These are `SECURITY DEFINER` functions, meaning they run with elevated privileges.

---

## Map Marker

The map marker is an SVG file at `public/data/marker.svg`. To change the marker, replace this file. The size is set in `useMapMarkers.ts`:

```typescript
el.innerHTML = `<div class="marker-inner"><img src="/data/marker.svg" width="32" height="32" /></div>`;
```

Adjust `width` and `height` to resize.

---

## Mobile Responsive

The map has different zoom levels and center positions for mobile and desktop, detected via `window.innerWidth` inside `useEffect` in `MapContainer.tsx`. The dropdown filters on mobile hide text labels and show only icons, controlled via CSS media queries in `CustomDropdown.module.css`.

---

## Pending Work

These are things that were planned but not completed during the internship:

### High priority

- **Supabase Auth** — replace hardcoded admin credentials with proper authentication
- **EditDrawer dynamic fields** — currently new columns added via the dashboard are not automatically visible in the EditDrawer. A dynamic field system would fetch column names from `information_schema` and render them automatically
- **Suggest Form** — a public form at `/suggest` where anyone can submit their organization for review. Submissions would go to a `pending_organizations` table and be reviewed in a new Pending tab in the dashboard

### Medium priority

- **AI Chat Assistant** — a bilingual (English/Swedish) chatbot powered by Claude API that interprets natural language queries and applies map filters automatically. Architecture: Supabase Edge Function → Claude API → Zustand filters
- **Precise coordinates** — most organizations currently use city-level coordinates. Adding precise per-organization coordinates would improve map accuracy and allow removing the jitter system
- **Mobile performance** — on real mobile devices the app can be slow due to 391 markers and Framer Motion animations running simultaneously. Consider disabling FloatingParticles and SwedenBorderGlow on mobile

### Low priority

- **Dropdown animations** — open/close animations for the filter dropdowns
- **Logo animation** — the Immersive Sweden logo placeholder can be replaced with an animated SVG logo

---

## Known Issues

- **Duplicate organizations** — the database contains some duplicate entries (same name, different IDs). These should be cleaned up manually in Supabase.
- **Missing coordinates** — some organizations have null latitude/longitude and do not appear on the map. These need to be looked up and added manually or via geocoding API.
- **fill-blur warning** — Mapbox logs a warning about `fill-blur` being an unknown property in `useMapLayers.ts`. This is a non-breaking warning from a Mapbox version mismatch and can be fixed by updating the layer configuration.

---

## Deployment

The project is deployed on Vercel connected to the GitHub repository. Pushing to the `main` branch triggers an automatic deployment.

**Before deploying make sure all environment variables are set in Vercel → Project → Settings → Environment Variables.**

The admin dashboard credentials (`NEXT_PUBLIC_ADMIN_USERNAME` and `NEXT_PUBLIC_ADMIN_PASSWORD`) must also be set in Vercel — they are not visible in the code.

---

## Data Import

See `docs/IMPORT_GUIDE.md` for the full guide on importing data from Excel.

---

## Requested Changes (May 2026)

The following changes were requested by the Immersive Sweden team but could not be implemented before the end of the internship. They are documented here for the next developer.

---

### 1. Geography — Cities in Sweden

Currently each organization has one city coordinate. The request is to show organizations in **all cities where they have activity**, using the `cities_in_sweden` column (column AJ in the Excel file).

This requires a change in how markers are created — instead of one marker per organization, there could be multiple markers for the same organization in different cities. This affects `useMapMarkers.ts` and potentially the jitter system.

The modal/card text should also change from "Location" to "Locations".

---

### 2. Dropdown — Type of Organisation

The current "Other organisations" dropdown should be **renamed to "Type of organisation"** and the values updated to:

- Company
- University or Research Institute
- Research group at University
- Research group at Research Institute
- Lead user
- Public organisation
- City, Region, Municipality
- Policy unit
- Civic organization
- Innovation platform
- Competence center

**Each type should have a different marker color on the map.** For example: Company = red, University = blue, etc. This requires updating `useMapMarkers.ts` to assign different SVG markers or CSS colors based on `organization_subtype`.

Files to update: `types/index.ts`, `mapStore.ts`, `MapContainer.tsx`, `useMapMarkers.ts`, `EditDrawer.tsx`

---

### 3. Dropdown — Competence Area (currently "Technology")

The "Technology" dropdown should be **renamed to "Competence Area"** with only two values:

- Immersive technologies _(replaces XR)_
- Visualisation or Image Analysis

**Remove AI** — the team does not have reliable data on which organizations have AI competence and is not interested in AI-only organizations.

An organization can have **both** competence areas selected simultaneously — verify that the multi-select logic in the store handles this correctly.

Files to update: `types/index.ts`, `mapStore.ts`, `MapContainer.tsx`, `EditDrawer.tsx`

---

### 4. New Dropdown — Category of Company

Add a new dropdown filter called **"Category of company"** with these values:

- Product company
- Hardware
- Software
- Service company
- Consultant
- Game studio
- Producer

An organization can have **multiple categories** selected. More values may be added in the future.

This requires a new column in the database or using the existing `category` column. Files to update: `types/index.ts`, `mapStore.ts`, `MapContainer.tsx`, `EditDrawer.tsx`

---

### 5. Dropdown — Industry (expanded)

The current Industry dropdown has 3-4 values. It should be expanded to:

Aerospace / Agriculture, forestry and fishing / Automotive / Construction, infrastructure, architecture, urban development / Culture, Arts & Entertainment / Defense and security / Education & training / Electronics / Energy / Food and packaging / Gaming / Healthcare, life sciences & medtech / ICT / Manufacturing / Media / Mining and natural resources / Process industries / Professional, scientific and technical activities / Research and testing / Retail / Robotics and autonomous systems / Transportation & logistics

Files to update: `types/index.ts`, `MapContainer.tsx`, `EditDrawer.tsx`

---

### 6. New Dropdown — Customers Industry

Add a new dropdown filter called **"Customers Industry"** with the same 22 values as the Industry dropdown above.

This uses the existing `customers_industry` column in the database.

Files to update: `types/index.ts`, `mapStore.ts`, `MapContainer.tsx`, `EditDrawer.tsx`

---

### 7. New Dropdown — Size Category

Add a new dropdown filter called **"Size"** with these values:

- Micro
- Small
- Medium
- Large
- Great

This uses the existing `size_category` column in the database.

Files to update: `types/index.ts`, `mapStore.ts`, `MapContainer.tsx`, `EditDrawer.tsx`

---

### 8. Remove — Organisation Model dropdown

The "Organisation Model" dropdown (Business / Nonprofit Organization) should be **removed** from the public map filters.

Files to update: `mapStore.ts`, `MapContainer.tsx`, `types/index.ts`

---

### Summary of files affected by all requested changes

| File                                          | Changes needed                            |
| --------------------------------------------- | ----------------------------------------- |
| `src/types/index.ts`                          | Update all option constants and types     |
| `src/store/mapStore.ts`                       | Add/remove filter states and filter logic |
| `src/components/Map/MapContainer.tsx`         | Update all dropdown components            |
| `src/hooks/useMapMarkers.ts`                  | Add color logic per organization type     |
| `src/app/dashboard/EditDrawer/EditDrawer.tsx` | Update all dropdown options               |
| `public/data/`                                | Add colored SVG marker variants           |

## Repository Handover

The source code lives in Luis's personal GitHub repository. The next developer should **not work directly in this repo**. Instead:

1. Clone the repo locally
2. Create a **new GitHub repository** under their own account or the organization's GitHub account
3. Push the cloned code to the new repo
4. Connect the organization's Vercel account to the **new repo**
5. Work and make changes freely in the new repo

This keeps Luis's original repo intact as a reference and starting point. The new developer can then restructure, rebuild, or replace any part of the codebase without affecting the original.

The branch to use as starting point will be `org-handover` (for example i ma not yet decided) this is the branch configured in the organization's Vercel deployment and contains the latest stable version of the project including all database migrations and documentation.

---

## Final Note

This project was built from scratch by one developer over approximately 4 months. The codebase is clean, well structured and documented. The most important things to do before going to production are: migrate to Supabase Auth, add precise coordinates for all organizations, and remove the jitter system once coordinates are in place.

Good luck with the project.

Luis Alfonso Arranz y Garcia, May 2026
