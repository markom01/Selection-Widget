import { describe, it, expect } from 'vitest';
import { matchSearch } from './matchSearch';

describe('matchSearch', () => {
  it('finds "42" in "Element 42"', () => {
    expect(matchSearch('Element 42', '42')).toBe(true);
  });

  it('is case-insensitive matching "element" in "Element 42"', () => {
    expect(matchSearch('Element 42', 'element')).toBe(true);
  });

  it('returns false when query is not found', () => {
    expect(matchSearch('Element 42', 'foo')).toBe(false);
  });

  it('returns true for empty query', () => {
    expect(matchSearch('Element 42', '')).toBe(true);
  });
});
