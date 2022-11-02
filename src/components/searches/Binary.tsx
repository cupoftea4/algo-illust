import React, { useEffect, useMemo } from 'react';
import { binarySearch } from '../../utils/searches/searches';
import styles from './Search.module.scss';

const LENGTH = 20;
let VARIANT = 12;

const Binary = () => {
  const [array, setArray] = React.useState<number[]>(Array.from({length: LENGTH}, 
    () => (Math.floor(Math.random() * 10) % 2 ? 1 : -1 ) * Math.floor(Math.random() * 15)).sort((a, b) => a - b)
  );
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<number>(0);
  const isLarge = useMemo(() => array.length > 30, [array.length]);

  useEffect(() => {
    if (!isSearching && array.length > 0 && array.length < 600) {
      startSearching();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array]);


  const render = (index: number) => {
    setActive(index);
    return new Promise((resolve) => setTimeout(resolve, isLarge ? 300 : 1000));
  };

  const startSearching = async () => {
    if (VARIANT === 8) {
      console.log("VARIANT 8");
      const matrix = Array.from({length: 5}, () => Array.from({length: 4}, 
        () => (Math.random() % 2 ? 1 : -1 ) * Math.floor(Math.random() * 10) ));
      console.log("Table: ", matrix);
      console.log("Sorted: ", matrix.map((row) => row.sort((a, b) => a - b)));
      let found = null, i = 0;
      for(i = 0; i < matrix.length; i++) {
        setArray(matrix[i]);
        found = await search(matrix[i], 0);
        if (found !== null) break;
      }
      console.log(found === null ? "Not found" : ("Found on position: " +  found[0] + " " + i));
    } else if (VARIANT === 12) {
      console.log("VARIANT 12");
      console.log(array);
      const found = await search(array, 0);
      console.log(found === null ? "Not found" : ("Found on positions: " +  found));
      const negativeAbs = array.reduce((acc, cur) => acc + (cur < 0 ? Math.abs(cur) : 0), 0);
      console.log("Absolute sum of negative values: ", negativeAbs);
      const arrayWithoutZeros = array.map((item, index) => found?.includes(index) ? negativeAbs : item );
      console.log("Result: ", arrayWithoutZeros);
    }
    
  };

  const search = async (array: number[], value: number) => {
    setIsSearching(true);
    const startTime = performance.now();
    const [found, stepsSpent] = await binarySearch(array, 0, render);
    const sortTime = performance.now() - startTime - stepsSpent * 100;
    // console.log(found, stepsSpent, sortTime);
    // alert(`${found !== null ? "Found at position " + (found + 1) : "Not found"}`);
    setIsSearching(false);
    return found;
  }

  return (
    <div className={`${styles['search-array']}  ${isLarge ? styles['large'] : ""}`}>
      {array.map((item, index) => (
        <div key={index} className={`${index === active ? styles.active : ''}`}>{item}</div>
      ))}
    </div>
  )
}

export default Binary