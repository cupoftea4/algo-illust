import React, { useEffect } from 'react';
import { binarySearch } from '../../utils/searches/searches';
import styles from './Search.module.scss';

const Binary = () => {
  const [array] = React.useState<number[]>(Array.from({length: 15}, () => Math.floor(Math.random() * 10)).sort((a, b) => a - b));
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<number>(0);

  useEffect(() => {
    if (!isSearching && array.length > 0 && array.length < 600) {
      startSearching();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array]);

  const render = (index: number) => {
    setActive(index);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const startSearching = (): Promise<number> | undefined => {
    setIsSearching(true);
    return new Promise(async () => {
      const startTime = performance.now();
      const [found, stepsSpent] = await binarySearch([...array], 9, render);
      const sortTime = performance.now() - startTime - stepsSpent * 100;
      console.log(found, stepsSpent, sortTime);
      setIsSearching(false);
    });
  };


  return (
    <div className={styles['search-array']}>
      {array.map((item, index) => (
        <div key={index} className={index === active ? styles.active : ''}>{item}</div>
      ))}
    </div>
  )
}

export default Binary