import { describe, it, expect } from 'vitest';
import { generateElements } from './generateElements';

describe('generateElements', () => {
  it('returns the correct number of elements', () => {
    const elements = generateElements();
    expect(elements.length).toBe(10001);
  });

  it('first element is Element 1 with id 1', () => {
    const elements = generateElements();
    expect(elements[0]).toEqual({ id: 1, label: 'Element 1' });
  });

  it('last element is Element 10001 with id 10001', () => {
    const elements = generateElements();
    expect(elements[10000]).toEqual({ id: 10001, label: 'Element 10001' });
  });
});
