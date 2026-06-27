import React from 'react';
import { Stack, TextField, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { FilterValue } from '../../types';
import { CONSTANTS } from '../../config/constants';

interface SearchAndFilterBarProps {
  searchQuery: string;
  filterValue: FilterValue;
  onSearchChange: (query: string) => void;
  onFilterChange: (value: FilterValue) => void;
}

export function SearchAndFilterBar({
  searchQuery,
  filterValue,
  onSearchChange,
  onFilterChange,
}: SearchAndFilterBarProps) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField
        size="small"
        fullWidth
        placeholder={CONSTANTS.LABELS.SEARCH_PLACEHOLDER}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
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
