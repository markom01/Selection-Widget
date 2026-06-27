import { useMemo, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelectionStore } from '../../store/selectionStore';
import { SelectedPreview } from './SelectedPreview';
import { SelectionSection } from '../SelectionSection/SelectionSection';

export function SelectionWidget() {
  const selectedItemIds = useSelectionStore((s) => s.selectedItemIds);
  const allElements = useSelectionStore((s) => s.allElements);
  const openSection = useSelectionStore((s) => s.openSection);
  const removeSelection = useSelectionStore((s) => s.removeSelection);

  const selectedItems = useMemo(
    () => allElements.filter((item) => selectedItemIds.includes(item.id)),
    [allElements, selectedItemIds],
  );

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <SelectedPreview
        selectedItems={selectedItems}
        onRemoveItem={removeSelection}
        onOpenSection={openSection}
      />
      <SelectionSection />
    </Box>
  );
}
