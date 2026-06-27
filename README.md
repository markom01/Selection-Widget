# Selection Widget

A performant, accessible React widget for selecting up to 3 items from a virtualized list of 10,001 elements — with search, numeric filter, and draft-buffer save/cancel semantics.

## Features

- **Virtualized list** of 10,001 items — only ~14 rows in the DOM at any time (react-window v2)
- **Max-3 selection** with enforced limit, disabled unselected rows when reached
- **Search** by substring (debounced at 300ms)
- **Numeric filter** — complementary AND filter with search (e.g., elements > 2500 **and** name matches query)
- **Draft buffer** — changes are temporary until "Save" is confirmed; "Cancel" discards them
- **Empty state** when no elements match the current search/filter
- **Responsive** — MUI Collapse expands/collapses the edit section inline

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 7 |
| UI | MUI 9 (all styling via `sx` prop) |
| State | Zustand 5 |
| Virtualization | react-window v2 |
| Testing | Vitest + @testing-library/react |
| E2E | Playwright |
| Linting | oxlint |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npx vitest run` | Run 62 unit tests |
| `npx vitest` | Watch mode |
| `npx playwright test` | Run 4 E2E tests |
| `npx tsc --noEmit` | TypeScript type check |
| `npx oxlint` | Lint (note: `npm run lint` calls ESLint — use `npx oxlint` instead) |

## Project Structure

```
src/
├── components/
│   ├── SelectionSection/      # Expandable edit UI (list, search, filter, save/cancel)
│   └── SelectionWidget/       # Root widget (preview + collapse orchestration)
├── store/                     # Zustand store (draft buffer, selection state)
├── hooks/                     # useDebounce, useFilteredElements
├── utils/                     # extractNumber, matchSearch
├── data/                      # generateElements — creates 10,001 items
├── config/constants.ts        # All UI text labels (no hardcoded strings)
├── types/                     # Shared TypeScript types
├── App.tsx                    # Root component
└── main.tsx                   # Entry point
e2e/                           # Playwright E2E tests
```

## Key Architecture

- **Draft buffer pattern**: Opening the edit section copies committed selections into a temporary buffer. "Save" commits the buffer; "Cancel" discards it. This prevents accidental changes.
- **Virtualization**: react-window v2 requires the parent to set a fixed height + `overflow: hidden`. Without this, all 10,001 items render in the DOM. The list is constrained to 400px with 5 rows of overscan.
- **Max-3 enforcement**: Adding a 4th item is silently rejected. Unselected rows become visually disabled when the limit is reached, but selected rows remain interactive (so you can deselect).
- **Memo chain**: The virtualized row is `React.memo`'d. Derived data (filtered items, selected set) is wrapped in `useMemo` to minimize re-renders on toggle.
- **Conventions**: Named exports only, MUI `sx` prop for all styling, all UI text from `CONSTANTS.LABELS`, co-located tests.

## License

MIT
