import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useSelectionStore } from './store/selectionStore';
import { App } from './App';

const mockElements = Array.from({ length: 5 }, (_, i) => ({ id: i + 1, label: `Element ${i + 1}` }));

let mockGenerateReturn: { id: number; label: string }[] = mockElements;

vi.mock('./data/generateElements', () => ({
  generateElements: vi.fn(() => mockGenerateReturn),
}));

describe('App', () => {
  beforeEach(() => {
    useSelectionStore.setState({
      allElements: [],
      selectedItemIds: [],
      isSectionOpen: false,
      tempSelectedIds: [],
      searchQuery: '',
      filterValue: 'all',
    });
  });

  it('renders LinearProgress when elements are loading', () => {
    mockGenerateReturn = [];
    render(<App />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('hides LinearProgress and renders SelectionWidget after elements load', () => {
    mockGenerateReturn = mockElements;
    useSelectionStore.setState({
      allElements: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, label: `Element ${i + 1}` })),
    });

    render(<App />);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByText('Selected Items')).toBeInTheDocument();
  });
});
