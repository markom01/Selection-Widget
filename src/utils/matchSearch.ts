/**
 * Case-insensitive substring matching for element search.
 * Returns true if query is empty (no filter applied).
 * Returns true if query is found as a substring of element (case-insensitive).
 */
export function matchSearch(element: string, query: string): boolean {
  if (query === '') return true;
  return element.toLowerCase().includes(query.toLowerCase());
}
