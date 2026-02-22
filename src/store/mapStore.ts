import { create } from 'zustand';
import { Organization, TechnologyType, IndustryType, OrganizationModelType } from '@/types';

interface MapStoreState {
  // State
  organizations: Organization[];
  filteredOrganizations: Organization[];
  selectedOrgId: number | null;
  currentTechnology: TechnologyType | 'all';
  currentIndustry: IndustryType | 'all';
  currentOrganizationModel: OrganizationModelType | 'all';
  searchTerm: string;
  isModalOpen: boolean;
  isMapCentered: boolean;

  // Actions
  setOrganizations: (organizations: Organization[]) => void;
  setSelectedOrgId: (id: number | null) => void;
  setCurrentTechnology: (tech: TechnologyType | 'all') => void;
  setCurrentIndustry: (industry: IndustryType | 'all') => void;
  setCurrentOrganizationModel: (model: OrganizationModelType | 'all') => void;
  setSearchTerm: (term: string) => void;
  setModalOpen: (isOpen: boolean) => void;
  setIsMapCentered: (value: boolean) => void;
  filterOrganizations: () => void;
  getSelectedOrganization: () => Organization | undefined;
}

export const useMapStore = create<MapStoreState>((set, get) => ({
  // ============================================
  // STATE
  // ============================================
  organizations: [],
  filteredOrganizations: [],
  selectedOrgId: null,
  currentTechnology: 'all',
  currentIndustry: 'all',
  currentOrganizationModel: 'all',
  searchTerm: '',
  isModalOpen: false,
  isMapCentered: false,

  // ============================================
  // ACTIONS
  // ============================================
  
  setOrganizations: (organizations) => {
    set({ organizations });
    get().filterOrganizations();
  },

  setSelectedOrgId: (id) => {
    set({ selectedOrgId: id, isModalOpen: id !== null });
  },

  setCurrentTechnology: (tech) => {
    set({ currentTechnology: tech });
    get().filterOrganizations();
  },
  
  setCurrentIndustry: (industry) => {
    set({ currentIndustry: industry });
    get().filterOrganizations();
  },
  
  setCurrentOrganizationModel: (model) => {
    set({ currentOrganizationModel: model });
    get().filterOrganizations();
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterOrganizations();
  },

  setModalOpen: (isOpen) => {
    set({ isModalOpen: isOpen });
    if (!isOpen) {
      set({ selectedOrgId: null });
    }
  },

  setIsMapCentered: (value) => {
    set({ isMapCentered: value });
  },
  
    
  // ============================================
  // FILTERING LOGIC
  // ============================================
  filterOrganizations: () => {
    const { organizations, currentTechnology, currentIndustry, currentOrganizationModel, searchTerm } = get();
    
    console.log('FILTER START:', {
      totalOrgs: organizations.length,
      currentTechnology,
      firstOrg: organizations[0] ? {
        name: organizations[0].name,
        technology: organizations[0].technology,
        industry: organizations[0].industry,
        organizationModel: organizations[0].organizationModel
      } : null
    });
    
    const filtered = organizations.filter(org => {
      const technologyMatch = 
        currentTechnology === 'all' || 
        String(org.technology).trim() === String(currentTechnology).trim();
      
      const industryMatch = 
        currentIndustry === 'all' || 
        String(org.industry).trim() === String(currentIndustry).trim();
      
      const modelMatch = 
        currentOrganizationModel === 'all' || 
        String(org.organizationModel).trim() === String(currentOrganizationModel).trim();
      
      const searchMatch = searchTerm === '' ||
        org.name.toLowerCase().includes(searchTerm.toLowerCase());
  
      return technologyMatch && industryMatch && modelMatch && searchMatch;
    });
  
    console.log('FILTER RESULT:', { filtered: filtered.length, total: organizations.length });
    set({ filteredOrganizations: filtered });
  },
 
  // ============================================
  // SELECTORS
  // ============================================
  
  getSelectedOrganization: () => {
    const { organizations, selectedOrgId } = get();
    return organizations.find(org => org.id === selectedOrgId);
  }
}));