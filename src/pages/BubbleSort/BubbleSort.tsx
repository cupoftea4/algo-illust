import { useEffect, useMemo, useState } from "react";
import styles from './BubbleSort.module.scss';
import Array from "../../features/array-proto";
import { useOutletContext } from "react-router-dom";
import Graph from "../../components/Graph";

const BubbleSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const arrayLength : number = useOutletContext();

  useEffect(() => {
    runSort();
  }, []);

  useEffect(() => {
    if (isSorting) {
      alert("Wait for the sorting to finish");
    } else {
      runSort();
    }
  }, [arrayLength]);

  useEffect(() => {
    if (!isSorting && array.length > 0 && !array.isSorted()) {
      bubbleSort();
    }
  }, [array])

  const runSort = () => {
    const length = arrayLength;
    setArray(Array.from({ length }, () => Math.floor(Math.random() * 100)));
  }

  const wait = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  const bubbleSort = (): Promise<number[]> => {
    setIsSorting(true);
    return new Promise(async (resolve) => {
      const startTime = performance.now();
      const arr = array;
      const len = arr.length;
      if (len > 40) {
        alert("Array is too large to sort. Please try a smaller array.");
        resolve(arr);
      }
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            await wait();
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
};

export default BubbleSort;