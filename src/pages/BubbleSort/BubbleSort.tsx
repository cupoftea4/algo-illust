import { useEffect, useState } from "react";
import styles from './BubbleSort.module.scss';
import { Flipper, Flipped } from "react-flip-toolkit";

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
  // const [t]

  useEffect(() => {
    runSort();
  }, [])

  useEffect(() => {
    if (!isSorting && array.length > 0 && !array.isSorted()) {
      bubbleSort();
    }
  }, [array])

  const runSort = () => {
    const length = parseInt(prompt("Enter length of array") || "10");
    setArray(Array.from({ length }, () => Math.floor(Math.random() * 100)));
  }

  const waitOneSecond = async () => {

    await new Promise(resolve => setTimeout(resolve, 200));
  }

  const bubbleSort = (): Promise<number[]> => {
    setIsSorting(true);
    return new Promise(async (resolve) => {
      const startTime = performance.now();
      let arr = array;
      const len = arr.length;
      if (len > 40) {
        alert("Array is too large to sort. Please try a smaller array.");
        resolve(arr);
      }
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
    <Flipper flipKey={array.join("")}>
      <div className={styles.container}>
        <div className={styles.illustration}>
          {array.length <= 40 ? array.map((item, index) =>
            <Flipped key={index} flipId={index}>
              <div key={index} className={styles.arrayItem} style={{ width: 100 / array.length + '%', height: 1 * item + '%' }}>
                <div
                  className={styles.rectangle}>
                </div>{item}
              </div>
            </Flipped>) : null}
        </div>
      </div>
    </Flipper>
  );
};

export default BubbleSort;