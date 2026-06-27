import { useMemo, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelectionStore } from '../../store/selectionStore';
import { SelectedPreview } from './SelectedPreview';
import { SelectionSection } from '../SelectionSection/SelectionSection';

export function SelectionWidget() {
  const selectedItemIds = useSelectionStore((s) => s.selectedItemIds);
  const allElements = useSelectionStore((s) => s.allElements);
  const isSectionOpen = useSelectionStore((s) => s.isSectionOpen);
  const openSection = useSelectionStore((s) => s.openSection);
  const cancelSelection = useSelectionStore((s) => s.cancelSelection);
  const removeSelection = useSelectionStore((s) => s.removeSelection);

  const changeButtonRef = useRef<HTMLButtonElement>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (!isSectionOpen && changeButtonRef.current) {
      changeButtonRef.current.focus();
    }
  }, [isSectionOpen]);

  const selectedItems = useMemo(
    () => allElements.filter((item) => selectedItemIds.includes(item.id)),
    [allElements, selectedItemIds],
  );

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <SelectedPreview
        selectedItems={selectedItems}
        onRemoveItem={removeSelection}
        onOpenSection={isSectionOpen ? cancelSelection : openSection}
        buttonRef={changeButtonRef}
      />
      <SelectionSection />
    </Box>
  );
}
