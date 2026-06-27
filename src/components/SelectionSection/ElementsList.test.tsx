import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ElementsList } from './ElementsList';
import { CONSTANTS } from '../../config/constants';
import type { ElementItem } from '../../types';

const mockElements: ElementItem[] = [
  { id: 1, label: 'Element 1' },
  { id: 2, label: 'Element 2' },
  { id: 3, label: 'Element 3' },
  { id: 4, label: 'Element 4' },
];

describe('ElementsList', () => {
  it('renders all filtered elements as ElementRow components', () => {
    render(
      <ElementsList
        filteredElements={mockElements}
        tempSelectedIds={[]}
        onToggleItem={() => {}}
      />
    );

    expect(screen.getByText('Element 1')).toBeInTheDocument();
    expect(screen.getByText('Element 2')).toBeInTheDocument();
    expect(screen.getByText('Element 3')).toBeInTheDocument();
    expect(screen.getByText('Element 4')).toBeInTheDocument();
  });

  it('shows empty state message when no elements match', () => {
    render(
      <ElementsList
        filteredElements={[]}
        tempSelectedIds={[]}
        onToggleItem={() => {}}
      />
    );

    expect(screen.getByText(CONSTANTS.LABELS.NO_RESULTS_MESSAGE)).toBeInTheDocument();
  });

  it('disables unselected rows when max selection is reached', () => {
    const selectedIds = [1, 2, 3];
    render(
      <ElementsList
        filteredElements={mockElements}
        tempSelectedIds={selectedIds}
        onToggleItem={() => {}}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    // Items 1, 2, 3 are selected — not disabled
    expect(checkboxes[0]).not.toBeDisabled();
    expect(checkboxes[1]).not.toBeDisabled();
    expect(checkboxes[2]).not.toBeDisabled();
    // Item 4 is unselected — disabled because max reached
    expect(checkboxes[3]).toBeDisabled();
  });

  it('does not disable selected items even when max is reached', () => {
    const selectedIds = [1, 3, 4];
    render(
      <ElementsList
        filteredElements={mockElements}
        tempSelectedIds={selectedIds}
        onToggleItem={() => {}}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    // id=2 is unselected — disabled because max reached
    expect(checkboxes[0]).not.toBeDisabled(); // id=1 selected
    expect(checkboxes[1]).toBeDisabled(); // id=2 unselected
    // id=3 and id=4 are selected — not disabled even though max is reached
    expect(checkboxes[2]).not.toBeDisabled(); // id=3 selected
    expect(checkboxes[3]).not.toBeDisabled(); // id=4 selected
  });

  it('calls onToggleItem with correct id on click', async () => {
    const onToggleItem = vi.fn();
    const user = userEvent.setup();
    render(
      <ElementsList
        filteredElements={mockElements}
        tempSelectedIds={[]}
        onToggleItem={onToggleItem}
      />
    );

    await user.click(screen.getByText('Element 3'));
    expect(onToggleItem).toHaveBeenCalledWith(3);
  });
});
