import { create } from 'zustand';
import type { FilterValue, SelectionStore } from '../types';
import { CONSTANTS } from '../config/constants';

export const useSelectionStore = create<SelectionStore>((set) => ({
  allElements: [],
  selectedItemIds: [],
  isSectionOpen: false,
  tempSelectedIds: [],
  searchQuery: '',
  filterValue: 'all' as FilterValue,

  openSection: () =>
    set((state) => ({
      isSectionOpen: true,
      tempSelectedIds: [...state.selectedItemIds],
    })),

  closeSection: () => set({ isSectionOpen: false }),

  cancelSelection: () =>
    set({
      tempSelectedIds: [],
      isSectionOpen: false,
    }),

  saveSelection: () =>
    set((state) => ({
      selectedItemIds: [...state.tempSelectedIds],
      isSectionOpen: false,
    })),

  toggleTempSelection: (id: number) =>
    set((state) => {
      if (state.tempSelectedIds.includes(id)) {
        return { tempSelectedIds: state.tempSelectedIds.filter((sid) => sid !== id) };
      }
      if (state.tempSelectedIds.length >= CONSTANTS.MAX_SELECTION) {
        return state; // Max reached, do nothing
      }
      return { tempSelectedIds: [...state.tempSelectedIds, id] };
    }),

  removeTempSelection: (id: number) =>
    set((state) => ({
      tempSelectedIds: state.tempSelectedIds.filter((sid) => sid !== id),
    })),

  removeSelection: (id: number) =>
    set((state) => ({
      selectedItemIds: state.selectedItemIds.filter((sid) => sid !== id),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterValue: (value) => set({ filterValue: value }),
  setAllElements: (elements) => set({ allElements: elements }),
}));
