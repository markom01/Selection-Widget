export type FilterValue = 'all' | 100 | 2500 | 10000;

export interface FilterOption {
  value: FilterValue;
  label: string;
}

export interface ElementItem {
  id: number;
  label: string;
}

export interface SelectionState {
  allElements: ElementItem[];
  selectedItemIds: number[];
  isSectionOpen: boolean;
  tempSelectedIds: number[];
  searchQuery: string;
  filterValue: FilterValue;
}

export interface SelectionActions {
  openSection: () => void;
  closeSection: () => void;
  cancelSelection: () => void;
  saveSelection: () => void;
  toggleTempSelection: (id: number) => void;
  removeTempSelection: (id: number) => void;
  removeSelection: (id: number) => void;
  setSearchQuery: (query: string) => void;
  setFilterValue: (value: FilterValue) => void;
  setAllElements: (elements: ElementItem[]) => void;
}

export type SelectionStore = SelectionState & SelectionActions;
