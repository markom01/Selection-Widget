import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelectionStore } from '../../store/selectionStore';
import { CONSTANTS } from '../../config/constants';
import { SelectionSection } from './SelectionSection';
import type { ElementItem } from '../../types';

const mockElements: ElementItem[] = [
  { id: 1, label: 'Element 1' },
  { id: 2, label: 'Element 2' },
  { id: 3, label: 'Element 3' },
];

describe('SelectionSection', () => {
  beforeEach(() => {
    useSelectionStore.setState({
      allElements: mockElements,
      selectedItemIds: [],
      tempSelectedIds: [],
      isSectionOpen: false,
      searchQuery: '',
      filterValue: 'all',
    });
  });

  it('renders collapsed by default', () => {
    const { container } = render(<SelectionSection />);
    expect(useSelectionStore.getState().isSectionOpen).toBe(false);
    expect(container.querySelector('.MuiCollapse-root')).toBeInTheDocument();
  });

  it('renders content when section is open', () => {
    useSelectionStore.setState({ isSectionOpen: true });
    render(<SelectionSection />);
    expect(screen.getByText(CONSTANTS.LABELS.SECTION_HEADER)).toBeInTheDocument();
  });

  it('search input updates store searchQuery', async () => {
    useSelectionStore.setState({ isSectionOpen: true });
    const user = userEvent.setup();
    render(<SelectionSection />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'Element');

    expect(useSelectionStore.getState().searchQuery).toBe('Element');
  });

  it('filter select updates store filterValue', async () => {
    useSelectionStore.setState({ isSectionOpen: true });
    const user = userEvent.setup();
    render(<SelectionSection />);

    const filterSelect = screen.getByRole('combobox');
    await user.click(filterSelect);
    await user.click(screen.getByText('> 100'));

    expect(useSelectionStore.getState().filterValue).toBe(100);
  });

  it('toggle item calls toggleTempSelection', async () => {
    useSelectionStore.setState({ isSectionOpen: true });
    const user = userEvent.setup();
    render(<SelectionSection />);

    await user.click(screen.getByText('Element 1'));

    expect(useSelectionStore.getState().tempSelectedIds).toEqual([1]);
  });

  it('save commits temp to selected and closes section', async () => {
    useSelectionStore.setState({
      isSectionOpen: true,
      tempSelectedIds: [1, 2],
    });
    const user = userEvent.setup();
    render(<SelectionSection />);

    await user.click(screen.getByText(CONSTANTS.LABELS.SAVE_BUTTON));

    expect(useSelectionStore.getState().selectedItemIds).toEqual([1, 2]);
    expect(useSelectionStore.getState().isSectionOpen).toBe(false);
  });

  it('cancel restores original selections and closes section', async () => {
    useSelectionStore.setState({
      isSectionOpen: true,
      selectedItemIds: [1],
      tempSelectedIds: [1, 2],
    });
    const user = userEvent.setup();
    render(<SelectionSection />);

    await user.click(screen.getByText(CONSTANTS.LABELS.CANCEL_BUTTON));

    expect(useSelectionStore.getState().selectedItemIds).toEqual([1]);
    expect(useSelectionStore.getState().tempSelectedIds).toEqual([]);
    expect(useSelectionStore.getState().isSectionOpen).toBe(false);
  });
});
