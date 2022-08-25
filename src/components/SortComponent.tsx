import { useEffect, useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import Graph from './Graph';
import styles from './SortComponent.module.scss';
import Array from "../features/array-proto";
import { SortArray } from '../types';

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

type OutletContextType = [Array<number | string>, (array: SortArray) => void, () => Promise<void>, boolean];

const SortComponent = (sort: Function) => {
    const Component = function() {
        const [isSorting, setIsSorting] = useState<boolean>(false);
        const [timeTaken, setTimeTaken] = useState<number>(0);
        const [swappingElements, setSwappingElements] = useState<number[]>([1, 2]);
        const [array, setArray, waitDelay, isASC]: OutletContextType = useOutletContext();
        const [restart, setRestart] = useState<boolean>(false);
        const controller = useMemo(() => new AbortController(), []);
        
        useEffect(() => { 
          console.log('array', array, array.isSorted(), isSorting);
          
          if (array.length > 0 && !array.isSorted()) {
            if (isSorting) {
              controller.abort();
              bubbleSort();
              // alert("Wait for the sorting to finish");
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
      
        const bubbleSort = (): Promise<SortArray> | undefined => {
          setIsSorting(true);
          return new Promise(async (_, reject) => {
            const startTime = performance.now();
            await sort(array, renderSwap, waitDelay, isASC, controller)
              .then(() => {
                // setArray(arr); 
                const sortTime = performance.now() - startTime;
                setTimeTaken(Math.round(sortTime * 100) / 100);
                setSwappingElements([-1]);
                setIsSorting(false);
              })
              .catch(() => {
                setIsSorting(false);
                console.log(array); 
                // bubbleSort();                
              });
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

export default SortComponent;