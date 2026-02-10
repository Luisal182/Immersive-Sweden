// Map layer configuration for Mapbox

export const layerConfig = {
    // Sweden outline - crisp border
    swedenOutline: {
      id: 'sweden-outline',
      type: 'line' as const,
      source: 'sweden',
      paint: {
        'line-color': '#4fc3ff',
        'line-width': 2,
        'line-opacity': 0.9
      }
    },
  
    // Sweden glow - halo effect
    swedenOutlineGlow: {
      id: 'sweden-outline-glow',
      type: 'line' as const,
      source: 'sweden',
      paint: {
        'line-color': '#4fc3ff',
        'line-width': 10,
        'line-opacity': 0.25,
        'line-blur': 6
      }
    },
  
    // Shadow blur - soft outer glow
    swedenShadowBlur: {
      id: 'sweden-shadow-blur',
      type: 'fill' as const,
      source: 'sweden-mask',
      paint: {
        'fill-color': '#000000',
        'fill-opacity': 0.25,
        'fill-blur': 15
      }
    },
  
    // Shadow - defined darkness outside Sweden
    swedenShadow: {
      id: 'sweden-shadow',
      type: 'fill' as const,
      source: 'sweden-mask',
      paint: {
        'fill-color': '#000000',
        'fill-opacity': 0.45
      }
    }
  };