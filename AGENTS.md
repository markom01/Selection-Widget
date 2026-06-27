# PROJECT KNOWLEDGE BASE

**Generated:** 2026-06-27
**Commit:** `2b11b80`
**Branch:** `main`

## OVERVIEW

Selection widget — React + TypeScript + Vite + MUI. Allows users to select up to 3 items from a virtualized list of 10001 elements with search, numeric filter, and draft-buffer save/cancel semantics. Zustand state management, react-window v2 virtualization, Vitest + Playwright testing.

## STRUCTURE

```
./
├── src/components/SelectionSection/   # Expandable selection UI (virtualized list, search, filter, save/cancel)
├── src/components/SelectionWidget/    # Main widget (preview + section orchestration)
├── src/store/                         # Zustand store (draft buffer, max-3, search/filter state)
├── src/hooks/                         # useDebounce, useFilteredElements
├── src/utils/                         # extractNumber, matchSearch
├── src/data/                          # generateElements (10001 items)
├── src/config/constants.ts            # All labels and config values
├── src/types/index.ts                 # Shared TypeScript types
├── e2e/                               # Playwright E2E tests
└── src/App.tsx                        # Root component
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Selection logic (max-3, save/cancel) | `src/store/selectionStore.ts` | Zustand, draft buffer pattern |
| Virtualized list | `src/components/SelectionSection/ElementsList.tsx` | react-window v2, 400px fixed height |
| Search + filter logic | `src/hooks/useFilteredElements.ts` | Debounced substring + numeric AND filter |
| UI text strings | `src/config/constants.ts` | CONSTANTS.LABELS — no hardcoded strings |
| Component props | Respective `.tsx` files | Named exports, co-located interfaces |
| Tests (unit) | Co-located `*.test.tsx` | Vitest + @testing-library/react |
| Tests (E2E) | `e2e/widget.spec.ts` | Playwright |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `SelectionStore` | Type | `src/types/` | Full store shape (state + actions) |
| `useSelectionStore` | Hook | `src/store/selectionStore.ts` | Zustand store: draft buffer, max-3 |
| `useFilteredElements` | Hook | `src/hooks/useFilteredElements.ts` | Debounced search + filter |
| `useDebounce` | Hook | `src/hooks/useDebounce.ts` | Generic debounce (300ms default) |
| `ElementsList` | Component | `src/components/SelectionSection/` | Virtualized list (react-window v2) |
| `ElementRow` | Component | `src/components/SelectionSection/` | Memoized row with checkbox |
| `SearchAndFilterBar` | Component | `src/components/SelectionSection/` | Text search + numeric filter dropdown |
| `SelectedPreviewSection` | Component | `src/components/SelectionSection/` | Temp chips + Save/Cancel |
| `SelectionSection` | Component | `src/components/SelectionSection/` | Collapse wrapper for edit section |
| `SelectedPreview` | Component | `src/components/SelectionWidget/` | Committed chips + count + Change button |
| `SelectionWidget` | Component | `src/components/SelectionWidget/` | Root widget (preview + section) |
| `App` | Component | `src/App.tsx` | Initializes data, renders widget |
| `generateElements` | Function | `src/data/generateElements.ts` | Creates 10001 ElementItems |

## CONVENTIONS

- **Named exports only** — no `export default` anywhere
- **MUI `sx` prop only** — no styled-components, no CSS files
- **All strings from `CONSTANTS.LABELS`** — zero hardcoded UI text
- **Co-located tests** — `*.test.tsx` next to implementation
- **Barrel exports** — component directories have `index.ts` re-exporting all. Currently only `SelectionSection/` and `SelectionWidget/` have barrels; `hooks/`, `store/`, `data/` import directly.
- **`React.memo`** on virtualized row components (`ElementRow`)
- **`useMemo`** for derived data from store (filtered arrays)
- **TypeScript strict**: `verbatimModuleSyntax` + `erasableSyntaxOnly` enabled — use `import type` for type-only imports, no `emitDecoratorMetadata`

## ANTI-PATTERNS (THIS PROJECT)

- No `as any`, `@ts-ignore`, `@ts-expect-error` type suppressions
- No empty `catch` blocks
- No styled-components or custom CSS files
- No unused `React` imports — with `"jsx": "react-jsx"` (Vite default), JSX transpiles without `React.createElement`
- No `eslint` usage — project uses oxlint (`.oxlintrc.json`). If `npm run lint` fails, run `npx oxlint` instead.
- `@emotion/styled` is a **dead dependency** in `package.json` — never use it. All styling is via MUI `sx` prop only.

## COMMANDS

```bash
npm run dev           # Start Vite dev server
npm run build         # Production build
npx vitest run        # Run unit tests (62 tests)
npx vitest            # Watch mode
npx playwright test   # E2E tests (4 tests)
npx tsc --noEmit      # TypeScript check
```

## NOTES

- **react-window v2 API**: Uses `rowComponent`/`rowProps` pattern (not v1 render prop). Parent MUST provide fixed height + `overflow: hidden` or the list renders all items.
- **MUI Collapse** is used instead of Modal/Dialog for the expandable section.
- **Draft buffer pattern**: `openSection()` copies `selectedItemIds` → `tempSelectedIds`. `cancelSelection()` discards buffer. `saveSelection()` commits.
- **Max-3 enforcement**: `toggleTempSelection` silently rejects when `tempSelectedIds.length >= 3`. Unselected rows are disabled but selected rows stay enabled.
- **Test gaps**: `useDebounce.ts` (untested in isolation), `App.tsx` (no component test) — covered only through integration/E2E.
- **E2E brittle pattern**: `e2e/widget.spec.ts` uses `waitForTimeout(400)` instead of explicit `waitFor` on expected elements — tolerable for stability but not best practice.
