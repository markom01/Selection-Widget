import { useMemo, useRef, useEffect } from 'react';
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

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSectionOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSectionOpen]);

  const filteredElements = useFilteredElements(allElements, searchQuery, filterValue);
  const tempSelectedItems = useMemo(
    () => allElements.filter((item) => tempSelectedIds.includes(item.id)),
    [allElements, tempSelectedIds],
  );

  return (
    <Collapse
      in={isSectionOpen}
      timeout={0}
      sx={{
        flex: 1,
        minHeight: 0,
        mt: isSectionOpen ? 2 : 0,
        '& .MuiCollapse-wrapper, & .MuiCollapse-wrapperInner': { height: '100%' },
      }}
    >
      <Paper variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            flexShrink: 0,
          }}
        >
          <Typography variant="h6">
            {CONSTANTS.LABELS.SECTION_HEADER}
          </Typography>
          <IconButton onClick={cancelSelection} size="small" aria-label={CONSTANTS.LABELS.CLOSE_ARIA_LABEL}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <SearchAndFilterBar
            searchQuery={searchQuery}
            filterValue={filterValue}
            onSearchChange={setSearchQuery}
            onFilterChange={setFilterValue}
            inputRef={searchInputRef}
          />
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <ElementsList
            filteredElements={filteredElements}
            tempSelectedIds={tempSelectedIds}
            onToggleItem={toggleTempSelection}
          />
        </Box>

        <Box sx={{ mt: 1, flexShrink: 0 }}>
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
