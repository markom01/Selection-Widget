# SelectionSection

## OVERVIEW

Expandable selection UI — the "edit" view of the widget. Renders a virtualized list of up to 10001 elements with search, numeric filter, and draft-buffer save/cancel. All inside an MUI `Collapse` (not a modal).

## FILES

```
SelectionSection/
├── ElementsList.tsx           # react-window v2 virtualized <List>, 400px fixed height
├── ElementRow.tsx             # Memoized row: Checkbox + label, highlight, disabled logic
├── SearchAndFilterBar.tsx     # Text search + filter dropdown (>100, >2500, >10000)
├── SelectedPreviewSection.tsx # Temp selected chips + Save (primary) / Cancel (outlined)
├── SelectionSection.tsx       # Orchestrator: filter → list → preview, Collapse wrapper
├── index.ts                   # Barrel exports all 5 components
├── *.test.tsx                 # Co-located Vitest tests (5 files, ~400+ lines)
```

## KEY PATTERNS

- **react-window v2**: `Row` is `React.memo` wrapped, receives `style` from parent `<List>`. `rowComponent={Row}`, `rowProps={itemData}`, `rowCount`, `rowHeight={48}`, `overscanCount={5}`.
- **Parent height constraint**: `<Box sx={{ height: 400, overflow: 'hidden' }}>` wraps `<List>`. Without this, react-window v2 renders all items.
- **Memo chain**: `ElementRow` (memoized) ← `Row` (memoized) ← `ElementsList` (derived data via `useMemo`).
- **Disabled logic**: `isDisabled = selectedSet.size >= 3 && !isSelected`. Selected items always stay enabled so you can deselect.
- **Empty state**: `ElementsList` shows "No elements match your search" centered when `filteredElements.length === 0`.

## WHERE TO LOOK

| Need | File | Details |
|------|------|---------|
| Virtualization performance | `ElementsList.tsx` | `Row` memo + `useMemo` for `itemData` |
| Disable/unselected behavior | `ElementRow.tsx` | Opacity 0.5 on `.Mui-disabled`, `tabIndex={-1}` on checkbox |
| Save/Cancel enabled state | `SelectedPreviewSection.tsx` | Save disabled when `tempSelectedItems.length === 0` |
| Section collapse/expand | `SelectionSection.tsx` | `<Collapse in={isSectionOpen}>` |
| Filter option values | `config/constants.ts` | `FILTER_OPTIONS`: `'all'`, `100`, `2500`, `10000` |

## INTERFACES

- `ElementRowProps` — `item`, `isSelected`, `isDisabled`, `onToggle`
- `ElementsListProps` — `filteredElements`, `tempSelectedIds`, `onToggleItem`
- `SearchAndFilterBarProps` — `searchQuery`, `filterValue`, `onSearchChange`, `onFilterChange`
- `SelectedPreviewSectionProps` — `tempSelectedItems`, `onRemoveTempItem`, `onSave`, `onCancel`
- `RowData` — internal: `items`, `selectedSet`, `onToggleItem`, `maxSelection`
- `SelectionSection` — reads store directly (no props), selectors split into individual `useSelectionStore()` calls

## CONVENTIONS

- All props interfaces co-located in the same `.tsx` file (not extracted to types/)
- `React.memo` + `displayName` on `ElementRow` and internal `Row`
- All visible text from `CONSTANTS.LABELS`
- `sx` prop only, no styled-components
