import { create } from 'zustand';
import { Organization } from '@/types';

interface MapStoreState {
  organizations: Organization[];
  filteredOrganizations: Organization[];
  selectedOrgId: number | null;
  currentFilter: 'all' | 'XR' | 'AI' | 'Games' | 'Visualization' | 'Culture' | 'Technologies';
  searchTerm: string;
  isModalOpen: boolean;

  // Actions
  setOrganizations: (organizations: Organization[]) => void;
  setSelectedOrgId: (id: number | null) => void;
  setCurrentFilter: (filter: 'all' | 'XR' | 'AI' | 'Games' | 'Visualization' | 'Culture' | 'Technologies') => void;
  setSearchTerm: (term: string) => void;
  setModalOpen: (isOpen: boolean) => void;
  filterOrganizations: () => void;
  getSelectedOrganization: () => Organization | undefined;
}

export const useMapStore = create<MapStoreState>((set, get) => ({
  // State
  organizations: [],
  filteredOrganizations: [],
  selectedOrgId: null,
  currentFilter: 'all',
  searchTerm: '',
  isModalOpen: false,

  // Actions
  setOrganizations: (organizations) => {
    set({ organizations });
    get().filterOrganizations();
  },

  setSelectedOrgId: (id) => {
    set({ selectedOrgId: id, isModalOpen: id !== null });
  },

  setCurrentFilter: (filter) => {
    set({ currentFilter: filter });
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

  filterOrganizations: () => {
    const { organizations, currentFilter, searchTerm } = get();
    
    const filtered = organizations.filter(org => {
      // Filter by activity
      const filterMatch = currentFilter === 'all' || org.activity === currentFilter;
      
      // Filter by search term
      const searchMatch = 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.type.toLowerCase().includes(searchTerm.toLowerCase());

      return filterMatch && searchMatch;
    });

    set({ filteredOrganizations: filtered });
  },

  getSelectedOrganization: () => {
    const { organizations, selectedOrgId } = get();
    return organizations.find(org => org.id === selectedOrgId);
  }
}));