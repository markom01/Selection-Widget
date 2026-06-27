import {
  Typography,
  Stack,
  Chip,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ElementItem } from '../../types';
import { CONSTANTS } from '../../config/constants';

interface SelectedPreviewSectionProps {
  readonly tempSelectedItems: readonly ElementItem[];
  readonly onRemoveTempItem: (id: number) => void;
  readonly onSave: () => void;
  readonly onCancel: () => void;
}

export function SelectedPreviewSection({
  tempSelectedItems,
  onRemoveTempItem,
  onSave,
  onCancel,
}: SelectedPreviewSectionProps) {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle1">
          {CONSTANTS.LABELS.CURRENT_SELECTED_LABEL}
        </Typography>
        <IconButton size="small" onClick={onCancel} aria-label={CONSTANTS.LABELS.CLOSE_ARIA_LABEL}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
        {tempSelectedItems.map((item) => (
          <Chip
            key={item.id}
            label={item.label}
            onDelete={() => onRemoveTempItem(item.id)}
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={onSave}
          disabled={tempSelectedItems.length === 0}
        >
          {CONSTANTS.LABELS.SAVE_BUTTON}
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          {CONSTANTS.LABELS.CANCEL_BUTTON}
        </Button>
      </Stack>
    </Box>
  );
}
