import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilteredElements } from './useFilteredElements';
import type { ElementItem } from '../types';
import { CONSTANTS } from '../config/constants';

function generateTestElements(count: number): ElementItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    label: `Element ${i + 1}`,
  }));
}

describe('useFilteredElements', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns all elements when search is empty', () => {
    const elements = generateTestElements(50);
    const { result } = renderHook(() =>
      useFilteredElements(elements, '', 'all')
    );

    expect(result.current).toHaveLength(50);
    expect(result.current).toEqual(elements);
  });

  it('filters by case-insensitive substring search', () => {
    const elements = generateTestElements(100);
    const { result } = renderHook(() =>
      useFilteredElements(elements, 'element 77', 'all')
    );

    act(() => {
      vi.advanceTimersByTime(CONSTANTS.DEBOUNCE_MS);
    });

    expect(result.current).toHaveLength(1);
    expect(result.current[0].label).toBe('Element 77');
  });

  it('returns empty when search and numeric filter exclude all items', () => {
    const elements = generateTestElements(100);
    const { result } = renderHook(() =>
      useFilteredElements(elements, 'Element 50', 100)
    );

    act(() => {
      vi.advanceTimersByTime(CONSTANTS.DEBOUNCE_MS);
    });

    expect(result.current).toHaveLength(0);
  });

  it('combines search and filter with AND logic', () => {
    const elements = generateTestElements(10000);
    const { result } = renderHook(() =>
      useFilteredElements(elements, 'Element 5000', 2500)
    );

    act(() => {
      vi.advanceTimersByTime(CONSTANTS.DEBOUNCE_MS);
    });

    expect(result.current).toHaveLength(1);
    expect(result.current[0].label).toBe('Element 5000');
  });

  it('delays filter update until after debounce time', () => {
    const elements = generateTestElements(100);
    const { result, rerender } = renderHook(
      ({ searchQuery }) => useFilteredElements(elements, searchQuery, 'all'),
      { initialProps: { searchQuery: '' } }
    );

    expect(result.current).toHaveLength(100);

    rerender({ searchQuery: 'Element 50' });

    expect(result.current).toHaveLength(100);

    act(() => {
      vi.advanceTimersByTime(CONSTANTS.DEBOUNCE_MS);
    });

    expect(result.current).toHaveLength(1);
    expect(result.current[0].label).toBe('Element 50');
  });

  it('returns empty when no elements match the search query', () => {
    const elements = generateTestElements(50);
    const { result } = renderHook(() =>
      useFilteredElements(elements, 'ZZZZ', 'all')
    );

    act(() => {
      vi.advanceTimersByTime(CONSTANTS.DEBOUNCE_MS);
    });

    expect(result.current).toHaveLength(0);
  });
});
