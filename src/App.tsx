import SortPage from './pages/SortPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SortComponent from './components/SortComponent';
import { useMemo } from 'react';
import { bubbleSort, selectionSort, shellSort, countingSort } from './features/sorts';

function App() {
  const BubbleSort = useMemo(() => SortComponent(bubbleSort), []);
  const SelectionSort = useMemo(() => SortComponent(selectionSort), []);
  const ShellSort = useMemo(() => SortComponent(shellSort), []);
  const MergeSort = useMemo(() => SortComponent(() => console.log('Shell Sort')), []);
  const QuickSort = useMemo(() => SortComponent(() => console.log('Quick Sort')), []);
  const CountingSort = useMemo(() => SortComponent(countingSort), []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SortPage />} >
            <Route path="bubble" element={<BubbleSort/>} />
            <Route path="selection" element={<SelectionSort/>} />
            <Route path="shell" element={<ShellSort/>} />
            <Route path="merge" element={<MergeSort/>} />
            <Route path="quick" element={<QuickSort/>} />
            <Route path="counting" element={<CountingSort/>} />
          </Route>
          <Route path="*" element={<SortPage />} />
        </Routes>      
      </BrowserRouter>

    </>
  );
}

export default App;
