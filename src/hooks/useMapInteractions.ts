import { useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { Organization } from '@/types';

interface UseMapInteractionsProps {
  map: mapboxgl.Map | null;
}

export const useMapInteractions = ({ map }: UseMapInteractionsProps) => {
  
  // Fly to organization location
  const flyToOrganization = useCallback((organization: Organization) => {
    if (!map) {
      console.warn('Map not initialized');
      return;
    }

    const { lat, lng } = organization.location;

    map.flyTo({
      center: [lng, lat],
      zoom: 12,
      duration: 2000, // 2 second animation
      pitch: 0,
      bearing: 0,
      essential: true
    });

    console.log(`📍 Flying to: ${organization.name} (${organization.location.city})`);
  }, [map]);

  // Zoom to organization with popup
  const centerOnOrganization = useCallback((organization: Organization) => {
    if (!map) return;

    const { lat, lng } = organization.location;

    map.easeTo({
      center: [lng, lat],
      zoom: 13,
      duration: 1500
    });
  }, [map]);

  // Reset map to Sweden view
  const resetMapView = useCallback(() => {
    if (!map) return;

    map.flyTo({
      center: [15.0, 60.0],
      zoom: 4.2,
      duration: 1500,
      essential: true
    });
  }, [map]);

  return {
    flyToOrganization,
    centerOnOrganization,
    resetMapView
  };
};