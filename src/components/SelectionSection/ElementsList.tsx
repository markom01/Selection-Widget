import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { List } from 'react-window';
import type { RowComponentProps } from 'react-window';
import type { ElementItem } from '../../types';
import { CONSTANTS } from '../../config/constants';
import { ElementRow } from './ElementRow';

interface ElementsListProps {
  filteredElements: ElementItem[];
  tempSelectedIds: number[];
  onToggleItem: (id: number) => void;
}

interface RowData {
  items: ElementItem[];
  selectedSet: Set<number>;
  onToggleItem: (id: number) => void;
  maxSelection: number;
}

const ROW_HEIGHT = 48;

const Row = React.memo<RowComponentProps<RowData>>(
  ({ index, style, items, selectedSet, onToggleItem, maxSelection }) => {
    const item = items[index];
    const isSelected = selectedSet.has(item.id);
    const isDisabled = selectedSet.size >= maxSelection && !isSelected;

    return (
      <div style={style}>
        <ElementRow
          item={item}
          isSelected={isSelected}
          isDisabled={isDisabled}
          onToggle={onToggleItem}
        />
      </div>
    );
  },
);

Row.displayName = 'VirtualRow';

export function ElementsList({
  filteredElements,
  tempSelectedIds,
  onToggleItem,
}: ElementsListProps) {
  if (filteredElements.length === 0) {
    return (
      <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
        {CONSTANTS.LABELS.NO_RESULTS_MESSAGE}
      </Typography>
    );
  }

  const itemData: RowData = useMemo(
    () => ({
      items: filteredElements,
      selectedSet: new Set(tempSelectedIds),
      onToggleItem,
      maxSelection: CONSTANTS.MAX_SELECTION,
    }),
    [filteredElements, tempSelectedIds, onToggleItem],
  );

  return (
    <Box sx={{ height: CONSTANTS.SECTION_MAX_HEIGHT, overflow: 'hidden' }}>
      <List
        height={CONSTANTS.SECTION_MAX_HEIGHT}
        width="100%"
        rowCount={filteredElements.length}
        rowHeight={ROW_HEIGHT}
        rowProps={itemData}
        rowComponent={Row}
        overscanCount={5}
      />
    </Box>
  );
}
