import React from 'react';
import { Typography, Stack, Chip, Button } from '@mui/material';
import type { ElementItem } from '../../types';
import { CONSTANTS } from '../../config/constants';

interface SelectedPreviewProps {
  selectedItems: ElementItem[];
  onRemoveItem: (id: number) => void;
  onOpenSection: () => void;
}

export function SelectedPreview({ selectedItems, onRemoveItem, onOpenSection }: SelectedPreviewProps) {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {CONSTANTS.LABELS.SELECT_ITEMS_HEADING}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {CONSTANTS.LABELS.SELECTED_COUNT_PREFIX} {selectedItems.length} {CONSTANTS.LABELS.SELECTED_COUNT_SUFFIX}
      </Typography>
      <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
        {selectedItems.map((item) => (
          <Chip
            key={item.id}
            label={item.label}
            onDelete={() => onRemoveItem(item.id)}
          />
        ))}
      </Stack>
      <Button variant="outlined" onClick={onOpenSection}>
        {CONSTANTS.LABELS.CHANGE_BUTTON}
      </Button>
    </>
  );
}
