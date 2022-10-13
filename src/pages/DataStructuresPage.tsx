import React from 'react'
import DiceIcon from '../assets/DiceIcon';
import DSNavBar from '../components/DSNavBar';
import { DSArray, DSClassMap, DSStats } from '../utils/types/ds.types';
import { DSTypeId } from '../utils/types/ds.types';
import styles from './DataStructuresPage.module.scss';
import '../components/Form.module.scss';
import { 
  StackDS, QueueDS, DequeDS, LinkedListDS, DoublyLinkedListDS, CircularListDS 
} from '../utils/types/ds.types';
import testDS from '../utils/data_structures/test';
import { Outlet } from 'react-router-dom';

const MAX_RANDOM = 100;

const dsClasses: DSClassMap = {
  'stack': StackDS,
  'queue': QueueDS,
  'deque': DequeDS,
  'linked-list': LinkedListDS,
  'doubly-linked': DoublyLinkedListDS,
  'circular-linked': CircularListDS,
  'tree': StackDS
}

const DataStructuresPage = () => {
  const [array, setArray] = React.useState<DSArray>([]);
  const [type, setType] = React.useState<DSTypeId>(window.location.href.split("/").pop() as DSTypeId);
  const [stats, setStats] = React.useState<DSStats | null>(null);

  const stringifyStats = (stats: DSStats) => {
    if (!stats) return '';
    return `
      Length: ${stats.length},
      Searching: ${stats.searchValue}, Found: ${stats.foundIndex !== null ? stats.foundIndex : 'Not Found'},
      Min: ${stats.min}, Max: ${stats.max},
      El before min: ${stats.elBeforeMin}, El after max: ${stats.elAfterMax},
      Third from end: ${stats.thirdFromEnd}, Second from start: ${stats.secondFromStart},
      Merged: ${stats.mergedArray}
    `
  }

  const checkInput = (value: string) => {
    if (array.length > 11 || array.includes(value) || value === '') 
      return false;

    if (isNaN(+value) && value.length > 1) {
      alert('Strings are not allowed');
      return false;
    }
    if (array.length && 
      (
        (isNaN(+array[0]) && !isNaN(+value)) ||
        (!isNaN(+array[0]) && isNaN(+value))
      )) {
      alert('Only numbers OR chars allowed');
      return false;
    }
    return true;
  }

  const pushElement = () => {
    let value = Math.round(Math.random() * MAX_RANDOM), i = 0;
    while (array.includes(value) && i < MAX_RANDOM) {
      value = Math.round(Math.random() * MAX_RANDOM);
      i++;
    }
    if (checkInput(value.toString())) {
      setStats(null)
      setArray([...array, value]);
    }
  }

  const runStats = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const toFind = parseInt(data.get("toFind")?.toString() || "0");
    setStats(testDS(array, toFind, dsClasses[type]));
  }

  return (
    <>   
      <div>
        <header >
          <DSNavBar type={type} setType={setType}/>
          <span>
            <input onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (checkInput(e.currentTarget.value)) {
                  setArray([...array, e.currentTarget.value]);
                }
                e.currentTarget.value = '';
              }
            }} />   
            <DiceIcon onClick={pushElement}/>          
          </span>   
        </header>
        <form onSubmit={runStats} className={styles.centerX}>
            <span>
              <label htmlFor="toFind">Find:</label>
              <input
                name="toFind"
                placeholder="value"
                defaultValue="1"
              />
            </span>
            <input type="submit" value="Start" title="Get Stats" />
          </form> 
      </div>
      <div className={styles.centerX}>
        <Outlet context={[
          [array, setArray],
          type,
          [stats, setStats]
        ]}/>
      </div>
      <span className={styles.bottomRight}>{stats && stringifyStats(stats)}</span>
    </>
  )
};

export default DataStructuresPage;