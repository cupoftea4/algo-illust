import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { SortTypeId } from "../types";
import styles from "./Home.module.scss";

const href: SortTypeId = window.location.href.split('/').pop() as SortTypeId;

const Home = () => {
  const [array, setArray] = useState<number[]>([]);
  const [illustDelay, setIllustDelay] = useState<number>(250);
  const [sortType, setSortType] = useState<SortTypeId>(href);

  const waitDelay = () => new Promise(resolve => setTimeout(resolve, illustDelay));
  
  const onLengthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const length = parseInt(data.get('arrayLength')?.toString() || '0');
    setIllustDelay(parseInt(data.get('illustSpeed')?.toString() || '400'));
    setArray(Array.from({ length }, () => Math.floor(Math.random() * 100)));
  }

  return (
    <>
      <div>
        <NavBar type={sortType} setType={setSortType} />
        <span className={styles.params}>
          <form onSubmit={onLengthSubmit}>
            <span>
              <label htmlFor="arrayLength">Array Length:</label>
              <input name="arrayLength" placeholder="length" type={'number'} defaultValue="10" max={40}/>              
            </span>
            <span>
              <label htmlFor="illustSpeed">Speed:</label>
              <select name="illustSpeed" defaultValue={3600/9}>
                {Array.from({ length: 12 }, (_, i) => <option key={i} value={3600/(i+2)}>{i+1}</option>)}
              </select>              
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
