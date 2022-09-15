import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Graph from "./Graph";
import styles from "./SortComponent.module.scss";
import isSorted from "../features/isSorted";
import { SortArray, SortFunc, HighlightedElements } from "../types";

type OutletContextType = [
  [SortArray, (array: SortArray) => void],
  () => Promise<void>,
  boolean,
  number,
  [boolean, (state: boolean) => void],
  [HighlightedElements, (elements: HighlightedElements) => void]
];

const SortComponent = (sort: SortFunc) => {
  const Component = function () {
    const [timeTaken, setTimeTaken] = useState<number>(0);
    const [
      arrayState,
      waitDelay,
      isASC,
      delay,
      isSortingState,
      swappingElementsState,
    ]: OutletContextType = useOutletContext();
    const [isSorting, setIsSorting] = isSortingState;
    const [array, setArray] = arrayState;
    const [swappingElements, setSwappingElements] = swappingElementsState;

    useEffect(() => {
      if (!isSorting && array.length > 0 && !isSorted(array, isASC)) {
        startSorting();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [array]);

    const renderChanges = (arr: SortArray, toSwap: HighlightedElements) => {
      setArray(arr);
      setSwappingElements(toSwap);
      return new Promise((resolve) => waitDelay().then(resolve));
    };

    const startSorting = (): Promise<SortArray> | undefined => {
      setIsSorting(true);
      return new Promise(async () => {
        const startTime = performance.now();
        const steps: any = await sort(array, renderChanges, isASC);
        const sortTime = performance.now() - startTime - steps * delay;
        setTimeTaken(Math.round(sortTime * 100) / 100);
        setSwappingElements({ sorted: true});
        setIsSorting(false);
      });
    };

    return (
      <>
        <div className={styles.container}>
          <Graph array={array} swaps={swappingElements} />
        </div>
        <span className={styles.time}>Time taken {timeTaken}ms.</span>
      </>
    );
  };
  return Component;
};

export default SortComponent;
