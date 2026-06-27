import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelectionStore } from '../../store/selectionStore';
import { SelectionWidget } from './SelectionWidget';
import type { ElementItem } from '../../types';

const mockAllElements: ElementItem[] = [
  { id: 1, label: 'Element 1' },
  { id: 2, label: 'Element 2' },
  { id: 3, label: 'Element 3' },
];

describe('SelectionWidget', () => {
  beforeEach(() => {
    useSelectionStore.setState({
      allElements: mockAllElements,
      selectedItemIds: [],
      isSectionOpen: false,
      tempSelectedIds: [],
      searchQuery: '',
      filterValue: 'all',
    });
  });

  it('renders SelectedPreview with heading', () => {
    render(<SelectionWidget />);
    expect(
      screen.getByRole('heading', { level: 5, name: /Selected Items/ })
    ).toBeInTheDocument();
  });

  it('shows 0 count when no items selected', () => {
    render(<SelectionWidget />);
    expect(
      screen.getByText(/You currently have 0 selected items/)
    ).toBeInTheDocument();
  });

  it('shows chips for selected items on main page', () => {
    useSelectionStore.setState({ selectedItemIds: [1, 2] });
    render(<SelectionWidget />);
    // Each selected element appears as a chip (in SelectedPreview) and a list item (in ElementsList)
    expect(screen.getAllByText('Element 1').length).toBe(2);
    expect(screen.getAllByText('Element 2').length).toBe(2);
  });

  it('clicking "Change my choice" opens section', async () => {
    const user = userEvent.setup();
    render(<SelectionWidget />);
    await user.click(screen.getByText('Change my choice'));
    expect(useSelectionStore.getState().isSectionOpen).toBe(true);
  });

  it('removing a chip calls removeSelection', async () => {
    useSelectionStore.setState({ selectedItemIds: [1] });
    const user = userEvent.setup();
    render(<SelectionWidget />);

    // Find the chip delete icon for Element 1 among the multiple matches
    const chipLabels = screen.getAllByText('Element 1');
    const chip = chipLabels.find((el) => el.closest('.MuiChip-root'))!;
    const deleteIcon = chip.closest('.MuiChip-root')!.querySelector('.MuiChip-deleteIcon')!;
    await user.click(deleteIcon);

    expect(useSelectionStore.getState().selectedItemIds).toEqual([]);
  });

  it('removing a chip updates the displayed chips', async () => {
    useSelectionStore.setState({ selectedItemIds: [1, 2] });
    const user = userEvent.setup();
    render(<SelectionWidget />);

    // Find the chip delete icon for Element 1
    const chipLabels = screen.getAllByText('Element 1');
    const chip = chipLabels.find((el) => el.closest('.MuiChip-root'))!;
    const deleteIcon = chip.closest('.MuiChip-root')!.querySelector('.MuiChip-deleteIcon')!;
    await user.click(deleteIcon);

    // After removal, Element 1 no longer has a chip but still appears in ElementsList
    expect(screen.queryAllByText('Element 1').length).toBe(1);
    // Element 2 remains as both chip and list item
    expect(screen.getAllByText('Element 2').length).toBe(2);
  });
});
