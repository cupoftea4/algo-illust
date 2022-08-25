import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import { SortTypeId } from "../types";
import styles from "./Home.module.scss";
import { getName } from "../features/apis";

const href: SortTypeId = window.location.href.split('/').pop() as SortTypeId;

const Home = () => {
  const [array, setArray] = useState<number[] | string[]>([]);
  const [illustDelay, setIllustDelay] = useState<number>(250);
  const [sortType, setSortType] = useState<SortTypeId>(href);
  const [isASC, setIsASC] = useState<boolean>(true);

  const waitDelay = (controller: AbortController) => {
    
    return new Promise((resolve, reject) => {
      controller.signal.addEventListener('abort', () => {
        console.log('Aborted in Home');
        reject();
      });
      setTimeout(resolve, illustDelay);    
    })
  };
  
  const onLengthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const length = parseInt(data.get('arrayLength')?.toString() || '0');
    // strings
    // const array = await Promise.all(Array(length).fill(0).map(getName));
    // decimal numbers
    const array = Array.from({ length }, () => Math.round(Math.random() * 1000) / 10);
    // integers
    // const array = Array.from({ length }, () => Math.floor(Math.random() * 100));
    setArray(array);
  }

  return (
    <>
      <div>
        <span className={styles.header}>
          <NavBar type={sortType} setType={setSortType} isAscState={[isASC, setIsASC]} speedState={[illustDelay, setIllustDelay]}/>
          <span>
          <button className={`${styles.sortWay} ${!isASC && styles.checked}`} onClick={() => setIsASC(!isASC)}>
              {isASC ? 'Asc' : 'Desc'}
          </button>         
          <label htmlFor="illustSpeed">Speed:</label>
          <select name="illustSpeed" defaultValue={3600/9} onChange={e => setIllustDelay(parseInt(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => <option key={i} value={3600/(i+2)}>{i+1}</option>)}
          </select>            
        </span>
      </span>
      <span className={styles.params}>
        <form onSubmit={onLengthSubmit}>
          <span>
            <label htmlFor="arrayLength">Array Length:</label>
              <input name="arrayLength" placeholder="length" type={'number'} defaultValue="10" max={40}/>              
          </span>
          <span>            
          <input type="submit" value="Run" />          
          </span>
        </form>
      </span>
      </div>
      <Outlet context={[array, setArray, waitDelay, isASC]} /> 
    </>
  );
};

export default Home; 
