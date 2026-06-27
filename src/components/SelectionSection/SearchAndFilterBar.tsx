import { Stack, TextField, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { FilterValue } from '../../types';
import { CONSTANTS } from '../../config/constants';

interface SearchAndFilterBarProps {
  readonly searchQuery: string;
  readonly filterValue: FilterValue;
  readonly onSearchChange: (query: string) => void;
  readonly onFilterChange: (value: FilterValue) => void;
  readonly inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function SearchAndFilterBar({
  searchQuery,
  filterValue,
  onSearchChange,
  onFilterChange,
  inputRef,
}: SearchAndFilterBarProps) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField
        size="small"
        fullWidth
        placeholder={CONSTANTS.LABELS.SEARCH_PLACEHOLDER}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        inputRef={inputRef}
        slotProps={{
          input: {
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
          },
        }}
      />
      <TextField
        select
        size="small"
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value as FilterValue)}
        sx={{ minWidth: 150 }}
      >
        {CONSTANTS.FILTER_OPTIONS.map((option) => (
          <MenuItem key={String(option.value)} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
