  // THIS HOOK IS USED TO AVOID OVERLAPPING MARKERS ON THE MAP, IT APPLIES A JITTER TO THE LOCATIONS OF THE ORGANIZATIONS THAT HAVE THE SAME COORDINATES.
    // This hook is used in the hook "useMapMarkers.ts"
import { Organization } from '@/types';

export const applyJitter = (organizations: Organization[]): Organization[] => {
  const coordCount: Record<string, number> = {};

  return organizations.map(org => {
    const key = `${org.location.lat},${org.location.lng}`;
    coordCount[key] = (coordCount[key] || 0) + 1;
    const count = coordCount[key];

    // Offset  a spiral to separet poins in the same place
    const angle = (count - 1) * 137.5 * (Math.PI / 180); 
    const radius = count === 1 ? 0 : 0.015 * Math.sqrt(count - 1);

    return {
      ...org,
      location: {
        ...org.location,
        lat: org.location.lat + radius * Math.sin(angle),
        lng: org.location.lng + radius * Math.cos(angle),
      }
    };
  });
};