import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Graph from './Graph';
import styles from './SortComponent.module.scss';
import isSorted from '../features/isSorted';
import { SortArray } from '../types';

type OutletContextType = [SortArray, (array: SortArray) => void, () => Promise<void>, boolean, number];

const SortComponent = (sort: Function) => {
    const Component = function() {
        const [isSorting, setIsSorting] = useState<boolean>(false);
        const [timeTaken, setTimeTaken] = useState<number>(0);
        const [swappingElements, setSwappingElements] = useState<number[]>([1, 2]);
        const [array, setArray, waitDelay, isASC, delay]: OutletContextType = useOutletContext();
        
        useEffect(() => { 
          if (array.length > 0 && !isSorted(array)) {
            if (isSorting) {
              alert("Wait for the sorting to finish");
            } else {
              bubbleSort();
            }
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [array.length]) 

        const renderSwap = (arr: SortArray, toSwap: number[]) => {
          setArray(arr);
          setSwappingElements(toSwap);
        }
      
        const bubbleSort = (): Promise<SortArray> | undefined => {
          setIsSorting(true);
          return new Promise(async (resolve) => {
            const startTime = performance.now();
            const steps = await sort(array, renderSwap, waitDelay, isASC);
            const sortTime = performance.now() - startTime - steps * delay;
            setTimeTaken(Math.round(sortTime * 100) / 100);
            setSwappingElements([-1]);
            setIsSorting(false);
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