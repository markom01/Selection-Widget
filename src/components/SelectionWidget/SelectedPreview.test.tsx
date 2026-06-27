import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectedPreview } from './SelectedPreview';
import type { ElementItem } from '../../types';

const mockItems: ElementItem[] = [
  { id: 1, label: 'Element 1' },
  { id: 2, label: 'Element 2' },
];

describe('SelectedPreview', () => {
  it('renders heading', () => {
    render(
      <SelectedPreview selectedItems={[]} onRemoveItem={() => {}} onOpenSection={() => {}} />
    );
    expect(screen.getByText('Select items')).toBeInTheDocument();
  });

  it('shows correct count', () => {
    render(
      <SelectedPreview selectedItems={mockItems} onRemoveItem={() => {}} onOpenSection={() => {}} />
    );
    expect(screen.getByText(/2 selected items/)).toBeInTheDocument();
  });

  it('renders chips for each selected item', () => {
    render(
      <SelectedPreview selectedItems={mockItems} onRemoveItem={() => {}} onOpenSection={() => {}} />
    );
    expect(screen.getByText('Element 1')).toBeInTheDocument();
    expect(screen.getByText('Element 2')).toBeInTheDocument();
  });

  it('clicking chip X calls onRemoveItem', async () => {
    const onRemoveItem = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectedPreview selectedItems={mockItems} onRemoveItem={onRemoveItem} onOpenSection={() => {}} />
    );
    const chip = screen.getByText('Element 1').closest('.MuiChip-root')!;
    const deleteIcon = chip.querySelector('.MuiChip-deleteIcon')!;
    await user.click(deleteIcon);
    expect(onRemoveItem).toHaveBeenCalledWith(1);
  });

  it('clicking Change button calls onOpenSection', async () => {
    const onOpenSection = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectedPreview selectedItems={[]} onRemoveItem={() => {}} onOpenSection={onOpenSection} />
    );
    await user.click(screen.getByText('Change my choice'));
    expect(onOpenSection).toHaveBeenCalled();
  });
});
