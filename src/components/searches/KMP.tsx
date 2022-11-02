import React, { useEffect, useMemo } from 'react';
import { kmpSearch } from '../../utils/searches/searches';
import generateString from '../../utils/searches/generateString';
import styles from './Search.module.scss';
import { useOutletContext } from 'react-router-dom';
import { OutletContextSearch } from '../../utils/types/search.types';

const VARIANT = 12;

const KMP = () => {
  const [seatchIn, searchFor]: OutletContextSearch = useOutletContext();
  const [array, setArray] = React.useState<string>('');
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<number>(0);
  const isLarge = useMemo(() => array.length > 30, [array.length]);

  useEffect(() => {
    if (!isSearching && array.length > 0 && array.length < 600) {
      startSearching();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array]);

  useEffect(() => {
    if (seatchIn && searchFor) {
      setArray(seatchIn);
    }
  }, [seatchIn, searchFor]);

  const render = (index: number) => {
    setActive(index);
    return new Promise((resolve) => setTimeout(resolve, isLarge ? 300 : 1000));
  };

  const startSearching = (): Promise<number> | undefined => {
    const genertedText = generateString(array, VARIANT);
    setArray(genertedText);

    setIsSearching(true);
    return new Promise(async () => {
      const startTime = performance.now();
      const [found, stepsSpent] = await kmpSearch(genertedText, searchFor, render);
      const sortTime = performance.now() - startTime - stepsSpent * 100;
      console.log(found, stepsSpent, sortTime);
      alert(`${found !== null ? "Found at position " + (found + 1) : "Not found"}`);
      setIsSearching(false);
    });
  };

  return (
    <div className={`${styles['search-array']}  ${isLarge ? styles['large'] : ""}`}>
      {array.split('').map((item, index) => (
        <div key={index} className={`${index === active ? styles.active : ''}`}>{item}</div>
      ))}
    </div>
  )
}

export default KMP;