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

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function MapContainer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { organizations, loading, error } = useOrganizations();
  const { setOrganizations } = useMapStore();
  const { flyToOrganization } = useMapInteractions({ map: map.current });

  useMapMarkers({ map: map.current, organizations });

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [15.0, 60.0],
      zoom: 4.2,
      pitch: 0,
      bearing: 0
    });

    // Add layers when map is ready
    map.current.on('load', () => {
      if (map.current) {
        useMapLayers({ map: map.current });
      }
    });

    console.log('✅ Map initialized');

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Update Zustand store when organizations load
  useEffect(() => {
    if (organizations.length > 0) {
      setOrganizations(organizations);
    }
  }, [organizations, setOrganizations]);

  return (
    <div className={styles.container}>
      <Modal flyToOrganization={flyToOrganization} />
      <div ref={mapContainer} className={styles.map} />
      
      {/* Loading indicator */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          zIndex: '5'
        }}>
          Loading organizations...
        </div>
      )}

      {/* Error message */}
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
          zIndex: '5'
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
        />
        <button className={styles.searchBtn} aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>

      {/* Filter Buttons */}
      <div className={styles.filterButtons}>
        <button className={styles.filterBtn} data-activity="XR">
          <span>🥽 XR</span>
        </button>
        <button className={styles.filterBtn} data-activity="UI">
          <span>🎨 UI</span>
        </button>
        <button className={styles.filterBtn} data-activity="Visualization">
          <span>📊 Visualization</span>
        </button>
        <button className={styles.filterBtn} data-activity="Games">
          <span>🎮 Games</span>
        </button>
      </div>
    </div>
  );
}