import { describe, it, expect } from 'vitest';
import { extractNumber } from './extractNumber';

describe('extractNumber', () => {
  it('extracts numeric suffix from "Element 42"', () => {
    expect(extractNumber('Element 42')).toBe(42);
  });

  it('extracts numeric suffix from "Item 10001"', () => {
    expect(extractNumber('Item 10001')).toBe(10001);
  });

  it('returns 0 when no number is present', () => {
    expect(extractNumber('Element')).toBe(0);
  });

  it('returns 0 for empty string', () => {
    expect(extractNumber('')).toBe(0);
  });
});
