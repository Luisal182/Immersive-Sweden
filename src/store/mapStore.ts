import { create } from 'zustand';
import { Organization, TechnologyType, IndustryType, OrganizationModelType } from '@/types';

interface MapStoreState {
  // State
  organizations: Organization[];
  filteredOrganizations: Organization[];
  selectedOrgId: number | null;
  currentTechnologies: TechnologyType[];              // ← was: TechnologyType | 'all'
  currentIndustries: IndustryType[];                  // ← was: IndustryType | 'all'
  currentOrganizationModels: OrganizationModelType[]; // ← was: OrganizationModelType | 'all'
  searchTerm: string;
  isModalOpen: boolean;
  isMapCentered: boolean;

  // Actions
  setOrganizations: (organizations: Organization[]) => void;
  setSelectedOrgId: (id: number | null) => void;
  setCurrentTechnologies: (techs: TechnologyType[]) => void;
  setCurrentIndustries: (industries: IndustryType[]) => void;
  setCurrentOrganizationModels: (models: OrganizationModelType[]) => void;
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
  currentTechnologies: [],        // empty array = no filter active = show all
  currentIndustries: [],
  currentOrganizationModels: [],
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

  setCurrentTechnologies: (techs) => {
    set({ currentTechnologies: techs });
    get().filterOrganizations();
  },

  setCurrentIndustries: (industries) => {
    set({ currentIndustries: industries });
    get().filterOrganizations();
  },

  setCurrentOrganizationModels: (models) => {
    set({ currentOrganizationModels: models });
    get().filterOrganizations();
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterOrganizations();
  },

  setModalOpen: (isOpen) => {
    set({ isModalOpen: isOpen });
    if (!isOpen) set({ selectedOrgId: null });
  },

  setIsMapCentered: (value) => {
    set({ isMapCentered: value });
  },

  // ============================================
  // FILTERING LOGIC
  // ============================================
  filterOrganizations: () => {
    const {
      organizations,
      currentTechnologies,
      currentIndustries,
      currentOrganizationModels,
      searchTerm,
    } = get();

    console.log('FILTER START:', {
      totalOrgs: organizations.length,
      currentTechnologies,
      currentIndustries,
      currentOrganizationModels,
      firstOrg: organizations[0] ? {
        name: organizations[0].name,
        technology: organizations[0].technology,
        industry: organizations[0].industry,
        organizationModel: organizations[0].organizationModel,
      } : null,
    });

    const filtered = organizations.filter(org => {
      // Empty array = "all" — no filter active
      const technologyMatch =
        currentTechnologies.length === 0 ||
        currentTechnologies.includes(String(org.technology).trim() as TechnologyType);

      const industryMatch =
        currentIndustries.length === 0 ||
        currentIndustries.includes(String(org.industry).trim() as IndustryType);

      const modelMatch =
        currentOrganizationModels.length === 0 ||
        currentOrganizationModels.includes(String(org.organizationModel).trim() as OrganizationModelType);

        const searchMatch =
        searchTerm === '' ||
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (org.location?.city ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (org.technology ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (org.industry ?? '').toLowerCase().includes(searchTerm.toLowerCase());

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
  },
}));