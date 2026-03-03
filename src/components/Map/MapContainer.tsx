
'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './MapContainer.module.css';
import { useMapLayers } from '@/hooks/useMapLayers';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useMapMarkers } from '@/hooks/useMapMarkers';
import Modal from '@/components/Modal/Modal';
import { useMapStore } from '@/store/mapStore';
import { useMapInteractions } from '@/hooks/useMapInteractions';
import { TechnologyType, IndustryType, OrganizationModelType } from '@/types';
import CustomDropdown from '@/components/_graveyard/CustomDropdown/CustomDropdown';
import { MapAnimation } from '@/components/3D/Animations/MapAnimation';
import { SwedenBorderGlow } from '@/components/3D/Animations/SwedenBorderGlow';
import { FloatingParticles } from '@/components/3D/Animations/FloatingParticles';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function MapContainer() {
  // Refs
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Hooks
  const { organizations, loading, error } = useOrganizations();

  // Store
  const filteredOrganizations = useMapStore(state => state.filteredOrganizations);
  const setOrganizations = useMapStore(state => state.setOrganizations);
  const setSearchTerm = useMapStore(state => state.setSearchTerm);
  const isMapCentered = useMapStore(state => state.isMapCentered);
  const setIsMapCentered = useMapStore(state => state.setIsMapCentered);
  const currentTechnologies = useMapStore(state => state.currentTechnologies);
  const currentIndustries = useMapStore(state => state.currentIndustries);
  const currentOrganizationModels = useMapStore(state => state.currentOrganizationModels);
  const setCurrentTechnologies = useMapStore(state => state.setCurrentTechnologies);
  const setCurrentIndustries = useMapStore(state => state.setCurrentIndustries);
  const setCurrentOrganizationModels = useMapStore(state => state.setCurrentOrganizationModels);

  const { flyToOrganization } = useMapInteractions({ map: map.current });
  useMapMarkers({ map: map.current, organizations: filteredOrganizations });

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [15.0, 60.0],
      zoom: 4.2,
      pitch: 0,
      bearing: 0,
    });

    map.current.on('load', () => {
      if (map.current) {
        useMapLayers({ map: map.current });
      }
    });

    console.log('✅ Map initialized');

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Load organizations into Zustand
  useEffect(() => {
    if (organizations.length > 0) {
      setOrganizations(organizations);
    }
  }, [organizations, setOrganizations]);

  return (
    <MapAnimation>
    <div className={styles.container}>

    <FloatingParticles />
 
    <SwedenBorderGlow />
   

      {/* Back Button */}
      {map.current && isMapCentered && (
        <button
          className={styles.backBtn}
          onClick={() => {
            setIsMapCentered(false);
            map.current?.flyTo({
              center: [15.0, 60.0],
              zoom: 4.2,
              duration: 1500,
            });
          }}
        >
          ← Back
        </button>
      )}

      {/* Modal */}
      <Modal flyToOrganization={flyToOrganization} />

      {/* Map */}
      <div ref={mapContainer} className={styles.map} />

      {/* Loading Indicator */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '120px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          zIndex: 5,
        }}>
          Loading organizations...
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(255, 0, 0, 0.8)',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          zIndex: 5,
        }}>
          Error: {error}
        </div>
      )}

      {/* Search Field */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search organization..."
          aria-label="Search organizations"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.searchBtn} aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>

      {/* Filter Dropdowns */}
      <div className={styles.filterGroup}>
        <CustomDropdown
          label="Technology"
          selectedValues={currentTechnologies}
          onChange={(vals) => setCurrentTechnologies(vals as TechnologyType[])}
          options={[
            { value: 'XR',            label: 'XR',            icon: '🥽' },
            { value: 'AI',            label: 'AI',            icon: '🧠' },
            { value: 'Visualization', label: 'Visualization', icon: '🗺️' },
          ]}
        />

        <CustomDropdown
          label="Industry"
          selectedValues={currentIndustries}
          onChange={(vals) => setCurrentIndustries(vals as IndustryType[])}
          options={[
            { value: 'Manufacturing', label: 'Manufacturing', icon: '⚙️' },
            { value: 'Healthcare',    label: 'Healthcare',    icon: '🏥' },
            { value: 'Culture',       label: 'Culture',       icon: '🎨' },
            { value: 'Games',         label: 'Games',         icon: '🎮' },
          ]}
        />

        <CustomDropdown
          label="Organization Model"
          selectedValues={currentOrganizationModels}
          onChange={(vals) => setCurrentOrganizationModels(vals as OrganizationModelType[])}
          options={[
            { value: 'Business',               label: 'Business',               icon: '💼' },
            { value: 'Nonprofit Organization', label: 'Nonprofit Organization', icon: '🤝' },
          ]}
        />
      </div>
    </div>
    </MapAnimation>
    
  );
}