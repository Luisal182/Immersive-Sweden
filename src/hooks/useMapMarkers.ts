import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Organization } from '@/types';
import { useMapStore } from '@/store/mapStore';
import { applyJitter } from '@/hooks/useJitter';

interface UseMapMarkersProps {
  map: mapboxgl.Map | null;
  organizations: Organization[];
}

export const useMapMarkers = ({ map, organizations }: UseMapMarkersProps) => {
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const setSelectedOrgId = useMapStore(state => state.setSelectedOrgId);

  const getActivityEmoji = (): string => {
    return '📍';
  };

  useEffect(() => {
    console.log('🔄 useMapMarkers triggered');
    console.log('   map:', !!map);
    console.log('   organizations:', organizations.length);

    if (!map || !organizations.length) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    const jitteredOrgs = applyJitter(organizations);

    // Add new markers
     jitteredOrgs.forEach(org => {
      // ✅ VALIDACIÓN usando location.lat / location.lng
      if (
        !org.location ||
        org.location.lat == null ||
        org.location.lng == null ||
        isNaN(org.location.lat) ||
        isNaN(org.location.lng)
      ) {
        console.warn(`⚠️ Sin coordenadas: ${org.name}`);
        return;
      }

      console.log(`📍 ${org.name}:`, org.location.lng, org.location.lat);

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.cursor = 'pointer';
      el.innerHTML = `<div class="marker-inner">${getActivityEmoji()}</div>`;

      el.addEventListener('click', () => {
        setSelectedOrgId(org.id);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([org.location.lng, org.location.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });

    console.log(`✅ Added ${markersRef.current.length} markers to map`);
  }, [map, organizations, setSelectedOrgId]);
};