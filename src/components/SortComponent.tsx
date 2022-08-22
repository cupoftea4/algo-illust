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

type OutletContextType = [Array<number>, (array: number[]) => void, () => Promise<void>]

const SortComponent = (sort: Function) => {
    const Component = function() {
        const [isSorting, setIsSorting] = useState<boolean>(false);
        const [timeTaken, setTimeTaken] = useState<number>(0);
        const [swappingElements, setSwappingElements] = useState<number[]>([1, 2]);
        const [array, setArray, waitDelay]: OutletContextType = useOutletContext();
        
        useEffect(() => {
          console.log(array.length); 
          if (array.length > 0 && !array.isSorted()) {
            if (isSorting) {
              alert("Wait for the sorting to finish");
            } else {
              bubbleSort();
            }
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [array.length]) 

        const renderSwap = (arr: number[], toSwap: number[]) => {
          setArray(arr);
          setSwappingElements(toSwap);
        }
      
        const bubbleSort = (): Promise<number[]> | undefined => {
          setIsSorting(true);
          return new Promise(async (resolve) => {
            const startTime = performance.now();
            const sortedArray = await sort(array, renderSwap, waitDelay);
            const sortTime = performance.now() - startTime;
            setTimeTaken(Math.round(sortTime * 100) / 100);
            setArray([...sortedArray]);
            setSwappingElements([-1]);
            setIsSorting(false);
            resolve(sortedArray);
          });
        }

        return (
          <>
            <div className={styles.container}>
              <Graph array={array} swaps={swappingElements}/>
            </div>
            <span className={styles.time}>Time taken {timeTaken}ms.</span>
          </>

        );
    }
    return Component;
}

export default SortComponent