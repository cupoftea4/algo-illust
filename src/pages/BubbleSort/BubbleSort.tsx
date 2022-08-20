import { useEffect, useState } from "react";
import './BubbleSort.scss';

declare global {
  interface Array<T> {
    isSorted(): boolean;
  }
}

Array.prototype.isSorted = function (): boolean {
  const startTime = performance.now();
  const arr: number[] = this;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  const endTime = performance.now();
  // console.log("Call to isSorted took " + (endTime - startTime) + " milliseconds.");
  return true;
}


const BubbleSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  useEffect(() => {
    runSort();
  }, [])

  useEffect(() => {
    console.log("array changed", array);
    if (!isSorting && array.length > 0 && !array.isSorted()) {
      bubbleSort();
      // console.log(array);
    }
  }, [array])

  const runSort = () => {
    const length = parseInt(prompt("Enter length of array") || "10");
    setArray(Array.from({ length }, () => Math.floor(Math.random() * 100)));
    // console.log(array);
  }

  const waitOneSecond = async () => {
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const bubbleSort = (): Promise<number[]> => {
    setIsSorting(true);
    return new Promise(async (resolve) => {
      const startTime = performance.now();
      let arr = array;
      const len = arr.length;
      for (let i = 0; i < len; i++) {
          for (let j = 0; j < len; j++) {
              if (arr[j] > arr[j + 1]) {
                  [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];         
                  await waitOneSecond();
                  setArray([...arr]);
              }
          }
      }
      const endTime = performance.now();
      console.log("Call to bubbleSort took " + (endTime - startTime) + " milliseconds.");
      setArray([...arr]);
      setIsSorting(false);
      resolve(arr);
    });
  }

  return (
    <div className="container">
      <div className="illustration">
        {array.length <= 20 ? array.map((item, index) => 
        <div className="array-item" style={{width: 100 / array.length + '%', height: 1*item + '%'}}>
          <div 
            key={Math.random()} 
            className={`rectangle`}>
          </div>{item}
        </div>) : null}
      </div>
    </div>
  );
};

export default BubbleSort;