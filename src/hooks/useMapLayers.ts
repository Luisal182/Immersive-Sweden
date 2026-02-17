import { swedenBorder, swedenBorderCoordinates, gotlandCoordinates, olandCoordinates } from '@/data/swedenBorder';
import { layerConfig } from '@/utils/mapLayerConfig';

interface UseMapLayersProps {
  map: mapboxgl.Map | null;
}

export const useMapLayers = ({ map }: UseMapLayersProps) => {
  if (!map) {
    console.warn('⚠️ useMapLayers: Map is null');
    return;
  }

  const addLayers = () => {
    try {
      // Check if sources already exist
      if (!map.getSource('sweden')) {
        console.log('Adding sweden source...');
        map.addSource('sweden', {
          type: 'geojson',
          data: swedenBorder
        });
      }

      if (!map.getSource('sweden-mask')) {
        console.log('Adding sweden-mask source...');
        // Create inverted mask
        const swedenMask = {
          type: 'Feature' as const,
          properties: {},
          geometry: {
            type: 'Polygon' as const,
            coordinates: [
              [[-180, 85], [180, 85], [180, -85], [-180, -85], [-180, 85]],
              swedenBorderCoordinates
            ]
          }
        };

        map.addSource('sweden-mask', {
          type: 'geojson',
          data: swedenMask
        });
      }

      // Add Gotland source
      if (!map.getSource('gotland')) {
        console.log('Adding gotland source...');
        map.addSource('gotland', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [gotlandCoordinates]
            },
            properties: {}
          }
        });
      }

      // Add Öland source
      if (!map.getSource('oland')) {
        console.log('Adding oland source...');
        map.addSource('oland', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [olandCoordinates]
            },
            properties: {}
          }
        });
      }

      // Add layers if they don't exist
      if (!map.getLayer('sweden-shadow-blur')) {
        map.addLayer(layerConfig.swedenShadowBlur);
        console.log('✅ Added sweden-shadow-blur layer');
      }

      if (!map.getLayer('sweden-shadow')) {
        map.addLayer(layerConfig.swedenShadow);
        console.log('✅ Added sweden-shadow layer');
      }

      if (!map.getLayer('sweden-outline-glow')) {
        map.addLayer(layerConfig.swedenOutlineGlow);
        console.log('✅ Added sweden-outline-glow layer');
      }

      if (!map.getLayer('sweden-outline')) {
        map.addLayer(layerConfig.swedenOutline);
        console.log('✅ Added sweden-outline layer');
      }

      // Add Gotland fill layer
      if (!map.getLayer('gotland-fill')) {
        map.addLayer(layerConfig.gotlandFill);
        console.log('✅ Added gotland-fill layer');
      }

      // Add Öland fill layer
      if (!map.getLayer('oland-fill')) {
        map.addLayer(layerConfig.olandFill);
        console.log('✅ Added oland-fill layer');
      }

      console.log('✅ All map layers added successfully');
    } catch (error) {
      console.error('❌ Error adding layers:', error);
    }
  };

  // Wait for map to load
  if (map.isStyleLoaded()) {
    addLayers();
  } else {
    console.log('Waiting for map style to load...');
    map.once('load', addLayers);
  }
};