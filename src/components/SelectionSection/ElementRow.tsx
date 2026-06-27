import React from 'react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@mui/material';
import type { ElementItem } from '../../types';

interface ElementRowProps {
  item: ElementItem;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: (id: number) => void;
}

export const ElementRow = React.memo<ElementRowProps>(({ item, isSelected, isDisabled, onToggle }) => {
  return (
    <ListItemButton
      dense
      onClick={() => onToggle(item.id)}
      disabled={isDisabled && !isSelected}
      sx={{
        backgroundColor: isSelected ? 'action.selected' : 'transparent',
        '&.Mui-disabled': {
          opacity: 0.5,
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Checkbox
          edge="start"
          checked={isSelected}
          disabled={isDisabled && !isSelected}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItemButton>
  );
});

ElementRow.displayName = 'ElementRow';
