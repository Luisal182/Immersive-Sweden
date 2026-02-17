import { create } from 'zustand';
import { Organization } from '@/types';

interface MapStoreState {
  organizations: Organization[];
  filteredOrganizations: Organization[];
  selectedOrgId: number | null;
  currentFilter: 'all' | 'XR' | 'AI' | 'Games' | 'Visualization' | 'Culture' | 'Technologies';
  searchTerm: string;
  isModalOpen: boolean;
  isMapCentered: boolean;

  // Actions
  setOrganizations: (organizations: Organization[]) => void;
  setSelectedOrgId: (id: number | null) => void;
  setCurrentFilter: (filter: 'all' | 'XR' | 'AI' | 'Games' | 'Visualization' | 'Culture' | 'Technologies') => void;
  setSearchTerm: (term: string) => void;
  setModalOpen: (isOpen: boolean) => void;
  setIsMapCentered: (value: boolean) => void;
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
  isMapCentered: false,

  // Actions
  setOrganizations: (organizations) => {
    set({ organizations });
    get().filterOrganizations();
  },

  setSelectedOrgId: (id) => {
    set({ selectedOrgId: id, isModalOpen: id !== null });
  },

  setCurrentFilter: (filter) => {
    
    const { currentFilter } = get();
    if (currentFilter === filter) {
      set({ currentFilter: 'all' });
    } else {
      set({ currentFilter: filter });
    }
    
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

  filterOrganizations: () => {
    const { organizations, currentFilter, searchTerm } = get();
    
    const filtered = organizations.filter(org => {
      const filterMatch = currentFilter === 'all' || org.activity === currentFilter;
      
      const searchMatch = 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.type.toLowerCase().includes(searchTerm.toLowerCase());
        org.activity.toLowerCase().includes(searchTerm.toLowerCase());
      return filterMatch && searchMatch;
    });

    set({ filteredOrganizations: filtered });
  },

  getSelectedOrganization: () => {
    const { organizations, selectedOrgId } = get();
    return organizations.find(org => org.id === selectedOrgId);
  }
}));