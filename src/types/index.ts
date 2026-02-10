export interface Organization {
    id: number;
    name: string;
    description: string;
     type: string;
     activity: 'XR' | 'UI' | 'Visualization' | 'Games' | 'Gaming' | 'Other';    
     contact:
        {
            email: string;
            phone: string;
            website: string;
        };
        location:{
            city: string;
            lat: number;
            lng: number;

        }
    }

    //API response types

export interface OrganizationResponse {
    organizations: Organization[];
}

//Map State types
export interface MapState {
    organizations: Organization[];
    filteredOrganizations: Organization[];
    currentFilter: 'all' | 'XR' | 'UI' | 'Visualization' | 'Games';
    searchTerm: string;
    selectedOrgId: number | null;
  }

  // Sweden Border
export interface SwedenCoordinates {
    type: 'Polygon';
    coordinates: number[][][];
  }