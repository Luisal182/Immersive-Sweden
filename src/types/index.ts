// Organization Interface
export interface Organization {
    id: number;
    name: string;
    description: string;
    type: 'XR' | 'AI' | 'Games' | 'Visualization' | 'Culture' | 'Technologies';
    activity: 'XR' | 'AI' | 'Games' | 'Visualization' | 'Culture' | 'Technologies';
    contact: {
      email: string;
      phone: string;
      website?: string;
    };
    location: {
      city: string;
      lat: number;
      lng: number;
    };
  }
  
  // API Response
  export interface OrganizationResponse {
    organizations: Organization[];
  }
  
  // Map State
  export interface MapState {
    organizations: Organization[];
    filteredOrganizations: Organization[];
    currentFilter: 'all' | 'XR' | 'AI' | 'Games' | 'Visualization' | 'Culture' | 'Technologies';
    searchTerm: string;
    selectedOrgId: number | null;
  }
  
  // Sweden Border
  export interface SwedenCoordinates {
    type: 'Polygon';
    coordinates: number[][][];
  }
  
  export interface SwedenBorder {
    type: 'Feature';
    geometry: SwedenCoordinates;
    properties: Record<string, unknown>;
  }