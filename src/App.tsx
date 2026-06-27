import { useEffect } from 'react'
import { Box, LinearProgress } from '@mui/material'
import { SelectionWidget } from './components/SelectionWidget/SelectionWidget'
import { useSelectionStore } from './store/selectionStore'
import { generateElements } from './data/generateElements'

export function App() {
  const allElements = useSelectionStore((s) => s.allElements)
  const setAllElements = useSelectionStore((s) => s.setAllElements)

  useEffect(() => {
    setAllElements(generateElements())
  }, [setAllElements])

  return (
    <Box sx={{ height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {allElements.length === 0 && <LinearProgress />}
      <SelectionWidget />
    </Box>
  )
}
