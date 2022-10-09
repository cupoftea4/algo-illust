import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Graph from "./Graph";
import styles from "./SortComponent.module.scss";
import isSorted from "../utils/isSorted";
import { SortArray, SortFunc, HighlightedElements, OutletContextSort } from "../utils/types/sort.types";

const SortComponent = (sort: SortFunc) => {
  const Component = function () {
    const [timeTaken, setTimeTaken] = useState<number>(0);
    const [steps, setSteps] = useState<number>(0);
    const [
      arrayState,
      isSortingState,
      swappingElementsState,
      isASC,
      delay
    ]: OutletContextSort = useOutletContext();
    const [isSorting, setIsSorting] = isSortingState;
    const [array, setArray] = arrayState;
    const [swappingElements, setSwappingElements] = swappingElementsState;

    useEffect(() => {
      if (!isSorting && array.length > 0 && array.length < 600 && !isSorted(array, isASC)) {
        startSorting();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [array]);

    const renderChanges = (arr: SortArray, toSwap?: HighlightedElements) => {
      setArray(arr);
      setSwappingElements(toSwap || {});
      return new Promise((resolve) => setTimeout(resolve, delay));
    };

    const startSorting = (): Promise<SortArray> | undefined => {
      setIsSorting(true);
      return new Promise(async () => {
        const startTime = performance.now();
        const stepsSpent = await sort([...array], isASC, renderChanges);
        const sortTime = performance.now() - startTime - stepsSpent * delay;
        setSteps(stepsSpent);
        setTimeTaken(Math.round(sortTime * 100) / 100);
        setSwappingElements({ sorted: true });
        setIsSorting(false);
      });
    };

    return (
      <>
        <div className={styles.container}>
          <Graph array={array} swaps={swappingElements} />
        </div>
        <span className={styles.status}>Steps: {steps}. Time taken {timeTaken}ms.</span>
      </>
    );
  };
  return Component;
};

export default SortComponent;
