import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SortComponent from './components/SortComponent';
import { useMemo, useState } from 'react';

function App() {
  const [array, setArray] = useState<number[]>([]);

  const BubbleSort = useMemo(() => SortComponent(() => console.log('Bubble Sort')), []);
  const SelectionSort = useMemo(() => SortComponent(() => console.log('Selection Sort')), []);
  const MergeSort = useMemo(() => SortComponent(() => console.log('Merge Sort')), []);
  const ShellSort = useMemo(() => SortComponent(() => console.log('Shell Sort')), []);
  const QuickSort = useMemo(() => SortComponent(() => console.log('Quick Sort')), []);
  const CountingSort = useMemo(() => SortComponent(() => console.log('Counting Sort')), []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home arrayState={[array, setArray]} />} >
            <Route path="bubble" element={<BubbleSort/>} />
            <Route path="selection" element={<SelectionSort/>} />
            <Route path="merge" element={<MergeSort/>} />
            <Route path="shell" element={<ShellSort/>} />
            <Route path="quick" element={<QuickSort/>} />
            <Route path="counting" element={<CountingSort/>} />
          </Route>
          <Route path="*" element={<Home arrayState={[array, setArray]}/>} />
        </Routes>      
      </BrowserRouter>

    </>
  );
}

export default App;
