// Organization interface and types
export const TECHNOLOGY_OPTIONS = ['XR', 'AI', 'Visualization'] as const;
export const INDUSTRY_OPTIONS = ['Manufacturing', 'Healthcare', 'Culture', 'Games'] as const;
export const ORGANIZATION_MODEL_OPTIONS = ['Business', 'Nonprofit Organization'] as const;

export type TechnologyType = typeof TECHNOLOGY_OPTIONS[number];
export type IndustryType = typeof INDUSTRY_OPTIONS[number];
export type OrganizationModelType = typeof ORGANIZATION_MODEL_OPTIONS[number];

export interface Organization {
  id: number;
  name: string;
  description: string;
  activity?: string | null;          
  type: string;
  technology?: string | null;
  industry?:string | null;
  organizationModel?: string | null;
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

// API response types
export interface OrganizationResponse {
  organizations: Organization[];
}

// Map State types
export interface MapState {
  organizations: Organization[];
  filteredOrganizations: Organization[];
  selectedOrgId: number | null;
  currentTechnology: TechnologyType | 'all';
  currentIndustry: IndustryType | 'all';
  currentOrganizationModel: OrganizationModelType | 'all';
  searchTerm: string;
  isModalOpen: boolean;
  isMapCentered: boolean;
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