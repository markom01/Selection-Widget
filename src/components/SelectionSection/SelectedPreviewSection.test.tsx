import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectedPreviewSection } from './SelectedPreviewSection';
import type { ElementItem } from '../../types';

const mockItems: ElementItem[] = [
  { id: 1, label: 'Element 1' },
  { id: 2, label: 'Element 2' },
];

describe('SelectedPreviewSection', () => {
  it('renders label', () => {
    render(
      <SelectedPreviewSection
        tempSelectedItems={[]}
        onRemoveTempItem={() => {}}
        onSave={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByText('Current selected items:')).toBeInTheDocument();
  });

  it('shows chips for temp selected items', () => {
    render(
      <SelectedPreviewSection
        tempSelectedItems={mockItems}
        onRemoveTempItem={() => {}}
        onSave={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByText('Element 1')).toBeInTheDocument();
    expect(screen.getByText('Element 2')).toBeInTheDocument();
  });

  it('chip X calls onRemoveTempItem', async () => {
    const onRemoveTempItem = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectedPreviewSection
        tempSelectedItems={mockItems}
        onRemoveTempItem={onRemoveTempItem}
        onSave={() => {}}
        onCancel={() => {}}
      />
    );
    const chip = screen.getByText('Element 1').closest('.MuiChip-root')!;
    const deleteIcon = chip.querySelector('.MuiChip-deleteIcon')!;
    await user.click(deleteIcon);
    expect(onRemoveTempItem).toHaveBeenCalledWith(1);
  });

  it('Save button calls onSave', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectedPreviewSection
        tempSelectedItems={mockItems}
        onRemoveTempItem={() => {}}
        onSave={onSave}
        onCancel={() => {}}
      />
    );
    await user.click(screen.getByText('Save'));
    expect(onSave).toHaveBeenCalled();
  });

  it('Cancel button calls onCancel', async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectedPreviewSection
        tempSelectedItems={mockItems}
        onRemoveTempItem={() => {}}
        onSave={() => {}}
        onCancel={onCancel}
      />
    );
    await user.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('Close (X) button calls onCancel', async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectedPreviewSection
        tempSelectedItems={mockItems}
        onRemoveTempItem={() => {}}
        onSave={() => {}}
        onCancel={onCancel}
      />
    );
    await user.click(screen.getByLabelText('close'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('Save button is disabled when no items selected', () => {
    render(
      <SelectedPreviewSection
        tempSelectedItems={[]}
        onRemoveTempItem={() => {}}
        onSave={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByText('Save')).toBeDisabled();
  });
});
