/**
 * Extracts the numeric suffix from an element label string.
 * Uses the regex pattern from constants to find trailing numbers.
 * Returns 0 if no number is found.
 */
import { CONSTANTS } from '../config/constants';

export function extractNumber(element: string): number {
  const match = element.match(CONSTANTS.NUMBER_EXTRACTION_REGEX);
  return match ? parseInt(match[1], 10) : 0;
}
