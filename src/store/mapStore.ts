import { create } from 'zustand';
import { Organization, TechnologyType, IndustryType, OrganizationModelType, OrganizationSubtypeType } from '@/types';

interface MapStoreState {
  organizations: Organization[];
  filteredOrganizations: Organization[];
  selectedOrgId: number | null;
  currentTechnologies: TechnologyType[];
  currentIndustries: IndustryType[];
  currentOrganizationModels: OrganizationModelType[];
  currentOrganizationSubtypes: OrganizationSubtypeType[];
  searchTerm: string;
  isModalOpen: boolean;
  isMapCentered: boolean;

  setOrganizations: (organizations: Organization[]) => void;
  setSelectedOrgId: (id: number | null) => void;
  setCurrentTechnologies: (techs: TechnologyType[]) => void;
  setCurrentIndustries: (industries: IndustryType[]) => void;
  setCurrentOrganizationModels: (models: OrganizationModelType[]) => void;
  setCurrentOrganizationSubtypes: (subtypes: OrganizationSubtypeType[]) => void;
  setSearchTerm: (term: string) => void;
  setModalOpen: (isOpen: boolean) => void;
  setIsMapCentered: (value: boolean) => void;
  filterOrganizations: () => void;
  getSelectedOrganization: () => Organization | undefined;
}

export const useMapStore = create<MapStoreState>((set, get) => ({
  organizations: [],
  filteredOrganizations: [],
  selectedOrgId: null,
  currentTechnologies: [],
  currentIndustries: [],
  currentOrganizationModels: [],
  currentOrganizationSubtypes: [],
  searchTerm: '',
  isModalOpen: false,
  isMapCentered: false,

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

  setCurrentOrganizationSubtypes: (subtypes) => {
    set({ currentOrganizationSubtypes: subtypes });
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

  filterOrganizations: () => {
    const {
      organizations,
      currentTechnologies,
      currentIndustries,
      currentOrganizationModels,
      currentOrganizationSubtypes,
      searchTerm,
    } = get();

    console.log('FILTER START:', {
      totalOrgs: organizations.length,
      currentTechnologies,
      currentIndustries,
      currentOrganizationModels,
      currentOrganizationSubtypes,
      firstOrg: organizations[0] ? {
        name: organizations[0].name,
        technology: organizations[0].technology,
        industry: organizations[0].industry,
        organizationModel: organizations[0].organizationModel,
        organizationSubtype: organizations[0].organizationSubtype,
      } : null,
    });

    const filtered = organizations.filter(org => {
      const technologyMatch =
        currentTechnologies.length === 0 ||
        currentTechnologies.includes(String(org.technology).trim() as TechnologyType);

      const industryMatch =
        currentIndustries.length === 0 ||
        currentIndustries.includes(String(org.industry).trim() as IndustryType);

      const modelMatch =
        currentOrganizationModels.length === 0 ||
        currentOrganizationModels.includes(String(org.organizationModel).trim() as OrganizationModelType);

      const subtypeMatch =
        currentOrganizationSubtypes.length === 0 ||
        currentOrganizationSubtypes.includes(String(org.organizationSubtype).trim() as OrganizationSubtypeType);

      const searchMatch =
        searchTerm === '' ||
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (org.location?.city ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (org.technology ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (org.industry ?? '').toLowerCase().includes(searchTerm.toLowerCase());

      return technologyMatch && industryMatch && modelMatch && subtypeMatch && searchMatch;
    });

    console.log('FILTER RESULT:', { filtered: filtered.length, total: organizations.length });
    set({ filteredOrganizations: filtered });
  },

  getSelectedOrganization: () => {
    const { organizations, selectedOrgId } = get();
    return organizations.find(org => org.id === selectedOrgId);
  },
}));