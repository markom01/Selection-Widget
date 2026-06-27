import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ElementRow } from './ElementRow';

const mockItem = { id: 42, label: 'Element 42' };

describe('ElementRow', () => {
  it('renders item label', () => {
    render(
      <ElementRow item={mockItem} isSelected={false} isDisabled={false} onToggle={() => {}} />
    );
    expect(screen.getByText('Element 42')).toBeInTheDocument();
  });

  it('checkbox is checked when selected', () => {
    render(
      <ElementRow item={mockItem} isSelected={true} isDisabled={false} onToggle={() => {}} />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('checkbox is unchecked when not selected', () => {
    render(
      <ElementRow item={mockItem} isSelected={false} isDisabled={false} onToggle={() => {}} />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('checkbox is disabled when disabled and not selected', () => {
    render(
      <ElementRow item={mockItem} isSelected={false} isDisabled={true} onToggle={() => {}} />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('click calls onToggle with correct id', async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(
      <ElementRow item={mockItem} isSelected={false} isDisabled={false} onToggle={onToggle} />
    );
    await user.click(screen.getByText('Element 42'));
    expect(onToggle).toHaveBeenCalledWith(42);
  });
});
