import React, { useMemo } from 'react';
import { Collapse, Paper, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelectionStore } from '../../store/selectionStore';
import { useFilteredElements } from '../../hooks/useFilteredElements';
import { CONSTANTS } from '../../config/constants';
import { SearchAndFilterBar, ElementsList, SelectedPreviewSection } from './';

export function SelectionSection() {
  const isSectionOpen = useSelectionStore((s) => s.isSectionOpen);
  const searchQuery = useSelectionStore((s) => s.searchQuery);
  const filterValue = useSelectionStore((s) => s.filterValue);
  const tempSelectedIds = useSelectionStore((s) => s.tempSelectedIds);
  const allElements = useSelectionStore((s) => s.allElements);
  const setSearchQuery = useSelectionStore((s) => s.setSearchQuery);
  const setFilterValue = useSelectionStore((s) => s.setFilterValue);
  const toggleTempSelection = useSelectionStore((s) => s.toggleTempSelection);
  const removeTempSelection = useSelectionStore((s) => s.removeTempSelection);
  const saveSelection = useSelectionStore((s) => s.saveSelection);
  const cancelSelection = useSelectionStore((s) => s.cancelSelection);

  const filteredElements = useFilteredElements(allElements, searchQuery, filterValue);
  const tempSelectedItems = useMemo(
    () => allElements.filter((item) => tempSelectedIds.includes(item.id)),
    [allElements, tempSelectedIds],
  );

  return (
    <Collapse in={isSectionOpen}>
      <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">
            {CONSTANTS.LABELS.SECTION_HEADER}
          </Typography>
          <IconButton onClick={cancelSelection} size="small" aria-label={CONSTANTS.LABELS.CLOSE_ARIA_LABEL}>
            <CloseIcon />
          </IconButton>
        </Box>

        <SearchAndFilterBar
          searchQuery={searchQuery}
          filterValue={filterValue}
          onSearchChange={setSearchQuery}
          onFilterChange={setFilterValue}
        />

        <ElementsList
          filteredElements={filteredElements}
          tempSelectedIds={tempSelectedIds}
          onToggleItem={toggleTempSelection}
        />

        <Box sx={{ mt: 2 }}>
          <SelectedPreviewSection
            tempSelectedItems={tempSelectedItems}
            onRemoveTempItem={removeTempSelection}
            onSave={saveSelection}
            onCancel={cancelSelection}
          />
        </Box>
      </Paper>
    </Collapse>
  );
}
