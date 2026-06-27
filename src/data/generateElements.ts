import type { ElementItem } from '../types';
import { CONSTANTS } from '../config/constants';

export function generateElements(): ElementItem[] {
  return Array.from({ length: CONSTANTS.NUMBER_OF_ELEMENTS }, (_, i) => ({
    id: i + 1,
    label: `${CONSTANTS.ELEMENT_NAME_PREFIX} ${i + 1}`,
  }));
}
