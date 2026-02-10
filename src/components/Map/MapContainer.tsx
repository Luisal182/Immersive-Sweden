'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './MapContainer.module.css';

// Set Mapbox token from environment variable
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// Sweden border coordinates
const swedenBorder = {
  type: 'Feature' as const,
  properties: {},
  geometry: {
    type: 'Polygon' as const,
    coordinates: [
      [
        [12.801207943927352, 55.23152320838767],
        [10.408517562006665, 59.205933232235054],
        [12.255507540580084, 60.52598761348156],
        [11.659452648029543, 62.796896506257696],
        [12.06960269700815, 64.04601440166172],
        [13.217598541338305, 64.97889701519878],
        [14.513010838973116, 66.41291706834326],
        [15.880834471182538, 67.1898788662339],
        [16.21028250539277, 67.89150374120018],
        [17.81719179838356, 68.63035875977005],
        [19.62818600440272, 68.92326323774219],
        [20.917279563481998, 69.48710628568088],
        [24.440047332548687, 67.9493854661091],
        [24.643909164982347, 65.83176149362146],
        [19.891260604410093, 62.73469203750855],
        [18.155706483084657, 62.02849134046002],
        [17.936864984786325, 60.978078601113594],
        [19.16667290019052, 60.16097032192923],
        [19.704017935372946, 59.30924236024512],
        [18.70282459875739, 58.54382585116139],
        [20.296261305078133, 57.882935488272295],
        [19.221212902247373, 56.76429085017958],
        [17.548087601506808, 56.468666960684004],
        [15.509090392257235, 55.493212170701185],
        [14.756987302578949, 55.44339981141266],
        [13.693029033279004, 55.148515349263675],
        [12.802156259694812, 55.25971192436748],
        [12.528684099762387, 55.671857671331196],
        [12.801207943927352, 55.23152320838767]
      ]
    ]
  }
};

export default function MapContainer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

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

    // When map loads
    map.current.on('load', () => {
      // Add Sweden source
      map.current!.addSource('sweden', {
        type: 'geojson',
        data: swedenBorder
      });

      // Add Sweden border layer
      map.current!.addLayer({
        id: 'sweden-outline',
        type: 'line',
        source: 'sweden',
        paint: {
          'line-color': '#4fc3ff',
          'line-width': 2,
          'line-opacity': 0.9
        }
      });

      console.log('✅ Map loaded successfully');
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={mapContainer} className={styles.map} />
      
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