import { describe, it, expect, beforeEach } from 'vitest';
import { useSelectionStore } from './selectionStore';

const initialStoreState = {
  allElements: [],
  selectedItemIds: [],
  isSectionOpen: true,
  tempSelectedIds: [],
  searchQuery: '',
  filterValue: 'all' as const,
};

describe('selectionStore', () => {
  beforeEach(() => {
    useSelectionStore.setState(initialStoreState);
  });

  it('opens section and copies selected items to temp', () => {
    useSelectionStore.setState({ selectedItemIds: [1, 2, 3] });

    useSelectionStore.getState().openSection();

    const state = useSelectionStore.getState();
    expect(state.tempSelectedIds).toEqual([1, 2, 3]);
    expect(state.isSectionOpen).toBe(true);
  });

  it('saves temp to selected on save', () => {
    useSelectionStore.setState({ selectedItemIds: [1, 2] });

    useSelectionStore.getState().openSection();
    useSelectionStore.getState().toggleTempSelection(3);
    useSelectionStore.getState().saveSelection();

    const state = useSelectionStore.getState();
    expect(state.selectedItemIds).toEqual([1, 2, 3]);
    expect(state.isSectionOpen).toBe(false);
  });

  it('cancel discards temp and restores original', () => {
    useSelectionStore.setState({ selectedItemIds: [1, 2] });

    useSelectionStore.getState().openSection();
    useSelectionStore.getState().toggleTempSelection(3);
    useSelectionStore.getState().toggleTempSelection(4);
    useSelectionStore.getState().cancelSelection();

    const state = useSelectionStore.getState();
    expect(state.selectedItemIds).toEqual([1, 2]);
    expect(state.tempSelectedIds).toEqual([]);
  });

  it('blocks adding a 4th item when max is 3', () => {
    useSelectionStore.setState({ selectedItemIds: [1, 2, 3] });

    useSelectionStore.getState().openSection();
    useSelectionStore.getState().toggleTempSelection(4);

    const state = useSelectionStore.getState();
    expect(state.tempSelectedIds).toEqual([1, 2, 3]);
  });

  it('removing item at max-3 re-enables checkbox', () => {
    useSelectionStore.setState({ selectedItemIds: [1, 2, 3] });

    useSelectionStore.getState().openSection();
    useSelectionStore.getState().toggleTempSelection(3);
    expect(useSelectionStore.getState().tempSelectedIds).toEqual([1, 2]);

    useSelectionStore.getState().toggleTempSelection(4);
    expect(useSelectionStore.getState().tempSelectedIds).toEqual([1, 2, 4]);
  });

  it('main page removeSelection is immediate with no buffer', () => {
    useSelectionStore.setState({ selectedItemIds: [1, 2, 3] });

    useSelectionStore.getState().removeSelection(2);

    const state = useSelectionStore.getState();
    expect(state.selectedItemIds).toEqual([1, 3]);
  });
});
