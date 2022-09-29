import SortPage from "./pages/SortPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SortComponent from "./components/SortComponent";
import { useMemo } from "react";
import {
  bubbleSort,
  selectionSort,
  shellSort,
  countingSort,
  quickSort,
  mergeSort,
} from "./features/sorts";
import Home from "./pages/Home";
// import {withRouter} from 'react-router-dom'

function App() {
  const BubbleSort = useMemo(() => SortComponent(bubbleSort), []);
  const SelectionSort = useMemo(() => SortComponent(selectionSort), []);
  const ShellSort = useMemo(() => SortComponent(shellSort), []);
  const MergeSort = useMemo(() => SortComponent(mergeSort), []);
  const QuickSort = useMemo(() => SortComponent(quickSort), []);
  const CountingSort = useMemo(() => SortComponent(countingSort), []);

  return (
    <>
      <BrowserRouter basename="/asd">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sort/" element={<SortPage />}>
            <Route path="bubble" element={<BubbleSort />} />
            <Route path="selection" element={<SelectionSort />} />
            <Route path="shell" element={<ShellSort />} />
            <Route path="merge" element={<MergeSort />} />
            <Route path="quick" element={<QuickSort />} />
            <Route path="counting" element={<CountingSort />} />
          </Route>
          <Route path="ds/" element={<div>ds</div>} >
            <Route path="linked-list" element={<div>linked-list</div>} />
            <Route path="stack" element={<div>stack</div>} />
            <Route path="queue" element={<div>queue</div>} />
            <Route path="tree" element={<div>tree</div>} />
          </Route>
          <Route path="search/" element={<div>search</div>} >
            <Route path="linear" element={<div>linear</div>} />
            <Route path="binary" element={<div>binary</div>} />
            <Route path="hash" element={<div>hash</div>} />
          </Route>
          <Route path="*" element={<h1 style={{color: "white"}}>404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
