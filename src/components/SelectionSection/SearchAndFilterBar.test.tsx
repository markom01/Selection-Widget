import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchAndFilterBar } from './SearchAndFilterBar';

describe('SearchAndFilterBar', () => {
  it('renders search field and filter dropdown', () => {
    render(
      <SearchAndFilterBar
        searchQuery=""
        filterValue="all"
        onSearchChange={() => {}}
        onFilterChange={() => {}}
      />
    );
    expect(screen.getByText('No filter')).toBeInTheDocument();
  });

  it('typing in search calls onSearchChange', async () => {
    const onSearchChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SearchAndFilterBar
        searchQuery=""
        filterValue="all"
        onSearchChange={onSearchChange}
        onFilterChange={() => {}}
      />
    );
    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'test');
    expect(onSearchChange).toHaveBeenCalled();
  });

  it('selecting filter value calls onFilterChange', async () => {
    const onFilterChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SearchAndFilterBar
        searchQuery=""
        filterValue="all"
        onSearchChange={() => {}}
        onFilterChange={onFilterChange}
      />
    );
    const filterSelect = screen.getByRole('combobox');
    await user.click(filterSelect);
    const option100 = screen.getByText('> 100');
    await user.click(option100);
    expect(onFilterChange).toHaveBeenCalledWith(100);
  });

  it('renders with correct value from props', () => {
    render(
      <SearchAndFilterBar
        searchQuery="Element 42"
        filterValue={100}
        onSearchChange={() => {}}
        onFilterChange={() => {}}
      />
    );
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveValue('Element 42');
  });
});
