import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Graph from './Graph';
import styles from './SortComponent.module.scss';
import isSorted from '../features/isSorted';
import { SortArray } from '../types';

type OutletContextType = [
  [SortArray, (array: SortArray) => void],
  () => Promise<void>,
  boolean, number, 
  [boolean, (state: boolean) => void],
  [number[], (elements: number[]) => void]
];

const SortComponent = (sort: Function) => {
    const Component = function() {
        const [timeTaken, setTimeTaken] = useState<number>(0);
        // const [swappingElements, setSwappingElements] = useState<number[]>([]);
        const [arrayState, waitDelay, isASC, delay, isSortingState, swappingElementsState]: OutletContextType = useOutletContext();
        const [isSorting, setIsSorting] = isSortingState;
        const [array, setArray] = arrayState;
        const [swappingElements, setSwappingElements] = swappingElementsState;
        
        useEffect(() => { 
          if (!isSorting && array.length > 0 && !isSorted(array, isASC)) {
            startSorting();
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [array]) 

        const renderSwap = (arr: SortArray, toSwap: number[]) => {
          setArray(arr);
          setSwappingElements(toSwap);
        }
      
        const startSorting = (): Promise<SortArray> | undefined => {
          setIsSorting(true);
          return new Promise(async () => {
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

export default SortComponent;