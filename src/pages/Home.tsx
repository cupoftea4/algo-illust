import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { SortTypeId } from "../types";
import styles from "./Home.module.scss";;

const href: SortTypeId = window.location.href.split('/').pop() as SortTypeId;

const Home = () => {
  const [array, setArray] = useState<number[]>([]);
  const [illustDelay, setIllustDelay] = useState<number>(250);
  const [sortType, setSortType] = useState<SortTypeId>(href);
  const [isASC, setIsASC] = useState<boolean>(true);

  const waitDelay = () => new Promise(resolve => setTimeout(resolve, illustDelay));
  
  const onLengthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const length = parseInt(data.get('arrayLength')?.toString() || '0');
    // const array = ArrayGenerator(length, sortType).generate();
    setArray(Array.from({ length }, () => Math.floor(Math.random() * 100)));
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
      <Outlet context={[array, setArray, waitDelay]} /> 
    </>
  );
};

export default Home; 
