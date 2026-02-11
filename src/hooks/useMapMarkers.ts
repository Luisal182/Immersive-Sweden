import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Organization } from '@/types';

interface UseMapMarkersProps {
  map: mapboxgl.Map | null;
  organizations: Organization[];
}

export const useMapMarkers = ({ map, organizations }: UseMapMarkersProps) => {
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const getActivityEmoji = (): string => {
    return '📍'; // Solo chincheta roja
  };

  useEffect(() => {
    if (!map || !organizations.length) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    organizations.forEach(org => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = `
        <div class="marker-inner">
        ${getActivityEmoji()}
        </div>
      `;

      el.addEventListener('click', () => {
        console.log('Clicked organization:', org.name);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([org.location.lng, org.location.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });

    console.log(`✅ Added ${organizations.length} markers to map`);
  }, [map, organizations]);
};