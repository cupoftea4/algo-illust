import { useEffect, useState } from 'react'
import { SortStats, SortType, SortTypeId } from '../utils/types';
import styles from './CompareSorts.module.scss';
import SizeForm from './SizeForm';
import WorkerBuilder from '../utils/workerBuilder';
import Worker from '../utils/benchmark.worker'; 

const INITIAL_LENGTH = 10;
const sorts: SortType[] = [
  {id: 'bubble', name: 'Bubble Sort'},
  {id: 'selection', name: 'Selection Sort'},
  {id: 'shell', name: 'Shell Sort'},
  {id: 'merge', name: 'Merge Sort'},
  {id: 'quick', name: 'Quick Sort'},
  {id: 'counting', name: 'Counting Sort'}
];

const SortsTable = () => {
  const [stats, setStats] = useState<SortStats[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortsToRun, setSortsToRun] = useState<SortTypeId[]>(sorts.map(sort => sort.id));
  const [arrayLength, setArrayLength] = useState<number>(INITIAL_LENGTH);

  useEffect(() => {
    startSorting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startSorting = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (isSorting) {
      alert("Please wait for the current sorting to finish.");
      return;
    }
    setIsSorting(true);
    const data = new FormData(event?.currentTarget);
    const length = parseInt(data.get("arrayLength")?.toString() || INITIAL_LENGTH.toString());
    setArrayLength(length);
    setStats([]);
    const instance = new WorkerBuilder(Worker as any);
    instance.onmessage = (message) => {
      if (message) {
        setStats((prevStats) => {
          if (prevStats.length === sortsToRun.length - 1) {
            setIsSorting(false);
          }
          return [...prevStats, message.data as SortStats];
        });
      }
    };
    instance.postMessage({length, sorts: sortsToRun});
  };

  return (
    <>
      <div>
        <select defaultValue={'all'} name="sorts" id="sorts" onChange={e => {
            if (e.target.value === 'all') {
              setSortsToRun(sorts.map(sort => sort.id));
            } else {
              setSortsToRun([sorts.find(sort => sort.id === e.target.value)?.id || 'bubble']);
            }
          }}>
          <option value="all">All</option>
          {sorts.map((sort) => (
            <option key={sort.id} value={sort.id}>
              {sort.name}
            </option>
          ))}
        </select>
        <SizeForm onLengthSubmit={startSorting} />
      </div>
      <div className={styles.container}>
        <h2>Size: {arrayLength}</h2>
        {stats.length ?
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sort</th>
              <th>Steps</th>
              <th>Time</th>
              <th>isSorted</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.sortId}>
                <td>{stat.sortId}</td>
                <td>{stat.steps}</td>
                <td>{stat.time}</td>
                <td>{stat.sorted ? 'sorted' : 'not sorted'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        : "Sorting..."}
      </div>
      <span className={styles.status}>{isSorting ? "Sorting..." : ""}</span>
    </>
  )
}

export default SortsTable