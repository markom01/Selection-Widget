import { useEffect } from 'react'
import { SelectionWidget } from './components/SelectionWidget/SelectionWidget'
import { useSelectionStore } from './store/selectionStore'
import { generateElements } from './data/generateElements'

export function App() {
  const setAllElements = useSelectionStore((s) => s.setAllElements)

  useEffect(() => {
    setAllElements(generateElements())
  }, [setAllElements])

  return <SelectionWidget />
}
