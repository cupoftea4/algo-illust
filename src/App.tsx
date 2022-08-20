import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BubbleSort from './pages/BubbleSort/BubbleSort';
import MergeSort from './pages/MergeSort/MergeSort';
import SelectionSort from './pages/SelectionSort/SelectionSort';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} >
            <Route path="bubble" element={<BubbleSort/>} />
            <Route path="selection" element={<SelectionSort/>} />
            <Route path="merge" element={<MergeSort/>} />
            <Route path="#" element={<BubbleSort/>} />
            <Route path="#" element={<BubbleSort/>} />
            <Route path="#" element={<BubbleSort/>} />
          </Route>
          <Route path="*" element={<Home/>} />
        </Routes>      
      </BrowserRouter>

    </>
  );
}

export default App;
