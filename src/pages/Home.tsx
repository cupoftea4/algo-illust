import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useState, useMemo } from "react";
import { SortTypeId } from "../types";
import SortComponent from "../components/SortComponent";

const href: SortTypeId = window.location.href.split('/').pop() as SortTypeId;

type Props = {
  arrayState: [number[], (array: number[]) => void];
}

const Home = ({arrayState} : Props) => {
  const [array, setArray] = arrayState;
  const [sortType, setSortType] = useState<SortTypeId>(href);

  const onLengthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const length = parseInt(data.get('arrayLength')?.toString() || '0');
    setArray(Array.from({ length }, () => Math.floor(Math.random() * 100)));
  }
  const BubbleSort = useMemo(() => SortComponent(() => console.log('Bubble Sort')), []);

  return (
    <>
      <div>
        <NavBar type={sortType} setType={setSortType} />
        <span style={{color: 'white'}}>
          <form onSubmit={onLengthSubmit}>
            <input name="arrayLength" type={'number'} max={40}/>
            <input type="submit" value="Run" />          
          </form>
        </span>
      </div>
      
      <Outlet context={[array, setArray]} /> 
    </>
  );
};

export default Home; 
