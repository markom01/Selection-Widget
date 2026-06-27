import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { List } from 'react-window';
import type { RowComponentProps } from 'react-window';
import type { ElementItem } from '../../types';
import { CONSTANTS } from '../../config/constants';
import { ElementRow } from './ElementRow';

interface ElementsListProps {
  readonly filteredElements: readonly ElementItem[];
  readonly tempSelectedIds: readonly number[];
  readonly onToggleItem: (id: number) => void;
}

interface RowData {
  readonly items: readonly ElementItem[];
  readonly selectedSet: Set<number>;
  readonly onToggleItem: (id: number) => void;
  readonly maxSelection: number;
}

const ROW_HEIGHT = 48;

function Row({ index, style, items, selectedSet, onToggleItem, maxSelection }: RowComponentProps<RowData>) {
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
}

export function ElementsList({
  filteredElements,
  tempSelectedIds,
  onToggleItem,
}: ElementsListProps) {
  const itemData: RowData = useMemo(
    () => ({
      items: filteredElements,
      selectedSet: new Set(tempSelectedIds),
      onToggleItem,
      maxSelection: CONSTANTS.MAX_SELECTION,
    }),
    [filteredElements, tempSelectedIds, onToggleItem],
  );

  if (filteredElements.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography sx={{ color: 'text.secondary' }}>
          {CONSTANTS.LABELS.NO_RESULTS_MESSAGE}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {CONSTANTS.LABELS.NO_RESULTS_SUGGESTION}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <List
        style={{ height: '100%', width: '100%' }}
        rowCount={filteredElements.length}
        rowHeight={ROW_HEIGHT}
        rowProps={itemData}
        rowComponent={Row}
        overscanCount={5}
      />
    </Box>
  );
}
