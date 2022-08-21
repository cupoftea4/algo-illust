import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Graph from './Graph';
import styles from './SortComponent.module.scss';
import Array from "../features/array-proto";

declare global {
  interface Array<T> {
    isSorted: () => boolean;
  }
}

Array.prototype.isSorted = function (): boolean {
  const arr: number[] = this;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}

const SortComponent = (sort: Function) => {
    const Component = function() {
        const [isSorting, setIsSorting] = useState<boolean>(false);
        const [array, setArray] : [Array<number>, (array: number[]) => void] = useOutletContext();
      
        useEffect(() => {
          if (!isSorting && array.length > 0 && !array.isSorted()) {
            bubbleSort();
          } else if (array.length > 0) {
            alert("Wait for the sorting to finish");
          }
        }, [array.length]) 
      
        const waitOneSecond = async () => {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      
        const bubbleSort = (): Promise<number[]> | undefined => {
          if (array.length > 40) {
            alert("Array is too large to sort. Please try a smaller array.");
            return;
          }
          setIsSorting(true);
          return new Promise(async (resolve) => {
            console.warn("bubbleSort started");
            const startTime = performance.now();
            const arr = array;
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
            <div className={styles.container}>
              <Graph array={array} />
            </div>
        );
    }
    return Component;
}

export default SortComponent